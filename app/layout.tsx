import type {Metadata} from "next";
import {Geist, Geist_Mono, Oswald, Roboto_Condensed} from "next/font/google";
import "./globals.css";
import {NextFontWithVariable} from "next/dist/compiled/@next/font";
import React from "react";


const roboto: NextFontWithVariable = Roboto_Condensed({
    variable: "--font-roboto",
    subsets: ["latin"]
});

const geistSans: NextFontWithVariable = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "Uddeshya Singh | Full Stack AI Creative Developer",
    description: "I’m a passionate developer focused on building modern, scalable, and visually engaging web applications. I love turning ideas into interactive digital experiences using technologies like Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
};

const oswald = Oswald({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-oswald",
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${oswald.className} ${roboto.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
