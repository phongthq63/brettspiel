"use client";

import {Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/modal";
import React, {useState} from "react";
import {Button, Form, Input, Tab, Tabs} from "@heroui/react";
import {Key} from "@react-types/shared";
import {Eye, EyeOff, Lock, LogIn, Mail, User} from "lucide-react";
import {toast} from "@/utils/toast";
import {FaFacebook, FaGoogle, FaMicrosoft} from "react-icons/fa";
import useAuth from "@/hooks/useAuth";

interface AuthModalProps {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void
}

export default function AuthModal({ isOpen, onOpenChange } : AuthModalProps) {
    const [selected, setSelected] = useState<Key>("login");

    return (
        <Modal
            placement="center"
            shouldBlockScroll={false}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader>
                            <div className="text-center">
                                <h2 className="text-xl mb-1">
                                    <span className="hidden md:block bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-2xl font-bold text-transparent">BoardGame<span className="font-normal">Hub</span></span>
                                </h2>
                                <p className="font-light text-sm text-gray-400">
                                    Đăng nhập hoặc đăng ký để trải nghiệm các trò chơi hấp dẫn
                                </p>
                            </div>

                        </ModalHeader>
                        <ModalBody>
                            <Tabs
                                classNames={{
                                    tabList: "bg-[#caf0f8]",
                                    tabContent: "group-data-[selected=true]:text-[#00b4d8]",
                                }}
                                fullWidth
                                aria-label="Tabs form"
                                size="md"
                                selectedKey={selected}
                                onSelectionChange={setSelected}
                            >
                                <Tab key="login" title="Login">
                                    <LoginForm
                                        onLogin={(success) => success && onOpenChange?.(false)}
                                        onClickSignup={() => setSelected("sign-up")
                                    } />
                                </Tab>
                                <Tab key="sign-up" title="Sign up">
                                    <SignupForm
                                        onSignup={(success) => success && setSelected("login")}
                                        onClickLogin={() => setSelected("login")}
                                    />
                                </Tab>
                            </Tabs>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

interface LoginFormProps {
    onLogin?: (success: boolean) => void;
    onClickSignup?: () => void;
}

function LoginForm({ onLogin, onClickSignup }: LoginFormProps) {
    const { login, loginWithSocial } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        login(email, password)
            .then(data => {
                if (data.code == 0) {
                    onLogin?.(true)
                    toast({
                        title: "Login success",
                        description: data.msg,
                        autoClose: 2000
                    })
                } else {
                    onLogin?.(false)
                    toast({
                        title: "Login fail",
                        description: data.msg,
                        autoClose: 2000
                    })
                }
            })
            .catch(error => {
                console.error(error)
                onLogin?.(false)
                toast({
                    title: "Login error",
                    description: error,
                    autoClose: 2000
                })
            })
            .finally(() => setIsLoading(false));
    }

    const handleLoginGoogle = () => {
        loginWithSocial('google')
            .catch(error => {
                console.error('Google login error:', error);
                toast({
                    title: "Google login failed",
                    description: "Could not login with Google, please try again.",
                });
            })
    }

    const handleLoginFacebook = () => {
        loginWithSocial('facebook')
            .catch(error => {
                console.error('Facebook login error:', error);
                toast({
                    title: "Facebook login failed",
                    description: "Could not login with Facebook, please try again.",
                });
            })
    }

    const handleLoginMicrosoft = () => {
        loginWithSocial('microsoft')
            .catch(error => {
                console.error('Microsoft login error:', error);
                toast({
                    title: "Microsoft login failed",
                    description: "Could not login with Microsoft, please try again.",
                });
            })
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-6">
                    <Input
                        id="email"
                        classNames={{
                            inputWrapper: "border-1",
                            label: "font-semibold",
                            innerWrapper: "text-gray-500",
                            input: "text-black",
                        }}
                        variant="bordered"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="email@example.com"
                        type="email"
                        startContent={<Mail size={16}/>}
                        isRequired
                        value={email}
                        onValueChange={setEmail}
                    />
                    <Input
                        id="password"
                        classNames={{
                            inputWrapper: "border-1",
                            label: "font-semibold",
                            innerWrapper: "text-gray-500",
                            input: "text-black",
                        }}
                        variant="bordered"
                        label="Password"
                        labelPlacement="outside"
                        placeholder="•••••••"
                        type={isPasswordVisible ? "text" : "password"}
                        startContent={<Lock size={16}/>}
                        endContent={isPasswordVisible ?
                            <EyeOff
                                className="cursor-pointer hover:text-black"
                                size={16}
                                onClick={() => setIsPasswordVisible(false)}
                            /> :
                            <Eye
                                className="cursor-pointer hover:text-black"
                                size={16}
                                onClick={() => setIsPasswordVisible(true)}
                            />
                        }
                        isRequired
                        value={password}
                        onValueChange={setPassword}
                    />
                </div>

                <div className="w-full flex flex-col gap-3 my-3">
                    <Button
                        className="w-full bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] font-semibold text-white"
                        type="submit"
                        isLoading={isLoading}
                    >
                        <LogIn size={16}/>
                        Login
                    </Button>
                    <div className="w-full relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-2">
                        <Button
                            className="bg-white text-black hover:bg-gray-100 border border-gray-300"
                            variant="bordered"
                            radius="sm"
                            onPress={handleLoginGoogle}
                            disabled={isLoading}
                        >
                            <FaGoogle />
                        </Button>
                        <Button
                            className="bg-[#4267B2] text-white hover:bg-[#365899] border-none"
                            variant="bordered"
                            radius="sm"
                            onPress={handleLoginFacebook}
                            disabled={isLoading}
                        >
                            <FaFacebook />
                        </Button>

                        <Button
                            className="bg-[#2f2f2f] text-white hover:bg-[#1f1f1f] border-none"
                            variant="bordered"
                            radius="sm"
                            onPress={handleLoginMicrosoft}
                            disabled={isLoading}
                        >
                            <FaMicrosoft />
                        </Button>
                    </div>
                </div>
            </Form>
            <p className="text-sm text-gray-500 text-center">
                Chưa có tài khoản? <span className="text-[#0077b6] hover:underline cursor-pointer"
                                         onClick={onClickSignup}>Đăng kí</span>
            </p>
        </div>
    )
}

interface SignupFormProps {
    onSignup?: (success: boolean) => void;
    onClickLogin?: () => void
}

function SignupForm({onSignup, onClickLogin}: SignupFormProps) {
    const { register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        register(email, password, confirmPassword)
            .then(response => {
                if (response.code == 0) {
                    onSignup?.(true)
                    toast({
                        title: "Register success",
                        description: "Register success",
                        autoClose: 2000
                    })
                } else {
                    onSignup?.(false)
                    toast({
                        title: "Login fail",
                        description: response.msg,
                        autoClose: 2000
                    })
                }
            })
            .catch(error => {
                console.log(error)
                onSignup?.(false)
                toast({
                    title: "Login error",
                    description: error,
                    autoClose: 2000
                })
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-6">
                    <Input
                        id="email"
                        classNames={{
                            inputWrapper: "border-1",
                            label: "font-semibold",
                            innerWrapper: "text-gray-500",
                            input: "text-black",
                        }}
                        variant="bordered"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="email@example.com"
                        type="email"
                        startContent={<Mail size={16}/>}
                        isRequired
                        value={email}
                        onValueChange={setEmail}
                    />
                    <Input
                        id="password"
                        classNames={{
                            inputWrapper: "border-1",
                            label: "font-semibold",
                            innerWrapper: "text-gray-500",
                            input: "text-black",
                        }}
                        variant="bordered"
                        label="Password"
                        labelPlacement="outside"
                        placeholder="•••••••"
                        type={isPasswordVisible ? "text" : "password"}
                        startContent={<Lock size={16}/>}
                        endContent={isPasswordVisible ?
                            <EyeOff
                                className="cursor-pointer hover:text-black"
                                size={16}
                                onClick={() => setIsPasswordVisible(false)}
                            /> :
                            <Eye
                                className="cursor-pointer hover:text-black"
                                size={16}
                                onClick={() => setIsPasswordVisible(true)}
                            />
                        }
                        isRequired
                        value={password}
                        onValueChange={setPassword}
                    />
                    <Input
                        id="confirm-password"
                        classNames={{
                            inputWrapper: "border-1",
                            label: "font-semibold",
                            innerWrapper: "text-gray-500",
                            input: "text-black",
                        }}
                        variant="bordered"
                        label="Confirm Password"
                        labelPlacement="outside"
                        placeholder="•••••••"
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        startContent={<Lock size={16}/>}
                        endContent={isConfirmPasswordVisible ?
                            <EyeOff
                                className="cursor-pointer hover:text-black"
                                size={16}
                                onClick={() => setIsConfirmPasswordVisible(false)}
                            /> :
                            <Eye
                                className="cursor-pointer hover:text-black"
                                size={16}
                                onClick={() => setIsConfirmPasswordVisible(true)}
                            />
                        }
                        isRequired
                        value={confirmPassword}
                        onValueChange={setConfirmPassword}
                    />
                </div>
                <Button
                    className="w-full bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] py-3 font-semibold text-white my-2"
                    type="submit"
                    isLoading={isLoading}
                >
                    <User size={16} />
                    Signup
                </Button>
            </Form>
            <p className="text-sm text-gray-500 text-center">
                Đã có tài khoản? <span className="text-[#0077b6] hover:underline cursor-pointer" onClick={onClickLogin}>Đăng nhập</span>
            </p>
        </div>
    )
}