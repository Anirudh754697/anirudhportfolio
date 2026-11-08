import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Typewriter from "@/components/Typewriter";
import Waveform from "@/components/Waveform";
import { scrollToId } from "@/lib/scroll";

const lineEase = [0.22, 1, 0.36, 1];

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const yPhoto = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
    const yText = useTransform(scrollYProgress, [0, 0.7], [0, -70]);
    const fadeText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section ref={ref} id="top" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-sea-deep" data-testid="hero-section">
            {/* parallax beach photo */}
            <motion.div style={{ y: yPhoto }} className="absolute inset-0" data-testid="hero-photo">
                <img
                    src={`${process.env.PUBLIC_URL}/images/beach.jpg`}
                    alt="Anirudh Guthula at the beach, sea and soft blue sky behind him"
                    className="w-full h-full object-cover object-[62%_48%] scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-sea-deep/55 via-sea-deep/25 to-sea-deep/80" />
            </motion.div>

            {/* css lights */}
            <motion.div
                aria-hidden="true"
                className="absolute -top-24 -right-24 w-[26rem] h-[26rem] rounded-full bg-gold/25 blur-3xl pointer-events-none"
                animate={{ y: [0, 22, 0], opacity: [0.55, 0.85, 0.55] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden="true"
                className="absolute top-1/3 -left-28 w-96 h-96 rounded-full bg-sky/25 blur-3xl pointer-events-none"
                animate={{ y: [0, -18, 0], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* css building silhouette */}
            <div aria-hidden="true" className="absolute bottom-0 right-5 md:right-16 flex items-end gap-2 opacity-30 pointer-events-none">
                <div className="bld w-10 h-24 md:h-36" />
                <div className="bld w-14 h-36 md:h-52" />
                <div className="bld w-9 h-20 md:h-28" />
            </div>

            {/* subtle voice waveform overlay */}
            <Waveform count={44} className="absolute bottom-24 md:bottom-28 inset-x-0 opacity-40 pointer-events-none" />

            {/* copy */}
            <motion.div
                style={{ y: yText, opacity: fadeText }}
                className="relative z-10 h-full max-w-6xl mx-auto px-5 sm:px-8 flex flex-col justify-center"
            >
                <p className="text-white/70 text-sm tracking-[0.25em] uppercase mb-4">Hi, I&apos;m</p>
                <h1 className="font-display font-semibold text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05] min-h-[1.2em]">
                    <Typewriter text="Anirudh Guthula" />
                </h1>
                <p className="mt-5 text-white/85 text-xl md:text-2xl font-light max-w-xl">
                    <span className="block overflow-hidden">
                        <motion.span
                            className="block"
                            initial={{ y: "110%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.9, delay: 1.7, ease: lineEase }}
                        >
                            Building products, mostly in{" "}
                            <em className="font-display italic text-gold">AI &amp; voice</em>.
                        </motion.span>
                    </span>
                </p>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.1 }}
                    className="mt-3 text-white/60 text-sm md:text-base"
                >
                    Third-year CSE student at KLH Bachupally.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 2.3, ease: lineEase }}
                    className="mt-9 flex flex-wrap gap-4"
                >
                    <button
                        onClick={() => scrollToId("projects")}
                        data-testid="hero-see-more-btn"
                        className="bg-gold text-ink font-semibold rounded-full px-8 py-3.5 hover:bg-mustard hover:scale-105 transition-all duration-300 shadow-lg shadow-gold/20"
                    >
                        See More
                    </button>
                    <button
                        onClick={() => scrollToId("contact")}
                        data-testid="hero-get-in-touch-btn"
                        className="border border-white/40 text-white font-semibold rounded-full px-8 py-3.5 hover:bg-white/10 hover:scale-105 transition-all duration-300"
                    >
                        Get in Touch
                    </button>
                </motion.div>
            </motion.div>

            {/* scroll arrow */}
            <button
                onClick={() => scrollToId("about")}
                data-testid="hero-scroll-arrow"
                className="absolute z-10 bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
                aria-label="Scroll to about section"
            >
                <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                <span className="w-10 h-10 rounded-full border border-white/30 grid place-items-center anim-bob">
                    <ArrowDown size={16} />
                </span>
            </button>

            {/* css wave divider */}
            <svg
                aria-hidden="true"
                className="absolute bottom-0 inset-x-0 w-full h-[64px] md:h-[104px] z-[5]"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
            >
                <path
                    d="M0 64C240 16 480 16 720 56s480 48 720 8v56H0V64z"
                    fill="#F7F1E6"
                    opacity="0.55"
                />
                <path d="M0 80c240-40 480-40 720 0s480 40 720 0v40H0V80z" fill="#F7F1E6" />
            </svg>
        </section>
    );
}
