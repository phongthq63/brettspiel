import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';

const features = [
    {
        icon: <PeopleRoundedIcon className="w-6 h-6" />,
        title: "Multiplayer Gaming",
        description: "Play with friends or challenge players worldwide in real-time matches."
    },
    {
        icon: <QuestionAnswerRoundedIcon className="w-6 h-6" />,
        title: "Live Chat",
        description: "Communicate with other players through our integrated chat system."
    }
]

export default function FeatureSection() {
    return (
        <section className="py-24 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Features</h2>
                    <p className="text-xl text-muted-foreground">
                        Discover what makes our platform unique
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index}
                             className="bg-card p-6 rounded-lg border transform hover:scale-105 transition-transform duration-200"
                        >
                            <div className="text-primary mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}