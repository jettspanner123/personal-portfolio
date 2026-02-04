import {motion, MotionValue, useSpring, useTransform} from "framer-motion";
import React from "react";
import {springOptions} from "@/app/constants/animation_constants";

export default function SectionTransition({scrollYProgress, color, firstTransition = false}: {scrollYProgress: MotionValue<number>, color: string, firstTransition?: boolean}): React.JSX.Element {
    return (
        <div className={`flex absolute z-[12] w-screen h-screen  pointer-events-none section_transition ${!firstTransition ? 'top-[-100vh]' : "bottom-0"}`}>
            {
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