import { Github, Linkedin, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";

const LINKS = [
    { id: "email", icon: Mail, label: "Email", value: "g.anirudh754@gmail.com", href: "mailto:g.anirudh754@gmail.com" },
    { id: "linkedin", icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/guthula-anirudh-908601315", href: "https://www.linkedin.com/in/guthula-anirudh-908601315/" },
    { id: "github", icon: Github, label: "GitHub", value: "github.com/Anirudh754697", href: "https://github.com/Anirudh754697" },
];

export default function Contact() {
    return (
        <section id="contact" className="py-24 md:py-36" data-testid="contact-section">
            <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
                <Reveal>
                    <p className="text-xs tracking-[0.3em] uppercase text-sea font-semibold mb-4">Contact</p>
                    <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">
                        Say <em className="italic text-gold">hi</em>, anytime.
                    </h2>
                    <p className="mt-5 text-ink/65 text-base md:text-lg leading-relaxed">
                        Want to talk AI, voice, startups, or just say hello? My inbox is always open — no forms, no
                        fuss.
                    </p>
                </Reveal>

                <div className="mt-12 grid sm:grid-cols-3 gap-4">
                    {LINKS.map((l, i) => (
                        <Reveal key={l.id} delay={0.08 + i * 0.1}>
                            <div
                                data-testid={`contact-${l.id}-card`}
                                className="rounded-2xl bg-white border border-ink/10 p-7 flex flex-col items-center gap-3 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-ink/10 transition-all duration-300"
                            >
                                <span className="w-11 h-11 rounded-full bg-sand-deep text-sea grid place-items-center">
                                    <l.icon size={20} />
                                </span>
                                <p className="font-semibold">{l.label}</p>
                                {l.href ? (
                                    <a
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-testid={`contact-${l.id}-link`}
                                        className="text-sm text-sea font-medium hover:text-mustard transition-colors break-all"
                                    >
                                        {l.value}
                                    </a>
                                ) : (
                                    <p className="text-sm text-ink/45">{l.value}</p>
                                )}
                                {l.href ? (
                                    <span className="text-[9px] tracking-[0.25em] uppercase text-sea/70 border border-sea/25 rounded-full px-2.5 py-1">
                                        Live link
                                    </span>
                                ) : (
                                    <span className="text-[9px] tracking-[0.25em] uppercase text-ink/35 border border-ink/15 rounded-full px-2.5 py-1">
                                        Placeholder
                                    </span>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
