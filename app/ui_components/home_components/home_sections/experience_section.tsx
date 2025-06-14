"use client";
import React from "react";
import {motion, MotionValue, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import {StaticImageData} from "next/image";


// MARK: Image imports
import SweatItLogo from "@/app/assets/Dumbbell.png";
import {MouseHoverStateOptions, useMouseHoverState} from "@/app/stores/mouse_store";

export default function ExperienceSection(): React.ReactElement {
    const {toggleFor} = useMouseHoverState();
    const sectionRef = React.useRef<HTMLElement | null>(null);
    const accomplishmentHeadingRef = React.useRef<HTMLHeadingElement | null>(null);

    const {scrollYProgress: headingScrollProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "start 50%"]
    });

    const {scrollYProgress: accomplishmentHeadingScrollProgress} = useScroll({
        target: accomplishmentHeadingRef,
        offset: ["start end", "start 50%"]
    });

    const headingUnderlineScaleX = useSpring(useTransform(headingScrollProgress, [0, 1], [0, 1]), springOptions);


    interface ExperienceProps {
        name: string;
        company_name: string;
        duration: string;
        logo: StaticImageData;
    }

    interface AccomplishmentsProps {
        name: string;
        company_name: string;
        hackation_name: string;
        date: string;
    }

    const experiences: Array<ExperienceProps> = [
        {name: "Front End Developer", company_name: "Cantiliver Labs", duration: "2023", logo: SweatItLogo},
        {name: "Technical Head", company_name: "Geeks For Geeks", duration: "2023-2025", logo: SweatItLogo},
        {name: "Software Intern", company_name: "Infosys, Mysuru", duration: "2025", logo: SweatItLogo},
    ];

    const accomplishments: Array<AccomplishmentsProps> = [
        {
            name: "Regionals Winner",
            company_name: "Geeks For Geeks",
            hackation_name: "Solving For India Hackation",
            date: "March, 2023"
        },
        {
            name: "Larry Page UI Expert",
            company_name: "CodingNinjas",
            hackation_name: "UI/UX Comp",
            date: "May, 2023"
        },
        {
            name: "Runner Up",
            company_name: "Geeks For Geeks",
            hackation_name: "Solving For India Hackation",
            date: "September, 2024"
        },
    ];

    return (
        <React.Fragment>
            <section
                ref={sectionRef}
                className={`min-h-screen h-screen bg-white w-screen flex `}>

                <div className={`h-full flex-1 !p-[7rem]`}>

                    <h1 className={`text-[4rem] inline-block`}>
                        My Experience
                        <motion.div
                            style={{scaleX: headingUnderlineScaleX, transformOrigin: "left"}}
                            className={`h-[10px] w-full bg-black rounded-full`}/>
                    </h1>

                </div>


                <div className={`flex-1/3 h-full !p-[7rem]`}>

                    <div className={`flex justify-between w-full opacity-50`}>
                        <h1 className={`text-[1.5rem] oswald flex-1 justify-start`}>
                            Position
                        </h1>

                        <h1 className={`text-[1.5rem] oswald flex-1 justify-start`}>
                            Company
                        </h1>

                        <h1 className={`text-[1.5rem] oswald flex-1 justify-start`}>
                            Duration
                        </h1>
                    </div>

                    {experiences.map((item: ExperienceProps, index: number): React.ReactElement => {
                        const start: number = index / experiences.length;
                        const end: number = start + (1 / experiences.length);

                        const x: MotionValue<number> = useSpring(useTransform(headingScrollProgress, [start, end], [200, 0]), springOptions);
                        return (
                            <motion.div
                                style={{x, willChange: "transform"}}
                                key={index}
                                className={`w-full border-t-[0.5px] border-black flex justify-between`}>
                                <h1 className={`text-[1.75rem] geist text-light !py-[1.5rem] flex-1`}>
                                    {item.name}
                                </h1>


                                <h1 className={`text-[1.75rem] geist text-light !py-[1.5rem] text-left flex-1`}>
                                    {item.company_name}
                                </h1>

                                <h1 className={`text-[1.75rem] geist text-light !py-[1.5rem] flex-1`}>
                                    {item.duration}
                                </h1>
                            </motion.div>
                        )
                    })}


                    <h1 ref={accomplishmentHeadingRef}
                        className={`text-[1.5rem] oswald flex-1 justify-start !mt-[5rem] opacity-50`}>
                        Accomplishments
                    </h1>

                    {accomplishments.map((item: AccomplishmentsProps, index: number): React.ReactElement => {
                        const start: number = index / experiences.length;
                        const end: number = start + (1 / experiences.length);

                        const x: MotionValue<number> = useSpring(useTransform(accomplishmentHeadingScrollProgress, [start, end], [200, 0]), springOptions);
                        return (
                            <motion.div
                                style={{x, willChange: "transform"}}
                                key={index}
                                className={`w-full border-t-[0.5px] border-black flex justify-between`}>
                                <h1 className={`text-[1.75rem] geist text-light !py-[1.5rem] text-left flex-1`}>
                                    {item.name}
                                </h1>

                                <h1 className={`text-[1.75rem] geist text-light !py-[1.5rem] text-left flex-1`}>
                                    {item.hackation_name}
                                </h1>

                                <h1 className={`text-[1.75rem] geist text-light !py-[1.5rem] text-left flex-1`}>
                                    {item.date}
                                </h1>
                            </motion.div>
                        )
                    })}

                </div>

            </section>
        </React.Fragment>
    )
}