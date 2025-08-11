"use server"

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

export default async function TrackListFetcher(){

    const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session){
            redirect("/auth/sign-in");
        }

        const songs = await db.song.findMany({
            where: {userId: session?.user?.id},
            include:{
                user:{
                    select:{name:true}
                }
            },
            orderBy:{
                createdAt:"desc",
            }
        })
    return <p>Tracks Loaded</p>
}