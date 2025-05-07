import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import Image from "next/image";
import {Globe, LaptopMinimal, PcCase, Smartphone, Tablet} from "lucide-react";

export default function FeaturesSection() {
    const { t } = useTranslation()

    return (
        <section id="features" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    viewport={{once: true}}
                >
                    <h2 className="font-bold text-3xl md:text-4xl mb-4">{t("section.features.title")}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{t("section.features.subtitle")}</p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-center gap-8">
                        {/* Desktop Device */}
                        <motion.div
                            className="relative border-8 border-gray-800 rounded-xl overflow-hidden shadow-xl w-full md:w-2/3 lg:w-1/2 h-80"
                            initial={{opacity: 0, x: 50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5, delay: 0.1}}
                        >
                            <div className="relative  h-full bg-gray-200">
                                <Image src="/photo-1611996575749-79a3a250f948.jpg"
                                       alt="Board game displayed on a desktop screen"
                                       fill
                                       sizes={"100%"}
                                />
                            </div>
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <span className="text-white font-medium">Windows & MacOS</span>
                            </div>
                        </motion.div>

                        {/* Mobile Devices */}
                        <div className="w-full md:w-fit flex justify-center items-end gap-4">
                            {/* Tablet */}
                            <motion.div
                                className="relative border-8 border-gray-800 rounded-xl overflow-hidden shadow-xl w-48 h-64"
                                initial={{opacity: 0, x: 50}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.5, delay: 0.2}}
                            >
                                <div className="relative h-full bg-gray-200 ">
                                    <Image src="/photo-1611996575749-79a3a250f948.jpg"
                                           alt="Board game displayed on a tablet screen"
                                           fill
                                           sizes={"100%"}
                                    />
                                </div>
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                    <span className="text-white text-xs font-medium">Tablet</span>
                                </div>
                            </motion.div>

                            {/* Phone */}
                            <motion.div
                                className="relative border-8 border-gray-800 rounded-xl overflow-hidden shadow-xl w-20 h-36"
                                initial={{opacity: 0, x: 50}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.5, delay: 0.3}}
                            >
                                <div className="relative h-full bg-gray-200 ">
                                    <Image src="/photo-1611996575749-79a3a250f948.jpg"
                                           alt="Board game displayed on a mobile phone screen"
                                           fill
                                           sizes={"100%"}
                                    />
                                </div>
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
                                    <span className="text-white text-xs font-medium">Mobile</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Platform labels */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                    >
                        <div className="flex justify-center gap-4 md:gap-10 mt-8">
                            <div className="flex flex-col justify-center items-center">
                                <LaptopMinimal />
                                <p className="text-sm font-medium mt-2">{t('section.features.desktop')}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Tablet />
                                <p className="text-sm font-medium mt-2">{t('section.features.tablet')}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Smartphone />
                                <p className="text-sm font-medium mt-2">{t('section.features.mobile')}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Globe />
                                <p className="text-sm font-medium mt-2">{t('section.features.browser')}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
