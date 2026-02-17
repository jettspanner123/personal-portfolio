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
import SectionHeader from "@/app/ui_components/section_header/SectionHeader";


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

    const description: string = "I specialize in creating modern, user-focused digital experiences across web, iOS, desktop, and cross-platform applications, combining frontend, backend, and UI/UX expertise to build seamless, functional, and engaging products that inspire and perform beautifully.";
    const descriptionRef: React.RefObject<HTMLParagraphElement | null> = React.useRef(null);

    const {scrollYProgress: descriptionScrollYProgress} = useScroll({
        target: descriptionRef,
        offset: ["start 80%", "start 30%"]
    })

    function getKeywordColors(key: string): string {
        switch(key) {
            case "user-focused": return "#9CCFFF";
            case "web,": return "#B7BDF7";
            case "iOS,": return "#FF9B51";
            case "combining": return "#93BD57";
            case "frontend,": return "#93BD57";
            case "desktop": return "";
            case "cross-platform": return "#E1D9BC";
            case "applications": return "";
            case "beautifully.": return "#D02752";
            case "engaging": return "#9F8383";
            case "products": return "#9F8383";
            default: return "#fff";
        }
    }

    return (
        <React.Fragment>
            <motion.section
                style={{opacity: sectionOpacity, filter: sectionBlur}}
                className={`min-h-[100vh] relative overflow-y-visible translate-y-[2px] !pb-[15rem] bg-black`}
                ref={sectionRef}>

                <SectionTransition scrollYProgress={scrollYProgress} color={"black"}/>


                {/*MARK: Section header*/}
                {/*<div className={`w-full flex text-white !px-[7.3rem]`}>*/}
                {/*    <h1 className={`text-[5vw] uppercase font-bold !pt-[5rem] inline-block`}>*/}
                {/*        My Expertise*/}
                {/*        <motion.div*/}
                {/*            style={{width: headingUnderlineWidth, transformOrigin: "center"}}*/}
                {/*            className={`w-full h-[20px] bg-white`}/>*/}
                {/*    </h1>*/}
                {/*</div>*/}
                <SectionHeader
                    text={"My Expertise"}
                    underlineWidthProgress={headingUnderlineWidth}
                />


                <div
                    ref={descriptionRef}
                    className={`w-screen !pb-[15rem] !mt-[10rem]`}>

                    <p className={"text-white font-bold oswald uppercase text-[3vw] flex flex-wrap justify-center items-center !px-[6rem]"}>
                        {
                            description.split(" ").map((word: string, index: number): React.JSX.Element => {
                                const start: number = index / description.split(" ").length;
                                const end: number = start + (1 / description.split(" ").length);
                                const opacity: MotionValue<number> = useSpring(useTransform(descriptionScrollYProgress, [start, end], [0.15, 1]), springOptions);
                                return (
                                    <motion.span
                                        onTap={() => console.log(word)}
                                        style={{opacity, color: getKeywordColors(word)}}
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

