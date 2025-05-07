import {Lang, useLanguage} from "@/store/language.context";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import {Languages} from "lucide-react";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()

    const changeLanguage = (language: Lang) => {
        setLanguage(language)
    }

    return (
        <Dropdown shouldBlockScroll={false}>
            <DropdownTrigger>
                <Button
                    className="bg-transparent text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent"
                    startContent={
                        <Languages size="16px" className="text-gray-700" />
                    }
                    size="sm"
                >
                    {language}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Language selection">
                <DropdownItem key="en" onPress={() => changeLanguage("en")}>
                    English
                </DropdownItem>
                <DropdownItem key="vi" onPress={() => changeLanguage("vi")}>
                    Tiếng Việt
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}