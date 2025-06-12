import React from "react";
import {AnimatePresence, motion, MotionValue, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import Image, {StaticImageData} from "next/image";
import {ApplicationColor} from "@/app/constants/ui_constants";

// MARK: Image imports here
import NextJSImage from "@/app/assets/icons/next-js-seeklogo.svg";
import ReactJSImage from "@/app/assets/icons/react-seeklogo.svg";
import FramerMotionImage from "@/app/assets/icons/framer-motion-seeklogo.svg";
import ZustandImage from "@/app/assets/icons/zustand.svg";
// import TypescriptImage from "@/app/assets/icons/";
import FirebaseImage from "@/app/assets/icons/firebase-seeklogo.svg";
import SupabaseImage from "@/app/assets/icons/supabase-seeklogo.svg";
import PostGRESSImage from "@/app/assets/icons/postqresql-seeklogo.svg";
import ExpressImage from "@/app/assets/icons/express-js-seeklogo.svg";
import NodeImage from "@/app/assets/icons/node-js-seeklogo.svg";
import PrismaImage from "@/app/assets/icons/prisma-seeklogo.svg";


export default function SkillSetSection(): React.ReactElement {

    const sectionRef: React.RefObject<HTMLElement | null> = React.useRef<HTMLElement | null>(null);

    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "start 50%"]
    })

    const headingUnderlineScaleX: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springOptions);

    interface Skills {
        name: string;
        description: string;
        image: StaticImageData;
    }

    return (
        <React.Fragment>
            <section
                className={`flex min-h-screen w-screen bg-white relative`}
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
                    {/*// let border: string = index % 2 ? "border-[0.5px] border-l-0" : "border-[0.5px]";*/}
                    {/*<div key={index} className={`aspect-square border-black ${border}`}></div>*/}

                    <SkillCell
                        text={"Next Js"}
                        imageContent={
                            <Image src={NextJSImage} alt="Next Js"/>
                        }
                    />

                    <SkillCell
                        text={"Next Js"}
                        imageContent={
                            <Image src={ReactJSImage} alt="Next Js"/>
                        }
                    />

                    <SkillCell
                        text={"Next Js"}
                        imageContent={
                            <Image src={FramerMotionImage} alt="Next Js" className={`scale-40`}/>
                        }
                    />

                    <SkillCell
                        text={"Next Js"}
                        imageContent={
                            <Image src={NextJSImage} alt="Next Js"/>
                        }
                    />

                    <SkillCell
                        text={"Next Js"}
                        imageContent={
                            <Image src={NextJSImage} alt="Next Js"/>
                        }
                    />

                    <SkillCell
                        text={"Next Js"}
                        imageContent={
                            <Image src={NextJSImage} alt="Next Js"/>
                        }
                    />

                    <SkillCell
                        text={"Next Js"}
                        imageContent={
                            <Image src={NextJSImage} alt="Next Js"/>
                        }
                    />

                    <SkillCell
                        text={"Next Js"}
                        imageContent={
                            <Image src={NextJSImage} alt="Next Js"/>
                        }
                    />

                    <SkillCell
                        text={"Next Js"}
                        imageContent={
                            <Image src={NextJSImage} alt="Next Js"/>
                        }
                    />

                    <SkillCell
                        text={"Next Js"}
                        imageContent={
                            <Image src={NextJSImage} alt="Next Js"/>
                        }
                    />

                    <SkillCell
                        text={"Next Js"}
                        imageContent={
                            <Image src={NextJSImage} alt="Next Js"/>
                        }
                    />
                </div>
            </section>
        </React.Fragment>
    )
}


interface SkillCellInterface {
    text: string;
    imageContent: React.ReactElement;
}

function SkillCell({text, imageContent}: SkillCellInterface): React.ReactElement {

    const [isHovered, setHovered] = React.useState<boolean>(false);
    return (
        <motion.div
            layout
            onMouseEnter={() => {
                setHovered(true);
            }}
            onMouseLeave={() => {
                setHovered(false);
            }}
            animate={{
                x: isHovered ? -100 : 0
            }}
            className={'aspect-square relative border-black border-1 flex flex-col items-center justify-center overflow-hidden'}>
            <motion.div
                layout
                className={`w-full h-[80%]`}>
                <motion.div
                    layout
                    animate={{rotate: isHovered ? 360 : 0, scale: isHovered ? 1.1 : 1}}
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
                        className={`w-full h-[20%] absolute bottom-0 left-0 uppercase flex justify-start items-end text-[2rem] !p-[1rem] geist font-light`}>
                        {text}
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    )
}