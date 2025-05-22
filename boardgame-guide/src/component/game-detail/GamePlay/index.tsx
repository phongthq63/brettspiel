import {Button, Chip, Select, SelectItem, Spinner, Tooltip} from "@heroui/react";
import React, { forwardRef, Ref, useEffect } from "react";
import Image from "next/image";
import GameSetupSetting from "@/component/game-detail/GamePlay/GameSetupSetting";
import { useGameSetup } from "@/store/game-setup/game-setup.context";
import {useShallow} from "zustand/react/shallow";
import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {X} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {PlayerSeat} from "@/component/game-detail/GamePlay/GameSeats/PlayerSeat";
import {EmptySeat} from "@/component/game-detail/GamePlay/GameSeats/EmptySeat";
import {useGame} from "@/hooks/useGame";
import {useGameSocket} from "@/hooks/useGameSocket";


interface GamePlayProps {
    onClose?: () => void;
}

const GamePlay = forwardRef(({ onClose }: GamePlayProps, ref: Ref<any>) => {
    const { init, setup, createInviteLink, onStartGame, onCancelGame, onSelectPlayers } = useGame();
    const {
        minPlayers,
        maxPlayers,
        players,
        seats,
        rules,
        roomId,
        isStarting,
        isSearching,
    } = useGameSetup(useShallow((state) => ({
        minPlayers: state.minPlayers,
        maxPlayers: state.maxPlayers,
        players: state.players,
        seats: state.seats,
        rules: state.rules,
        roomId: state.roomId,
        isStarting: state.isStarting,
        isSearching: state.isSearching,
    })));
    useGameSocket(roomId)


    // Initialize the game
    useEffect(() => {
        init()
    }, [init]);

    // Setup game
    useEffect(() => {
        setup()
    }, [setup]);

    // Create invite link
    useEffect(() => {
        createInviteLink()
    }, [createInviteLink]);


    const handleClosePlayNow = () => {
        onClose?.()
    }

    return (
        <Card>
            <CardHeader className="justify-end">
                <Button
                    className="bg-transparent"
                    radius="full"
                    isIconOnly
                    onPress={handleClosePlayNow}
                >
                    <X />
                </Button>
            </CardHeader>
            <CardBody>
                <div className="flex flex-wrap">
                    {/* Intro */}
                    <div className="w-full lg:w-1/3 order-last lg:order-first">
                        Làm thế nào để bắt đầu một trò chơi?
                        <br/>
                        <br/>
                        Chọn số lượng người chơi
                        <br/>
                        <br/>
                        Bạn có thể mời bạn bè , nếu không bạn sẽ chơi với đối thủ ngẫu nhiên/n
                        <br/>
                        <br/>
                        ...và nhấn BẮT ĐẦU!
                    </div>

                    <div className="w-full lg:w-2/3 flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 flex flex-col gap-20 py-4">

                            {/* Game Setup */}
                            <GameSetupSetting/>

                            {/* Game Rules */}
                            <div className="flex flex-col gap-3">
                                {rules?.map((rule) => (
                                    <div key={rule.id} className="flex items-center gap-2">
                                        <div className="relative w-6 h-4">
                                            {rule.language_icon_url && (
                                                <Image
                                                    src={rule.language_icon_url}
                                                    alt={rule.name + " Language Icon"}
                                                    fill
                                                    sizes="100%"
                                                />
                                            )}
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

                        {/* Game Seats */}
                        <div ref={ref} className="w-full md:w-1/2">
                            <Card className="border-none bg-transparent" shadow="none">
                                <CardHeader>
                                    <div className="w-full text-center">
                                        <Select
                                            classNames={{
                                                base: "w-fit",
                                                mainWrapper: "w-20",
                                                label: "text-lg font-semibold",
                                                value: "font-semibold",
                                            }}
                                            size="lg"
                                            variant="bordered"
                                            label="Số người chơi"
                                            labelPlacement="outside-left"
                                            selectedKeys={[`${players}`]}
                                            onSelectionChange={(keys) => onSelectPlayers(keys as Set<number>)}
                                        >
                                            {Array.from({ length: maxPlayers - minPlayers + 1 }).map((_, index) => (
                                                <SelectItem key={minPlayers + index}>
                                                    {`${minPlayers + index}`}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="w-full grid grid-cols-4 gap-4 my-8">
                                        <AnimatePresence>
                                            {Array.from({ length: players }).map((_, index) => {
                                                const seatInfo = seats?.at(index)
                                                return (
                                                    <motion.div
                                                        key={`seat-${index}`}
                                                        className="flex"
                                                        initial={{opacity: 0, y: 20}}
                                                        animate={{opacity: 1, y: 0}}
                                                        exit={{opacity: 0, y: 20}}
                                                        transition={{
                                                            delay: index * 0.1, // Delay for appearance
                                                            duration: 0.4,
                                                        }}
                                                    >
                                                        {seatInfo ? (
                                                            <PlayerSeat
                                                                id={seatInfo.id}
                                                                tagName={seatInfo.tagName}
                                                                name={seatInfo.name}
                                                                avatarUrl={seatInfo.avatarUrl}
                                                                isOnline={seatInfo.isOnline}
                                                                isFriended={seatInfo.isFriended}
                                                                isMe={seatInfo.isMe}
                                                                isBot={seatInfo.isBot}
                                                                local={seatInfo.local}
                                                            />
                                                        ) : (
                                                            <EmptySeat/>
                                                        )}
                                                    </motion.div>
                                                )
                                            })}
                                        </AnimatePresence>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <div className="w-full flex flex-col">
                                        <AnimatePresence>
                                            {isSearching && (
                                                <motion.div

                                                    initial={{opacity: 0, height: 0}}
                                                    animate={{opacity: 1, height: 150}}
                                                    exit={{opacity: 0, height: 0}}
                                                    transition={{duration: 0.5, ease: "easeInOut"}}
                                                >
                                                    <div
                                                        className="bg-indigo-50 rounded-lg border border-indigo-200 p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Spinner className="text-indigo-600"/>
                                                            <h4 className="text-indigo-800 font-medium">Searching for
                                                                players</h4>
                                                        </div>
                                                        <p className="text-sm text-indigo-700">
                                                            Waiting for {players - seats.length} more player(s) to
                                                            join...
                                                        </p>
                                                        <div className="flex gap-1 mt-3">
                                                            <Chip
                                                                className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Auto-matching</Chip>
                                                            <Chip
                                                                className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Random
                                                                players</Chip>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        {isStarting ? (
                                            <Button
                                                className="text-white text-xl"
                                                color="primary"
                                                variant="shadow"
                                                size="lg"
                                                isDisabled
                                                isLoading
                                            >
                                                Starting
                                            </Button>
                                        ) : isSearching ? (
                                            <Button
                                                className="text-white text-xl"
                                                color="danger"
                                                variant="shadow"
                                                size="lg"
                                                onPress={onCancelGame}
                                            >
                                                Cancel
                                            </Button>
                                        ) : (
                                            <Button
                                                className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-border text-white text-xl"
                                                variant="shadow"
                                                size="lg"
                                                onPress={onStartGame}
                                            >
                                                Start
                                            </Button>
                                        )}
                                        </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
});

GamePlay.displayName = "GamePlay";

export default GamePlay;
