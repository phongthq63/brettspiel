import React from "react";
import { Select, SelectItem } from "@heroui/react";
import Image from "next/image";
import { useGameSetup } from "@/store/game-setup/game-setup.context";
import { useGameDetail } from "@/store/game-detail.context";
import { CollectionElement } from "@react-types/shared";
import { useShallow } from "zustand/react/shallow";
import DynamicGameSetupSetting from "@/component/game-detail/GamePlay/DynamicGameSetupSetting";
import {useGame} from "@/hooks/useGame";

const GameSetupSetting: React.FC = () => {
    const { data } = useGameDetail();
    const {
        type,
        image_box_url,
        description,
    } = useGameSetup(useShallow((state) => ({
        type: state.type,
        image_box_url: state.imageBoxUrl,
        description: state.description,
    })));
    const { onSelectGameTypeChange } = useGame();


    return (
        <div>
            {/* Game Type Selection */}
            <div>
                {data.expansions && (
                    <Select
                        classNames={{
                            value: "font-semibold",
                        }}
                        variant="bordered"
                        placeholder="Select game type"
                        isRequired
                        defaultSelectedKeys={[type]}
                        onSelectionChange={(keys) => onSelectGameTypeChange(Array.from(keys)[0] as string)}
                        aria-labelledby="type-label"
                    >
                        <SelectItem key={data.type} textValue={data.title}>
                            <div className="flex items-center gap-2">
                                <div className="relative w-[100px] h-[100px]">
                                    {data.image_box_url && (
                                        <Image
                                            className="object-fill"
                                            src={data.image_box_url}
                                            alt="Image box url"
                                            fill
                                            sizes="100%"
                                        />
                                    )}
                                </div>
                                <div className="grow font-semibold">{data.title}</div>
                            </div>
                        </SelectItem>
                        {data.expansions.map((expansion) => (
                            <SelectItem key={expansion.id} textValue={expansion.title}>
                                <div className="flex items-center gap-2">
                                    <div className="relative w-[100px] h-[100px]">
                                        {expansion.image_box_url && (
                                            <Image
                                                className="object-cover"
                                                src={expansion.image_box_url}
                                                alt="Expansion image box url"
                                                fill
                                                sizes="100%"
                                            />
                                        )}
                                    </div>
                                    <div className="grow font-semibold">{expansion.title}</div>
                                </div>
                            </SelectItem>
                        )) as unknown as CollectionElement<object>}
                    </Select>
                )}
                <div>
                    {image_box_url && (
                        <div className="relative w-[100px] h-[100px] float-left m-1">
                            <Image
                                className="object-cover"
                                src={image_box_url}
                                alt="Selected game image"
                                fill
                                sizes="100%"
                            />
                        </div>
                    )}
                    <p className="text-sm text-gray-700 my-4">{description}</p>
                </div>
            </div>

            {/* Dynamic Settings */}
            <DynamicGameSetupSetting />
        </div>
    );
};

export default GameSetupSetting;
