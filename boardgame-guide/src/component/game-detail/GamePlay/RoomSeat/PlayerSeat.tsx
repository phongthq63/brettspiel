import {Avatar, Badge, Button, Popover, PopoverContent, PopoverTrigger} from "@heroui/react";
import React, {useState} from "react";
import {X} from "lucide-react";
import {PlayerInfoCard} from "@/component/game-detail/GamePlay/RoomSeat/PlayerInfoCard";

interface PlayerSeatProps {
    id: string;
    tagName: string;
    name: string;
    avatarUrl?: string;
    isOnline?: boolean;
    isFriended?: boolean;
    isMe?: boolean;
}

export function PlayerSeat({id, tagName, name, avatarUrl, isOnline, isFriended, isMe}: PlayerSeatProps) {
    const [isOpenPopover, setIsOpenPopover] = useState(false);

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
                                    base: "w-16 h-16 bg-transparent",
                                }}
                                src={avatarUrl}
                                name={name}
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
                        <PlayerInfoCard
                            id={id}
                            tagName={tagName}
                            name={name}
                            avatarUrl={avatarUrl}
                            isFriended={isFriended}
                            isMe={isMe}
                        />
                    </div>
                </PopoverContent>
            </Popover>
            <p className="text-sm font-semibold text-center text-[#03045e]">
                {name}
            </p>
        </div>
    )
}