import {Avatar, Badge, Button, Popover, PopoverContent, PopoverTrigger, Input} from "@heroui/react";
import React, {useRef, useState} from "react";
import {Bot, PencilLine, UserRound, X} from "lucide-react";
import {GameSeat} from "@/types/game";
import {useGameSetup} from "@/store/game-setup/game-setup.context";
import {useShallow} from "zustand/react/shallow";
import {SeatPopoverCard} from "@/component/game-detail/GamePlay/GameSeats/SeatPopoverCard";

type PlayerSeatProps = GameSeat

export function PlayerSeat({id, tagName, name, avatarUrl, isOnline, isFriended, isMe, local, isBot}: PlayerSeatProps) {
    const {
        setSeat,
        removeSeat,
    } = useGameSetup(useShallow((state) => ({
        setSeat: state.setSeat,
        removeSeat: state.removeSeat,
    })))
    const [isOpenPopover, setIsOpenPopover] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
        setIsEditingName(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };

    const handleBlur = () => {
        setIsEditingName(false);
        setSeat(id, {name: editedName})
    };

    const onSeatKick = (seatId: string) => {
        removeSeat(seatId)
    }

    return (
        <div className="w-full flex flex-col justify-start items-center gap-3">
            <Popover
                placement="bottom"
                showArrow
                isOpen={isOpenPopover}
                onOpenChange={setIsOpenPopover}
            >
                <Badge
                    classNames={{
                        badge: `w-5 h-5 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`,
                    }}
                    shape="circle"
                >
                    <PopoverTrigger>
                        <Button
                            className={`w-fit h-fit bg-transparent p-0 transition-all duration-300`}
                            isIconOnly
                            radius="full"
                            variant="light"
                        >
                            <Avatar
                                classNames={{
                                    base: `w-16 h-16 bg-[#caf0f8] ${(local || isBot) ? 'border-2 border-[#0077b6]' : 'border-2 border-[#90e0ef]'}`,
                                    name: "font-semibold text-lg"
                                }}
                                src={(local || isBot) ? undefined : avatarUrl}
                                name={(local || isBot) ? undefined : name}
                                icon={local && (
                                    <UserRound strokeWidth={1.5} size={50} className="text-[#0077b6]" />
                                ) || isBot && (
                                    <Bot strokeWidth={1.5} size={50} className="text-[#0077b6]" />
                                )}
                            />
                        </Button>
                    </PopoverTrigger>
                </Badge>
                <PopoverContent>
                    <div className="relative">
                        <Button
                            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white"
                            variant="bordered"
                            size="sm"
                            radius="full"
                            isIconOnly
                            onPress={() => setIsOpenPopover(false)}
                        >
                            <X size={16}/>
                        </Button>
                        <SeatPopoverCard
                            id={id}
                            tagName={tagName}
                            name={name}
                            avatarUrl={avatarUrl}
                            isFriended={isFriended}
                            isMe={isMe}
                            isBot={isBot}
                            local={local}
                            onSeatKick={onSeatKick}
                        />
                    </div>
                </PopoverContent>
            </Popover>

            {isEditingName ? (
                <Input
                    ref={inputRef}
                    classNames={{
                        input: "font-semibold",
                    }}
                    variant="underlined"
                    value={editedName}
                    onChange={handleNameChange}
                    onBlur={handleBlur}
                    className="text-center"
                />
            ) : (
                <p className="flex flex-col items-center text-sm font-semibold text-center text-[#03045e]">
                    {editedName}
                    {(isBot || local) && (
                        <Button
                            variant="light"
                            size="sm"
                            isIconOnly
                            onPress={handleEditClick}
                        >
                            <PencilLine size={16}/>
                        </Button>
                    )}
                </p>
            )}
        </div>
    )
}
