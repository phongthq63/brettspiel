"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@heroui/modal";

interface BuyMeCoffeeProps {
    qrValue?: string;
    username?: string;
}

export const BuyMeCoffee = ({
                                qrValue = "https://buymeacoffee.com/username",
                            }: BuyMeCoffeeProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isHovered, setIsHovered] = useState(false);

    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.1 } }
    }

    return (
        <div className="relative z-10">
            <motion.button
                className="flex items-center justify-center px-5 py-3 bg-[#FFDD00] text-[#6F4E37] rounded-full font-semibold shadow-lg hover:shadow-xl focus:outline-none"
                onClick={onOpen}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <CoffeeCup hover={isHovered} />
                <span>Buy me a coffee</span>
            </motion.button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>
                                <div className="flex flex-col">
                                    <div className="text-lg font-bold text-[#6F4E37] flex items-center">
                                        <span>Buy me a coffee</span>
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        Support my work by buying me a coffee!
                                    </div>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col items-center">
                                    <div
                                        className="bg-gradient-to-br from-[#FFDD00] to-[#FFB800] p-4 rounded-lg mb-5 shadow-md">
                                        <div className="bg-white p-2 rounded">
                                            <AnimatePresence>
                                                <motion.div
                                                    initial={{opacity: 0, scale: 0.8}}
                                                    animate={{opacity: 1, scale: 1}}
                                                    exit={{opacity: 0, scale: 0.8}}
                                                    transition={{type: "spring", stiffness: 260, damping: 20}}
                                                >
                                                    {/*<QRCode*/}
                                                    {/*    size={200}*/}
                                                    {/*    style={{width: "100%", height: "auto"}}*/}
                                                    {/*    value={qrValue}*/}
                                                    {/*    viewBox={`0 0 256 256`}*/}
                                                    {/*    fgColor="#5D4037"*/}
                                                    {/*/>*/}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <p className="text-center text-gray-700 mb-4 max-w-sm">
                                        Scan this QR code with your phone camera to buy me a coffee. Your support helps
                                        me create more content!
                                    </p>

                                    <div className="text-center text-sm text-gray-500 p-2 bg-gray-50 rounded-md w-full">
                                        Or visit: <span
                                        className="font-medium text-[#8B5A2B]">{qrValue}</span>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

// SVG Coffee Cup Component
const CoffeeCup = ({hover}: {hover: boolean}) => {

    const liquidVariants = {
        initial: { height: '0%', opacity: 0 },
        hover: {
            height: '70%',
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    // const Bubble = ({
    //                     left,
    //                     size = "w-1.5 h-1.5",
    //                     y = [-10, -18],
    //                     x = [-1, 1, -1],
    //                     opacity = [0, 0.6, 0],
    //                     delay = 0,
    //                     duration = 1.8,
    //                 }) => (
    //     <motion.div
    //         className={`absolute -top-3 left-[${left}rem] ${size} bg-white/40 rounded-full blur-[1px]`}
    //         initial={{ opacity: 0, y: 0 }}
    //         animate={{
    //             opacity,
    //             y: [0, ...y],
    //             x,
    //         }}
    //         transition={{
    //             repeat: Infinity,
    //             duration,
    //             ease: "easeOut",
    //             repeatType: "loop",
    //             delay,
    //         }}
    //     />
    // );

    return (
        <div className="relative w-6 h-6 mr-2">
            {/* Cup */}
            <div className="absolute bottom-0 w-5 h-4 bg-white rounded-b-lg border-2 border-[#6F4E37]"></div>

            {/* Handle */}
            <div className="absolute right-0 top-1 w-2 h-2.5 border-2 border-l-0 border-[#6F4E37] rounded-r-full"></div>

            {/* Liquid */}
            <motion.div
                className="absolute bottom-0 w-4 mx-0.5 bg-[#A67C52] rounded-b-md"
                variants={liquidVariants}
                initial="initial"
                animate={hover ? "hover" : "initial"}
            ></motion.div>

            {/* Steam */}
            {true && (
                <>
                    <motion.div
                        className="absolute -top-3 left-0 w-1.5 h-1.5 bg-white/40 rounded-full blur-[1px]"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            y: [0, -10, -18],
                            x: [-1, 1, -1]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.8,
                            ease: "easeOut",
                            repeatType: "loop"
                        }}
                    ></motion.div>
                    <motion.div
                        className="absolute -top-3 left-2 w-1.5 h-1.5 bg-white/40 rounded-full blur-[1px]"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            y: [0, -12, -20],
                            x: [1, -1, 1]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeOut",
                            repeatType: "loop",
                            delay: 0.5
                        }}
                    ></motion.div>
                    <motion.div
                        className="absolute -top-3 left-1 w-1 h-1 bg-white/40 rounded-full blur-[1px]"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                            opacity: [0, 0.7, 0],
                            y: [0, -15, -22],
                            x: [0, 2, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeOut",
                            repeatType: "loop",
                            delay: 0.8
                        }}
                    ></motion.div>
                </>
            )}
        </div>
    )
}