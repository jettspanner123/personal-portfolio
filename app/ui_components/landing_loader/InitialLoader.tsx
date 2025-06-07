"use client";
import React from "react";
import {motion} from "framer-motion";
import {clearInterval} from "node:timers";

export default function InitialLoader(): React.JSX.Element {

    const [isTransitioning, setTransitioning] = React.useState<boolean>(false);

    React.useEffect((): void => {
        setTimeout((): void => {
            setTransitioning(true);
        }, 1500);
    })
    return (
        <React.Fragment>
            <main className={`h-screen w-screen fixed top-0 left-0 flex`}>
                {
                    [0.10, 0, 0.05, 0.15, 0.2].map((item: number, index: number): React.ReactElement => {
                        return (
                            <motion.div
                                animate={{y: isTransitioning ? "-110vh" : "0vh"}}
                                transition={{
                                    duration: 1,
                                    delay: item,
                                    ease: [0.85, 0, 0.15, 1]
                                }}
                                key={index}
                                className={`h-screen flex-1 bg-white`}>

                                {index === 2 && (
                                    <div
                                        className={`text-black alumni-sans-sc-400 w-full h-full flex justify-center items-center`}>
                                    </div>
                                )}
                            </motion.div>
                        )
                    })
                }
            </main>
        </React.Fragment>
    )
}