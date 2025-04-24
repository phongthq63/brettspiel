import Image from "next/image";
import {useEffect, useState } from "react";
import {Card, CardBody} from "@heroui/card";
import {CloseRounded, InfoOutlined, PlayCircle} from "@mui/icons-material";
import {Modal, ModalBody, ModalContent, useDisclosure} from "@heroui/modal";
import {Button, Spinner} from "@heroui/react";


const videoHandlers = {
    youtube: (videoId: string) => {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    },
    vimeo: (videoId: string) => {
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    },
    iframe: (_videoId: string, videoUrl?: string) => {
        return videoUrl || "";
    },
    local: (_videoId: string, videoUrl?: string) => {
        return videoUrl || "";
    }
};

interface VideoCardProps {
    video: {
        id: string;
        title: string;
        videoId: string;
        platform: 'youtube' | 'vimeo' | 'iframe' | 'local';
        thumbnail: string;
        videoUrl?: string;
    }
}

const GameVideo = ({ video }: VideoCardProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [imageError, setImageError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            setError(null);
        }
    }, [isOpen, video])

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

    const videoSrc = videoHandlers[video.platform]?.(video.videoId, video.videoUrl) ?? ""

    // Determine if we're using a video player or iframe
    const isDirectVideo = video.platform === "local"

    return (
        <>
            <Card
                className="w-72 h-48"
                isPressable
                onPress={onOpen}
            >
                {imageError ? (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">URL not available</span>
                    </div>
                ) : (
                    <div>
                        <Image
                            alt={video.title}
                            src={video.thumbnail}
                            onError={handleImageError}
                            fill
                            sizes={"100%"}
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <PlayCircle className="text-white" fontSize="large"/>
                        </div>
                    </div>

                )}

                <CardBody className="absolute bg-black/[.6]">
                    <h3 className="text-sm font-medium text-white truncate">{"How to play"}</h3>
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
                            <Button
                                className="absolute top-4 right-4 z-10 bg-transparent"
                                onPress={onClose}
                                isIconOnly
                            >
                                <CloseRounded
                                    className="text-[rgba(156,252,248,1)]"
                                    fontSize="large" />
                            </Button>
                            <ModalBody className="bg-black px-0 pt-10">
                                <div className="relative w-full h-56 sm:h-[60vh] overflow-hidden bg-gray-900">
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
                                                <InfoOutlined color="error"/>
                                                <p className="mt-2 text-white">{error}</p>
                                            </div>
                                        </div>
                                    )}

                                    {video && isDirectVideo ? (
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
