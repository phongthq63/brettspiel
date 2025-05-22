import {CardBody, CardHeader} from "@heroui/card";
import {Avatar, Button, Card} from "@heroui/react";
import React, {useState} from "react";
import {wait} from "@/utils";
import {GameSeat} from "@/types/game";
import {User} from "lucide-react";

type PlayerInfoCardProps = GameSeat

export function PlayerInfoCard({tagName, name, avatarUrl, isFriended, isMe, local}: PlayerInfoCardProps) {
    const [loading, setLoading] = useState(false);


    const handleFriendToggle = async () => {
        setLoading(true); // Set loading to true
        try {
            if (isFriended) {
                // Send unfriend request
                await wait(2000);
            } else {
                // Send add friend request
                await wait(2000);
            }
        } catch (error) {
            console.error("Error updating friend status:", error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    return (
        <Card className="border-none bg-transparent" shadow="none">
            <CardHeader>
                <div className="flex justify-between gap-8">
                    <div className="flex gap-3">
                        <Avatar
                            src={avatarUrl}
                            name={name}
                        />
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="text-small font-semibold">{name}</h4>
                            <h5 className="text-small tracking-tight text-default-500">{tagName}</h5>
                        </div>
                    </div>
                    <div className="min-w-8 flex items-center gap-2">
                        {!(isMe || local) && (
                            <Button
                                className="border-1 font-semibold"
                                color="primary"
                                radius="full"
                                size="sm"
                                variant={isFriended ? "bordered" : "solid"}
                                startContent={<User size={16} />}
                                isDisabled={loading}
                                onPress={handleFriendToggle}
                            >
                                {isFriended ? "Unfriend" : "Add friend"}
                            </Button>
                        )}
                    </div>
                </div>

            </CardHeader>
            <CardBody className="border-t-1">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Games played:</span>
                    <span className="text-sm font-semibold">132</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Win rate:</span>
                    <span className="text-sm font-semibold">42%</span>
                </div>
            </CardBody>
        </Card>
    )
}