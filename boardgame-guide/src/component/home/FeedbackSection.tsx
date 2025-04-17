import { useTranslation } from 'react-i18next';
import React, {useState} from "react";
import {addToast, Button, Form, Input, Textarea} from '@heroui/react';


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

        try {
            addToast({
                title: t("contact.success.title"),
                description: t("contact.success.message"),
            })

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
        } catch (error) {
            console.log(error)
            addToast({
                title: t("contact.error.title"),
                description: t("contact.error.message"),
            })
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{"Share Your Feedback"}</h2>

                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <img
                            src="/photo-1496449903678-68ddcb189a24.jpg"
                            alt={t('feedback.imageAlt')}
                            className="rounded-lg shadow-xl w-full h-auto object-cover"
                        />
                    </div>

                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{"We'd Love to Hear From You"}</h3>
                            <p className="text-gray-600 mb-6">{"Your feedback helps us improve our platform and bring more exciting board games to the community."}</p>

                            <Form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    id="name"
                                    label={t("contact.form.name")}
                                    labelPlacement="outside"
                                    placeholder={t("contact.form.namePlaceholder")}
                                    className="w-full mb-4 border-gray-300 focus:ring-2 focus:ring-blue-400"
                                    variant="bordered"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    id="email"
                                    type="email"
                                    label={t("contact.form.email")}
                                    labelPlacement="outside"
                                    placeholder={t("contact.form.emailPlaceholder")}
                                    className="w-full mb-4 border-gray-300 focus:ring-2 focus:ring-blue-400"
                                    variant="bordered"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    id="subject"
                                    label={t("contact.form.subject")}
                                    labelPlacement="outside"
                                    placeholder={t("contact.form.subjectPlaceholder")}
                                    className="w-full mb-4 border-gray-300 focus:ring-2 focus:ring-blue-400"
                                    variant="bordered"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                                <Textarea
                                    id="message"
                                    rows={4}
                                    label={t("contact.form.message")}
                                    labelPlacement="outside"
                                    placeholder={t("contact.form.messagePlaceholder")}
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
                                    {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}