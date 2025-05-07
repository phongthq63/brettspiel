"use client";

import {Button} from "@heroui/react";
import React from "react";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";


interface GamePlayProps {
    play_url?: string
    tutorial_url?: string
}

export default function GamePlay({play_url, tutorial_url}: GamePlayProps) {
    const router = useRouter();
    const { t } = useTranslation();

    const handleClickPlayNow = () => {

    };

    const handleClickTutorial = () => {
        router.push(tutorial_url || "/404");
    };

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <Button
                className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-border text-white w-64 h-20 text-3xl font-semibold uppercase"
                onPress={handleClickPlayNow}
            >
                {t("playNow")}
            </Button>
            <Button
                className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-border text-white w-64 h-20 text-3xl font-semibold uppercase"
                onPress={handleClickTutorial}
            >
                {t("tutorial")}
            </Button>
        </div>
    )
}