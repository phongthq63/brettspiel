'use client'

import AuthModal from "@/component/layout/AuthModal";
import {useUser} from "@/store/user.context";
import {useDisclosure} from "@heroui/modal";

export const AuthWrapper = ({ children }: { children: React.ReactElement }) => {
    const { user } = useUser();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const handleClick = (e: any) => {
        if (user) return

        // block event + open modal
        e.preventDefault();
        e.stopPropagation();
        onOpen();
    };

    return (
        <>
            <div className="relative" onMouseDownCapture={(e) => handleClick(e)}>
                {children}
            </div>
            <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </>

    )
};