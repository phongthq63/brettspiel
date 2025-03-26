import Image from "next/image";
import React, {memo, useMemo} from "react";
import {useUser} from "@/store/user";
import {Card, Noble} from "@/games/splendor/types/game";


interface PlayerGameInfoProps {
    id: string
    data: {
        id: string
        name: string
        avatar: string
        score: number
        nobles: Noble[]
        reserveCards: Card[]
        cardDiamond: number
        cardSapphire: number
        cardEmerald: number
        cardRuby: number
        cardOnyx: number
        gold: number
        diamond: number
        sapphire: number
        emerald: number
        ruby: number
        onyx: number
    }
}

const PlayerGameInfo = ({ id, data }: PlayerGameInfoProps) => {
    const {user} = useUser()


    const imageCardReserveUrl = useMemo(() => (card: Card) => {
        if (user?.user_id == id) {
            return card.url
        }
        
        switch (card.level) {
            case 1:
                return '/game/splendor/card/1/card1-back.jpg'
            case 2:
                return '/game/splendor/card/2/card2-back.jpg'
            case 3:
                return '/game/splendor/card/3/card3-back.jpg'
            default:
                throw new Error(`Level ${card.level} not supported`)
        }
    }, [id, user])

    
    return (
        <div className="basis-1/2 md:basis-auto md:shrink p-2 bg-stone-400 rounded-3xl md:rounded-l-3xl">
            <div className="flex flex-wrap justify-between items-start space-y-1">
                <div
                    className="relative shrink w-8 h-8 rounded-lg drop-shadow-lg overflow-hidden">
                    <Image src="/game/splendor/card/3/card3-back.jpg"
                           alt="Avatar player"
                           fill
                           sizes={"100%"}
                           priority/>
                </div>
                <div>
                    <h4 className="italic font-medium">{data.name}</h4>
                </div>
                <div></div>
                <div
                    className="self-end w-10 h-10 flex justify-center items-center bg-amber-800 border-4 border-yellow-400 rounded-full overflow-hidden">
                    <p className="text-3xl text-yellow-400 italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ data.score }</p>
                </div>
            </div>
            <div className="relative flex flex-col space-y-3 my-2">
                <div className="flex flex-row">
                    <div className="flex-auto grid grid-cols-5 gap-1 max-w-48">
                        <div className="relative">
                            <div className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-gray-200 overflow-hidden">
                                {data.cardDiamond > 0 && (
                                    <div
                                        className="block absolute bottom-1 left-1 rounded-md bg-white border border-white shadow pl-0.5 pr-1">
                                        <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{data.cardDiamond}</p>
                                    </div>
                                )}
                                {data.diamond > 0 && (
                                    <div className="absolute top-0.5 right-0.5">
                                        <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{data.diamond}</p>
                                    </div>
                                )}
                            </div>
                            <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                                <Image src="/game/splendor/gem/diamond.png" alt="Diamond gem" fill sizes={"100%"}/>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-blue-800 overflow-hidden">
                                {data.cardSapphire > 0 && (
                                    <div className="block absolute bottom-1 left-1 rounded-md bg-blue-600 border border-white shadow pl-0.5 pr-1">
                                        <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{data.cardSapphire}</p>
                                    </div>
                                )}
                                {data.sapphire > 0 && (
                                    <div className="absolute top-0.5 right-0.5">
                                        <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{data.sapphire}</p>
                                    </div>
                                )}
                            </div>
                            <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                                <Image src="/game/splendor/gem/sapphire.png" alt="Sapphire gem" fill sizes={"100%"}/>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-green-800 overflow-hidden">
                                {data.cardEmerald > 0 && (
                                    <div className="block absolute bottom-1 left-1 rounded-md bg-green-600 border border-white shadow pl-0.5 pr-1">
                                        <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{data.cardEmerald}</p>
                                    </div>
                                )}
                                {data.emerald > 0 && (
                                    <div className="absolute top-0.5 right-0.5">
                                        <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{data.emerald}</p>
                                    </div>
                                )}
                            </div>
                            <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                                <Image src="/game/splendor/gem/emerald.png" alt="Emerald gem" fill sizes={"100%"}/>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-red-800 overflow-hidden">
                                {data.cardRuby > 0 && (
                                    <div className="block absolute bottom-1 left-1 rounded-md bg-red-600 border border-white shadow pl-0.5 pr-1">
                                        <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{data.cardRuby}</p>
                                    </div>
                                )}
                                {data.ruby > 0 && (
                                    <div className="absolute top-0.5 right-0.5">
                                        <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{data.ruby}</p>
                                    </div>
                                )}
                            </div>
                            <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                                <Image src="/game/splendor/gem/ruby.png" alt="Ruby gem" fill sizes={"100%"}/>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-gray-800 overflow-hidden">
                                {data.cardOnyx > 0 && (
                                    <div className="block absolute bottom-1 left-1 rounded-md bg-gray-600 border border-white shadow pl-0.5 pr-1">
                                        <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{data.cardOnyx}</p>
                                    </div>
                                )}
                                {data.onyx > 0 && (
                                    <div className="absolute top-0.5 right-0.5">
                                        <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{data.onyx}</p>
                                    </div>
                                )}
                            </div>
                            <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                                <Image src="/game/splendor/gem/onyx.png" alt="Onyx gem" fill sizes={"100%"}/>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex items-center mx-5">
                        <p className="text-3xl text-yellow-300 italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ data.gold }</p>
                        <div className="absolute w-5 h-4 -bottom-2 -right-2">
                            <Image src="/game/splendor/gem/gold.png" alt="Gold" fill sizes={"100%"}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-start space-x-1 md:space-x-0">
                    <div className="flex justify-start space-x-1 md:basis-1/2">
                        {data.reserveCards.map(reserve_card => (
                            <div key={reserve_card.id} className="relative w-7 h-10 rounded overflow-hidden">
                                <Image src={imageCardReserveUrl(reserve_card)} alt="Reserve card" fill sizes={"100%"}/>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-start md:basis-1/2">
                        {data.nobles.map(noble => (
                            <div key={noble.id} className="relative w-8 h-8 flex-none m-0.5 rounded overflow-hidden">
                                <Image src={noble.url} alt="Noble" fill sizes={"100%"}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(PlayerGameInfo)