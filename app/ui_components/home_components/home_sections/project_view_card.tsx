import React from "react";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import Image, {StaticImageData} from "next/image";
import {MouseHoverStateOptions, useMouseHoverState} from "@/app/stores/mouse_store";
import {useHomePageState} from "@/app/stores/homepage_store";
import ImageDistort from "@/app/effects/ImageDistort";

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
    const imageRef: React.RefObject<HTMLDivElement | null> = React.useRef(null);

    const {scrollYProgress: firstProjectScrollProgress} = useScroll({
        target: firstProjectRef,
        offset: ["start end", "start 50%"]
    });

    const {scrollYProgress: imageScrollProgress} = useScroll({
        target: imageRef,
        offset: ["start end", "end start"]
    });


    const projectImagesScaleAnimation = {
        firstProjectImage: useSpring(useTransform(firstProjectScrollProgress, [0, 1], [900, 0]), springOptions),
        firstProjectSecondImage: useSpring(useTransform(firstProjectScrollProgress, [0.5, 1], [0, 1]), springOptions),
    };

    const imageTransform = useTransform(imageScrollProgress, [0, 1], [100, -150]);

    const {setPageChanging} = useHomePageState();
    return (
        <div
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


            <div
                onMouseEnter={() => {
                    toggleFor(MouseHoverStateOptions.Link)
                }}
                onMouseLeave={() => {
                    toggleFor(MouseHoverStateOptions.Link)
                }}
                onClick={() => {
                    if (!link) return;
                    setPageChanging(true);
                    setTimeout(() => {
                        window.location.assign(link);
                    }, 2200);
                }}
                className={`flex-1 h-full relative`}>

                {/*MARK: Image container*/}
                <motion.div
                    ref={imageRef}
                    className={`h-[85%] aspect-[16/9] relative`}>

                    {image && (
                        <motion.div className={"relative h-[600px]"} style={{y: imageTransform}}>
                            <ImageDistort
                                grid={10}
                                imageSrc={image.src}
                            />
                        </motion.div>
                    )}

                    {/*MARK: Icon container*/}
                    <motion.div
                        style={{
                            scale: projectImagesScaleAnimation.firstProjectSecondImage,
                            background: iconBackground
                        }}
                        className={`h-[10rem] aspect-square flex justify-center items-center rounded-full absolute bottom-0 translate-y-1/3 -translate-x-1/3`}>

                        {icon && (
                            <motion.div>
                                <Image src={icon} alt={""}/>
                            </motion.div>
                        )}
                    </motion.div>


                </motion.div>


            </div>
        </div>
    )
}