import { useTranslation } from "react-i18next";
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@heroui/react";
import Link from "next/link";
import LogoSVG from "@/assets/svg/logo";
import LanguageSwitcher from "@/component/ui/LanguageSwitcher";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const onClickPlay = () => {
        router.push('/');
    };

    return (
        <Navbar className="fixed shadow-md" role="navigation" aria-label="Main Navigation">
            <NavbarBrand>
                {/* Logo */}
                <Link
                    href="/"
                    prefetch
                    shallow
                    className="flex items-center"
                    aria-label="BoardGame Hub Home"
                >
                    <LogoSVG className="mr-2 h-8 w-8" />
                    <span className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-2xl font-bold text-transparent">
                        BoardGame
                        <span className="font-normal">Hub</span>
                    </span>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Button
                        onPress={() => scrollToSection("features")}
                        className="bg-transparent text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent"
                        aria-label="Features Section"
                    >
                        {t("header.features")}
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        onPress={() => scrollToSection("games")}
                        className="bg-transparent text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent"
                        aria-label="Games Section"
                    >
                        {t("header.games")}
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        onPress={() => scrollToSection("contact")}
                        className="bg-transparent text-gray-700 hover:bg-gradient-to-r hover:from-[rgba(156,252,248,1)] hover:to-[rgba(110,123,251,1)] hover:bg-clip-text hover:text-transparent"
                        aria-label="Contact Section"
                    >
                        {t("header.contact")}
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <LanguageSwitcher aria-label="Language Switcher" />
                </NavbarItem>
                <NavbarItem>
                    <Button
                        className="hidden sm:block bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] font-medium text-white shadow-md"
                        style={{
                            backgroundImage: "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)"
                        }}
                        onPress={onClickPlay}
                        aria-label="Play Now"
                    >
                        {t("playNow")}
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;