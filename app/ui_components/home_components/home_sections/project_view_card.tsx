import React from "react";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import {StaticImageData} from "next/image";
import {MouseHoverStateOptions, useMouseHoverState} from "@/app/stores/mouse_store";

interface ProjectViewCardProps {
    heading: string;
    body: string;
    image?: StaticImageData;
    icon?: StaticImageData;
    iconBackground: string;
    link?: string;
}

export default function ProjectViewCards({
                                             heading,
                                             body,
                                             image,
                                             icon,
                                             iconBackground,
                                             link
                                         }: ProjectViewCardProps): React.ReactElement {
    const {toggleFor} = useMouseHoverState();

    const firstProjectRef: React.RefObject<HTMLDivElement | null> = React.useRef(null);
    const {scrollYProgress: firstProjectScrollProgress} = useScroll({
        target: firstProjectRef,
        offset: ["start end", "start 50%"]
    });


    const projectImagesScaleAnimation = {
        firstProjectImage: useSpring(useTransform(firstProjectScrollProgress, [0, 1], [900, 0]), springOptions),
        firstProjectSecondImage: useSpring(useTransform(firstProjectScrollProgress, [0.5, 1], [0, 1]), springOptions),
    };
    return (
        <div
            onMouseEnter={() => {
                toggleFor(MouseHoverStateOptions.Link)
            }}
            onMouseLeave={() => {
                toggleFor(MouseHoverStateOptions.Link)
            }}
            onClick={() => {
                window.open(link, '_blank');
            }}
            ref={firstProjectRef}
            className={`w-full !px-[7rem] h-[35rem] flex justify-between items-center !mt-[15rem]`}>
            <div className={`flex-1 h-full flex flex-col`}>
                <h1 className={`font-bold text-[3rem] uppercase oswald`}>
                    {heading}
                </h1>


                <p className={`text-[1.5rem] geist w-[80%] text-justify !mt-[3rem]`}>
                    {body}
                </p>

            </div>


            <div className={`flex-1 h-full relative`}>

                {/*MARK: Image container*/}
                <motion.div
                    style={{
                        x: projectImagesScaleAnimation.firstProjectImage
                    }}
                    className={`h-[85%] aspect-[16/9] relative bg-gray-700`}>


                    {/*MARK: Icon container*/}
                    <motion.div
                        style={{
                            scale: projectImagesScaleAnimation.firstProjectSecondImage,
                            background: iconBackground
                        }}
                        className={`h-[10rem] aspect-square rounded-full absolute bottom-0 translate-y-1/3 -translate-x-1/3`}>

                    </motion.div>


                </motion.div>


            </div>
        </div>
    )
}