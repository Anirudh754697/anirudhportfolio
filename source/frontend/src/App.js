import { useEffect } from "react";
import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Beyond from "@/components/Beyond";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { setLenis } from "@/lib/scroll";
import "@/App.css";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(err) {
        console.error(err);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen grid place-items-center bg-sand text-ink p-8 text-center">
                    <p>Something went wrong — please refresh the page.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

function SmoothScroll() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
        setLenis(lenis);
        let raf;
        const loop = (time) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            setLenis(null);
        };
    }, []);
    return null;
}

const Home = () => (
    <div className="relative">
        <Navbar />
        <main>
            <Hero />
            <Marquee />
            <About />
            <Projects />
            <Beyond />
            <Contact />
        </main>
        <Footer />
    </div>
);

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <SmoothScroll />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
