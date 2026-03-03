"use client";
import React, {useEffect, useMemo} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import SweatItMockup from "../assets/FirstMockup.png";

// Animation Constants
const TITLE_TEXT = "Sweat-It";
const TITLE_ANIMATION = {
    CHAR_DURATION: 0.7,
    CHAR_DELAY_MULTIPLIER: 0.05,
    CHAR_BASE_DELAY: 4,
    CHARACTER_SCALING: {
        initial: {scaleY: 0},
        animate: {scaleY: 1},
    },
};

const OVERLAY_ANIMATION = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    transition: {
        duration: 2,
        delay: 3.5,
        ease: [0.61, 1, 0.88, 1],
    },
};

const HERO_IMAGE_ANIMATION = {
    initial: {
        y: "100%",
        scale: 0.5,
        borderRadius: "10rem",
    },
    animate: {
        height: "20vh",
        y: "0%",
        scale: 1,
        borderRadius: "0",
    },
    transition: {
        height: {
            delay: 1.7,
            duration: 2,
            ease: [0.85, 0, 0.15, 1],
        },
        y: {
            duration: 2,
            ease: [0.85, 0, 0.15, 1],
        },
        scale: {
            duration: 2,
            ease: [0.85, 0, 0.15, 1],
        },
        borderRadius: {
            duration: 2,
            ease: [0.85, 0, 0.15, 1],
        },
    },
};

// Components
interface TitleCharacterProps {
    char: string;
    index: number;
}

const TitleCharacter: React.FC<TitleCharacterProps> = ({char, index}) => {
    const getMarginSpacing = (character: string) => {
        return character === "_" ? {marginLeft: 20} : {};
    };

    return (
        <motion.span
            {...TITLE_ANIMATION.CHARACTER_SCALING}
            transition={{
                duration: TITLE_ANIMATION.CHAR_DURATION,
                delay: index * TITLE_ANIMATION.CHAR_DELAY_MULTIPLIER + TITLE_ANIMATION.CHAR_BASE_DELAY,
            }}
            style={getMarginSpacing(char)}
        >
            {char !== "_" ? char : ""}
        </motion.span>
    );
};

const AnimatedTitle: React.FC = () => {
    const characters = useMemo(() => TITLE_TEXT.split(""), []);

    return (
        <motion.div
            className="flex justify-center uppercase items-center w-screen h-[20vh] absolute text-white text-[5rem] oswald font-medium z-[12] top-[5rem]">
            {characters.map((char, index) => (
                <TitleCharacter key={index} char={char} index={index}/>
            ))}
        </motion.div>
    );
};

const OverlayGradient: React.FC = () => (
    <motion.div
        {...OVERLAY_ANIMATION}
        className="w-screen origin-bottom h-[20vh] absolute z-[11] bg-gradient-to-t from-black to-transparent"
    />
);

const HeroImage: React.FC = () => (
    <motion.div
        {...HERO_IMAGE_ANIMATION}
        className="h-screen w-screen absolute top-0 overflow-hidden"
    >
        <Image
            src={SweatItMockup}
            alt="Sweat-It Website Mockup"
            className="object-cover w-full h-full"
            priority
        />
    </motion.div>
);

// Main Component
export default function SweatItPage(): React.ReactElement {
    useEffect(() => {
        const initializeLocomotiveScroll = async () => {
            try {
                const {default: LocomotiveScroll} = await import("locomotive-scroll");
                new LocomotiveScroll();
            } catch (error) {
                console.error("Failed to initialize Locomotive Scroll:", error);
            }
        };

        initializeLocomotiveScroll();
    }, []);

    return (
        <main className="min-h-[200vh] min-w-screen relative">
            <HeroImage/>
            <OverlayGradient/>
            <AnimatedTitle/>
        </main>
    );
}