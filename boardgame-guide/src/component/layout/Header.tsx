"use client"

import {useTranslation} from "react-i18next";
import {
    Button, Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem, NavbarMenu, NavbarMenuItem,
    NavbarMenuToggle
} from "@heroui/react";
import Link from "next/link";
import LogoSVG from "@/assets/svg/logo";
import LanguageSwitcher from "@/component/ui/LanguageSwitcher";
import SearchBarHeader from "@/component/ui/SearchBarHeader";
import {useState} from "react";
import {Menu, X} from "lucide-react";
import AuthModal from "@/component/layout/AuthModal";
import {useDisclosure} from "@heroui/modal";
import {useUser} from "@/store/user.context";
import UserAvatar from "@/component/ui/UserAvatar";


const Header = () => {
    const { t } = useTranslation()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { user } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const handleOpenAuth = () => {
        onOpen()
    }

    return (
        <Navbar
            position="static"
            className="shadow-md"
            isBlurred={false}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarMenuToggle
                icon={(isOpen) => isOpen ? (<X />) : (<Menu />)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden"
            />

            <NavbarBrand>
                {/* Logo */}
                <Link
                    href="/"
                    prefetch={true}
                    className="flex items-center"
                >
                    <LogoSVG className="mr-2 h-8 w-8" />
                    <span className="hidden md:block bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-2xl font-bold text-transparent">
                        BoardGame
                        <span className="font-normal">Hub</span>
                    </span>
                </Link>
            </NavbarBrand>

            <NavbarContent justify="start">
                <SearchBarHeader />
            </NavbarContent>

            <NavbarContent className="hidden lg:flex gap-4" justify="center">
                <NavbarItem>
                    <Link
                        href="/"
                        prefetch={true}
                        className="bg-transparent text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent"
                    >
                        {t("header.playNow")}
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        href="/news"
                        prefetch={true}
                        className="bg-transparent text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent"
                    >
                        {t("header.news")}
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        href="/game"
                        prefetch={true}
                        className="bg-transparent text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent"
                    >
                        {t("header.games")}
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:block">
                    <LanguageSwitcher />
                </NavbarItem>
                {user ? (
                    <UserAvatar />
                ) : (
                    <NavbarItem className="hidden md:block">
                        <div className="flex gap-2">
                            <Button
                                className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-transparent"
                                onPress={handleOpenAuth}
                            >
                                {t("signup")}
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] text-white shadow-md"
                                onPress={handleOpenAuth}
                            >
                                {t("login")}
                            </Button>
                        </div>
                        <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} />
                    </NavbarItem>
                )}
            </NavbarContent>

            <NavbarMenu>
                <NavbarMenuItem key="playnow">
                    <Link
                        href="/"
                        prefetch={true}
                        className="bg-transparent text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent"
                    >
                        {t("header.playNow")}
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem key="news">
                    <Link
                        href="/news"
                        prefetch={true}
                        className="bg-transparent text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent"
                    >
                        {t("header.news")}
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem key="games">
                    <Link
                        href="/game"
                        prefetch={true}
                        className="bg-transparent text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent"
                    >
                        {t("header.games")}
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}

export default Header