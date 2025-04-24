import GameVideo from "@/component/gamedetail/GameVideo";

export default function GamePreview() {
    return (
        <div className="flex flex-col justify-center items-center gap-6 p-4">
            <GameVideo video={{
                id: "",
                title: "How to play",
                videoId: "VHAK-gU9gi0",
                platform: "youtube",
                thumbnail: "/photo-1611996575749-79a3a250f948.jpg",
            }} />
            <GameVideo video={{
                id: "",
                title: "How to play",
                videoId: "VHAK-gU9gi0",
                platform: "youtube",
                thumbnail: "/photo-1611996575749-79a3a250f948.jpg",
            }} />
            <GameVideo video={{
                id: "",
                title: "How to play",
                videoId: "VHAK-gU9gi0",
                platform: "youtube",
                thumbnail: "/photo-1611996575749-79a3a250f948.jpg",
            }} />
        </div>
    )
}