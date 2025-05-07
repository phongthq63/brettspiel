import React from "react";

interface GameCreditsProps {
    designers?: string[];
    artists?: string[];
    publishers?: string[];
    year?: number;
}

export default function GameCredits({designers, artists, publishers, year}: GameCreditsProps) {
    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Credits</h2>
            <div className="flex flex-col gap-3">
                <div>
                    <p className="text-sm font-semibold">Designers</p>
                    <p className="font-medium">{designers?.join(", ") || "N/A"}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold">Artists</p>
                    <p className="font-medium">{artists?.join(", ") || "N/A"}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold">Publishers</p>
                    <p className="font-medium">{publishers?.join(", ") || "N/A"}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold">Year</p>
                    <p className="font-medium">{year || "N/A"}</p>
                </div>
            </div>
        </div>
    )
}
