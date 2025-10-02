import React from "react";
import {motion, MotionValue, useTransform} from "framer-motion";


export function AnimatedHeading({scrollYProgress}: {scrollYProgress: MotionValue<number>}): React.JSX.Element {

    const headingUnderlineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
    return (
        <div className={`w-full flex justify-center items-center`}>
            <h1 className={`text-[3rem] !pt-[5rem] inline-block`}>
                Featured Works

                <motion.div style={{width: headingUnderlineWidth, transformOrigin: "center"}}
                            className={`w-full h-[11px] bg-black rounded-full`}/>
            </h1>
        </div>
    )
}