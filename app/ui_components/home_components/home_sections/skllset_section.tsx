"use client";
import React from "react";
import {
    AnimatePresence,
    motion,
    MotionValue,
    useMotionTemplate,
    useScroll,
    useSpring,
    useTransform
} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import Image from "next/image";
import {ApplicationColor} from "@/app/constants/ui_constants";
import useSkillSetStore from "@/app/stores/skillset_store";

// MARK: Image imports here
import NextJSImage from "@/app/assets/icons/next-js-seeklogo.svg";
import ReactJSImage from "@/app/assets/icons/react-seeklogo.svg";
import FramerMotionImage from "@/app/assets/icons/framer-motion-seeklogo.svg";
import NodeJSImage from "@/app/assets/icons/node-js-seeklogo.svg";
import FirebaseImage from "@/app/assets/icons/firebase-seeklogo.svg";
import SupabseImage from "@/app/assets/icons/supabase-seeklogo.svg";
import SQLImage from "@/app/assets/icons/postqresql-seeklogo.svg";
import PrismaImage from "@/app/assets/icons/prisma-seeklogo.svg";
import MongoDbImage from "@/app/assets/icons/mongodb-seeklogo.png";
import ZustandImage from "@/app/assets/icons/zustand.svg";


export default function SkillSetSection(): React.ReactElement {

    const sectionRef: React.RefObject<HTMLElement | null> = React.useRef<HTMLElement | null>(null);

    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "start 50%"]
    })


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
                className={`h-[500vh] bg-green-300 w-screen relative !pb-[25vh]`}
                ref={sectionRef}>

                <div className={"h-screen w-screen sticky top-0 bg-blue-300"}>
                    <div className={`flex-1 !p-[7rem] justify-center items-center flex sticky`}>

                        <h1 className={`text-[3rem] inline-block text-center`}>
                            My Skill Set
                            <motion.div
                                style={{scaleX: headingUnderlineWidth, transformOrigin: "left"}}
                                className={`h-[10px] w-full bg-black rounded-full`}/>
                        </h1>

                    </div>
                </div>
            </motion.section>
        </React.Fragment>
    )
}
