import React from "react";

interface LogoProps {
    className?: string
}

const LogoSVG: React.FC<LogoProps> = ({ className }) => {
    return (
        <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect width="100" height="100" rx="20" fill="url(#logo-gradient)" />
            <path
                d="M30 30H70V70H30V30Z"
                stroke="white"
                strokeWidth="4"
                fill="none"
            />
            <circle cx="50" cy="50" r="10" fill="white" />
            <circle cx="30" cy="30" r="5" fill="white" />
            <circle cx="70" cy="30" r="5" fill="white" />
            <circle cx="30" cy="70" r="5" fill="white" />
            <circle cx="70" cy="70" r="5" fill="white" />
            <defs>
                <linearGradient
                    id="logo-gradient"
                    x1="0"
                    y1="0"
                    x2="100"
                    y2="100"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0.112" stopColor="rgba(156,252,248,1)" />
                    <stop offset="0.911" stopColor="rgba(110,123,251,1)" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default LogoSVG