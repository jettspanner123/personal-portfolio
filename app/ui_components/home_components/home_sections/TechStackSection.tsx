"use client";
import React from "react";
import {motion, MotionValue, useMotionTemplate, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import SectionTransition from "@/app/ui_components/home_components/home_sections/components/section_transition";


export default function TechStackSection(): React.ReactElement {

    const sectionRef: React.RefObject<HTMLElement | null> = React.useRef(null);
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const headingUnderlineWidthRaw: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 100]), springOptions);
    const headingUnderlineWidth: MotionValue<string> = useMotionTemplate`${headingUnderlineWidthRaw}%`;

    const {scrollYProgress: reverseScrollProgress} = useScroll({
        target: sectionRef,
        offset: ["end end", "end 50%"]
    });

    const sectionOpacity: MotionValue<number> = useSpring(useTransform(reverseScrollProgress, [0, 1], [1, 0.5]), springOptions);
    const sectionBlur: MotionValue<string> = useTransform(reverseScrollProgress, [0, 1], ["blur(0)", "blur(2px)"]);

    return (
        <React.Fragment>
            <motion.section
                style={{opacity: sectionOpacity, filter: sectionBlur}}
                className={`min-h-[100vh] relative overflow-y-visible translate-y-[2px] !pb-[15rem] bg-black`}
                ref={sectionRef}>

                <SectionTransition scrollYProgress={scrollYProgress} color={"black"}/>


                {/*MARK: Section header*/}
                <div className={`w-full flex justify-center text-white items-center`}>
                    <h1 className={`text-[3rem] !pt-[5rem] inline-block`}>
                        My Expertise

                        <motion.div
                            style={{width: headingUnderlineWidth, transformOrigin: "center"}}
                            className={`w-full h-[11px] bg-white rounded-full`}/>
                    </h1>
                </div>


                <div className={`w-screen !pb-[15rem] !mt-[10rem]`}>

                </div>

            </motion.section>
        </React.Fragment>
    )
}

