const ITEMS = [
    { img: `${process.env.PUBLIC_URL}/images/jupyter-logo.svg`, alt: "Jupyter Notebook" },
    { img: `${process.env.PUBLIC_URL}/images/microsoft-logo.svg`, label: "Microsoft Certified" },
    { img: `${process.env.PUBLIC_URL}/images/aws-logo.svg`, label: "AWS Certified" },
    { img: `${process.env.PUBLIC_URL}/images/github-mark.png`, label: "GitHub" },
    { img: `${process.env.PUBLIC_URL}/images/gdg-klhb.png`, alt: "Google Developer Groups On Campus KLHB" },
    { img: `${process.env.PUBLIC_URL}/images/vixesa-logo.png`, alt: "Vixesa", rounded: true },
    { img: `${process.env.PUBLIC_URL}/images/cartesia-mark.svg`, label: "Cartesia.ai" },
];

function Track({ hidden }) {
    return (
        <div className="flex items-center shrink-0" aria-hidden={hidden ? "true" : undefined}>
            {ITEMS.map((item, i) => (
                <span key={i} className="flex items-center shrink-0">
                    {typeof item === "string" ? (
                        <span className="font-display italic text-2xl md:text-4xl text-ink/60 px-6 md:px-10 whitespace-nowrap">
                            {item}
                        </span>
                    ) : item.label ? (
                        <span className="flex items-center gap-3 px-6 md:px-10">
                            <img
                                src={item.img}
                                alt={hidden ? "" : item.label}
                                className="h-9 md:h-11 w-auto rounded-lg"
                            />
                            <span className="font-display italic text-2xl md:text-4xl text-ink/60 whitespace-nowrap">
                                {item.label}
                            </span>
                        </span>
                    ) : (
                        <img
                            src={item.img}
                            alt={hidden ? "" : item.alt}
                            className={`h-9 md:h-12 w-auto px-6 md:px-10 ${item.rounded ? "rounded-xl bg-white px-2" : ""}`}
                            data-testid="marquee-gdg-logo"
                        />
                    )}
                    <span className="w-2 h-2 bg-gold rotate-45 shrink-0" aria-hidden="true" />
                </span>
            ))}
        </div>
    );
}

export default function Marquee() {
    return (
        <section className="marquee relative py-8 md:py-10 border-b border-ink/10 overflow-hidden" data-testid="marquee">
            <div className="marquee-track flex w-max">
                <Track />
                <Track hidden />
            </div>
        </section>
    );
}
