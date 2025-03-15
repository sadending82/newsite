"use client"

import Navbar from "@/components/navbar"
import { useBackground } from "./BackgroundContext"

export default function BackgroundWrapper({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { background } = useBackground();

    return (
        <div
        className="min-h-screen bg-cover bg-center bg-fixed transition-colors duration-300"
        style={{
         backgroundImage: `url('${background}')`,
         backgroundBlendMode: "overlay",
        }}
        >
         <div className="min-h-screen bg-background/50 backdrop-blur-sm transition-colors duration-300">
           <Navbar />
           {children}
         </div>
       </div>
    )
}

