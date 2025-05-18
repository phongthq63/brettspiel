"use client";

import Image from "next/image";
import { Tooltip } from "@heroui/react";
import React, { useState } from "react";
import { useGameDetail } from "@/store/game-detail.context";

export function GameRule() {
    const { data } = useGameDetail();
    const [isFullRules, setIsFullRules] = useState<boolean>(true);
    const sizeVisibleRules = 3;

    const rules = data?.rules ?? [];
    const visibleRules = isFullRules ? rules : rules.slice(0, sizeVisibleRules);

    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">Rules</h2>
            <div className="flex flex-col gap-3">
                {visibleRules.map((rule, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="relative w-6 h-4">
                            {rule.language_icon_url && (
                                <Image
                                    src={rule.language_icon_url}
                                    alt={"Language Icon"}
                                    fill
                                    sizes="100%"
                                />
                            )}
                        </div>
                        <Tooltip placement="top-start" content={rule.language}>
                            <p className="w-fit text-sm text-blue-500 cursor-pointer">
                                {rule.name}
                            </p>
                        </Tooltip>
                    </div>
                ))}
            </div>
            {sizeVisibleRules < rules.length && !isFullRules && (
                <div className="flex justify-end">
                    <div
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none cursor-pointer"
                        onClick={() => setIsFullRules(true)}
                    >
                        Show more
                    </div>
                </div>
            )}
        </div>
    );
}
