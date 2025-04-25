import Image from "next/image";
import {useTranslation} from "react-i18next";
import { motion } from "framer-motion";
import {Button} from "@heroui/react";
import {useRouter} from "next/navigation";

const HeroSection = () => {
    const router = useRouter()
    const { t } = useTranslation()


    const onClickPlay = () => {
        router.push('/')
    }

    return (
        <section className="min-h-screen flex items-center bg-[rgba(156,252,248,0.1)]" aria-label="Hero Section">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row items-center">
                    <motion.div
                        className="w-full md:w-1/2 mb-10 md:mb-0"
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                    >
                        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                            {t("section.hero.title1")}
                            <br/>
                            <span
                                className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-transparent">
                                {t("section.hero.title2")}
                            </span>
                            <br/>
                            {t("section.hero.title3")}
                        </h1>
                        <p className="text-gray-700 text-lg mb-8 max-w-lg">
                            {t("section.hero.description")}
                        </p>
                        <Button
                            className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] px-8 py-7 text-lg font-medium text-white shadow-lg transition-all hover:shadow-xl hover:shadow-blue-300/50 hover:-translate-y-1"
                            style={{
                                backgroundImage: "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)",
                                transition: "all 0.3s"
                            }}
                            onPress={onClickPlay}
                            aria-label="Play Now"
                        >
                            {t("playNow")}
                        </Button>
                    </motion.div>
                    <motion.div
                        className="w-full md:w-1/2 flex justify-center md:justify-end"
                        initial={{opacity: 0, x: 50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5, delay: 0.2}}
                    >
                        <div className="relative w-full h-96 max-h-[30vh] sm:max-h-full shadow-[0_20px_25px_5px_rgba(0,0,0,0.4)]">
                            <Image src="/photo-1496449903678-68ddcb189a24.jpg"
                                   alt="People playing board games"
                                   fill
                                   sizes="100%"
                                   priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection