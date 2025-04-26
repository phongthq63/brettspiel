import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimateNumber from "@/component/ui/AnimateNumber";
import { WelcomeService } from "@/service/game.service";

const StatisticsSection = () => {
    const { t } = useTranslation();
    const visitorRef = useRef(null);
    const playingPlayerRef = useRef(null);
    const playingGameRef = useRef(null);
    const gameRef = useRef(null);
    const isInViewVisitor = useInView(visitorRef, { once: true });
    const isInViewPlayingPlayer = useInView(playingPlayerRef, { once: true });
    const isInViewPlayingGame = useInView(playingGameRef, { once: true });
    const isInViewGame = useInView(gameRef, { once: true });

    const [statistics, setStatistics] = useState({
        visit_count: 0,
        current_playing_player_count: 0,
        current_playing_game_count: 0,
        game_count: 0,
    });

    useEffect(() => {
        WelcomeService.getStatistics()
            .then((response) => {
                if (response.code === 0 && response.data) {
                    setStatistics({
                        visit_count: parseInt(response.data.visit_count || "0"),
                        current_playing_player_count: parseInt(response.data.current_playing_player_count || "0"),
                        current_playing_game_count: parseInt(response.data.current_playing_game_count || "0"),
                        game_count: response.data.game_count || 0,
                    });
                } else {
                    console.error("Failed to fetch statistics:", response);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch statistics:", error);
            });
    }, []);

    return (
        <section id="stats" className="py-20 bg-white" aria-labelledby="stats-title">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 id="stats-title" className="font-bold text-3xl md:text-4xl mb-4">
                        {t("section.statistics.title")}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{t("section.statistics.subtitle")}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <motion.div
                        className="p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        ref={visitorRef}
                        aria-label={t("section.statistics.visitor")}
                    >
                        <div className="font-bold text-5xl mb-2 bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-transparent">
                            {isInViewVisitor ? <AnimateNumber value={statistics.visit_count} /> : 0}
                        </div>
                        <p className="text-gray-600 font-medium">{t("section.statistics.visitor")}</p>
                    </motion.div>
                    <motion.div
                        className="p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        ref={playingPlayerRef}
                        aria-label={t("section.statistics.playingPlayer")}
                    >
                        <div className="font-bold text-5xl mb-2 bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-transparent">
                            {isInViewPlayingPlayer ? <AnimateNumber value={statistics.current_playing_player_count} /> : 0}
                        </div>
                        <p className="text-gray-600 font-medium">{t("section.statistics.playingPlayer")}</p>
                    </motion.div>
                    <motion.div
                        className="p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        ref={playingGameRef}
                        aria-label={t("section.statistics.playingGame")}
                    >
                        <div className="font-bold text-5xl mb-2 bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-transparent">
                            {isInViewPlayingGame ? <AnimateNumber value={statistics.current_playing_game_count} /> : 0}
                        </div>
                        <p className="text-gray-600 font-medium">{t("section.statistics.playingGame")}</p>
                    </motion.div>
                    <motion.div
                        className="p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        ref={gameRef}
                        aria-label={t("section.statistics.games")}
                    >
                        <div className="font-bold text-5xl mb-2 bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-transparent">
                            {isInViewGame ? <AnimateNumber value={statistics.game_count} /> : 0}
                        </div>
                        <p className="text-gray-600 font-medium">{t("section.statistics.games")}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default StatisticsSection;
