import GameBanner from "@/component/gamedetail/GameBanner";
import GameInfo from "@/component/gamedetail/GameInfo";
import GameIntro from "@/component/gamedetail/GameIntro";
import GamePlay from "@/component/gamedetail/GamePlay";
import GamePreview from "@/component/gamedetail/GamePreview";

interface GameContainerProps {
    id: string
}

export default function GameContainer({id}: GameContainerProps) {
    return (
        <div>
            <GameBanner
                game={{
                    id: 3,
                    title: "Codenames",
                    description: "Give one-word clues to help your team identify secret agents.",
                    imageUrl: "/photo-1496449903678-68ddcb189a24.jpg",
                    minPlayers: 4,
                    maxPlayers: 8,
                    minPlayTime: 15,
                    maxPlayTime: 30,
                    rating: 47,
                    isHot: false,
                    isPopular: false,
                    isTopRated: false,
                    genres: ["Party", "Word Game"]
                }}/>

            <div className="grid grid-cols-7 grid-rows-5">
                <div className="col-span-7 lg:col-span-2 lg:row-span-5">
                    <GameInfo game={{
                        id: 3,
                        title: "Codenames",
                        description: "Give one-word clues to help your team identify secret agents.",
                        imageUrl: "/photo-1496449903678-68ddcb189a24.jpg",
                        minPlayers: 4,
                        maxPlayers: 8,
                        minPlayTime: 15,
                        maxPlayTime: 30,
                        rating: 47,
                        isHot: false,
                        isPopular: false,
                        isTopRated: false,
                        genres: ["Party", "Word Game"]
                    }}/>
                </div>
                <div className="col-span-7 lg:col-span-3 lg:row-span-5 lg:col-start-3">
                    <GameIntro />
                </div>
                <div className="col-span-7 lg:col-span-2 lg:col-start-6">
                    <GamePlay />
                </div>
                <div className="col-span-7 lg:col-span-2 lg:row-span-4 lg:col-start-6 lg:row-start-2">
                    <GamePreview />
                </div>
            </div>
        </div>
    )
}