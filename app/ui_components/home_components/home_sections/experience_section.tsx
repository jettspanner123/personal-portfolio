"use client";
import React from "react";
import {motion, MotionValue, useMotionTemplate, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import {StaticImageData} from "next/image";


// MARK: Image imports
import SweatItLogo from "@/app/assets/Dumbbell.png";
import {useMotion} from "@react-three/drei";

interface ExperienceProps {
    name: string;
    company_name: string;
    duration: string;
    logo: StaticImageData;
}

interface AccomplishmentsProps {
    name: string;
    company_name: string;
    hackathon_name: string;
    date: string;
}

export default function ExperienceSection(): React.ReactElement {
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

    const headingUnderlineWidthRaw: MotionValue<number> = useSpring(useTransform(headingScrollProgress, [0, 0.5], [0, 100]), springOptions);
    const headingUnderlineWidth: MotionValue<string> = useMotionTemplate`${headingUnderlineWidthRaw}%`;


    const experiences: Array<ExperienceProps> = [
        {
            name: "Front End Developer",
            company_name: "Cantiliver Labs",
            duration: "December, 2023",
            logo: SweatItLogo
        },
        {
            name: "Technical Head",
            company_name: "Geeks For Geeks",
            duration: "2023-2025",
            logo: SweatItLogo
        },
        {
            name: "Software Intern",
            company_name: "Infosys, Mysuru",
            duration: "February, 2025",
            logo: SweatItLogo
        },
        {
            name: "Front End/UI UX",
            company_name: "HelioWeb, Bikaner",
            duration: "June, 2025",
            logo: SweatItLogo
        },
    ];

    const accomplishments: Array<AccomplishmentsProps> = [
        {
            name: "Regionals Winner",
            company_name: "Geeks For Geeks",
            hackathon_name: "Solving For India Hackathon",
            date: "March, 2023"
        },
        {
            name: "Larry Page UI Expert",
            company_name: "CodingNinjas",
            hackathon_name: "UI/UX Comp",
            date: "May, 2023"
        },
        {
            name: "Runner Up",
            company_name: "Geeks For Geeks",
            hackathon_name: "Solving For India Hackathon",
            date: "September, 2024"
        },
    ];

    return (
        <React.Fragment>
            <section
                ref={sectionRef}
                className={`min-h-screen bg-white w-screen !pb-[5rem] overflow-x-hidden`}>

                <div className={`w-full flex text-black !px-[7.3rem] justify-end`}>
                    <h1 className={`text-[5vw] uppercase font-bold !pt-[5rem] inline-block`}>
                        My Expertise
                        <motion.div
                            style={{width: headingUnderlineWidth}}
                            className={`w-full h-[20px] bg-black`}/>
                    </h1>
                </div>


                <div className={`flex-1/3 h-full !px-[7rem] !pt-[7rem]`}>

                    <div className={`flex justify-between w-full opacity-50`}>
                        <h1 className={`text-[1.5rem] text-left oswald flex-1 justify-start`}>
                            Position
                        </h1>

                        <h1 className={`text-[1.5rem] oswald text-left flex-1 justify-start`}>
                            Company
                        </h1>

                        <h1 className={`text-[1.5rem] oswald flex-1 text-end justify-start`}>
                            Timestamp
                        </h1>
                    </div>

                    {experiences.map((item: ExperienceProps, index: number): React.ReactElement => {
                        return (
                            <SingleLineExperienceDisplay item={item} index={index} key={index}/>
                        )
                    })}


                    <h1 ref={accomplishmentHeadingRef}
                        className={`text-[1.5rem] oswald text-left flex-1 justify-start !mt-[5rem] opacity-50`}>
                        Accomplishments
                    </h1>

                    {accomplishments.map((item: AccomplishmentsProps, index: number): React.ReactElement => {
                        return (
                            <SingleLineAccomplishmentDisplay item={item} index={index} key={index}/>
                        )
                    })}

                </div>

            </section>
        </React.Fragment>
    )
}

function SingleLineExperienceDisplay({item, index}: { item: ExperienceProps, index: number }): React.JSX.Element {


    const ref = React.useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start end", "end 80%"]
    });


    const scale: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 1], [0.8, 1]), springOptions);
    const y: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 1], [50, 0]), springOptions);
    const transform: MotionValue<string> = useMotionTemplate`translateY(${y}px) scale(${scale})`;
    return (
        <motion.div
            ref={ref}
            style={{transform, willChange: "transform"}}
            key={index}
            className={`w-full border-t-[0.5px] border-black flex justify-between`}>
            <h1 className={`text-[1.75rem] text-left geist text-light !py-[1.5rem] flex-1`}>
                {item.name}
            </h1>


            <h1 className={`text-[1.75rem] text-left geist text-light !py-[1.5rem] flex-1`}>
                {item.company_name}
            </h1>

            <h1 className={`text-[1.75rem] text-end geist text-light !py-[1.5rem] flex-1`}>
                {item.duration}
            </h1>
        </motion.div>
    )
}

function SingleLineAccomplishmentDisplay({item, index}: {
    item: AccomplishmentsProps,
    index: number
}): React.JSX.Element {


    const ref = React.useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start end", "end 80%"]
    });


    const scale: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 1], [0.8, 1]), springOptions);
    const y: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 1], [50, 0]), springOptions);
    const transform: MotionValue<string> = useMotionTemplate`translateY(${y}px) scale(${scale})`;
    return (
        <motion.div
            ref={ref}
            style={{transform, willChange: "transform"}}
            key={index}
            className={`w-full border-t-[0.5px] border-black flex justify-between`}>
            <h1 className={`text-[1.75rem] geist text-left text-light !py-[1.5rem] flex-1`}>
                {item.name}
            </h1>

            <h1 className={`text-[1.75rem] geist text-left text-light !py-[1.5rem] flex-1`}>
                {item.hackathon_name}
            </h1>

            <h1 className={`text-[1.75rem] geist text-end text-light !py-[1.5rem] flex-1`}>
                {item.date}
            </h1>
        </motion.div>
    )
}