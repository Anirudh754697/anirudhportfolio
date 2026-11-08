export default function Waveform({ count = 44, className = "", barClassName = "bg-white/70", tall = false }) {
    const bars = Array.from({ length: count }, (_, i) => i);
    return (
        <div
            className={`flex items-center justify-center gap-[3px] ${className}`}
            data-testid="waveform"
            aria-hidden="true"
        >
            {bars.map((i) => (
                <span
                    key={i}
                    className={`wave-bar w-[3px] rounded-full ${barClassName}`}
                    style={{
                        height: tall
                            ? `${14 + ((i * 37) % 56)}px`
                            : `${8 + ((i * 37) % 26)}px`,
                        animationDelay: `${(i % 12) * 0.11}s`,
                        animationDuration: `${1.2 + ((i * 7) % 5) * 0.16}s`,
                    }}
                />
            ))}
        </div>
    );
}
