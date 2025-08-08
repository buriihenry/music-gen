"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Switch } from "../ui/switch";

const inspirationTags = [
  "80s synth-pop",
  "Acoustic ballad",
  "Epic movie score",
  "Lo-fi hip hop",
  "Driving rock anthem",
  "Summer beach vibe",
];

export function SOngPanel(){
    const [mode, setMode] = useState <"simple" | "custom">("simple");
    const [description, setDescription] = useState("");
    const [Instrumental, setInstrumental] = useState(false);

    const handleInspirationTagClick = (tag: string) => {
        const currentTags = description.split(",").map((s) =>s.trim()).filter((s) => s);
        if(!currentTags.includes(tag)){
            if(description.trim() ===""){
                setDescription(tag)
            }else{
                setDescription(description + ", " + tag);
            }
        }
    };




    return(
        
            <div className="bg-muted/30 w-full flex-col border-r lg:w-80">
                <div className="flex-1 overflow-y-auto p-4">
                    <Tabs 
                    value={mode}
                    onValueChange={(value) => setMode(value as "simple" | "custom")}
                    >
                        <TabsList className="w-full">
                            <TabsTrigger value="simple">Simple</TabsTrigger>
                            <TabsTrigger value="custom">Custom</TabsTrigger>

                        </TabsList>
                        <TabsContent value="simple" className="mt-6 space-y-6">
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-medium">
                                    Describe your Song
                                    </label>
                                    <Textarea 
                                    value={description}
                                    onChange = {(e) => setDescription(e.target.value)}
                                    placeholder="A dreamy lofi hip hop song, perfect for studying and relaxing" 
                                    className="min-h-[120px]"
                                    />

                                
                            </div>
                            <div className="flex items-center justify-between">
                                <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setMode("custom")}
                                >
                                    <Plus className="mr-2"/>
                                    Lyrics
                                </Button>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium">Instrumental</label>
                                    <Switch 
                                    checked={Instrumental} 
                                    onCheckedChange={setInstrumental} /> 

                                </div>
                                
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-medium">
                                    Inspiration
                                </label>
                                <div className="w-full overflow-x-auto whitespace-nowrap">
                                    <div className="flex gap-2 pb-2">
                                        {inspirationTags.map((tag) =>(
                                            <Button 
                                            variant="outline"
                                            key={tag}
                                            size="sm"
                                            className="h-7 flex-shrink-0 bg-transparent text-xs"
                                            onClick={() => handleInspirationTagClick(tag)}

                                            
                                            >
                                                <Plus className="mr-1"/>
                                                {tag}
                                            </Button>
                                        ))}

                                    </div>

                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="custom" className="mt-6 space-y-6">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium">
                                    Lyrics
                                    </label>
                                    <div className="flex items-center gap-1">
                                        <Button 
                                        size="sm" 
                                        className="h-7 text-xs"> 
                                        Auto

                                        </Button>

                                    </div>
                                </div>
                                    </div>
                                    </TabsContent>
                    </Tabs>


                </div>
            </div>
        
    )
}