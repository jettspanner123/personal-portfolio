import {motion, MotionValue, useSpring, useTransform} from "framer-motion";
import React from "react";
import {springOptions} from "@/app/constants/animation_constants";

export default function SectionTransition({scrollYProgress, color}: {scrollYProgress: MotionValue<number>, color: string}): React.JSX.Element {
    return (
        <div className={`flex absolute z-[12] w-screen h-screen top-[-100vh] pointer-events-none`}>
            {
                // [4,3,0,1,2]
                [0, 1, 2, 3, 4].map((item: number, index: number): React.ReactElement => {
                    const rawScaleY: MotionValue<number> = useTransform(scrollYProgress, [Math.max((item) / 10, 0), 1], [0, 1]);
                    const scaleY: MotionValue<number> = useSpring(rawScaleY, springOptions);
                    return (
                        <motion.div
                            style={{
                                scaleY,
                                transformOrigin: "bottom",
                                backgroundColor: color
                            }}
                            key={index}
                            className={`h-screen flex-1`}>
                        </motion.div>
                    )
                })
            }
        </div>
    )
}