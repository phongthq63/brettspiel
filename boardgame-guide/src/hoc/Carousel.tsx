import React, {ReactNode, useState} from "react";

// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

// import required modules
import {FreeMode, Navigation, Scrollbar} from "swiper/modules";
import type {Swiper as SwiperClass} from "swiper/types";


interface CarouselProps {
    children: ReactNode | ReactNode[]
    breakpoints?: {
        [key: number]: {
            slidesPerView?: number,
            spaceBetween?: number,
        }
    }
    classNames?: {
        container?: string
        item?: string
    }
}

export default function Carousel({children, classNames, breakpoints}: CarouselProps) {
    const [, setSwiperRef] = useState<SwiperClass>()


    return (
        <div className={`flex flex-col items-center justify-center gap-4 ${classNames?.container ?? ''}`}>
            <Swiper
                className="w-full h-full"
                modules={[FreeMode, Scrollbar, Navigation]}
                onSwiper={setSwiperRef}
                freeMode
                slidesPerView={"auto"}
                breakpoints={breakpoints}
                scrollbar={{
                    hide: false,
                }}
            >
                {React.Children.map(children, (item, index) => (
                    <SwiperSlide key={index}
                                 className={`${classNames?.item ?? ''}`}>
                        {item}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
