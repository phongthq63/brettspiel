import {Button} from "@heroui/react";
import {useTranslation} from "react-i18next";

export default function GamePlay() {
    const { t } = useTranslation()


    return (
        <div className="flex flex-col justify-center items-center gap-4 p-4">
            <Button
                className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] border-4 hover:border-none border-[rgba(110,123,251,1)] bg-clip-text hover:bg-clip-border text-transparent hover:text-white w-64 h-20 text-3xl font-semibold uppercase"
                style={{
                    backgroundImage: "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)",
                    transition: "all 0.1s"
                }}
            >
                {"Play now"}
            </Button>
            <Button
                className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] border-4 hover:border-none border-[rgba(110,123,251,1)] bg-clip-text hover:bg-clip-border text-transparent hover:text-white w-64 h-20 text-3xl font-semibold uppercase"
                style={{
                    backgroundImage: "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)",
                    transition: "all 0.1s"
                }}
            >
                {"Tutorial"}
            </Button>
        </div>
    )
}