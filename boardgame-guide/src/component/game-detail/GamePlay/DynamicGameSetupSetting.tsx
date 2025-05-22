import React, {useState} from "react";
import { Select, SelectItem } from "@heroui/react";
import { useGameSetup } from "@/store/game-setup/game-setup.context";
import { CollectionElement } from "@react-types/shared";
import { useShallow } from "zustand/react/shallow";
import { GameSetupSetting } from "@/types/game";
import { useGame } from "@/hooks/useGame";

const DynamicGameSetupSetting: React.FC = () => {
    const {
        setup,
    } = useGameSetup(useShallow((state) => ({
        setup: state.setup,
    })));
    const { onSetupSettingChange } = useGame();
    const [selectedDescriptions, setSelectedDescriptions] = useState<Record<string, string[]>>({});


    const handleSettingChange = (settingId: string, values: string[], description?: string[]) => {
        onSetupSettingChange(settingId, values);

        if (description) {
            setSelectedDescriptions((prev) => ({
                ...prev,
                [settingId]: description,
            }));
        }
    };

    const renderSetting = (setting: GameSetupSetting) => {
        switch (setting.type) {
            case "selection":
                return (
                    <div key={setting.id} className="mt-6">
                        <label className="block text-sm font-semibold mb-2">{setting.name}</label>
                        <Select
                            variant="bordered"
                            placeholder={`Select ${setting.name}`}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0] as string;
                                const selectedOption = setting.selection?.find((option) => option.id === selectedKey);
                                handleSettingChange(setting.id, [selectedKey], [selectedOption?.description ?? '']);
                            }}
                            aria-labelledby={`${setting.id}-label`}
                        >
                            {setting.selection?.map((option) => (
                                <SelectItem key={option.id} textValue={option.name}>
                                    {option.name}
                                </SelectItem>
                            )) as unknown as CollectionElement<object>}
                        </Select>
                        {selectedDescriptions[setting.id]?.at(0) && (
                            <p className="mt-4 text-sm text-gray-700">{selectedDescriptions[setting.id].at(0)}</p>
                        )}
                    </div>
                );
            case "series":
                return (
                    <div key={setting.id} className="mt-4">
                        <label className="block text-sm font-semibold mb-2">{setting.name}</label>
                        {setting.series?.map((subSetting) => renderSetting(subSetting))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {setup?.setting?.map((setting) => renderSetting(setting))}
        </div>
    );
};

export default DynamicGameSetupSetting;
