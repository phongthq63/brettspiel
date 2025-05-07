import Image from "next/image";
import {ShieldCheck, TabletSmartphone, Users} from "lucide-react";

export default function AboutSection() {
    return (
        <section id="about" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <Image
                            src="/photo-1611996575749-79a3a250f948.jpg"
                            alt="People playing board games"
                            width={500}
                            height={500}
                        />
                    </div>

                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-montserrat font-bold text-dark mb-6">
                            About BoardGameHub
                        </h2>
                        <p className="text-gray-600 mb-4">
                            BoardGameHub brings the joy of traditional board games to the digital world, allowing
                            friends and family to connect and play together regardless of distance.
                        </p>
                        <p className="text-gray-600 mb-8">
                            Our platform features faithful adaptations of classic board games as well as modern
                            favorites, all optimized for online multiplayer gameplay with intuitive controls and
                            real-time interaction.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <Users className="text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Community-Focused
                                    </h3>
                                    <p className="text-gray-600">
                                        Join a thriving community of board game enthusiasts from around the world.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-green-100 p-3 rounded-lg mr-4">
                                    <TabletSmartphone className="text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Cross-Platform
                                    </h3>
                                    <p className="text-gray-600">
                                        Play seamlessly across all your devices - desktop, tablet, or mobile.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                    <ShieldCheck className="text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="font-poppins font-semibold text-lg">
                                        Fair Play Guaranteed
                                    </h3>
                                    <p className="text-gray-600">
                                        Our systems ensure fair gameplay and prevent cheating for the best experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}