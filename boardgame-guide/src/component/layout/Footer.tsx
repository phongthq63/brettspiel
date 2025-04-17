import { useTranslation } from "react-i18next";
import {ChatBubbleOutlineOutlined, Facebook, Instagram, Twitter} from "@mui/icons-material";


export default function Footer() {
    const { t } = useTranslation();


    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-xl mb-4 flex items-center">
                            BoardGame Hub
                        </h3>
                        <p className="text-gray-400 mb-4">{t("footer.tagline")}</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <ChatBubbleOutlineOutlined className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-lg mb-4">{t("footer.links")}</h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => scrollToSection("root")}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {t("footer.links.home")}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("features")}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {t("footer.links.features")}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("games")}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {t("footer.links.games")}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("stats")}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {t("footer.links.stats")}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("contact")}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {t("footer.links.contact")}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-lg mb-4">{t("footer.resources")}</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("footer.resources.rules")}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("footer.resources.tutorials")}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("footer.resources.faq")}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("footer.resources.support")}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("footer.resources.community")}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-lg mb-4">{t("footer.legal")}</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("footer.legal.terms")}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("footer.legal.privacy")}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("footer.legal.cookies")}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("footer.legal.gdpr")}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t("footer.legal.licenses")}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} BoardGame Hub. {t("footer.copyright")}</p>
                </div>
            </div>
        </footer>
    )
}