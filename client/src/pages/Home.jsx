import '../assets/hero.jpg'

const Home = () => {

    return (
        <div >
            <Nav />
            <HeroSection />

        </div>
    );
};

const HeroSection = () => {
    return (
        <div className="relative">
            <section className="relative h-screen min-h-[600px] w-full overflow-hidden">            
                <div className="absolute inset-0 w-full h-full">
                    <div className="min-h-screen py-12 px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="rounded-xl shadow-2xl overflow-hidden mb-4">
                                <div className="relative bg-gradient-to-r from-red-100 to-red-400 h-48">
                                    <div className="absolute -bottom-16 left-8">
                                        <div className="relative">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden mb-4">
                                <div className="relative bg-gradient-to-r from-red-100 to-red-400 h-48">
                                    <div className="absolute -bottom-16 left-8">
                                        <div className="relative">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>             
            </section>
        </div>
    );
}

const categories = [
    { label: 'Start', emoji: '🚀' },
    { label: 'Art', emoji: '🎨' },
    { label: 'Entertainment', emoji: '🎬' },
    { label: 'Geography', emoji: '🌍' },
    { label: 'History', emoji: '📜' },
    { label: 'Languages', emoji: '🗣️' },
    { label: 'Science', emoji: '🔬' },
    { label: 'Sports', emoji: '⚽' },
    { label: 'Trivia', emoji: '❓' },
];
  
const Nav = () => {
    return (
        <nav className="flex justify-around py-4 border-b dark:border-gray-200">
            {categories.map(({ label, emoji }) => (
                <div
                    key={label}
                    className="group flex flex-col items-center cursor-pointer transition-colors text-gray-700 dark:text-gray-300 hover:text-primary-900 dark:hover:text-primary-400"
                >
                    <span className="text-lg">{emoji} {label}</span>
                    <span className="mt-2 h-[2px] w-10 bg-transparent group-hover:bg-primary-900 transition-all duration-300"></span>
                </div>
            ))}
        </nav>

    );
}

export default Home;