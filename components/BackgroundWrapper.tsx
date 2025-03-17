"use client"

import Navbar from "@/components/navbar"
import { useBackground } from "./BackgroundContext"
import Image from "next/image"
export default function BackgroundWrapper({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { background } = useBackground();

    return (
        <div style={{ backgroundImage: `url('')`, backgroundBlendMode: "overlay",}}>
            <Image 
            src={`${background}`} 
            alt = "bg"
            className="min-h-screen bg-cover bg-center bg-fixed transition-colors duration-300"
            fill
            style={{objectFit:"cover"}}
            >            
            </Image>
         <div className="min-h-screen bg-background/50 backdrop-blur-sm transition-colors duration-300">
           <Navbar />
           {children}
         </div>
       </div>
    )
}

