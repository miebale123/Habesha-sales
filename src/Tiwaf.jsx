export default function App() {
    return (
        <div className="relative min-h-screen bg-gray-100">
            hello
            <div className="absolute inset-0 z-50 bg-black/60  flex items-center justify-center ">
                <div className="holder">
                    <div className="candle">
                        <div className="blinking-glow"></div>
                        <div className="thread"></div>
                        <div className="glow"></div>
                        <div className="flame"></div>
                    </div>
                </div>

                <button className="text-2xl border p-16 bg-indigo-500 hover:cursor-pointer">
                    Tiwaf Sales Go
                </button>
            </div>
        </div>
    );
}
