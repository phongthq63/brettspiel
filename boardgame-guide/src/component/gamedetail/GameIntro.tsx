import {ArrowDropDownRounded, StarBorderRounded, StarRateRounded} from "@mui/icons-material";
import {useState, useEffect, useRef} from "react";
import {Button, Tooltip} from "@heroui/react";
import Image from "next/image";

interface GameIntroProps {
    name: string;
    description: string;
    isFavorite?: boolean;
    rules: {
        name: string;
        language: string;
        image_icon_url: string;
        document_url: string;
    }[]
}

export default function GameIntro({ name, description, isFavorite, rules }: GameIntroProps) {
    const [isFavoriteGame, setIsFavoriteGame] = useState<boolean>(isFavorite ?? false);
    const [isFullIntroGame, setIsFullIntroGame] = useState<boolean>(true);
    const [isFullRules, setIsFullRules] = useState<boolean>(true);
    const introRef = useRef<HTMLDivElement>(null);
    const sizeVisibleRules = 3
    const visibleRules = isFullRules ? rules : rules.slice(0, sizeVisibleRules);


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
                    <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
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
                        {description}
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
                    {visibleRules.map((rule, index) => (
                        <div key={index}
                             className="flex gap-2">
                            <Image
                                src={rule.image_icon_url}
                                alt={rule.name}
                                width={24}
                                height={24}
                            />
                            <Tooltip
                                placement="top-start"
                                content={rule.language}
                            >
                                <p className="w-fit font-medium text-blue-500 hover:underline cursor-pointer">
                                    {rule.name}
                                </p>
                            </Tooltip>
                        </div>
                    ))}
                </div>
                {sizeVisibleRules < rules.length && !isFullRules && (
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