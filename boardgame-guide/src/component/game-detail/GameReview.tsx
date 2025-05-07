import {ImageGallery} from "@/component/ui/ImageGallery";
import GameVideo, {Platform} from "@/component/ui/GameVideo";
import React from "react";


interface GameReviewProps {
    images: string[];
    videos?: {
        id: string;
        title?: string;
        videoId: string;
        platform: Platform;
        thumbnail?: string;
        videoUrl?: string;
    }[];
}

export default function GameReview({images, videos}: GameReviewProps) {
    return (
        <div className="px-8">
            <div className="mb-4">
                <ImageGallery images={images} />
            </div>
            <div className="flex flex-col justify-center items-center gap-6">
                {videos?.map((video) => (
                    <GameVideo
                        key={video.id}
                        id={video.id}
                        title={video.title}
                        videoId={video.videoId}
                        platform={video.platform}
                        thumbnail={video.thumbnail}
                        videoUrl={video.videoUrl}
                    />
                ))}
            </div>
        </div>
    )
}