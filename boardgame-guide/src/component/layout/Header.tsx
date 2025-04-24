import {useTranslation} from "react-i18next";
import {
    Button, Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@heroui/react";
import Link from "next/link";
import LogoSVG from "@/assets/svg/logo";
import LanguageSwitcher from "@/component/ui/LanguageSwitcher";
import SearchBarHeader from "@/component/ui/SearchBarHeader/SearchBarHeader";


const Header = () => {
    const { t } = useTranslation()

    return (
        <Navbar position="static" className="shadow-md">
            <NavbarBrand>
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <LogoSVG className="mr-2 h-8 w-8" />
                    <span className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-2xl font-bold text-transparent">
                        BoardGame
                        <span className="font-normal">Hub</span>
                    </span>
                </Link>
            </NavbarBrand>

            <NavbarContent justify="start">
                <SearchBarHeader />
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Button className="bg-transparent text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent">
                        {t("header.playNow")}
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button className="bg-transparent text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent">
                        {t("header.news")}
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button className="bg-transparent text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent">
                        {t("header.games")}
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <LanguageSwitcher />
                </NavbarItem>
                <NavbarItem>
                    <div className="flex gap-2">
                        <Button className="hidden sm:block bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text font-medium text-transparent"
                                style={{
                                    backgroundImage: "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)"
                                }}>
                            {t("signup")}
                        </Button>
                        <Button className="hidden sm:block bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] font-medium text-white shadow-md"
                                style={{
                                    backgroundImage: "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)"
                                }}>
                            {t("login")}
                        </Button>
                    </div>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default Header