"use client";
import React from "react";
import {AnimatePresence, motion, MotionValue, useScroll, useSpring, useTransform} from "framer-motion";
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


    const headingUnderlineScaleX: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springOptions);


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
                className={`flex min-h-screen w-screen bg-white relative !pb-[25vh]`}
                ref={sectionRef}>

                <div className={`flex-1 h-[50vh] sticky top-0 !p-[7rem]`}>
                    <h1 className={`text-[4rem] inline-block`}>
                        My SkillSet
                        <motion.div
                            style={{scaleX: headingUnderlineScaleX, transformOrigin: "left"}}
                            className={`h-[10px] w-full bg-black rounded-full`}/>
                    </h1>
                </div>


                <div
                    className={`flex-1/3 h-full grid gap-0 !px-[7rem] grid-cols-2 items-start !pt-[7rem]`}>
                    {/*<div key={index} className={`aspect-square border-black ${border}`}></div>*/}

                    <SkillCell
                        text={"Next Js"}
                        imageContent={
                            <Image src={NextJSImage} alt="Next Js"/>
                        }
                        index={0}
                    />

                    <SkillCell
                        text={"React Js"}
                        imageContent={
                            <Image src={ReactJSImage} alt="React Js"/>
                        }
                        index={1}
                    />

                    <SkillCell
                        text={"Framer Motion"}
                        imageContent={
                            <Image src={FramerMotionImage} alt="Next Js" className={`scale-40`}/>
                        }
                        index={2}
                    />

                    <SkillCell
                        text={"Node Js"}
                        imageContent={
                            <Image src={NodeJSImage} alt="Next Js"/>
                        }
                        index={3}
                    />

                    <SkillCell
                        text={"Firebase"}
                        imageContent={
                            <Image src={FirebaseImage} alt="Next Js" className={`scale-70`}/>
                        }
                        index={4}
                    />

                    <SkillCell
                        text={"Supabase"}
                        imageContent={
                            <Image src={SupabseImage} alt="Next Js" className={`scale-85`}/>
                        }
                        index={5}
                    />

                    <SkillCell
                        text={"Postgresql"}
                        imageContent={
                            <Image src={SQLImage} alt="Next Js" className={`scale-70`}/>
                        }
                        index={6}
                    />

                    <SkillCell
                        text={"MongoDb"}
                        imageContent={
                            <Image src={MongoDbImage} alt="Next Js" className={`scale-70`}/>
                        }
                        index={7}
                    />

                    <SkillCell
                        text={"Prisma ORM"}
                        imageContent={
                            <Image src={PrismaImage} alt="Next Js" className={`scale-70`}/>
                        }
                        index={8}
                    />

                    <SkillCell
                        text={"Zustand"}
                        imageContent={
                            <Image src={ZustandImage} alt="Next Js" className={`scale-50`}/>
                        }
                        index={9}
                    />

                </div>

            </motion.section>
        </React.Fragment>
    )
}


interface SkillCellInterface {
    text: string;
    imageContent: React.ReactElement;
    index: number;
    description?: string;
}

function SkillCell({text, imageContent, index}: SkillCellInterface): React.ReactElement {

    const [isHovered, setHovered] = React.useState<boolean>(false);

    const {currentSelectedImage, setCurrentSelectedImage} = useSkillSetStore();


    const isActive: boolean = currentSelectedImage === -1 || currentSelectedImage === index;
    return (
        <motion.div
            layout
            onMouseEnter={() => {
                setHovered(true);
                setCurrentSelectedImage(index);
            }}
            onMouseLeave={() => {
                setHovered(false);
                setCurrentSelectedImage(-1);
            }}
            animate={{
                filter: isActive ? "blur(0px)" : "blur(5px)",
                x: isActive ? -20 : 0,
                opacity: isActive ? 1 : 0.5
            }}
            className={'aspect-square relative border-black border-[0.5px] flex flex-col items-center justify-center overflow-hidden bg-white'}>


            {/*this is the image shit*/}
            <motion.div
                layout
                className={`w-full h-[80%]`}>
                <motion.div
                    layout
                    animate={{
                        filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                        opacity: index === 0 || index === 8 || index === 9 ? isHovered ? 1 : 0.5 : 1
                    }}
                    transition={{
                        duration: 0.75,
                        type: "spring",
                    }}
                    className={`w-full h-full flex justify-center items-center`}>
                    {imageContent}
                </motion.div>
            </motion.div>

            <AnimatePresence mode={"wait"}>
                {isHovered && (
                    <motion.div
                        animate={{y: 0}}
                        layout
                        initial={{y: 100}}
                        exit={{y: 100}}
                        transition={{
                            ease: [0.85, 0, 0.15, 1]
                        }}
                        style={{lineHeight: 1, color: ApplicationColor.current.appDarkBG}}
                        className={`gap-[0.5rem] w-[70%] absolute bottom-0 left-0 uppercase flex flex-col text-[2rem] !p-[1rem] geist font-light`}>
                        {text}
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    )
}