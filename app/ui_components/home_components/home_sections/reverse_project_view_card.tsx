import React from "react";
import {motion, useSpring, useTransform, useScroll} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import {ApplicationLinearGradient} from "@/app/constants/ui_constants";

export default function ReverseProjectViewCards(): React.ReactElement {


    const firstProjectRef: React.RefObject<HTMLDivElement | null> = React.useRef(null);
    const {scrollYProgress: firstProjectScrollProgress} = useScroll({
        target: firstProjectRef,
        offset: ["start end", "start 50%"]
    });


    const projectImagesScaleAnimation = {
        firstProjectImage: useSpring(useTransform(firstProjectScrollProgress, [0, 1], [-900, 0]), springOptions),
        firstProjectSecondImage: useSpring(useTransform(firstProjectScrollProgress, [0, 1], [0, 1]), springOptions),
    };
    return (
        <div ref={firstProjectRef}
             className={`w-full !px-[7rem] h-[35rem] flex justify-between items-center !mt-[15rem]`}>


            {/*MARK: Image view*/}
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
                            background: ApplicationLinearGradient.current.appBackground,
                        }}
                        className={`h-[10rem] aspect-square rounded-full absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3`}>

                    </motion.div>


                </motion.div>


            </div>




            {/*MARK: Content View*/}
            <div className={`flex-1 h-full flex flex-col items-end`}>
                <h1 className={`font-bold text-[3rem] uppercase oswald`}>Sweat It Fitness</h1>

                <p className={`text-[1.5rem] w-[80%] geist text-justify !mt-[3rem]`}>
                    Our fitness app helps you stay healthy with personalized workouts, diet plans, and progress
                    tracking. It offers AI-powered recommendations, AR-based form correction, and syncs with
                    wearables. Whether you’re a beginner or advanced, the app adapts to your needs and keeps you
                    motivated every step of the way.
                </p>

            </div>
        </div>
    )
}