import Image from "next/image";
import React, {memo, useEffect, useMemo, useState} from "react";
import {useUser} from "@/store/user.context";
import {CardData, NobleData} from "@/games/splendor/types/game";
import {Avatar, Card} from "@heroui/react";
import {CardBody, CardHeader} from "@heroui/card";
import {useGameStore} from "@/games/splendor/store/game.store";
import {useShallow} from "zustand/react/shallow";


interface PlayerInfoCardProps {
    playerId: string;
}

const PlayerInfoCard = ({ playerId }: PlayerInfoCardProps) => {
    const {user} = useUser();
    const players = useGameStore(useShallow((state) => state.players));
    const player = players[playerId];
    const [playerName, setPlayerName] = useState(player?.name ?? "Player");
    const [playerAvatar, setPlayerAvatar] = useState(player?.avatar ?? "");
    const [score, setScore] = useState(0);
    const [cardDiamond, setCardDiamond] = useState(0);
    const [diamond, setDiamond] = useState(0);
    const [cardSapphire, setCardSapphire] = useState(0);
    const [sapphire, setSapphire] = useState(0);
    const [cardEmerald, setCardEmerald] = useState(0);
    const [emerald, setEmerald] = useState(0);
    const [cardRuby, setCardRuby] = useState(0);
    const [ruby, setRuby] = useState(0);
    const [cardOnyx, setCardOnyx] = useState(0);
    const [onyx, setOnyx] = useState(0);
    const [gold, setGold] = useState(0);
    const [reserveCards, setReserveCards] = useState<CardData[]>([]);
    const [nobles, setNobles] = useState<NobleData[]>([]);



    const imageCardReserveUrl = useMemo(() => (card: CardData) => {
        if (user?.id == playerId) {
            return card.url
        } else {
            return card.urlBack
        }
    }, [playerId, user])


    useEffect(() => {
        if (!player) return

        setPlayerName(player.name)
        setPlayerAvatar(player.avatar)
        setScore(player.score)
        setCardDiamond(player.cards.diamond.length)
        setDiamond(player.gems.diamond.length)
        setCardSapphire(player.cards.sapphire.length)
        setSapphire(player.gems.sapphire.length)
        setCardEmerald(player.cards.emerald.length)
        setEmerald(player.gems.emerald.length)
        setCardRuby(player.cards.ruby.length)
        setRuby(player.gems.ruby.length)
        setCardOnyx(player.cards.onyx.length)
        setOnyx(player.gems.onyx.length)
        setGold(player.gems.gold.length)
        setReserveCards(player.reserveCards)
        setNobles(player.nobles)
    }, [player])

    
    return (
        <Card
            className="bg-stone-400"
        >
            <CardHeader className="flex justify-between gap-4 p-2">
                <Avatar
                    radius="sm"
                    src={playerAvatar}
                    name={playerName}
                />
                <div className="grow">
                    <h4 className="italic">{playerName}</h4>
                </div>
                <div className="min-w-10 aspect-square flex justify-center items-center bg-amber-800 border-4 border-yellow-400 rounded-full">
                    <p className="text-2xl text-yellow-400 italic font-bold">{score}</p>
                </div>
            </CardHeader>
            <CardBody className="gap-3 p-2">
                <div className="flex flex-row">
                    <div className="flex-auto grid grid-cols-5 gap-1 max-w-48">
                        <div className="relative">
                            <div className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-gray-200 overflow-hidden">
                                {cardDiamond > 0 && (
                                    <div
                                        className="block absolute bottom-1 left-1 rounded-md bg-white border border-white shadow pl-0.5 pr-1">
                                        <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{cardDiamond}</p>
                                    </div>
                                )}
                                {diamond > 0 && (
                                    <div className="absolute top-0.5 right-0.5">
                                        <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{diamond}</p>
                                    </div>
                                )}
                            </div>
                            <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                                <Image
                                    src="/game/splendor/gem/diamond.png"
                                    alt="Diamond gem"
                                    fill
                                    sizes={"100%"}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div
                                className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-blue-800 overflow-hidden">
                                {cardSapphire > 0 && (
                                    <div
                                        className="block absolute bottom-1 left-1 rounded-md bg-blue-600 border border-white shadow pl-0.5 pr-1">
                                        <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{cardSapphire}</p>
                                    </div>
                                )}
                                {sapphire > 0 && (
                                    <div className="absolute top-0.5 right-0.5">
                                        <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{sapphire}</p>
                                    </div>
                                )}
                            </div>
                            <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                                <Image
                                    src="/game/splendor/gem/sapphire.png"
                                    alt="Sapphire gem"
                                    fill
                                    sizes={"100%"}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div
                                className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-green-800 overflow-hidden">
                                {cardEmerald > 0 && (
                                    <div
                                        className="block absolute bottom-1 left-1 rounded-md bg-green-600 border border-white shadow pl-0.5 pr-1">
                                        <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{cardEmerald}</p>
                                    </div>
                                )}
                                {emerald > 0 && (
                                    <div className="absolute top-0.5 right-0.5">
                                        <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{emerald}</p>
                                    </div>
                                )}
                            </div>
                            <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                                <Image
                                    src="/game/splendor/gem/emerald.png"
                                    alt="Emerald gem"
                                    fill
                                    sizes={"100%"}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div
                                className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-red-800 overflow-hidden">
                                {cardRuby > 0 && (
                                    <div
                                        className="block absolute bottom-1 left-1 rounded-md bg-red-600 border border-white shadow pl-0.5 pr-1">
                                        <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{cardRuby}</p>
                                    </div>
                                )}
                                {ruby > 0 && (
                                    <div className="absolute top-0.5 right-0.5">
                                        <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ruby}</p>
                                    </div>
                                )}
                            </div>
                            <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                                <Image
                                    src="/game/splendor/gem/ruby.png"
                                    alt="Ruby gem"
                                    fill
                                    sizes={"100%"}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div
                                className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-gray-800 overflow-hidden">
                                {cardOnyx > 0 && (
                                    <div
                                        className="block absolute bottom-1 left-1 rounded-md bg-gray-600 border border-white shadow pl-0.5 pr-1">
                                        <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{cardOnyx}</p>
                                    </div>
                                )}
                                {onyx > 0 && (
                                    <div className="absolute top-0.5 right-0.5">
                                        <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{onyx}</p>
                                    </div>
                                )}
                            </div>
                            <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                                <Image
                                    src="/game/splendor/gem/onyx.png"
                                    alt="Onyx gem"
                                    fill
                                    sizes={"100%"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex items-center mx-5">
                        <p className="text-3xl text-yellow-300 italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{gold}</p>
                        <div className="absolute w-5 h-4 -bottom-2 -right-2">
                            <Image
                                src="/game/splendor/gem/gold.png"
                                alt="Gold"
                                fill
                                sizes={"100%"}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-start space-x-1 md:space-x-0">
                    <div className="flex justify-start space-x-1 md:basis-1/2">
                        {reserveCards.map(reserve_card => (
                            <div key={reserve_card.id} className="relative w-7 h-10 rounded overflow-hidden">
                                <Image
                                    src={imageCardReserveUrl(reserve_card)}
                                    alt="Reserve card"
                                    fill
                                    sizes={"100%"}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-start md:basis-1/2">
                        {nobles.map(noble => (
                            <div
                                key={noble.id}
                                className="relative w-8 h-8 flex-none m-0.5 rounded overflow-hidden"
                            >
                                <Image
                                    src={noble.url}
                                    alt="NobleData"
                                    fill
                                    sizes={"100%"}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default memo(PlayerInfoCard)