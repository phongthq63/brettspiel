"use client"

import {Clear, Search} from "@mui/icons-material";
import {Input} from "@heroui/react";
import React, {useState, useEffect} from "react";
import GameSearch from "@/component/ui/SearchBarHeader/GameSearch";
import {useTranslation} from "react-i18next";

export default function SearchBarHeader() {
    const {t} = useTranslation();
    const [isSearch, setIsSearch] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);


    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            const updateHeaderHeight = () => {
                const height = header.offsetHeight;
                setHeaderHeight(height);
            };

            // Đo lần đầu
            updateHeaderHeight();

            // Đo lại khi window resize
            window.addEventListener('resize', updateHeaderHeight);

            return () => {
                window.removeEventListener('resize', updateHeaderHeight);
            };
        }
    }, []);

    const handleSearch = () => {
        setIsSearch(true)
    }

    const handleCancelSearch = () => {
        setIsSearch(false)
    }

    return (
        <div className="relative">
            <Input variant="flat"
                   classNames={{
                       input: [
                           "font-semibold",
                       ],
                       inputWrapper: [
                           "bg-gradient-to-r from-[rgba(156,252,248,0.3)] to-[rgba(110,123,251,0.3)]",
                           "shadow-[inset_0_2px_4px_0px_rgba(0,0,0,0.4)]",
                           "hover:!bg-transparent",
                           "transition-colors duration-300",
                       ],
                   }}
                   placeholder={t("header.search.placeholder")}
                   radius="lg"
                   endContent={isSearch
                       ? (
                           <Clear className="cursor-pointer" onClick={handleCancelSearch} />)
                       : (
                           <Search className="cursor-pointer" onClick={handleSearch}/>
                       )}
                   onFocus={handleSearch}
            />
            {isSearch && (
                <div className="fixed left-0 w-full flex flex-col gap-8 bg-black/[.6] py-2 md:py-4 px-1 md:px-40"
                     style={{
                         top: `${headerHeight}px`,
                         minHeight: `calc(100vh - ${headerHeight}px)`, // Giới hạn chiều cao tối đa
                     }}
                >
                    <GameSearch />
                </div>
            )}
        </div>)
}