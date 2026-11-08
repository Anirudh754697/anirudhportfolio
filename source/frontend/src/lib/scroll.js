let lenis = null;

export const setLenis = (instance) => {
    lenis = instance;
};

export const getLenis = () => lenis;

export const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
        lenis.scrollTo(el, { offset: -72, duration: 1.4 });
    } else {
        el.scrollIntoView({ behavior: "smooth" });
    }
};
