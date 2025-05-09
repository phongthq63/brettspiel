import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Button, Select, SelectItem, Tooltip} from "@heroui/react";
import React, {forwardRef, Ref, useEffect, useState} from "react";
import {useUser} from "@/store/user.context";
import {PlayerSeat} from "@/component/game-detail/GamePlay/RoomSeat/PlayerSeat";
import RoomSeat from "@/component/game-detail/GamePlay/RoomSeat";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";


interface GamePlayProps {
    rules: {
        name: string;
        language: string;
        image_icon_url: string;
        document_url: string;
    }[]
}

const GamePlay = forwardRef(({rules}: GamePlayProps, ref: Ref<any>) => {
    const { user } = useUser();
    const [players, setPlayers] = useState(2);
    const [inviteLink, setInviteLink] = useState('');


    useEffect(() => {
        setInviteLink(`https://boardgames.example.com/invite/${Math.random().toString(36).substring(2, 10)}`);
    }, []);

    const handleSelectPlayers = (values: Set<number>) => {
        if (values.size === 0) {
            setPlayers(1)
        } else {
            setPlayers([...values][0]);
        }
    }

    return (
        <div className="flex flex-wrap">
            {/* Intro */}
            <div className="w-full lg:w-1/3 order-last lg:order-first">1</div>

            {/* Game Setting + Game Room */}
            <div className="w-full lg:w-2/3 flex flex-col md:flex-row">

                {/* Game Setting */}
                <div className="w-full md:w-1/2 flex flex-col gap-8 py-4">
                    <div>
                        <Select
                            variant="bordered"
                            defaultSelectedKeys={["default"]}
                        >
                            <SelectItem key={"default"} textValue={"Splendor"}>
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={"/en_280.png"}
                                        alt={"Image box url"}
                                        width={100}
                                        height={100}
                                    />
                                    <div className="grow font-semibold">{"Splendor"}</div>
                                </div>
                            </SelectItem>
                            <SelectItem key={"cities"} textValue={"Cities of Splendor"}>
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={"/en_281.png"}
                                        alt={"Image box url"}
                                        width={100}
                                        height={100}
                                    />
                                    <div className="grow font-semibold">{"Cities of Splendor"}</div>
                                </div>
                            </SelectItem>
                            <SelectItem key={"duel"} textValue={"Splendor Duel"}>
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={"/en_281.png"}
                                        alt={"Image box url"}
                                        width={100}
                                        height={100}
                                    />
                                    <div className="grow font-semibold">{"Splendor Duel"}</div>
                                </div>
                            </SelectItem>
                        </Select>
                        <p className="text-sm text-gray-700 my-4">
                            Symbiose is a tactical and clever collection game. Expand your personal pond from
                            the river to create maximum synergy between your different cards and those of your
                            neighbors! Who will create the most beautiful symbiosis? In this turn-based game,
                            your goal is to strategically place your cards to maximize your overall score. But
                            be aware
                        </p>
                    </div>
                    <div>
                        <Select
                            variant="bordered"
                            defaultSelectedKeys={["default"]}
                        >
                            <SelectItem key={"default"}>{"Splendor"}</SelectItem>
                            <SelectItem key={"cities"}>{"Cities of Splendor"}</SelectItem>
                            <SelectItem key={"duel"}>{"Splendor Duel"}</SelectItem>
                        </Select>
                        <p className="text-sm text-gray-700 my-4">
                            Symbiose is a tactical and clever collection game. Expand your personal pond from
                            the river to create maximum synergy between your different cards and those of your
                            neighbors! Who will create the most beautiful symbiosis? In this turn-based game,
                            your goal is to strategically place your cards to maximize your overall score. But
                            be aware
                        </p>
                    </div>
                    <div>
                        <Select
                            variant="bordered"
                            defaultSelectedKeys={["default"]}
                        >
                            <SelectItem key={"default"}>{"Splendor"}</SelectItem>
                            <SelectItem key={"cities"}>{"Cities of Splendor"}</SelectItem>
                            <SelectItem key={"duel"}>{"Splendor Duel"}</SelectItem>
                        </Select>
                        <p className="text-sm text-gray-700 my-4">
                            Symbiose is a tactical and clever collection game. Expand your personal pond from
                            the river to create maximum synergy between your different cards and those of your
                            neighbors! Who will create the most beautiful symbiosis? In this turn-based game,
                            your goal is to strategically place your cards to maximize your overall score. But
                            be aware
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {rules.map((rule, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="relative w-6 h-4">
                                    <Image
                                        src={rule.image_icon_url}
                                        alt={rule.name}
                                        fill
                                        sizes="100%"
                                    />
                                </div>
                                <Tooltip
                                    placement="top-start"
                                    content={rule.language}
                                >
                                    <p className="w-fit text-xs text-blue-500 cursor-pointer">
                                        {rule.name}
                                    </p>
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Game Room */}
                <div ref={ref} className="w-full md:w-1/2">
                    <Card
                        className="border-none bg-transparent"
                        shadow="none"
                    >
                        <CardHeader>
                            <div className="w-full text-center">
                                <Select
                                    classNames={{
                                        base: "w-fit",
                                        mainWrapper: "w-20",
                                        label: "text-lg font-semibold",
                                    }}
                                    size="lg"
                                    variant="bordered"
                                    label="Số người chơi"
                                    labelPlacement="outside-left"
                                    selectedKeys={[players.toString()]}
                                    onSelectionChange={(keys) => handleSelectPlayers(keys as Set<number>)}
                                >
                                    <SelectItem key={2}>{"2"}</SelectItem>
                                    <SelectItem key={3}>{"3"}</SelectItem>
                                    <SelectItem key={4}>{"4"}</SelectItem>
                                    <SelectItem key={5}>{"5"}</SelectItem>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="w-full grid grid-cols-4 gap-4 my-8">
                                {user && (
                                    <PlayerSeat
                                        id={user.id}
                                        tagName={'@test'}
                                        name={user.name}
                                        avatarUrl={user.avatarUrl}
                                        isOnline
                                        isMe
                                    />
                                )}
                                <AnimatePresence>
                                    {Array.from({length: players - 1}).map((_, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex"
                                            initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: 20}}
                                            transition={{
                                                delay: index * 0.1, // Delay for appearance
                                                duration: 0.4,
                                                exit: {
                                                    delay: (players - 2 - index) * 0.1,
                                                    duration: 0.4
                                                },
                                            }}
                                        >
                                            <RoomSeat
                                                roomId={"test"}
                                                inviteLink={inviteLink}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className="w-full flex justify-end">
                                <Button
                                    className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-border text-white text-xl"
                                    size="lg"
                                >
                                    Start
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
})

GamePlay.displayName = 'GamePlay';

export default GamePlay;