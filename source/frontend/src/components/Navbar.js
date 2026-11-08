import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToId } from "@/lib/scroll";

const LINKS = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "beyond", label: "Beyond Class" },
    { id: "contact", label: "Contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const go = (id) => {
        setOpen(false);
        scrollToId(id);
    };

    const onDark = !scrolled && !open;

    return (
        <>
            <header
                className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
                    scrolled
                        ? "bg-sand/85 backdrop-blur-xl border-b border-ink/10"
                        : "bg-transparent border-b border-transparent"
                }`}
                data-testid="navbar"
            >
                <div
                    className={`max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between transition-all duration-300 ${
                        scrolled ? "py-3" : "py-5"
                    }`}
                >
                    <button
                        onClick={() => go("top")}
                        data-testid="nav-brand"
                        className={`flex items-center gap-2 font-display font-semibold text-lg transition-colors duration-300 ${
                            onDark ? "text-white" : "text-ink"
                        }`}
                    >
                        <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
                            <rect width="64" height="64" rx="14" fill="#0B3A40" />
                            <polyline points="21,21 32,32 21,43" stroke="#D9A441" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="37" y1="43" x2="46" y2="43" stroke="#7FC6E8" strokeWidth="5" strokeLinecap="round" />
                        </svg>
                        <span>
                            Anirudh<span className="text-gold">.</span>
                        </span>
                    </button>

                    <nav className="hidden md:flex items-center gap-8">
                        {LINKS.map((l) => (
                            <button
                                key={l.id}
                                onClick={() => go(l.id)}
                                data-testid={`nav-${l.id}-link`}
                                className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-gold ${
                                    onDark ? "text-white/85" : "text-ink/80"
                                }`}
                            >
                                {l.label}
                            </button>
                        ))}
                    </nav>

                    <button
                        className={`md:hidden p-2 transition-colors duration-300 ${onDark ? "text-white" : "text-ink"}`}
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle menu"
                        data-testid="nav-mobile-toggle"
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-sand/95 backdrop-blur-xl md:hidden"
                        data-testid="nav-mobile-menu"
                    >
                        <div className="h-full flex flex-col justify-center px-10 gap-2">
                            {LINKS.map((l, i) => (
                                <motion.button
                                    key={l.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    onClick={() => go(l.id)}
                                    data-testid={`nav-mobile-${l.id}-link`}
                                    className="text-left font-display text-4xl py-3 text-ink border-b border-ink/10"
                                >
                                    {l.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
