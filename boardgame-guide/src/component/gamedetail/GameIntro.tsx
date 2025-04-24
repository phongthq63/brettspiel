import {ArrowDropDownRounded, StarBorderRounded, StarRateRounded} from "@mui/icons-material";
import {useState, useEffect, useRef} from "react";
import {Button, Tooltip} from "@heroui/react";

export default function GameIntro() {
    const [isFavoriteGame, setIsFavoriteGame] = useState<boolean>(false);
    const [isFullIntroGame, setIsFullIntroGame] = useState<boolean>(false);
    const [isFullRules, setIsFullRules] = useState<boolean>(false);
    const [rules] = useState<{ title: string, language: string, flag: string }[]>([
        { title: "Rules", language: "English", flag: "🇺🇸" },
        { title: "Reglas (unofficial)", language: "Spanish", flag: "🇪🇸" },
        { title: "Regole (unofficial)", language: "Italia", flag: "🇮🇹" },
        { title: "Règles (unofficial)", language: "French", flag: "🇫🇷" },
        { title: "Regeln (unofficial)", language: "Russian", flag: "🇩🇪" }
    ]);
    const introRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (introRef.current) {
            const lineHeight = parseFloat(getComputedStyle(introRef.current).lineHeight);
            const maxHeight = lineHeight * 5; // 5 lines
            setIsFullIntroGame(introRef.current.scrollHeight < maxHeight);
        }
    }, []);

    return (
        <div className="flex flex-col gap-10 p-8">
            <div>
                <div className="flex justify-between mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold">Calico</h1>
                    {isFavoriteGame ? (
                        <Tooltip content={"Remove from Bookmarks"}>
                            <Button
                                className="bg-transparent"
                                isIconOnly
                                onPress={() => setIsFavoriteGame(false)}
                            >
                                <StarRateRounded className="text-yellow-300" fontSize="large" />
                            </Button>

                        </Tooltip>
                    ) : (
                        <Tooltip content={"Add to Bookmarks"}>
                            <Button
                                className="bg-transparent"
                                isIconOnly
                                onPress={() => setIsFavoriteGame(true)}
                            >
                                <StarBorderRounded fontSize="large" />
                            </Button>
                        </Tooltip>
                    )}
                </div>
                <div className="mb-4">
                    <p
                        ref={introRef}
                        className={`font-medium ${!isFullIntroGame ? 'line-clamp-5' : ''}`}
                    >
                        Symbiose is a tactical and clever collection game. Expand your personal pond from the river to
                        create
                        maximum synergy between your different cards and those of your neighbors! Who will create the
                        most
                        beautiful symbiosis? In this turn-based game, your goal is to strategically place your cards to
                        maximize your overall score. But be aware, each card score depending of its placement: on the
                        left,
                        you score depending on your left neighbor ; on the right, depending of your right neighbor and
                        in
                        the center depending of your own cards. Choose wisely!
                    </p>
                </div>
                {!isFullIntroGame && (
                    <div className="flex justify-end">
                        <h3 className="text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none cursor-pointer"
                            onClick={() => setIsFullIntroGame(true)}
                        >
                            Read more
                            <ArrowDropDownRounded/>
                        </h3>
                    </div>
                )}
            </div>
            <div>
                <div className="mb-3">
                    <h1 className="text-xl md:text-2xl font-bold">Rules</h1>
                </div>
                <div className="flex flex-col mb-4">
                    {rules.slice(0, isFullRules ? rules.length : 3).map((rule, index) => (
                        <div key={index}
                             className="flex gap-2">
                            {rule.flag}
                            <Tooltip
                                placement="top-start"
                                content={rule.language}
                            >
                                <p className="w-fit font-medium text-blue-500 hover:underline cursor-pointer">
                                    {rule.title}
                                </p>
                            </Tooltip>
                        </div>
                    ))}
                </div>
                {!isFullRules && (
                    <div className="flex justify-end">
                        <h3 className="text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none cursor-pointer"
                            onClick={() => setIsFullRules(true)}
                        >
                            Show more
                            <ArrowDropDownRounded/>
                        </h3>
                    </div>
                )}
            </div>
        </div>
    )
}