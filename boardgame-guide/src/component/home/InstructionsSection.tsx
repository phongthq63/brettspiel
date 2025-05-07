import {Card, CardBody, CardHeader} from "@heroui/card";
import { Button } from "@heroui/react";
import {CircleCheck, Dices, Gamepad, Trophy, UserRoundPlus} from "lucide-react";

export default function InstructionsSection() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-montserrat font-bold text-dark mb-8">How To Play</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <UserRoundPlus
                                    className="text-[#00b4d8]"
                                    strokeWidth="3px"
                                />
                                <h3 className="text-xl font-semibold flex items-center">
                                    Create an Account
                                </h3>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <p className="text-gray-600 mb-4">
                                Sign up for free to access all our multiplayer board games. Create your profile and connect with players worldwide.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <CircleCheck size="16px" className="text-green-400" />
                                    <span>Quick registration with email or social accounts</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CircleCheck size="16px" className="text-green-400" />
                                    <span>Customize your profile and avatar</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CircleCheck size="16px" className="text-green-400" />
                                    <span>Track your game history and statistics</span>
                                </li>
                            </ul>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Gamepad
                                    className="text-[#00b4d8]"
                                    strokeWidth="3px"
                                />
                                <h3 className="text-xl font-semibold flex items-center">
                                    Join or Create a Room
                                </h3>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <p className="text-gray-600 mb-4">
                                Browse active game rooms or create your own. Set game options and invite friends to play together.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <CircleCheck size="16px" className="text-green-400"/>
                                    <span>Join public rooms or create private ones</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CircleCheck size="16px" className="text-green-400"/>
                                    <span>Customize game settings and rules</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CircleCheck size="16px" className="text-green-400"/>
                                    <span>Invite friends via shareable links</span>
                                </li>
                            </ul>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Dices
                                    className="text-[#00b4d8]"
                                    strokeWidth="3px"
                                />
                                <h3 className="text-xl font-semibold flex items-center">
                                    Play and Interact
                                </h3>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <p className="text-gray-600 mb-4">
                                Experience real-time gameplay with interactive boards, chat, and voice options for the full multiplayer experience.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <CircleCheck size="16px" className="text-green-400"/>
                                    <span>Intuitive drag-and-drop game controls</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CircleCheck size="16px" className="text-green-400"/>
                                    <span>In-game chat and optional voice communication</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CircleCheck size="16px" className="text-green-400"/>
                                    <span>Emotes and reactions for fun interaction</span>
                                </li>
                            </ul>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Trophy
                                    className="text-[#00b4d8]"
                                    strokeWidth="3px"
                                />
                                <h3 className="text-xl font-semibold flex items-center">
                                    Compete and Improve
                                </h3>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <p className="text-gray-600 mb-4">
                                Climb the leaderboards, participate in tournaments, and improve your skills with each game you play.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <CircleCheck size="16px" className="text-green-400"/>
                                    <span>Track your performance with detailed statistics</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CircleCheck size="16px" className="text-green-400"/>
                                    <span>Join daily and weekly tournaments</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CircleCheck size="16px" className="text-green-400"/>
                                    <span>Earn achievements and showcase them on your profile</span>
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                </div>

                <div className="mt-12 text-center">
                    <Button className="bg-[#0077b6] hover:bg-[#00b4d8] text-white">
                        Learn More About Our Games
                    </Button>
                </div>
            </div>
        </section>
    );
}