"use client";
import React from "react";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { springOptions } from "@/app/constants/animation_constants";
import { FaLinkedin, FaTwitter } from "react-icons/fa6";
import MouseMagnetic from "@/app/ui_components/magnetic_mouse/MagneticMouse";
import { MouseHoverStateOptions, useMouseHoverState } from "@/app/stores/mouse_store";
import SectionTransition from "@/app/ui_components/home_components/home_sections/components/section_transition";

// MARK: Constants
const CONTACT_HEADING = "contact";
const CONTACT_INFO = {
    email: "uddeshya872@gmail.com",
    phone: "+91 9875660105"
};

// MARK: Types
interface AnimatedHeadingProps {
    text: string;
    scrollYProgress: MotionValue<number>;
    className?: string;
}

interface SocialButtonProps {
    icon: React.ComponentType<{ size: number; className: string }>;
    scale: MotionValue<number>;
    ariaLabel: string;
}

interface ContactInfoItemProps {
    label: string;
    value: string;
    xPosition: MotionValue<number>;
    hoverOption: MouseHoverStateOptions;
    onToggleFor: (option: MouseHoverStateOptions) => void;
}

// MARK: Animated Heading Component
function AnimatedHeading({ text, scrollYProgress, className }: AnimatedHeadingProps): React.ReactElement {
    const letters = text.split("");

    return (
        <h1 className={className}>
            {letters.map((letter, index) => {
                const start = index / text.length;
                let end = start + (1 / text.length);
                // Adjust timing for last letter
                if (index === letters.length - 1) {
                    end -= 0.1;
                }
                const y = useSpring(
                    useTransform(scrollYProgress, [start, end], [200, 0]),
                    springOptions
                );

                return (
                    <motion.span
                        key={index}
                        style={{ y }}
                        className="inline-block"
                    >
                        {letter}
                    </motion.span>
                );
            })}
        </h1>
    );
}

// MARK: Social Button Component
function SocialButton({ icon: Icon, scale, ariaLabel }: SocialButtonProps): React.ReactElement {
    return (
        <motion.div style={{ scale }}>
            <MouseMagnetic>
                <motion.div
                    whileHover={{ scale: 1.25, zIndex: 100, position: "relative" }}
                    className="h-[6rem] blurBackground aspect-square border-white hover:cursor-pointer border-[1px] rounded-full grid place-items-center text-center"
                    aria-label={ariaLabel}
                >
                    <MouseMagnetic>
                        <div className="h-[6rem] aspect-square flex justify-center items-center">
                            <Icon size={30} className="text-white" />
                        </div>
                    </MouseMagnetic>
                </motion.div>
            </MouseMagnetic>
        </motion.div>
    );
}

// MARK: Contact Info Item Component
function ContactInfoItem({
    label,
    value,
    xPosition,
    hoverOption,
    onToggleFor
}: ContactInfoItemProps): React.ReactElement {
    return (
        <motion.h1
            style={{ x: xPosition }}
            onMouseEnter={() => onToggleFor(hoverOption)}
            onMouseLeave={() => onToggleFor(MouseHoverStateOptions.None)}
            className="text-[2rem] relative geist font-light text-white/30 hover:text-white text-right border-t-[0.5px] border-b-[0.5px] border-white/50 hover:border-white transition-colors duration-300 !p-[2rem]"
        >
            {value}
            <p className="absolute top-1/2 -translate-y-1/2 oswald uppercase text-[1.5rem] font-normal">
                {label}
            </p>
        </motion.h1>
    );
}

// MARK: Main Component
export default function ContactSection(): React.ReactElement {
    const { toggleFor, toggleShowMouseHover } = useMouseHoverState();

    const sectionRef = React.useRef<HTMLElement>(null);
    const headingContainerRef = React.useRef<HTMLDivElement>(null);

    // Scroll progress hooks
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const { scrollYProgress: headingScrollProgress } = useScroll({
        target: sectionRef,
        offset: ["start 20%", "start start"]
    });

    const { scrollYProgress: reverseScrollProgress } = useScroll({
        target: sectionRef,
        offset: ["end end", "end 50%"]
    });

    // Animation values
    const emailXPosition = useSpring(
        useTransform(scrollYProgress, [0, 1], [1000, 0]),
        springOptions
    );

    const phoneXPosition = useSpring(
        useTransform(scrollYProgress, [0.25, 1], [1000, 0]),
        springOptions
    );

    const linkedInScale = useSpring(
        useTransform(headingScrollProgress, [0, 1], [0, 1]),
        springOptions
    );

    const twitterScale = useSpring(
        useTransform(headingScrollProgress, [0.25, 1], [0, 1]),
        springOptions
    );

    const mouseInteractionScale = useSpring(
        useTransform(scrollYProgress, [0, 0.9], [0, 1]),
        springOptions
    );

    const sectionOpacity = useTransform(reverseScrollProgress, [0, 1], [1, 0.5]);
    const sectionBlur = useTransform(reverseScrollProgress, [0, 1], ["blur(0)", "blur(2px)"]);

    return (
        <motion.section
            style={{ opacity: sectionOpacity, filter: sectionBlur }}
            ref={sectionRef}
            className="min-h-[100vh] h-screen relative flex bg-black"
        >
            <SectionTransition scrollYProgress={scrollYProgress} color="black" />

            {/* MARK: Left Section - Heading */}
            <div className="flex-1 h-full flex flex-col overflow-hidden">
                {/* MARK: Mouse Interaction Area */}
                <motion.div
                    style={{ scale: mouseInteractionScale }}
                    className="flex-1/3 w-full flex justify-center items-center !pr-[9vh]"
                />

                {/* MARK: Contact Heading */}
                <div
                    ref={headingContainerRef}
                    className="flex-1 w-full flex justify-start items-end"
                >
                    <AnimatedHeading
                        text={CONTACT_HEADING}
                        scrollYProgress={headingScrollProgress}
                        className="text-[12rem] uppercase font-bold !px-[2rem] text-white"
                    />
                </div>
            </div>

            {/* MARK: Right Section - Social & Contact Info */}
            <div className="flex-1 h-full flex flex-col">
                {/* MARK: Social Buttons */}
                <div
                    onMouseEnter={toggleShowMouseHover}
                    onMouseLeave={toggleShowMouseHover}
                    className="!p-[3rem] flex items-center justify-end gap-[1rem]"
                >
                    <SocialButton
                        icon={FaLinkedin}
                        scale={linkedInScale}
                        ariaLabel="LinkedIn Profile"
                    />

                    <SocialButton
                        icon={FaTwitter}
                        scale={twitterScale}
                        ariaLabel="Twitter Profile"
                    />
                </div>

                {/* MARK: Contact Information */}
                <div className="w-full flex-1 !p-[3rem]">
                    <ContactInfoItem
                        label="Email"
                        value={CONTACT_INFO.email}
                        xPosition={emailXPosition}
                        hoverOption={MouseHoverStateOptions.Email}
                        onToggleFor={toggleFor}
                    />

                    <ContactInfoItem
                        label="Phone"
                        value={CONTACT_INFO.phone}
                        xPosition={phoneXPosition}
                        hoverOption={MouseHoverStateOptions.Phone}
                        onToggleFor={toggleFor}
                    />
                </div>

                {/* MARK: Footer Section */}
                <div className="w-full flex-1 bg-blue-300" />
            </div>
        </motion.section>
    );
}