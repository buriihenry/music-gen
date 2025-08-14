"use client"

import type { Category, Song } from "@prisma/client"
import { Loader2, Music, Play } from "lucide-react";
import { useState } from "react";
import { getPlayUrl } from "~/actions/generation";
import { usePlayerStore } from "~/stores/use-player-store";

type SongWithRelation = Song & {
    user: {name: string | null};
    _count: {
        likes: number;
    }
    categories: Category[];
    thumbnailUrl?: string| null;
}

export function SongCard({song}: {song: SongWithRelation}){

    const [isLoading, setIsLoading] = useState(false);
    const setTrack = usePlayerStore((state) => state.setTrack);

    const handlePlay = async () => {
        setIsLoading(true)
        const playUrl = await getPlayUrl(song.id);
       

        setTrack({
            id: song.id,
            title: song.title,
            url: playUrl,
            artwork: song.thumbnailUrl,
            prompt: song.prompt,
            createdByUsername: song.user.name,
        });
         setIsLoading(false);

    }

    
    
    return <div>
        <div onClick={handlePlay} className="cursor-pointer">
            <div className="group relative aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">

            
            {song.thumbnailUrl ? (<img className="h-full w-full object-cover object-center" src={song.thumbnailUrl} />
        ): (
        <div className="bg-muted flex h-full w-full items-center justify-center">
            <Music className="text-muted-foreground h-12 w-12"/>
            </div>
        )}
        {/* Loader */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 transition-transform group-hover:scale-105">
        {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-white"/>: <Play className="w-6 h-6 fill-white text-white" />}

        </div>

        </div>
        </div>

        </div>
    </div>
}