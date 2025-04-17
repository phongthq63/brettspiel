import React from "react";

interface DeviceProps {
    className?: string;
}

export const PCDevice: React.FC<DeviceProps> = ({ className }) => {
    return (
        <svg
            width="300"
            height="200"
            viewBox="0 0 300 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Monitor */}
            <rect x="50" y="20" width="200" height="140" rx="5" fill="#333" />
            <rect x="60" y="30" width="180" height="110" rx="2" fill="#f5f5f5" />

            {/* Monitor stand */}
            <rect x="125" y="160" width="50" height="10" rx="2" fill="#333" />
            <rect x="140" y="170" width="20" height="10" rx="2" fill="#333" />
            <rect x="130" y="180" width="40" height="5" rx="2" fill="#333" />

            {/* Game display */}
            <rect x="80" y="45" width="140" height="80" rx="2" fill="white" stroke="#e0e0e0" />

            {/* Game board */}
            <rect x="100" y="55" width="100" height="100" rx="2" transform="rotate(-10 100 55)" fill="url(#pc-gradient)" />

            {/* Game pieces */}
            <circle cx="120" cy="75" r="8" fill="#fff" />
            <circle cx="150" cy="85" r="8" fill="#fff" />
            <circle cx="130" cy="105" r="8" fill="#fff" />
            <circle cx="160" cy="95" r="8" fill="#fff" />

            {/* Keyboard (simple representation) */}
            <rect x="90" y="145" width="120" height="20" rx="4" fill="#e0e0e0" />
            <rect x="95" y="150" width="110" height="10" rx="2" fill="#f5f5f5" />

            <defs>
                <linearGradient
                    id="pc-gradient"
                    x1="100"
                    y1="55"
                    x2="200"
                    y2="155"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0.1" stopColor="rgba(156,252,248,1)" />
                    <stop offset="0.9" stopColor="rgba(110,123,251,1)" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export const MobileDevice: React.FC<DeviceProps> = ({ className }) => {
    return (
        <svg
            width="300"
            height="200"
            viewBox="0 0 300 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Phone body */}
            <rect x="100" y="20" width="100" height="170" rx="10" fill="#333" />
            <rect x="105" y="30" width="90" height="150" rx="5" fill="#f5f5f5" />

            {/* Phone camera/speaker */}
            <circle cx="150" cy="25" r="3" fill="#222" />

            {/* Home button */}
            <circle cx="150" cy="185" r="8" stroke="#222" strokeWidth="1" fill="none" />

            {/* Game display */}
            <rect x="115" y="50" width="70" height="100" rx="2" fill="white" stroke="#e0e0e0" />

            {/* Game board */}
            <rect x="125" y="60" width="50" height="50" rx="2" fill="url(#mobile-gradient)" />

            {/* Game pieces */}
            <circle cx="135" cy="70" r="5" fill="#fff" />
            <circle cx="150" cy="75" r="5" fill="#fff" />
            <circle cx="140" cy="85" r="5" fill="#fff" />
            <circle cx="155" cy="80" r="5" fill="#fff" />

            {/* Game controls */}
            <rect x="125" y="120" width="50" height="20" rx="10" fill="#e0e0e0" />
            <rect x="130" y="125" width="40" height="10" rx="5" fill="#f5f5f5" />

            <defs>
                <linearGradient
                    id="mobile-gradient"
                    x1="125"
                    y1="60"
                    x2="175"
                    y2="110"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0.1" stopColor="rgba(156,252,248,1)" />
                    <stop offset="0.9" stopColor="rgba(110,123,251,1)" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export const TabletDevice: React.FC<DeviceProps> = ({ className }) => {
    return (
        <svg
            width="300"
            height="200"
            viewBox="0 0 300 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Tablet body */}
            <rect x="50" y="30" width="200" height="140" rx="10" fill="#333" />
            <rect x="55" y="35" width="190" height="130" rx="8" fill="#f5f5f5" />

            {/* Tablet camera */}
            <circle cx="150" cy="35" r="3" fill="#222" />

            {/* Game display */}
            <rect x="65" y="45" width="170" height="110" rx="2" fill="white" stroke="#e0e0e0" />

            {/* Game board */}
            <rect x="85" y="55" width="130" height="90" rx="2" fill="url(#tablet-gradient)" />

            {/* Game pieces */}
            <circle cx="110" cy="75" r="8" fill="#fff" />
            <circle cx="150" cy="85" r="8" fill="#fff" />
            <circle cx="130" cy="105" r="8" fill="#fff" />
            <circle cx="170" cy="95" r="8" fill="#fff" />
            <circle cx="145" cy="65" r="8" fill="#fff" />
            <circle cx="185" cy="115" r="8" fill="#fff" />

            <defs>
                <linearGradient
                    id="tablet-gradient"
                    x1="85"
                    y1="55"
                    x2="215"
                    y2="145"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0.1" stopColor="rgba(156,252,248,1)" />
                    <stop offset="0.9" stopColor="rgba(110,123,251,1)" />
                </linearGradient>
            </defs>
        </svg>
    )
}