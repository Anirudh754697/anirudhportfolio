import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ChevronUp } from "lucide-react";
import Reveal from "@/components/Reveal";
import Waveform from "@/components/Waveform";

const GROUPS = ["Steady", "Seasonal", "Spiky"];
const MODELS = [
    { name: "Model A", color: "#147D7D" },
    { name: "Model B", color: "#7FC6E8" },
    { name: "Model C", color: "#D9A441" },
];
const VALUES = [
    [62, 44, 72],
    [50, 80, 38],
    [70, 64, 56],
];

function Chart() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div ref={ref} className="w-full min-w-0" data-testid="project-chart">
            <svg viewBox="0 0 480 220" className="block w-full h-auto max-w-full">
                {[60, 110, 160].map((y) => (
                    <line key={y} x1="20" x2="460" y1={y} y2={y} stroke="#16343C" strokeOpacity="0.08" />
                ))}
                <line x1="20" x2="460" y1="180" y2="180" stroke="#16343C" strokeOpacity="0.25" />
                {GROUPS.map((g, gi) => (
                    <g key={g}>
                        <text x={40 + gi * 150} y="202" fontSize="12" fill="#16343C" fillOpacity="0.55" fontStyle="italic" fontFamily="Fraunces, serif">
                            {g} demand
                        </text>
                        {MODELS.map((m, mi) => {
                            const h = VALUES[gi][mi] * 0.9;
                            return (
                                <rect
                                    key={m.name}
                                    x={34 + gi * 150 + mi * 34}
                                    y={180 - h}
                                    width="26"
                                    height={h}
                                    rx="4"
                                    fill={m.color}
                                    style={{
                                        transformBox: "fill-box",
                                        transformOrigin: "bottom",
                                        transform: `scaleY(${inView ? 1 : 0})`,
                                        transition: `transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${(0.15 + gi * 0.12 + mi * 0.08).toFixed(2)}s`,
                                    }}
                                />
                            );
                        })}
                    </g>
                ))}
            </svg>
            <div className="flex flex-wrap gap-4 mt-2">
                {MODELS.map((m) => (
                    <span key={m.name} className="flex items-center gap-2 text-xs text-ink/60">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ background: m.color }} aria-hidden="true" />
                        {m.name}
                    </span>
                ))}
            </div>
            <p className="text-[11px] text-ink/40 mt-2">Illustrative comparison across demand characteristics.</p>
        </div>
    );
}

function Card({ id, className = "", children }) {
    const [open, setOpen] = useState(false);
    return (
        <article
            onClick={() => setOpen((v) => !v)}
            data-testid={`project-${id}-card`}
            className={`group relative flex flex-col min-w-0 overflow-hidden rounded-3xl bg-white border border-ink/10 shadow-sm hover:shadow-xl hover:shadow-ink/10 transition-shadow duration-500 cursor-pointer ${className}`}
        >
            {children}
        </article>
    );
}

