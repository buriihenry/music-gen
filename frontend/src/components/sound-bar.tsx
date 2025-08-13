"use client"

import { Download, MoreHorizontal, Music, Pause, Play, Volume2 } from "lucide-react";
import { usePlayerStore } from "~/stores/use-player-store"
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { Slider } from "./ui/slider";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

export default function SoundBar(){
    const {track} = usePlayerStore();
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState([100]);


    return (
        <div className="px-4 pb-2">
        <Card className="bg-background/60 relative w-full shrink-0 border-t py-0 backdrop-blur">
            <div className="space-y-2 p-3">
                <div className="flex items-center justify-between">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-pink-500">
                            {track?.artwork ? (
                                <img className="h-full w-full rounded-md object-cover" src={track.artwork} />): (
                                <Music className="h-4 w-4 text-white" 
                            />)}

                        </div>
                        <div className="max-w-24 min-w-0 flex-1 md:max-w-full">
                            <p className="truncate text-sm font-medium">
                                {track?.title}

                            </p>
                            <p className="text-muted-foreground truncate text-xs">{track?.createdByUsername}</p>

                        </div>
                    </div>
                    {/*Centered controls*/}
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <Button variant="ghost" size="icon">
                           {isPlaying? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4"/>}

                        </Button>

                    </div>
                    <div className="flex items-center gap-1">
                        <div className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4"/>
                            <Slider 
                            value={volume} 
                            onValueChange={setVolume}
                            step={1}
                            max={100}
                            min={0}
                            className="w-16"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="w-4 h-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem onClick={() =>{
                                    if(!track?.url) return;
                                    window.open(track?.url, "_blank")
                                }}>
                                    <Download className="mr-2 h-4-w-4"/>
                                    Download
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </div>
        </Card>
        </div>
    )
}