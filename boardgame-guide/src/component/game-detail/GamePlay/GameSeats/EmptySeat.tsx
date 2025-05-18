import {
    Avatar,
    Button,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tab,
    Tabs
} from "@heroui/react";
import {Bot, Check, Copy, Link, Plus, Search, Users, X} from "lucide-react";
import React, {useEffect, useState} from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {toast} from "@/utils/toast";
import {PlayerInfoCard} from "@/component/game-detail/GamePlay/GameSeats/PlayerInfoCard";
import {AnimatePresence, motion} from "framer-motion";
import {useGameSetup} from "@/store/game-setup/game-setup.context";
import {useShallow} from "zustand/react/shallow";
import {useUser} from "@/store/user.context";

export function EmptySeat() {
    const { user } = useUser();
    const {
        seats,
        inviteLink,
        addSeat
    } = useGameSetup(useShallow((state) => ({
        seats: state.seats,
        inviteLink: state.inviteLink,
        addSeat: state.addSeat
    })));
    const [isOpenPopover, setIsOpenPopover] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResultsVisible, setSearchResultsVisible] = useState(false);
    const [tabPlayerVisible, setTabPlayerVisible] = useState(true);
    const [copied, setCopied] = useState(false);


    const searchResults: any[] = [
        {
            id: 1,
            name: "Michael Johnson",
            avatar: "M",
            color: "bg-purple-100",
            textColor: "text-purple-700",
            status: "online",
            gamesPlayed: 23,
            winRate: 65,
            skill: 3
        },
        {
            id: 2,
            name: "Sarah Williams",
            avatar: "S",
            color: "bg-teal-100",
            textColor: "text-teal-700",
            status: "away",
            gamesPlayed: 15,
            winRate: 40,
            skill: 2
        },
        {
            id: 3,
            name: "David Brown",
            avatar: "D",
            color: "bg-amber-100",
            textColor: "text-amber-700",
            status: "ingame",
            game: "Catan",
            gamesPlayed: 42,
            winRate: 58,
            skill: 4
        }
    ];

    useEffect(() => {
        const hasSearchTerm = searchTerm.trim().length > 0;
        setSearchResultsVisible(hasSearchTerm);

        // When starting a search, close friends accordion automatically
        if (hasSearchTerm && tabPlayerVisible) {
            setTabPlayerVisible(false);
        }

        // When clearing search, re-open friends accordion
        if (!hasSearchTerm && !tabPlayerVisible) {
            setTabPlayerVisible(true);
        }
    }, [searchTerm, tabPlayerVisible]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredSearchResults = searchResults.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleAddLocalPlayer = () => {
        if (!user) return;

        const localCount = seats.filter(seat => seat.local).length;
        addSeat({
            id: `${user.id}-local${localCount + 1}`,
            tagName: `@local${localCount + 1}`,
            name: `Local player ${localCount + 1}`,
            avatarUrl: "",
            isOnline: true,
            local: user.id
        });
    }

    const handleAddBotPlayer = () => {
        if (!user) return;

        const botCount = seats.filter(seat => seat.isBot).length;
        addSeat({
            id: `${user.id}-bot${botCount + 1}`,
            tagName: `@bot${botCount + 1}`,
            name: `Bot ${botCount + 1}`,
            isOnline: true,
            isBot: true,
        });
    }

    const handleCopyInviteLink = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        toast({
            title: "Link copied!",
            description: "The invite link has been copied to your clipboard.",
            autoClose: 2000,
        });
        setTimeout(() => setCopied(false), 5000);
    };
    
    return (
        <div className="w-full flex flex-col justify-start items-center gap-3">
            <Popover
                placement="bottom"
                showArrow
                shouldCloseOnScroll={false}
                isOpen={isOpenPopover}
                onOpenChange={setIsOpenPopover}
            >
                <PopoverTrigger>
                    <Button
                        isIconOnly
                        radius="full"
                        variant="light"
                        className="w-fit h-fit bg-transparent p-0 outline-dashed outline-4 outline-[#90e0ef] hover:outline-[#0077b6] transition-all duration-300"
                    >
                        <Avatar
                            classNames={{
                                base: "w-16 h-16 bg-transparent",
                            }}
                            icon={<Plus size={48} strokeWidth={3}/>}
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96">
                    <div className="w-full relative">
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
                        <Card className="border-none bg-transparent" shadow="none">
                            <CardHeader>
                                <div className="w-full text-center">
                                    <h4 className="text-sm font-semibold">Invite a player</h4>
                                    <p className="text-xs text-gray-400">Send an invitation to join this game</p>
                                </div>

                            </CardHeader>
                            <CardBody>
                                {/* Search bar */}
                                <Input
                                    className="mb-4"
                                    variant="bordered"
                                    placeholder="Search players..."
                                    startContent={
                                        <Search size={18} />
                                    }
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />

                                {/* Search results */}
                                <AnimatePresence>
                                    {searchResultsVisible && (
                                        <motion.div
                                            className="overflow-hidden mb-4"
                                            initial={{height: 0, opacity: 0, marginBottom: 4}}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                                marginBottom: 4,
                                            }}
                                            exit={{height: 0, opacity: 0, marginBottom: 4}}
                                            transition={{duration: 0.5, ease: "easeInOut"}}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-xs font-semibold text-[#03045e]">Search Results</p>
                                                <Button
                                                    className="bg-transparent hover:bg-indigo-100"
                                                    size="sm"
                                                    radius="full"
                                                    isIconOnly
                                                    onPress={() => setSearchTerm("")}
                                                >
                                                    <X size={16}/>
                                                </Button>
                                            </div>

                                            <div className="h-56 space-y-1 overflow-y-auto">
                                                {filteredSearchResults.length > 0 ? (
                                                    filteredSearchResults.map(user => (
                                                        <PlayerItem
                                                            key={user.id}
                                                            id={"test"}
                                                            tagName={user.tagName}
                                                            name={user.name}
                                                            avatarUrl={user.avatarUrl}
                                                            isFriended={false}
                                                        />
                                                    ))
                                                ) : (
                                                    <div className="text-center py-2 text-sm text-gray-500">
                                                        No users found
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Tabs */}
                                <AnimatePresence initial={false}>
                                    <Tabs
                                        className="border-t-1"
                                        classNames={{
                                            cursor: "bg-[#03045e]",
                                            tabContent: "group-data-[selected=true]:text-[#03045e]",
                                        }}
                                        variant="underlined"
                                        size="sm"
                                    >
                                        <Tab key="friends" title={`Friends (${12})`}>
                                            {tabPlayerVisible && (
                                                <motion.div
                                                    className="overflow-hidden"
                                                    initial={{height: "auto", opacity: 0}}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                    }}
                                                    exit={{height: 0, opacity: 0}}
                                                    transition={{duration: 0.5, ease: "easeInOut"}}
                                                >
                                                    <div className="h-56 overflow-y-auto pr-1 -mr-1 space-y-1">
                                                        <PlayerItem
                                                            id={"test"}
                                                            tagName={user?.tagName ?? "@"}
                                                            name={user?.name ?? ""}
                                                            avatarUrl={user?.avatarUrl}
                                                            isFriended={true}
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}

                                        </Tab>
                                        <Tab key="recent" title="Recent">
                                            {tabPlayerVisible && (
                                                <motion.div
                                                    className="overflow-hidden"
                                                    initial={{height: "auto", opacity: 0}}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                    }}
                                                    exit={{height: 0, opacity: 0}}
                                                    transition={{duration: 0.5, ease: "easeInOut"}}
                                                >
                                                    <div className="h-56 flex justify-center items-center">
                                                        <div className="py-8 text-center">
                                                            <p className="text-sm text-slate-500">No recent players</p>
                                                            <p className="text-xs text-slate-400 mt-1">
                                                                Players you&#39;ve recently played with will appear here
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </Tab>
                                    </Tabs>
                                </AnimatePresence>
                            </CardBody>
                            <CardFooter>
                                <div className="w-full flex flex-col">
                                    <div className="flex flex-col gap-3 py-3 border-t-1">
                                        <Button
                                            className="w-full font-semibold bg-transparent hover:bg-[#caf0f8] border border-[#00b4d8] hover:text-[#03045e]"
                                            size="sm"
                                            startContent={
                                                <Users size={16} className="font-semibold"/>
                                            }
                                            onPress={handleAddLocalPlayer}
                                        >
                                            Add local player
                                        </Button>
                                        <Button
                                            className="w-full font-semibold bg-transparent hover:bg-[#caf0f8] border border-[#00b4d8] hover:text-[#03045e]"
                                            size="sm"
                                            startContent={
                                                <Bot size={16} className="font-semibold"/>
                                            }
                                            onPress={handleAddBotPlayer}
                                        >
                                            Add bot player
                                        </Button>
                                    </div>

                                    {/* Invitation link */}
                                    <div className="border-t-1 py-3">

                                        <div className="flex justify-start items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                                            <Link size={16} />
                                            INVITATION LINK
                                        </div>
                                        <div className="flex justify-center items-center gap-2">
                                            <Input
                                                id="link"
                                                variant="bordered"
                                                value={inviteLink}
                                                readOnly
                                                size="md"
                                            />
                                            <Button
                                                className="bg-black text-white"
                                                isIconOnly
                                                size="md"
                                                onPress={handleCopyInviteLink}
                                            >
                                                {copied ? <Check size={16}/> : <Copy size={16}/>}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </PopoverContent>
            </Popover>
            <p className="text-sm font-semibold text-center text-[#03045e]">
                No Player
            </p>
        </div>
    )
}

