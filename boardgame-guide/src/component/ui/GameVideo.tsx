"use client";

import Image from "next/image";
import {useEffect, useState } from "react";
import {Card, CardBody} from "@heroui/card";
import {Modal, ModalBody, ModalContent, useDisclosure} from "@heroui/modal";
import {Button, Spinner} from "@heroui/react";
import {CircleAlert, CirclePlay, X} from "lucide-react";


export type Platform = "youtube" | "iframe" | "local";

const thumbnailHandlers = {
    youtube: (videoId: string) => {
        return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    },
    iframe: (_videoId: string, thumbnailUrl?: string) => {
        return thumbnailUrl || "";
    },
    local: (_videoId: string, thumbnailUrl?: string) => {
        return thumbnailUrl || "";
    }
}

const videoHandlers = {
    youtube: (videoId: string) => {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    },
    iframe: (_videoId: string, videoUrl?: string) => {
        return videoUrl || "";
    },
    local: (_videoId: string, videoUrl?: string) => {
        return videoUrl || "";
    }
};

interface VideoCardProps {
    id: string;
    title?: string;
    videoId: string;
    platform: Platform;
    thumbnailUrl?: string;
    videoUrl?: string;
}

const GameVideo = ({ id, title, videoId, platform, thumbnailUrl, videoUrl }: VideoCardProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [imageError, setImageError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const videoSrc = videoHandlers[platform]?.(videoId, videoUrl) ?? ""
    const thumbnailSrc = thumbnailHandlers[platform]?.(videoId, thumbnailUrl) ?? ""
    const isDirectVideo = platform === "local"


    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            setError(null);
        }
    }, [id, isOpen])

    const handleImageError = () => {
        setImageError(true)
    }

    const handleMediaLoad = () => {
        setLoading(false)
    };

    const handleMediaError = () => {
        setLoading(false)
        setError("Failed to load video. Please try again later.")
    };

    return (
        <>
            <Card
                className="w-full aspect-video"
                isPressable
                onPress={onOpen}
            >
                {(imageError || !thumbnailSrc) ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">URL not available</span>
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        <Image
                            alt={title ?? ""}
                            src={thumbnailSrc}
                            onError={handleImageError}
                            fill
                            sizes={"100%"}
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <CirclePlay className="text-white" fontSize="large"/>
                        </div>
                    </div>

                )}

                <CardBody className="absolute bg-black/[.6]">
                    <h3 className="text-sm font-medium text-white truncate">{title}</h3>
                </CardBody>
            </Card>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="5xl"
                placement="center"
                hideCloseButton
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            {/* Custom Close Button */}
                            <ModalBody className="bg-black px-0">
                                <div className="flex justify-between items-center px-4">
                                    <h3 className="text-[rgba(156,252,248,1)] font-semibold text-2xl">
                                        {title}
                                    </h3>
                                    <Button
                                        className="bg-transparent"
                                        onPress={onClose}
                                        isIconOnly
                                    >
                                        <X size="20px" className="text-[rgba(156,252,248,1)]" />
                                    </Button>
                                </div>
                                <div className="relative w-full aspect-video overflow-hidden bg-gray-900">
                                    {loading && (
                                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                            <div className="flex flex-col items-center">
                                                <Spinner />
                                                <span className="mt-2 text-white">Loading video...</span>
                                            </div>
                                        </div>
                                    )}
                                    {error && (
                                        <div
                                            className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                            <div className="text-center">
                                                <CircleAlert color="error"/>
                                                <p className="mt-2 text-white">{error}</p>
                                            </div>
                                        </div>
                                    )}

                                    {isDirectVideo ? (
                                        <video
                                            src={videoSrc}
                                            className="absolute top-0 left-0 w-full h-full"
                                            controls
                                            autoPlay
                                            onLoadedData={handleMediaLoad}
                                            onError={handleMediaError}
                                        />
                                    ) : (
                                        <iframe
                                            src={videoSrc}
                                            className="absolute top-0 left-0 w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            onLoad={handleMediaLoad}
                                            onError={handleMediaError}
                                        ></iframe>
                                    )}
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default GameVideo
