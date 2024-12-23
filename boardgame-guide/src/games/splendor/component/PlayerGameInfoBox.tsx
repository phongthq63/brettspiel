import Image from "next/image";
import React from "react";
import {useUser} from "@/store/user";

interface IPlayerGameInfoBox {
    score?: number
    diamond?: number
    sapphire?: number
    emerald?: number
    ruby?: number
    onyx?: number
    card_diamond?: number
    card_sapphire?: number
    card_emerald?: number
    card_ruby?: number
    card_onyx?: number
    gold?: number
    reserve_cards?: IReserveCardPlayerGameInfoBox[]
    nobles?: INoblePlayerGameInfoBox[]
}

interface IReserveCardPlayerGameInfoBox {
    id?: string;
    level?: number;
}

interface INoblePlayerGameInfoBox {
    id?: string;
}

export function PlayerGameInfoBox({ playerId, playerGameData }: { playerId: string, playerGameData: IPlayerGameInfoBox }) {
    const { user } = useUser()

    return (
        <div className="relative basis-1/2 md:basis-auto md:shrink p-2 bg-stone-400 rounded-3xl md:rounded-l-3xl">
        <div className="flex flex-wrap justify-between items-start space-y-1">
            <div
                className="relative shrink w-8 h-8 rounded-lg drop-shadow-lg overflow-hidden">
                <Image src="/test.jpg" alt="Avatar player" fill/>
            </div>
            <div>
                <h4 className="italic font-medium">Quách Thanh Phong</h4>
            </div>
            <div></div>
            <div
                className="self-end w-10 h-10 flex justify-center items-center bg-amber-800 border-4 border-yellow-400 rounded-full overflow-hidden">
                <p className="text-3xl text-yellow-400 italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ playerGameData.score ?? 0 }</p>
            </div>
        </div>
        <div className="relative flex flex-col space-y-3 my-2">
            <div className="flex flex-row">
                <div className="flex-auto grid grid-cols-5 gap-1 max-w-48">
                    <div className="relative">
                        <div
                            className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-gray-200 overflow-hidden">
                            <div
                                className="block absolute bottom-1 left-1 rounded-md bg-white border border-white shadow pl-0.5 pr-1">
                                <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ playerGameData.card_diamond ?? 0 }</p>
                            </div>
                            <div className="absolute top-0.5 right-0.5">
                                <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ playerGameData.diamond ?? 0 }</p>
                            </div>
                        </div>
                        <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                            <Image src="/game/splendor/gem/diamond.png" alt="Diamond gem"
                                   fill/>
                        </div>
                    </div>
                    <div className="relative">
                        <div
                            className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-blue-800 overflow-hidden">
                            <div
                                className="block absolute bottom-1 left-1 rounded-md bg-blue-600 border border-white shadow pl-0.5 pr-1">
                                <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ playerGameData.card_sapphire ?? 0 }</p>
                            </div>
                            <div className="absolute top-0.5 right-0.5">
                                <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ playerGameData.sapphire ?? 0 }</p>
                            </div>
                        </div>
                        <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                            <Image src="/game/splendor/gem/sapphire.png" alt="Sapphire gem"
                                   fill/>
                        </div>
                    </div>
                    <div className="relative">
                        <div
                            className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-green-800 overflow-hidden">
                            <div
                                className="block absolute bottom-1 left-1 rounded-md bg-green-600 border border-white shadow pl-0.5 pr-1">
                                <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ playerGameData.card_emerald ?? 0 }</p>
                            </div>
                            <div className="absolute top-0.5 right-0.5">
                                <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ playerGameData.emerald ?? 0 }</p>
                            </div>
                        </div>
                        <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                            <Image src="/game/splendor/gem/emerald.png" alt="Emerald gem" fill/>
                        </div>
                    </div>
                    <div className="relative">
                        <div
                            className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-red-800 overflow-hidden">
                            <div
                                className="block absolute bottom-1 left-1 rounded-md bg-red-600 border border-white shadow pl-0.5 pr-1">
                                <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ playerGameData.card_ruby ?? 0 }</p>
                            </div>
                            <div className="absolute top-0.5 right-0.5">
                                <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ playerGameData.ruby ?? 0 }</p>
                            </div>
                        </div>
                        <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                            <Image src="/game/splendor/gem/ruby.png" alt="Ruby gem" fill/>
                        </div>
                    </div>
                    <div className="relative">
                        <div
                            className="relative h-12 rounded-lg shadow-[inset_0_3px_4px_rgba(0,0,0,0.6)] bg-gray-800 overflow-hidden">
                            <div
                                className="block absolute bottom-1 left-1 rounded-md bg-gray-600 border border-white shadow pl-0.5 pr-1">
                                <p className="text-base text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ playerGameData.card_onyx ?? 0 }</p>
                            </div>
                            <div className="absolute top-0.5 right-0.5">
                                <p className="text-xl text-white italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ playerGameData.onyx ?? 0 }</p>
                            </div>
                        </div>
                        <div className="absolute w-5 h-4 -bottom-2 -right-1.5">
                            <Image src="/game/splendor/gem/onyx.png" alt="Onyx gem" fill/>
                        </div>
                    </div>
                </div>
                <div className="relative flex items-center mx-5">
                    <p className="text-3xl text-yellow-300 italic font-bold drop-shadow-[0_0px_1px_rgba(0,0,0,1)]">{ playerGameData.gold ?? 0 }</p>
                    <div className="absolute w-5 h-4 -bottom-2 -right-2">
                        <Image src="/game/splendor/gem/gold.png" alt="Gold" fill/>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-start space-x-1 md:space-x-0">
                <div className="flex justify-start space-x-1 md:basis-1/2">
                    {
                        playerGameData?.reserve_cards?.map(reserve_card => {
                            const imageFrontUrl = `/game/splendor/card/${reserve_card.level}/${reserve_card.id}.jpg`
                            const imageBackUrl = `/game/splendor/card/${reserve_card.level}/card${reserve_card.level}-back.jpg`
                            return (
                                <div key={reserve_card.id} className="relative w-7 h-10 rounded overflow-hidden">
                                    <Image src={user.user_id == playerId ? imageFrontUrl : imageBackUrl} alt="Reserve card" fill/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex flex-wrap justify-start md:basis-1/2">
                    {
                        playerGameData?.nobles?.map(noble => {
                            return (
                                <div key={noble.id} className="relative w-8 h-8 flex-none m-0.5 rounded overflow-hidden">
                                    <Image src={`/game/splendor/noble/${noble.id}.jpg`} alt="Noble" fill/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
    )
}