"use client"

import { authClient } from "~/lib/auth-client"
import { Button } from "../ui/button"

export default function Upgrade(){

    const upgrade = async () =>{
        await authClient.checkout({
            products:[
                "e07480fe-3300-4a2f-8442-1504c1c3148a",
                "08ec4361-6975-4baa-bbef-cb202af82818",
                "eb27fa27-6675-4565-8473-636949311051",
            ]
        })
    }


    return <Button 
    variant="outline" 
    size="sm" 
    className="ml-2 cursor-pointer text-blue-500"
    onClick={upgrade}
    >
        Upgrade
        </Button>

}