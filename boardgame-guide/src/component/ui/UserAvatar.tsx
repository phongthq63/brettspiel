import {useUser} from "@/store/user.context";
import {Avatar, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader} from "@heroui/react";
import {useDisclosure} from "@heroui/modal";
import useAuth from "@/hooks/useAuth";

export default function UserAvatar() {
    const { user } = useUser();
    const { logout } = useAuth();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleLogout = () => {
        logout()
    }

    return (
        <>
            <div className="relative w-[80px]">
                <Avatar
                    classNames={{
                        base: "bg-[#caf0f8] outline outline-[#90e0ef]",
                        name: "font-semibold text-lg"
                    }}
                    className="absolute top-0 right-0 -translate-y-1/3 w-16 h-16 cursor-pointer"
                    src={user?.avatarUrl}
                    name={user?.name}
                    size="lg"
                    onClick={() => onOpen()}
                />
            </div>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
                            <DrawerBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                    quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                    quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                                    adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                    officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                                    nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                                    deserunt nostrud ad veniam.
                                </p>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button color="primary" onPress={handleLogout}>
                                    Logout
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    )
}