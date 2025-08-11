"use server"

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { aw } from "node_modules/better-auth/dist/shared/better-auth.CUMpWXN6";
import { inngest } from "~/inngest/client";
import { auth } from "~/lib/auth"
import { db } from "~/server/db";

export interface GenerateRequest{
  prompt? : string;
  lyrics? : string;
  fullDescribedSong? : string;
  describedLyrics? : string;
  instrumental? : boolean;
}

export async function generateSong(generateRequest: GenerateRequest) {

  const session = await auth.api.getSession({
        headers: await headers(),
    });
    if(!session) redirect("/auth/sign-in");

    await queueSong(generateRequest, 7.5, session.user.id);
    await queueSong(generateRequest, 15, session.user.id);

    revalidatePath("/create");
    

}


export async function queueSong(
  generateRequest:GenerateRequest,
  guidanceScale: number,
  userId: string,
) {
  
  let title="untitled"
  if(generateRequest.describedLyrics) title = generateRequest.describedLyrics
  
  if (generateRequest.fullDescribedSong) title = generateRequest.fullDescribedSong

  title = title.charAt(0).toLocaleUpperCase() + title.slice(1);

  const song = await db.song.create({
    data:{
        userId: userId,
        title: title,
        prompt: generateRequest.prompt,
        fullDescribedSong: generateRequest.fullDescribedSong,
        instrumental: generateRequest.instrumental,
        guidanceScale: guidanceScale,
        audioDuration: 180


    },
  });

  await inngest.send({
    name: "generate-song-event",
    data: {songId: song.id, userId: song.userId}
  })
}