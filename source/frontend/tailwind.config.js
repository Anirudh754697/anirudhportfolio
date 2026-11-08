/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Fraunces"', 'Georgia', 'serif'],
                sans: ['"Albert Sans"', 'ui-sans-serif', 'sans-serif'],
            },
            colors: {
                sand: { DEFAULT: '#F7F1E6', deep: '#EFE3CF' },
                beige: '#EAD9BD',
                ink: '#16343C',
                sea: { DEFAULT: '#147D7D', deep: '#0B3A40', light: '#2AA6A0' },
                sky: { DEFAULT: '#7FC6E8' },
                gold: { DEFAULT: '#D9A441' },
                mustard: '#C9A227',
                brick: { DEFAULT: '#A6402F' },
                magenta: { DEFAULT: '#C93C7E' },
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
