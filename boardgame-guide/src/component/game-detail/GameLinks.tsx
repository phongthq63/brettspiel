import React from "react";
import Image from "next/image";
import Link from "next/link";
import { gameLinksMock } from "@/mocks/gameLinksMock";

export default function GameLinks() {
    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Links</h2>
            <div className="flex flex-col gap-3">
                {gameLinksMock.map((link) => (
                    <div key={link.id} className="flex gap-2">
                        <div className="relative w-6 h-4">
                            <Image
                                src={link.icon}
                                alt={`${link.name} icon`}
                                fill
                                sizes="100%"
                            />
                        </div>
                        <Link
                            href={link.url}
                            target="_blank"
                            className="text-sm text-blue-500 hover:underline cursor-pointer"
                        >
                            {link.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
