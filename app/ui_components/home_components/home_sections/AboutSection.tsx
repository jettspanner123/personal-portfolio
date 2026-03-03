"use client";
import React from "react";
import { motion, MotionValue, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { springOptions } from "@/app/constants/animation_constants";
import Image from "next/image";
import { useMouseHoverState } from "@/app/stores/mouse_store";
import SectionTransition from "@/app/ui_components/home_components/home_sections/components/section_transition";
import MyProfileImage from "@/app/assets/Me.jpeg";
import SectionHeader from "@/app/ui_components/section_header/SectionHeader";

// MARK: Constants
const ABOUT_ME_CONTENT = "For over 2 years I have been striving to create bold experiences that connect brands with their audience through design that resonates.";
const ABOUT_ME_SUB_CONTENT = "Specializing in digital design, motion design. I strive to give each project a unique personality and visual design.";

// MARK: Types
interface AnimatedTextProps {
    text: string;
    scrollYProgress: MotionValue<number>;
    className?: string;
    withScale?: boolean;
    blurAmount?: string;
}

// MARK: Animated Text Component
function AnimatedText({
    text,
    scrollYProgress,
    className,
    withScale = false,
    blurAmount = "blur(10px)"
}: AnimatedTextProps): React.ReactElement {
    const words = text.split(" ");

    return (
        <h1 style={{ lineHeight: 1 }} className={className}>
            {words.map((word, index) => {
                const start = index / words.length;
                const end = start + (1 / words.length);
                const filter = useTransform(
                    scrollYProgress,
                    [start, end],
                    [blurAmount, "blur(0px)"]
                );
                const scale = withScale
                    ? useSpring(useTransform(scrollYProgress, [start, end], [0, 1]), springOptions)
                    : undefined;

                return (
                    <motion.span
                        key={index}
                        className="!ml-[12px]"
                        style={{ filter, scale, transformOrigin: "left" }}
                    >
                        {word}
                    </motion.span>
                );
            })}
        </h1>
    );
}

// MARK: Main Component
export default function AboutSection(): React.ReactElement {
    const { toggleShowMouseHover } = useMouseHoverState();
    const sectionRef = React.useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const imageScale = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1]),
        springOptions
    );

    const headingUnderlineWidthRaw = useSpring(
        useTransform(scrollYProgress, [0, 0.5], [0, 100]),
        springOptions
    );
    const headingUnderlineWidth = useMotionTemplate`${headingUnderlineWidthRaw}%`;

    return (
        <section
            onMouseEnter={toggleShowMouseHover}
            onMouseLeave={toggleShowMouseHover}
            className="min-h-screen w-full bg-white relative"
            ref={sectionRef}
        >
            <SectionTransition scrollYProgress={scrollYProgress} color="white" />

            {/* MARK: Section header */}
            <div className={"flex justify-center items-center"}>
                <SectionHeader
                    text={"My Experience"}
                    underlineWidthProgress={headingUnderlineWidth}
                    foregroundColor={"black"}
                />
            </div>

            <div className="w-full !px-[6rem] !mx-auto h-screen !mt-[10rem] flex">
                {/* MARK: Content Section */}
                <div className="flex-1 h-full">
                    <AnimatedText
                        text={ABOUT_ME_CONTENT}
                        scrollYProgress={scrollYProgress}
                        className="text-[3.5rem] geist font-light flex flex-wrap"
                        withScale
                        blurAmount="blur(5px)"
                    />

                    <AnimatedText
                        text={ABOUT_ME_SUB_CONTENT}
                        scrollYProgress={scrollYProgress}
                        className="text-[1.5rem] geist font-light flex flex-wrap !mt-[10rem] w-[50%]"
                    />

                    <motion.button
                        whileHover={{
                            background: "black",
                            color: "white",
                        }}
                        className="geist font-light !mt-[2rem] !ml-[0.75rem] text-black text-[1rem] !p-[1rem] border-[0.5px] border-black rounded-full hover:cursor-pointer"
                    >
                        Download CV
                    </motion.button>
                </div>

                {/* MARK: Profile image */}
                <div className="flex-1 h-full relative justify-end flex">
                    <motion.div style={{ scale: imageScale, transformOrigin: "top right" }}>
                        <Image
                            src={MyProfileImage}
                            alt="Profile picture of the developer"
                            style={{ width: "700px", height: "900px" }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}