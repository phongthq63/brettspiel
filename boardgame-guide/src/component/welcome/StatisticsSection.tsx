import { useTranslation } from "react-i18next";
import {motion} from "framer-motion";
import { useInView } from "framer-motion";
import {useRef} from "react";
import AnimateNumber from "@/component/ui/AnimateNumber";


const StatisticsSection = () => {
    const { t } = useTranslation()

    const stats = [
        { value: 250000, label: t("section.statistics.players"), delay: 0.1 },
        { value: 500, label: t("section.statistics.games"), delay: 0.2 },
        { value: 10000, label: t("section.statistics.matches"), delay: 0.3 },
    ]

    return (
        <section id="stats" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-bold text-3xl md:text-4xl mb-4">{t("section.statistics.title")}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{t("section.statistics.subtitle")}</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            value={stat.value}
                            label={stat.label}
                            delay={stat.delay}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

interface StatItemProps {
    value: number
    label: string
    delay: number
}

function StatItem({ value, label, delay }: StatItemProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            ref={ref}
        >
            <div className="font-bold text-5xl mb-2 bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-transparent">
                {isInView ? (
                    <AnimateNumber value={value}/>
                ) : 0}
            </div>
            <p className="text-gray-600 font-medium">{label}</p>
        </motion.div>
    )
}

export default StatisticsSection
