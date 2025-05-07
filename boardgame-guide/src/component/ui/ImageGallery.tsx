import Image from "next/image";


interface ImageGalleryProps {
    images: string[];
}

export function ImageGallery({images}: ImageGalleryProps) {
    if (images.length <= 0) {
        return null;
    }

    return (
        <>
            <div className="w-full aspect-square grid grid-cols-6 grid-rows-6 gap-1">
                <div className={`relative col-span-6 ${images.length == 1 ? 'row-span-6' : 'row-span-4'} overflow-hidden`}>
                    <Image
                        src={images[0]}
                        alt={"Image"}
                        fill
                        sizes="100%"
                    />
                </div>
                {images.length == 2 && (
                    <div className="relative col-span-6 row-span-2 row-start-5 overflow-hidden">
                        <Image
                            src={images[1]}
                            alt={"Image"}
                            fill
                            sizes="100%"
                        />
                    </div>
                )}
                {images.length == 3 && (
                    images.slice(1, 3).map((image, index) => (
                        <div
                            key={index}
                            className={`relative col-span-3 row-span-2 row-start-5 overflow-hidden`}>
                            <Image
                                src={image}
                                alt={"Image"}
                                fill
                                sizes="100%"
                            />
                        </div>
                    ))
                )}
                {images.slice(1, 3).map((image, index) => (
                    <div key={index} className="relative col-span-2 row-span-2 row-start-5 overflow-hidden">
                        <Image
                            src={image}
                            alt={"Image"}
                            fill
                            sizes="100%"
                        />
                    </div>
                ))}
                {images.length >= 4 && (
                    <div className="relative col-span-2 row-span-2 row-start-5 overflow-hidden">
                        <Image
                            src={images[3]}
                            alt={images[3]}
                            fill
                            sizes="100%"
                            className={`${images.length > 4 ? 'blur-sm' : ''}`}
                        />
                        {images.length > 4 && (
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-bold">
                                +{images.length - 4}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>

    );
}