const getStatusComponent = (status: string, game?: string) => {
    switch (status) {
        case "online":
            return (
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs text-emerald-600">Online</span>
                </div>
            );
        case "ingame":
            return (
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs text-blue-600">In game {game && `(${game})`}</span>
                </div>
            );
        case "away":
            return (
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-xs text-amber-600">Away</span>
                </div>
            );
        default:
            return (
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    <span className="text-xs text-gray-500">Offline</span>
                </div>
            );
    }
};

const PlayerItem = ({id, tagName, name, avatarUrl, isFriended} : {
    id: string;
    tagName: string;
    name: string;
    avatarUrl?: string;
    isOnline?: boolean;
    isFriended?: boolean;
}) => {
    const [isOpenPopover, setIsOpenPopover] = useState(false);

    return (
        <Popover
            placement="bottom"
            showArrow
            isOpen={isOpenPopover}
            onOpenChange={setIsOpenPopover}
        >
            <PopoverTrigger>
                <div className="flex justify-between gap-10 p-2 hover:bg-cyan-50 rounded-md cursor-pointer transition-colors border border-transparent hover:border-cyan-200">
                    <div className="flex gap-3">
                        <Avatar
                            size="sm"
                            src={avatarUrl}
                            name={name}
                        />
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="text-xs font-semibold">{name}</h4>
                            {getStatusComponent('online', 'test')}
                        </div>
                    </div>
                    <Button
                        className="bg-transparent hover:bg-cyan-100 hover:text-cyan-800 border hover:border-cyan-400"
                        size="sm"
                    >
                        <Plus/>
                        Invite
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div>
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
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}