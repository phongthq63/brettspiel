import {PlayerSeat} from "@/component/game-detail/GamePlay/RoomSeat/PlayerSeat";
import {EmptySeat} from "@/component/game-detail/GamePlay/RoomSeat/EmptySeat";

interface RoomSeatProps {
    roomId: string;
    inviteLink: string;
    user?: {
        id: string;
        tagName: string;
        name: string;
        avatarUrl?: string;
        isOnline?: boolean;
        isFriended?: boolean;
    }
}

export default function RoomSeat({roomId, inviteLink, user}: RoomSeatProps) {
    return (
        <>
            {user ? (
                <PlayerSeat
                    id={user.id}
                    tagName={user.tagName}
                    name={user.name}
                    avatarUrl={user.avatarUrl}
                    isOnline={user.isOnline}
                    isFriended={user.isFriended}
                />
            ) : (
                <EmptySeat
                    roomId={roomId}
                    inviteLink={inviteLink}
                />
            )}
        </>
    )
}