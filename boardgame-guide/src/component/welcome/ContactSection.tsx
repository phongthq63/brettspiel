import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {Facebook, FmdGoodOutlined, Instagram, Mail, Phone, Twitter, ChatBubbleOutlineOutlined} from "@mui/icons-material";
import {Button, Input, Textarea, Form} from "@heroui/react";
import {Card, CardHeader, CardBody} from "@heroui/card";
import {ContactService} from "@/service/game.service";
import {toast} from "@/utils/toast";

export default function ContactSection() {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        ContactService.sendContact({body: {...formData}})
            .then(response => {
                if (response.code == 0) {

                    toast({
                        title: t("section.contact.success.title"),
                        description: t("section.contact.success.message"),
                        autoClose: 2000,
                    })

                    setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: ""
                    })
                } else {
                    toast({
                        title: t("section.contact.error.title"),
                        description: response.msg,
                        autoClose: 2000,
                    })
                }
            })
            .catch((error) => {
                console.log(error)
                toast({
                    title: t("section.contact.error.title"),
                    description: t("section.contact.error.message"),
                    autoClose: 2000,
                })
            })
            .finally(() => setIsSubmitting(false))
    }

    return (
        <section id="contact" className="py-20 relative overflow-hidden bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row">
                    <motion.div
                        className="w-full md:w-1/2 mb-12 md:mb-0 text-white"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="font-bold text-3xl md:text-4xl mb-4">{t("section.contact.title")}</h1>
                        <meta name="description" content={t("section.contact.metaDescription")} />
                        <meta name="keywords" content="contact, boardgame, support" />
                        <p className="mb-8 max-w-lg opacity-90">{t("section.contact.subtitle")}</p>

                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail />
                                <span>support@boardgamehub.com</span>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <Phone />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FmdGoodOutlined />
                                <span>123 Game Street, Digital City</span>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <a href="#"
                               className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
                               aria-label="Facebook">
                                <Facebook />
                            </a>
                            <a href="#"
                               className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
                               aria-label="Twitter">
                                <Twitter />
                            </a>
                            <a href="#" className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all" aria-label="Instagram">
                                <Instagram />
                            </a>
                            <a href="#" className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all" aria-label="Chat">
                                <ChatBubbleOutlineOutlined />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        className="w-full md:w-1/2"
                        initial={{opacity: 0, x: 30}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                    >
                        <Card className="p-8 shadow-lg">
                            <CardHeader>
                                <h2 className="font-semibold text-xl mb-6">{t("section.contact.form.title")}</h2>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit} aria-label="Contact Form">
                                    <Input
                                        id="name"
                                        label={t("section.contact.form.name")}
                                        labelPlacement="outside"
                                        placeholder={t("section.contact.form.namePlaceholder")}
                                        className="w-full mb-4 border-gray-300 focus:ring-2 focus:ring-blue-400"
                                        variant="bordered"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        id="email"
                                        type="email"
                                        label={t("section.contact.form.email")}
                                        labelPlacement="outside"
                                        placeholder={t("section.contact.form.emailPlaceholder")}
                                        className="w-full mb-4 border-gray-300 focus:ring-2 focus:ring-blue-400"
                                        variant="bordered"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        id="subject"
                                        label={t("section.contact.form.subject")}
                                        labelPlacement="outside"
                                        placeholder={t("section.contact.form.subjectPlaceholder")}
                                        className="w-full mb-4 border-gray-300 focus:ring-2 focus:ring-blue-400"
                                        variant="bordered"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Textarea
                                        id="message"
                                        rows={4}
                                        label={t("section.contact.form.message")}
                                        labelPlacement="outside"
                                        placeholder={t("section.contact.form.messagePlaceholder")}
                                        className="w-full mb-6 border-gray-300 focus:ring-2 focus:ring-blue-400"
                                        variant="bordered"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] py-3 font-medium text-white"
                                        style={{
                                            backgroundImage: "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)"
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? t("section.contact.form.sending") : t("section.contact.form.submit")}
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}