import {memo, useRef, useState} from "react";


interface ScrollBarProps {
    init?: number
    onChangeValue?: (value: number) => void
}

const ScrollBar = ({init = 0}: ScrollBarProps) => {
    const [value, setValue] = useState<number>(init)
    const sliderRef = useRef(null)

    const handleMouseMove = (e: MouseEvent) => {
        if (!sliderRef.current) return

        const sliderRect = (sliderRef.current as HTMLDivElement).getBoundingClientRect()

        const offsetX = Math.max(0, Math.min(e.clientX - sliderRect.left, sliderRect.width)); // Giới hạn offsetX trong khoảng [0, sliderRect.width]
        const percent = (offsetX / sliderRect.width) * 100; // Tính phần trăm vị trí

        // Giới hạn value trong khoảng [0, 100 - thumbWidthPercent]
        const clampedValue = Math.max(0 , Math.min(percent, 100));
        setValue(clampedValue); // Cập nhật giá trị value
    }

    const handleMouseDown = () => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }

    return (
        <div className="flex items-center w-full h-6 bg-gray-200 rounded-full cursor-pointer"
             onMouseDown={handleMouseDown}
        >
            <div ref={sliderRef}
                 className="relative w-full h-full mx-6">
                <div className="absolute top-1/2 transform -translate-y-1/2 w-12 h-full bg-blue-700 rounded-full shadow"
                     style={{
                         left: `${value}%`,
                         transform: `translate(-50%, -50%)`
                     }}/>
            </div>

        </div>
    )
}

export default memo(ScrollBar)