function Panel({ title, tag, children }) {
    return (
        <div className="border-t border-ink/10 bg-white/95 backdrop-blur min-w-0">
            <div className="px-5 md:px-7 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <h3 className="font-display font-semibold text-lg md:text-xl min-w-0">{title}</h3>
                    <span className="hidden sm:inline text-[10px] tracking-[0.2em] uppercase text-sea bg-sea/10 border border-sea/20 rounded-full px-3 py-1 whitespace-nowrap">
                        {tag}
                    </span>
                </div>
                <ChevronUp size={18} className="text-ink/40 shrink-0 transition-transform duration-500 group-hover:rotate-180" />
            </div>
            <div className="grid transition-all duration-500 ease-out grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                <div className="overflow-hidden">
                    <div className="px-5 md:px-7 pb-6 text-sm md:text-base text-ink/70 leading-relaxed">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="py-24 md:py-36 bg-sand-deep/60 overflow-hidden" data-testid="projects-section">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <Reveal>
                    <p className="text-xs tracking-[0.3em] uppercase text-sea font-semibold mb-4">Projects</p>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight max-w-2xl">
                        Things I&apos;ve been <em className="italic text-gold">building</em>.
                    </h2>
                    <p className="mt-3 text-ink/55 text-sm">Hover or tap a card to read the story.</p>
                </Reveal>

                <div className="mt-12 grid lg:grid-cols-12 gap-6 md:gap-8">
                    {/* time series */}
                    <Reveal className="lg:col-span-12 min-w-0" delay={0.05}>
                        <Card id="time-series" className="h-full grid md:grid-cols-2">
                            <div className="p-6 md:p-10 flex flex-col justify-end order-2 md:order-1 min-w-0">
                                <Panel title="Comparative Analysis of Time Series Forecasting Models" tag="Data & ML">
                                    <p>
                                        A comparative analysis of time series forecasting models across the different
                                        demand characteristics — how each model holds up when demand behaves differently.
                                    </p>
                                    <div
                                        data-testid="project-time-series-findings"
                                        className="mt-4 rounded-2xl border border-gold/40 bg-gold/10 px-4 py-4 text-sm text-ink/75"
                                    >
                                        <span className="font-semibold text-ink">Key findings:</span> Within the evaluated
                                        NN5, M4 and M5 series, seasonal methods such as Seasonal Naive and Holt-Winters
                                        tended to perform well on strongly seasonal demand, while simpler baselines
                                        remained competitive on short or highly variable series. The observed differences
                                        suggest that model suitability depends on demand characteristics, so no single
                                        model was best across all datasets.
                                    </div>
                                </Panel>
                            </div>
                            <div className="relative bg-sand-deep/70 order-1 md:order-2 min-h-[280px] md:min-h-[380px] p-6 md:p-10 flex items-center min-w-0 overflow-hidden">
                                <Chart />
                            </div>
                        </Card>
                    </Reveal>

                    {/* vixesa */}
                    <Reveal className="lg:col-span-7 min-w-0" delay={0.1}>
                        <Card id="vixesa" className="h-[540px] md:h-[560px]">
                            <div className="relative flex-1 bg-gradient-to-br from-sea-deep to-sea flex items-center justify-center min-w-0 overflow-hidden">
                                <div
                                    data-testid="project-vixesa-grant-badge"
                                    className="grant-shine absolute top-5 left-5 inline-flex flex-col items-start gap-1.5 rounded-2xl bg-white/95 backdrop-blur px-4 py-2.5 max-w-[calc(100%-2.5rem)]"
                                >
                                    <img
                                        src={`${process.env.PUBLIC_URL}/images/cartesia-startups.png`}
                                        alt="Cartesia Startups — received a startup grant from Cartesia.ai"
                                        className="h-7 md:h-8 w-auto object-contain"
                                    />
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/60">
                                        Received a startup grant
                                    </span>
                                </div>
                                <Waveform count={34} tall barClassName="bg-gold/90" className="opacity-90" />
                                <p className="absolute bottom-5 inset-x-0 text-center text-white/50 text-[11px] tracking-[0.25em] uppercase">
                                    Voice, visualised
                                </p>
                            </div>
                            <Panel title="Vixesa" tag="Startup · Voice AI">
                                <p>
                                    An AI voice calling startup I&apos;m building — software that picks up the phone,
                                    talks, and listens like a person would.
                                </p>
                            </Panel>
                        </Card>
                    </Reveal>

                    {/* event booking */}
                    <Reveal className="lg:col-span-5 min-w-0" delay={0.15}>
                        <Card id="event-booking" className="h-[540px] md:h-[560px]">
                            <div className="relative flex-1 bg-beige/60 flex items-center justify-center p-8 md:p-10 min-w-0 overflow-hidden">
                                <div className="w-full max-w-xs rounded-2xl bg-white shadow-lg border border-ink/10 overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
                                    <div className="flex gap-1.5 px-4 py-2.5 border-b border-ink/10" aria-hidden="true">
                                        <span className="w-2 h-2 rounded-full bg-brick/60" />
                                        <span className="w-2 h-2 rounded-full bg-gold/70" />
                                        <span className="w-2 h-2 rounded-full bg-sea/60" />
                                    </div>
                                    <div className="p-4">
                                        <div className="h-20 rounded-xl bg-sea-deep relative overflow-hidden flex items-center justify-center p-3">
                                            <img
                                                src={`${process.env.PUBLIC_URL}/images/utsavs-logo.png`}
                                                alt="Utsavs — event ticketing and registration platform logo"
                                                className="max-h-full w-auto object-contain"
                                            />
                                        </div>
                                        <div className="mt-3 space-y-2">
                                            {[0, 1, 2].map((r) => (
                                                <div key={r} className="h-6 rounded-lg bg-sand-deep border border-ink/5" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Panel title="Utsavs — Event Booking Platform" tag="Web · Landing Page">
                                <p>
                                    I designed and built the landing page for Utsavs, a Rajasthan-based event booking
                                    startup.
                                </p>
                                <a
                                    href="https://utsavs.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    data-testid="project-utsavs-link"
                                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-sea hover:text-mustard transition-colors"
                                >
                                    utsavs.app
                                </a>
                            </Panel>
                        </Card>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
