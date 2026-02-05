import React from "react";
import {motion, MotionValue} from "framer-motion";


interface SectionHeaderProps {
    text: string;
    underlineWidthProgress?: MotionValue<string> | null;
    foregroundColor?: string;
}
export default function SectionHeader({ text, underlineWidthProgress = null, foregroundColor = "white" }: SectionHeaderProps): React.JSX.Element {
    return (
        <div
            style={{ color: foregroundColor }}
            className={`w-full flex ${foregroundColor}`}>
            <h1 className={`text-[7vw] text-center w-full cursive font-bold !pt-[5rem] inline-block`}>
                {text}
            </h1>
        </div>
    )
}