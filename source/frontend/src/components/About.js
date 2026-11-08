import { useState } from "react";
import Reveal from "@/components/Reveal";

function TiltPhoto() {
    const [tilt, setTilt] = useState({ rx: 0, ry: 0, zoom: false });

    const onMove = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setTilt({ rx: -py * 8, ry: px * 10, zoom: true });
    };

    return (
        <div
            className="group relative"
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ rx: 0, ry: 0, zoom: false })}
            data-testid="about-photo"
        >
            <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2rem] border border-magenta/25 -rotate-1 transition-transform duration-500 group-hover:rotate-0"
            />
            <div
                className="relative rounded-[1.75rem] overflow-hidden shadow-2xl shadow-ink/20 transition-transform duration-300 ease-out"
                style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
            >
                <img
                    src="/images/garden.jpg"
                    alt="Anirudh Guthula in a lush garden with a red brick building behind him"
                    className={`w-full aspect-[4/5] object-cover object-[55%_30%] transition-transform duration-700 ease-out ${
                        tilt.zoom ? "scale-105" : "scale-100"
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sea-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </div>
    );
}

const GDOTS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

export default function About() {
    return (
        <section id="about" className="py-24 md:py-36" data-testid="about-section">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <Reveal className="lg:col-span-5">
                    <TiltPhoto />
                </Reveal>

                <div className="lg:col-span-7">
                    <Reveal>
                        <p className="text-xs tracking-[0.3em] uppercase text-sea font-semibold mb-4">About</p>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
                            A window into how I <em className="italic text-gold">think</em> and what I{" "}
                            <em className="italic text-gold">build</em>.
                        </h2>
                    </Reveal>

                    <Reveal delay={0.12}>
                        <p className="mt-7 text-base md:text-lg leading-relaxed text-ink/75">
                            Hi! I&apos;m Anirudh — a third-year Computer Science student at KLH Bachupally. I like
                            building products, especially in AI and voice. There&apos;s something about teaching
                            software to talk — and to listen — that I find genuinely fun.
                        </p>
                        <p className="mt-4 text-base md:text-lg leading-relaxed text-ink/75">
                            Right now I&apos;m building Vixesa, an AI voice calling startup that received a startup
                            grant from Cartesia.ai. When I&apos;m not on that, I&apos;m usually comparing forecasting
                            models or messing around with a new landing page idea.
                        </p>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <span
                                data-testid="about-gdg-badge"
                                className="inline-flex items-center gap-2.5 rounded-full bg-white border border-ink/10 px-4 py-2 text-sm font-medium shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                            >
                                <span className="flex gap-1" aria-hidden="true">
                                    {GDOTS.map((c) => (
                                        <span key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                                    ))}
                                </span>
                                GDG on Campus · KLH
                                <span className="text-ink/40 text-xs">— part of the team</span>
                            </span>
                            {["AI", "Voice", "Product building", "Time series"].map((chip) => (
                                <span
                                    key={chip}
                                    className="rounded-full bg-sand-deep border border-ink/10 px-4 py-2 text-sm text-ink/70"
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
