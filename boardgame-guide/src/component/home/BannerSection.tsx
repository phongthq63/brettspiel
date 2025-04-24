import Image from "next/image";
import {Button} from "@heroui/react";

const BannerSection = () => {


    return (
        <section className="relative h-[600px] md:h-[700px] mb-60">
            <div className="absolute w-full h-full grid grid-cols-5 grid-rows-5">
                <div className="relative col-span-5 row-span-4 shadow-2xl">
                    <Image src="/news-banner-899_wide.jpg"
                           alt="Board games banner"
                           fill
                           sizes={"100%"}/>
                </div>
            </div>
            <div className="absolute w-full h-full grid grid-cols-5 grid-rows-5">
                <div className="col-span-3 row-span-3 col-start-2"></div>
                <div className="col-span-5 row-start-4 bg-black/60">
                    <div className="h-full grid grid-cols-5 grid-rows-1">
                        <div className="flex items-center col-span-5 lg:col-span-3 lg:col-start-2 mx-4">
                            <h2 className="font-bold text-3xl text-white line-clamp-2">SYMBIOSE: it all started like a primordial soup...</h2>
                        </div>
                        <div className="hidden lg:flex justify-center items-center col-start-1 row-start-1">
                            <Image src="/en_280.png"
                                   alt="Board games box"
                                   width={400}
                                   height={300}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center col-span-5 lg:col-span-3 lg:col-start-2 row-start-5 mx-4">
                    <div className="my-4">
                        <p className="text-gray-700 text-lg line-clamp-3">
                            Get ready to dive into a world of strategy, synergy, and stunning gameplay: Symbiose has
                            just landed
                            on Board Game Arena! In this clever and tactical card game, you are ...
                        </p>
                    </div>
                    <div className="flex justify-end w-full gap-4">
                        <Button className="bg-cyan-600 font-semibold text-white shadow-md">
                            Tutorial
                        </Button>
                        <Button className="bg-[rgba(110,123,251,1)] font-semibold text-white shadow-md">
                            Play now
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BannerSection