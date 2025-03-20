export default function StatsSection() {
    const stats = [
        {
            value: "100+",
            label: "Games Played",
            description: "Join thousands of players in exciting matches!"
        },
        {
            value: "20k+",
            label: "Total Players",
            description: "Connect with players from all over the world."
        },
        {
            value: "24/7",
            label: "Availability",
            description: "Play anytime, from anywhere!"
        }
    ]

    return (
        <section className="py-12 px-4 bg-primary/5">
            <div className="container mx-auto max-w-7xl">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-6">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                {stat.value}
                            </div>
                            <div className="text-xl font-semibold mb-2">{stat.label}</div>
                            <div className="text-muted-foreground">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}