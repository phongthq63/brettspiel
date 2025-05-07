import {useTranslation} from "react-i18next";
import {Card, CardBody, CardFooter} from "@heroui/card";
import Image from "next/image";
import {Chip} from "@heroui/react";
import {Clock, Star, Users} from "lucide-react";

interface GameCardProps {
    id: string;
    title: string;
    description: string;
    image_url: string;
    genres?: string[];
    min_players: number;
    max_players: number;
    min_play_time: number;
    max_play_time: number;
}

export function GameCard({
                      title,
                      description,
                      image_url,
                      genres,
                      min_players,
                      max_players,
                      min_play_time,
                      max_play_time,
                  }: GameCardProps) {
    const { t } = useTranslation();

    return (
        <Card className="hover:transform hover:-translate-y-2 hover:shadow-xl">
            <CardBody className="p-0">
                <div className="relative w-full h-48">
                    <Image src={image_url}
                           alt={title || "Game Image"}
                           fill
                           sizes={"100%"}
                    />
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
                        <div className="flex items-center">
                            <Star size="18px" className="text-yellow-300 fill-current" />
                            <span className="ml-1 text-sm font-medium text-gray-700">
                                {(3 / 10).toFixed(1)}
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {genres?.map((genre, index) => (
                            <Chip key={index} className="px-2 py-1 text-xs font-medium">
                                {genre}
                            </Chip>
                        ))}
                    </div>
                </div>
            </CardBody>
            <CardFooter>
                <div className="w-full flex justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <Users />
                        {min_players === max_players
                            ? `${min_players} ${t('players')}`
                            : `${min_players}-${max_players} ${t('players')}`
                        }
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock />
                        {min_play_time === max_play_time
                            ? `${min_play_time} ${t('minutes')}`
                            : `${min_play_time}-${max_play_time} ${t('minutes')}`
                        }
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}