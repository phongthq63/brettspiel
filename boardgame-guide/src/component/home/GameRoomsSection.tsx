"use client";

import { useState, useEffect } from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Avatar, Button, Chip, Skeleton} from "@heroui/react";
import { getStatusColor } from "@/utils/game";
import Link from "next/link";
import { gameRoomsMock } from "@/mocks/gameRoomsMock";
import {CirclePlus, Clock, Users} from "lucide-react";

export interface GameRoom {
    id: number;
    name: string;
    creator: string;
    gameIcon: string;
    gameColor: string;
    status: "active" | "waiting" | "starting";
    currentPlayers: number;
    maxPlayers: number;
    time: string;
}

export default function GameRoomsSection() {
    const [isLoading, setIsLoading] = useState(true);
    const [rooms, setRooms] = useState<GameRoom[]>([]);

    useEffect(() => {
        // Simulate API call delay
        setTimeout(() => {
            setRooms(gameRoomsMock);
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <section id="rooms" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-montserrat font-bold text-dark">Game Rooms</h2>
                    <Link href="#" className="flex items-center gap-2 text-[#00b4d8] font-medium hover:underline">
                        Create Room
                        <CirclePlus />
                    </Link>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                    <div className="flex flex-col md:flex-row justify-between mb-6">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-poppins font-semibold">Active Game Rooms</h3>
                            <p className="text-gray-600">Join other players in ongoing games</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {isLoading ? (
                            // Skeleton loaders for loading state
                            Array.from({length: 6}).map((_, index) => (
                                <Card key={index}>
                                    <CardBody className="p-4">
                                        <div className="flex justify-between mb-3">
                                            <div className="flex items-center">
                                                <Skeleton className="w-10 h-10 rounded-full mr-3"/>
                                                <div>
                                                    <Skeleton className="h-5 w-32 mb-1"/>
                                                    <Skeleton className="h-3 w-24"/>
                                                </div>
                                            </div>
                                            <Skeleton className="h-6 w-16 rounded-full"/>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                                            <Skeleton className="h-4 w-24"/>
                                            <Skeleton className="h-4 w-36"/>
                                        </div>
                                        <Skeleton className="h-10 w-full rounded-lg"/>
                                    </CardBody>
                                </Card>
                            ))
                        ) : (
                            rooms.map((room) => {
                                const statusColors = getStatusColor(room.status);
                                return (
                                    <Card
                                        key={room.id}
                                        className="hover:shadow-md transition-shadow duration-200"
                                    >
                                        <CardHeader className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <Avatar src={`${room.gameIcon}`} />
                                                <div className="ml-3">
                                                    <h4 className="font-poppins font-semibold">{room.name}</h4>
                                                    <p className="text-xs text-gray-500">Created
                                                        by {room.creator}</p>
                                                </div>
                                            </div>
                                            <Chip
                                                classNames={{
                                                    base: `${statusColors.bg} border-none`,
                                                    dot: `${statusColors.dot}`,
                                                    content: `text-xs font-semibold ${statusColors.text}`,
                                                }}
                                                variant="dot"
                                                size="lg">
                                                {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                                            </Chip>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <div className="flex justify-center items-center gap-1">
                                                    <Users size="16px" />
                                                    {room.currentPlayers}/{room.maxPlayers} players
                                                </div>
                                                <div className="flex justify-center items-center gap-1">
                                                    <Clock size="16px" />
                                                    {room.time}
                                                </div>
                                            </div>
                                        </CardBody>
                                        <CardFooter>
                                            {room.status === 'active' ? (
                                                <Button
                                                    variant="bordered"
                                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 h-auto rounded-lg text-sm transition-colors duration-200"
                                                >
                                                    Spectate
                                                </Button>
                                            ) : (
                                                <Button
                                                    className="w-full bg-[#00b4d8] hover:bg-[#90e0ef] text-white py-2 h-auto rounded-lg text-sm transition-colors duration-200">
                                                    Join Room
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                );
                            })
                        )}
                    </div>

                    <div className="mt-6 text-center">
                        <Button
                            variant="bordered"
                            className="px-6 py-2 h-auto bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-200"
                        >
                            Load More Rooms
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
