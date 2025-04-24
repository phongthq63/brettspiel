import { useTranslation } from 'react-i18next';
import React, {useState} from "react";
import {Button, Form, Input, Textarea} from '@heroui/react';
import {toast} from "@/utils/toast";
import {Card, CardBody, CardHeader} from "@heroui/card";
import {FeedbackService} from "@/service/game.service";


export default function FeedbackSection() {
    const { t } = useTranslation();
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

        FeedbackService.sendFeedback({body: {...formData}})
            .then(response => {
                if (response.code == 0) {

                    toast({
                        title: t("section.feedback.success.title"),
                        description: t("section.feedback.success.message"),
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
                        title: t("section.feedback.error.title"),
                        description: response.msg,
                        autoClose: 2000,
                    })
                }
            })
            .catch((error) => {
                console.log(error)
                toast({
                    title: t("section.feedback.error.title"),
                    description: t("section.feedback.error.message"),
                    autoClose: 2000,
                })
            })
            .finally(() => setIsSubmitting(false))
    }

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t("section.feedback.title")}</h2>

                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <img
                            src="/photo-1496449903678-68ddcb189a24.jpg"
                            alt="Image"
                            className="rounded-lg shadow-xl w-full h-auto object-cover"
                        />
                    </div>

                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <Card className="p-8 shadow-lg">
                            <CardHeader>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{t("section.feedback.subtitle")}</h3>
                                    <p className="text-gray-600 mb-6">{t("section.feedback.description")}</p>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <Input
                                        id="name"
                                        label={t("section.feedback.form.name")}
                                        labelPlacement="outside"
                                        placeholder={t("section.feedback.form.namePlaceholder")}
                                        className="w-full mb-4 border-gray-300 focus:ring-2 focus:ring-blue-400"
                                        variant="bordered"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        id="email"
                                        type="email"
                                        label={t("section.feedback.form.email")}
                                        labelPlacement="outside"
                                        placeholder={t("section.feedback.form.emailPlaceholder")}
                                        className="w-full mb-4 border-gray-300 focus:ring-2 focus:ring-blue-400"
                                        variant="bordered"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        id="subject"
                                        label={t("section.feedback.form.subject")}
                                        labelPlacement="outside"
                                        placeholder={t("section.feedback.form.subjectPlaceholder")}
                                        className="w-full mb-4 border-gray-300 focus:ring-2 focus:ring-blue-400"
                                        variant="bordered"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Textarea
                                        id="message"
                                        rows={4}
                                        label={t("section.feedback.form.message")}
                                        labelPlacement="outside"
                                        placeholder={t("section.feedback.form.messagePlaceholder")}
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
                                        {isSubmitting ? t("section.feedback.form.sending") : t("section.feedback.form.submit")}
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}