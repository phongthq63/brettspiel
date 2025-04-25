import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {Card, CardBody, CardFooter} from "@heroui/card";
import {Button, Chip} from "@heroui/react";
import {AccessTime, ArrowForwardOutlined, PeopleAltOutlined} from "@mui/icons-material";
import Image from "next/image";
import {useRouter} from "next/navigation";


export default function FeaturedGameSection(){
    const router = useRouter()
    const { t } = useTranslation()

    const games = [
        {
            title: t("games.catan.title"),
            description: t("games.catan.description"),
            duration: t("games.catan.duration"),
            players: t("games.catan.players"),
            image: "/photo-1496449903678-68ddcb189a24.jpg",
            badge: t("popular"),
            delay: 0.1
        },
        {
            title: t("games.ticketToRide.title"),
            description: t("games.ticketToRide.description"),
            duration: t("games.ticketToRide.duration"),
            players: t("games.ticketToRide.players"),
            image: "/photo-1496449903678-68ddcb189a24.jpg",
            badge: t("featured"),
            delay: 0.2
        },
        {
            title: t("games.pandemic.title"),
            description: t("games.pandemic.description"),
            duration: t("games.pandemic.duration"),
            players: t("games.pandemic.players"),
            image: "/photo-1496449903678-68ddcb189a24.jpg",
            badge: t("new"),
            delay: 0.3
        }
    ]

    const handlerPlayGame = () => {
        router.push('/')
    }

    return (
        <section id="games" className="py-20 bg-gray-50 bg-[rgba(249,250,251,0.1)]">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <motion.h2
                        className="font-bold text-3xl md:text-4xl"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        {t("section.featuredGame.title")}
                    </motion.h2>
                    <motion.a
                        href="/"
                        className="flex items-center gap-1 bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text font-medium text-transparent"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        {t("section.featuredGame.seeAll")}
                        <ArrowForwardOutlined className="text-blue-500" />
                    </motion.a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {games.map((game, index) => (
                        <GameCard
                            key={index}
                            title={game.title}
                            description={game.description}
                            duration={game.duration}
                            players={game.players}
                            image={game.image}
                            badge={game.badge}
                            delay={game.delay}
                            onClickPlay={handlerPlayGame}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

interface GameCardProps {
    title: string
    description: string
    duration: string
    players: string
    image: string
    badge: string
    delay: number
    onClickPlay: () => void
}

function GameCard({ title, description, duration, players, image, badge, delay, onClickPlay }: GameCardProps) {
    const { t } = useTranslation()

    return (
        <motion.div
            className="transition-all duration-300 bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
        >
            <Card className="h-full hover:transition hover:shadow-xl">
                <CardBody>
                    <div className="mb-6">
                        <div className="relative w-full h-56 rounded-lg overflow-hidden">
                            <Image alt={"Card image"} src={image} fill sizes={"100%"}/>
                        </div>
                        <Chip className="absolute top-4 right-4 px-2 py-1"
                              size="sm"
                        >
                            {badge}
                        </Chip>
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl mb-2">{title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{description}</p>
                    </div>
                </CardBody>
                <CardFooter className="flex flex-col">
                    <div className="w-full flex justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-1">
                            <AccessTime />
                            <span>{duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <PeopleAltOutlined />
                            <span>{players}</span>
                        </div>
                    </div>
                    <Button
                        className="w-full bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] font-medium text-white"
                        style={{
                            backgroundImage: "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)"
                        }}
                        onPress={onClickPlay}
                    >
                        {t("playNow")}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
