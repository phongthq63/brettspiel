export interface GameSetupSetting {
    id: string;
    name: string;
    type: string;
    selection?: {
        id: string;
        name: string;
        description?: string;
    }[]
    series?: GameSetupSetting[];
}

export interface GameSeat {
    id: string;
    tagName: string;
    name: string;
    avatarUrl?: string;
    isOnline?: boolean;
    isFriended?: boolean;

    isMe?: boolean;
    isBot?: boolean;
    isPlayer?: boolean;
    local?: string;
}