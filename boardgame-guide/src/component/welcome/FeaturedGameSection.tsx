import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button, Chip } from "@heroui/react";
import { AccessTime, ArrowForwardOutlined, PeopleAltOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import {FeaturedGameDTO, WelcomeService} from "@/service/game.service";

export default function FeaturedGameSection() {
    const router = useRouter();
    const { t } = useTranslation();
    const [games, setGames] = useState<FeaturedGameDTO[]>([]);


    useEffect(() => {
        WelcomeService.getListFeatureGame()
            .then((response) => {
                if (response.code === 0 && response.data) {
                    setGames(response.data);
                } else {
                    console.error("Failed to fetch featured games:", response);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch featured games:", error);
            });
    }, []);

    const handlerPlayGame = () => {
        router.push("/");
    };

    return (
        <section id="games" className="py-20 bg-gray-50 bg-[rgba(249,250,251,0.1)]">
            <div className="container mx-auto px-4">
                <header className="flex justify-between items-center mb-12">
                    <motion.h2
                        className="font-bold text-3xl md:text-4xl"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        {t("section.featuredBoardgames.title")}
                    </motion.h2>
                    <motion.a
                        href="/"
                        className="flex items-center gap-1 bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text font-medium text-transparent"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        aria-label="See all featured games"
                    >
                        {t("section.featuredBoardgames.seeAll")}
                        <ArrowForwardOutlined className="text-blue-500" />
                    </motion.a>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {games.map((game, index) => (
                        <GameCard
                            key={game.id}
                            id={game.id ?? ''}
                            title={game.title ?? ''}
                            description={game.description ?? ''}
                            image={game.image_url ?? ''}
                            minPlayTime={game.min_play_time ?? 30}
                            maxPlayTime={game.max_play_time ?? 30}
                            minPlayers={game.min_players ?? 1}
                            maxPlayers={game.max_players ?? 1}
                            popular={game.popular}
                            hot={game.hot}
                            topRated={game.top_rated}
                            delay={(index + 1) * 0.1}
                            onClickPlay={() => handlerPlayGame()}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface GameCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    minPlayTime: number;
    maxPlayTime: number;
    minPlayers: number;
    maxPlayers: number;
    popular?: boolean;
    hot?: boolean;
    topRated?: boolean;
    delay: number;
    onClickPlay: () => void;
}

function GameCard({ title, description, image, minPlayTime, maxPlayTime, minPlayers, maxPlayers, popular, hot, topRated, delay, onClickPlay }: GameCardProps) {
    const { t } = useTranslation();

    return (
        <motion.article
            className="transition-all duration-300 bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
        >
            <Card className="h-full hover:transition hover:shadow-xl hover:-translate-y-2">
                <CardBody>
                    <div className="mb-6">
                        <div className="relative w-full h-56 rounded-lg overflow-hidden">
                            <Image alt={`Image of ${title}`} src={image} fill sizes="100%"/>
                            <div className="absolute top-2 left-2 flex gap-2">
                                {popular && (
                                    <Chip
                                        className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded"
                                        size="sm"
                                    >
                                        {t('popular')}
                                    </Chip>
                                )}
                                {hot && (
                                    <Chip
                                        className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
                                        size="sm"
                                    >
                                        {t('hot')}
                                    </Chip>
                                )}
                                {topRated && (
                                    <Chip
                                        className="bg-yellow-300 text-white text-xs font-bold px-2 py-1 rounded"
                                        size="sm"
                                    >
                                        {t('topRated')}
                                    </Chip>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl mb-2">{title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{description}</p>
                    </div>
                </CardBody>
                <CardFooter className="flex flex-col">
                    <div className="w-full flex justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-1">
                            <AccessTime/>
                            <span>
                                {minPlayers === maxPlayers
                                    ? `${minPlayers} ${t('players')}`
                                    : `${minPlayers}-${maxPlayers} ${t("players")}`
                                }
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <PeopleAltOutlined/>
                            <span>
                                {minPlayTime === maxPlayTime
                                    ? `${minPlayTime} ${t('minutes')}`
                                    : `${minPlayTime}-${maxPlayTime} ${t("minutes")}`
                                }
                            </span>
                        </div>
                    </div>
                    <Button
                        className="w-full bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] font-medium text-white"
                        style={{
                            backgroundImage: "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)"
                        }}
                        onPress={onClickPlay}
                        aria-label={t("playNow")}
                    >
                        {t("playNow")}
                    </Button>
                </CardFooter>
            </Card>
        </motion.article>
    );
}
