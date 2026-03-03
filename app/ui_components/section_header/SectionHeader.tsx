import React from "react";
import { motion, MotionValue } from "framer-motion";

interface SectionHeaderProps {
  text: string;
  underlineWidthProgress?: MotionValue<string>;
  foregroundColor?: string;
}
export default function SectionHeader({
  text,
  underlineWidthProgress,
  foregroundColor = "white",
}: SectionHeaderProps): React.JSX.Element {
  return (
    <div
      style={{ color: foregroundColor }}
      className={`flex ${foregroundColor} flex-col`}
    >
      <h1
        className={`text-[5vw] text-center w-full uppercase font-bold !pt-[5rem] inline-block relative`}
      >
        {text}
      </h1>

      <motion.div style={{ width: underlineWidthProgress, backgroundColor: foregroundColor }} className={`h-[15px] rounded-xl -translate-y-[10px]`}/>
    </div>
  );
}
