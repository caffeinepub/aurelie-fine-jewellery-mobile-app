import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                'bottle-green': {
                    dark: 'oklch(var(--bottle-green-dark))',
                    medium: 'oklch(var(--bottle-green-medium))',
                    light: 'oklch(var(--bottle-green-light))'
                },
                beige: {
                    darkest: 'oklch(var(--beige-darkest))',
                    dark: 'oklch(var(--beige-dark))',
                    medium: 'oklch(var(--beige-medium))',
                    light: 'oklch(var(--beige-light))',
                    lightest: 'oklch(var(--beige-lightest))'
                },
                gold: {
                    dark: 'oklch(var(--gold-dark))',
                    medium: 'oklch(var(--gold-medium))',
                    light: 'oklch(var(--gold-light))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                elegant: '0 4px 20px rgba(0,0,0,0.08)',
                gold: '0 4px 20px rgba(184, 134, 11, 0.3)',
                'bottle-green': '0 4px 20px rgba(30, 70, 50, 0.3)'
            },
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif']
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'shimmer': 'shimmer 3s linear infinite'
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, oklch(var(--gold-light)), oklch(var(--gold-medium)), oklch(var(--gold-dark)))',
                'bottle-green-gradient': 'linear-gradient(135deg, oklch(var(--bottle-green-light)), oklch(var(--bottle-green-medium)), oklch(var(--bottle-green-dark)))',
                'beige-gradient': 'linear-gradient(135deg, oklch(var(--beige-lightest)) 0%, oklch(var(--beige-light)) 25%, oklch(var(--beige-medium)) 50%, oklch(var(--beige-dark)) 75%, oklch(var(--beige-darkest)) 100%)',
                'dual-tone': 'linear-gradient(135deg, oklch(var(--bottle-green-dark)) 0%, oklch(var(--bottle-green-medium)) 50%, oklch(var(--gold-dark)) 100%)'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
