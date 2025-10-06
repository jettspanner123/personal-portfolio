"use client";
import React from "react";
import {
    motion,
    MotionValue,
    spring,
    useMotionTemplate,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform
} from "framer-motion";
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

    const description: string = "I specialize in creating modern, user-focused digital experiences across web, iOS, desktop, and cross-platform applications, combining frontend, backend, and UI/UX expertise to build seamless, functional, and engaging products.";
    const descriptionRef: React.RefObject<HTMLParagraphElement | null> = React.useRef(null);

    const {scrollYProgress: descriptionScrollYProgress} = useScroll({
        target: descriptionRef,
        offset: ["start 80%", "start 30%"]
    })

    descriptionScrollYProgress.on("change", (latestValue) => {
        console.log(latestValue);
    })

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


                <div
                    ref={descriptionRef}
                    className={`w-screen !pb-[15rem] !mt-[10rem]`}>

                    <p className={"text-white font-bold oswald uppercase text-[3vw] flex flex-wrap justify-center items-center !px-[10vw]"}>
                        {
                            description.split(" ").map((word: string, index: number): React.JSX.Element => {

                                const start = index / description.split(" ").length;
                                const end = start + (1 / description.split(" ").length);
                                const opacity: MotionValue<number> = useSpring(useTransform(descriptionScrollYProgress, [start, end], [0.15, 1]), springOptions);
                                return (
                                    <motion.span
                                        style={{opacity}}
                                        className={"!ml-[1vw]"} key={index}>{word}</motion.span>
                                )
                            })
                        }
                    </p>
                </div>

            </motion.section>
        </React.Fragment>
    )
}

