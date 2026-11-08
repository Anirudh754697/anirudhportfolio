export default function Footer() {
    return (
        <footer className="border-t border-ink/10 py-8" data-testid="footer">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden="true" data-testid="footer-dev-mark">
                    <rect width="64" height="64" rx="14" fill="#0B3A40" />
                    <polyline points="24,21 13,32 24,43" stroke="#D9A441" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="40,21 51,32 40,43" stroke="#D9A441" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="35" y1="17" x2="29" y2="47" stroke="#7FC6E8" strokeWidth="5" strokeLinecap="round" />
                </svg>
                <p className="text-sm text-ink/50">© {new Date().getFullYear()} Anirudh Guthula</p>
                <p className="font-display italic text-sm text-ink/40">by the sea, by the garden.</p>
            </div>
        </footer>
    );
}
