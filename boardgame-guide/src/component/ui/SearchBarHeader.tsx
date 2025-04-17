import {AccessTime, PeopleAltOutlined, Search} from "@mui/icons-material";
import {Chip, Input} from "@heroui/react";
import { useState, useEffect } from "react";
import {Card, CardBody} from "@heroui/card";
import {useTranslation} from "react-i18next";
import Image from "next/image";

export default function SearchBarHeader() {
    const [isInputClicked, setIsInputClicked] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);


    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            const updateHeaderHeight = () => {
                const height = header.offsetHeight;
                setHeaderHeight(height);
            };

            // Đo lần đầu
            updateHeaderHeight();

            // Đo lại khi window resize
            window.addEventListener('resize', updateHeaderHeight);

            return () => {
                window.removeEventListener('resize', updateHeaderHeight);
            };
        }
    }, []);

    const handleSearch = () => {
    }


    const game = {
        id: 2,
        title: "Ticket to Ride",
        description: "Cross North America by train, connecting iconic cities and completing tickets.",
        imageUrl: "/photo-1496449903678-68ddcb189a24.jpg",
        minPlayers: 2,
        maxPlayers: 5,
        minPlayTime: 30,
        maxPlayTime: 60,
        rating: 47,
        isHot: false,
        isPopular: true,
        isTopRated: false,
        genres: ["Family", "Route Building"]
    }

    return (
        <div className="relative">
            <Input variant="flat"
                   classNames={{
                       input: [
                           "font-semibold",
                       ],
                       inputWrapper: [
                           "bg-gradient-to-r from-[rgba(156,252,248,0.3)] to-[rgba(110,123,251,0.3)]",
                           "shadow-[inset_0_2px_4px_0px_rgba(0,0,0,0.4)]",
                           "hover:!bg-transparent",
                           "transition-colors duration-300",
                       ],
                   }}
                   placeholder="Type to search..."
                   radius="lg"
                   endContent={<Search onClick={handleSearch}/>}
                   onFocus={() => setIsInputClicked(true)}
                   // onBlur={() => setIsInputClicked(false)}
            />
            {isInputClicked && (
                <div className="fixed left-0 w-full flex flex-col gap-8 bg-black/[.7] pt-10 px-28"
                     style={{
                         top: `${headerHeight}px`,
                         height: `calc(100vh - ${headerHeight}px)`
                     }}
                >
                    <div>
                        <div className="my-6">
                            <h3 className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-2xl md:text-3xl lg:text-4xl font-bold text-transparent">Game</h3>
                        </div>
                        <div className="flex flex-wrap gap-10">
                            <GameCard game={game} />
                            <GameCard game={game} />
                            <GameCard game={game} />
                            <GameCard game={game} />
                        </div>
                    </div>
                    <div className="w-full h-10 bg-blue-400">

                    </div>
                </div>
            )}
        </div>
    )
}

interface GameCardProps {
    game: any;
}

function GameCard({ game }: GameCardProps) {
    const { t } = useTranslation();

    return (
        <Card className="w-72 hover:transform hover:-translate-y-2 hover:shadow-xl">
            <CardBody className="relative p-0">
                <div className="relative w-full h-36">
                    <Image src={game.imageUrl}
                           alt={game.title}
                           fill
                           sizes={"100%"}
                    />
                </div>
                <div className="p-3">
                    <div className="flex justify-between items-start">
                        <h3 className="text-base font-semibold text-gray-800 mb-1">{game.title}</h3>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-2">{game.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {game.genres.map((genre: any, index: number) => (
                            <Chip key={index}
                                  size="sm"
                                  className="px-2 py-1 text-xs font-medium">
                                {genre}
                            </Chip>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                            <PeopleAltOutlined fontSize="small" />
                            <h6 className="ml-1">
                                {game.minPlayers === game.maxPlayers
                                ? `${game.minPlayers} ${t('gameCard.players')}`
                                : `${game.minPlayers}-${game.maxPlayers} ${"players"}`
                                }
                            </h6>

                        </div>
                        <div className="flex items-center">
                            <AccessTime fontSize="small" />
                            <h6 className="ml-1">
                                {game.minPlayTime === game.maxPlayTime
                                    ? `${game.minPlayTime} ${t('gameCard.minutes')}`
                                    : `${game.minPlayTime}-${game.maxPlayTime} ${"minutes"}`
                                }
                            </h6>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}