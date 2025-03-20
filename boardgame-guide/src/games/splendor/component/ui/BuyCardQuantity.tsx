import QuantitySelector from "@/games/splendor/component/ui/QuantitySelector";
import Image from "next/image";
import React from "react";


interface BuyCardQuantityProps {
    cost: {
        gold?: number
        diamond?: number
        sapphire?: number
        emerald?: number
        ruby?: number
        onyx?: number
    }
    base: {
        diamond?: number
        sapphire?: number
        emerald?: number
        ruby?: number
        onyx?: number
    }
    gold?: number
}

const BuyCardQuantity = ({cost, base, gold} : BuyCardQuantityProps) => {

    const initValue = (cost: number, base: number) => {
        if (base > 0) {
            return cost - base > 0 ? cost - base : 0
        } else {
            return cost
        }
    }

    const minValue = (cost: number, base: number, gold: number) => {
        if (gold > 0) {
            return cost - base - gold > 0 ? cost - base - gold : 0
        } else {
            return cost - base > 0 ? cost - base : 0
        }
    }

    const maxValue = (cost: number) => {
        return cost
    }


    return (
        <div className="flex justify-center space-x-2 mb-6">
            {gold != undefined && gold > 0 && (
                <div className="flex flex-col items-center w-10">
                    <QuantitySelector initValue={cost.gold}
                                      max={gold}
                                      min={cost.gold}/>
                    <div className="relative w-6 h-6">
                        <Image src="/game/splendor/gem/gold.png" alt="Diamond gem" fill sizes={"100%"}/>
                    </div>
                </div>
            )}
            {cost.diamond && (
                <div className="flex flex-col items-center w-10">
                    <QuantitySelector initValue={initValue(cost.diamond, base.diamond || 0)}
                                      max={maxValue(cost.diamond)}
                                      min={minValue(cost.diamond, base.diamond || 0, gold || 0)}/>
                    <div className="relative w-6 h-6">
                        <Image src="/game/splendor/gem/diamond.png" alt="Diamond gem" fill sizes={"100%"}/>
                    </div>
                </div>
            )}
            {cost.sapphire && (
                <div className="flex flex-col items-center w-10">
                    <QuantitySelector initValue={initValue(cost.sapphire, base.sapphire || 0)}
                                      max={maxValue(cost.sapphire)}
                                      min={minValue(cost.sapphire, base.sapphire || 0, gold || 0)}/>
                    <div className="relative w-6 h-6">
                        <Image src="/game/splendor/gem/sapphire.png" alt="Diamond gem" fill sizes={"100%"}/>
                    </div>
                </div>
            )}
            {cost.emerald && (
                <div className="flex flex-col items-center w-10">
                    <QuantitySelector initValue={initValue(cost.emerald, base.emerald || 0)}
                                      max={maxValue(cost.emerald)}
                                      min={minValue(cost.emerald, base.emerald || 0, gold || 0)}/>
                    <div className="relative w-6 h-6">
                        <Image src="/game/splendor/gem/emerald.png" alt="Diamond gem" fill sizes={"100%"}/>
                    </div>
                </div>
            )}
            {cost.ruby && (
                <div className="flex flex-col items-center w-10">
                    <QuantitySelector initValue={initValue(cost.ruby, base.ruby || 0)}
                                      max={maxValue(cost.ruby)}
                                      min={minValue(cost.ruby, base.ruby || 0, gold || 0)}/>
                    <div className="relative w-6 h-6">
                        <Image src="/game/splendor/gem/ruby.png" alt="Diamond gem" fill sizes={"100%"}/>
                    </div>
                </div>
            )}
            {cost.onyx && (
                <div className="flex flex-col items-center w-10">
                    <QuantitySelector initValue={initValue(cost.onyx, base.onyx || 0)}
                                      max={maxValue(cost.onyx)}
                                      min={minValue(cost.onyx, base.onyx || 0, gold || 0)}/>
                    <div className="relative w-6 h-6">
                        <Image src="/game/splendor/gem/onyx.png" alt="Diamond gem" fill sizes={"100%"}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BuyCardQuantity