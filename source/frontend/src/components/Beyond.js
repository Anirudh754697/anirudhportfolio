import Reveal from "@/components/Reveal";

const ITEMS = [
    {
        id: "gdg",
        img: "/images/gdg-klhb.png",
        imgClass: "h-10 w-auto",
        imgAlt: "Google Developer Groups On Campus KLHB",
        label: "COMMUNITY",
        title: "GDG on Campus · KLH",
        copy: "I'm part of the GDG on Campus team at KLH — helping run the community on campus.",
    },
    {
        id: "azure",
        img: "/images/ms-fundamentals-badge.svg",
        imgClass: "h-20 w-auto",
        imgAlt: "Microsoft Certified: Fundamentals badge",
        label: "CERTIFIED",
        title: "Microsoft Azure AI Fundamentals (AI-900)",
        copy: "Certified.",
        href: "https://learn.microsoft.com/api/credentials/share/en-us/GAnirudh-2657/89072B84B0994E60?sharingId=E04871B012D54CFB",
        linkText: "View credential",
    },
    {
        id: "aws",
        img: "/images/aws-ccp-badge.png",
        imgClass: "h-20 w-auto rounded-xl",
        imgAlt: "AWS Certified Cloud Practitioner badge",
        label: "CERTIFIED",
        title: "AWS Certified Cloud Practitioner",
        copy: "Certified.",
        href: "/certificates/aws-ccp-certificate.pdf",
        linkText: "View certificate",
    },
];

export default function Beyond() {
    return (
        <section id="beyond" className="py-24 md:py-36 bg-sea-deep text-sand relative overflow-hidden" data-testid="beyond-section">
            <div
                aria-hidden="true"
                className="absolute -top-32 left-1/3 w-[28rem] h-[28rem] rounded-full bg-sea/40 blur-3xl pointer-events-none"
            />
            <div
                aria-hidden="true"
                className="absolute -bottom-40 -right-24 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none"
            />
            <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
                <Reveal>
                    <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-4">Beyond the classroom</p>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight max-w-2xl">
                        Community &amp; <em className="italic text-gold">certifications</em>.
                    </h2>
                </Reveal>

                <div className="mt-12 grid md:grid-cols-3 gap-5 md:gap-7">
                    {ITEMS.map((item, i) => (
                        <Reveal key={item.id} delay={0.1 + i * 0.12}>
                            <div
                                data-testid={`beyond-${item.id}-card`}
                                className="h-full rounded-3xl bg-white/5 border border-white/10 backdrop-blur p-7 md:p-8 hover:bg-white/10 hover:-translate-y-1.5 transition-all duration-300"
                            >
                                <div className="h-20 flex items-center">
                                    <img
                                        src={item.img}
                                        alt={item.imgAlt}
                                        className={item.imgClass}
                                        data-testid={`beyond-${item.id}-logo`}
                                    />
                                </div>
                                <p className="mt-6 text-[10px] tracking-[0.3em] uppercase text-white/40">{item.label}</p>
                                <h3 className="mt-2 font-display text-xl font-semibold leading-snug">{item.title}</h3>
                                <p className="mt-3 text-sm text-sand/60 leading-relaxed">{item.copy}</p>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-testid={`beyond-${item.id}-link`}
                                        className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-gold hover:text-mustard transition-colors"
                                    >
                                        {item.linkText}
                                    </a>
                                ) : item.href === null && item.label === "CERTIFIED" ? (
                                    <span
                                        data-testid={`beyond-${item.id}-placeholder`}
                                        className="inline-flex items-center mt-4 text-[10px] tracking-[0.2em] uppercase text-white/40 border border-white/20 rounded-full px-3 py-1.5"
                                    >
                                        Certificate link — placeholder
                                    </span>
                                ) : null}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
