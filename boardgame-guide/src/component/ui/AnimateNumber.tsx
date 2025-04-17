import {animate, useMotionValue, useMotionValueEvent, useTransform} from "framer-motion";
import {memo, useEffect, useState} from "react";

interface AnimateNumberProps {
    init?: number
    value: number
}

const AnimateNumber = ({ init = 0, value }: AnimateNumberProps) => {
    const count = useMotionValue(init)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const [display, setDisplay] = useState(init)

    useEffect(() => {
        const controls = animate(count, value, {
            duration: 2.5,
            delay: 0,
            ease: "easeOut",
        })

        return controls.stop
    }, [count, value])

    useMotionValueEvent(rounded, "change", (latest) => {
        setDisplay(latest);
    })

    return (
        <>{display}</>
    )
}

export default memo(AnimateNumber)