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
                'blood-maroon': {
                    DEFAULT: 'oklch(var(--blood-maroon))',
                    light: 'oklch(var(--blood-maroon-light))'
                },
                navy: {
                    darkest: 'oklch(var(--navy-darkest))',
                    dark: 'oklch(var(--navy-dark))',
                    medium: 'oklch(var(--navy-medium))',
                    light: 'oklch(var(--navy-light))',
                    lightest: 'oklch(var(--navy-lightest))'
                },
                gold: {
                    dark: 'oklch(var(--gold-dark))',
                    medium: 'oklch(var(--gold-medium))',
                    light: 'oklch(var(--gold-light))',
                    shimmer: 'oklch(var(--gold-shimmer))'
                },
                beige: {
                    sand: 'oklch(var(--beige-sand))',
                    champagne: 'oklch(var(--beige-champagne))',
                    light: 'oklch(var(--beige-light))'
                },
                silver: {
                    oxidized: 'oklch(var(--silver-oxidized))',
                    light: 'oklch(var(--silver-light))',
                    dark: 'oklch(var(--silver-dark))'
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
                'bottle-green': '0 4px 20px rgba(30, 70, 50, 0.3)',
                'blood-maroon': '0 4px 20px rgba(80, 20, 20, 0.3)',
                'navy': '0 4px 20px rgba(20, 30, 80, 0.3)',
                'silver': '0 4px 20px rgba(180, 180, 190, 0.3)'
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
                'blood-maroon-gradient': 'linear-gradient(135deg, oklch(var(--blood-maroon-light)), oklch(var(--blood-maroon)))',
                'navy-gradient': 'linear-gradient(135deg, oklch(var(--navy-lightest)) 0%, oklch(var(--navy-light)) 25%, oklch(var(--navy-medium)) 50%, oklch(var(--navy-dark)) 75%, oklch(var(--navy-darkest)) 100%)',
                'beige-gradient': 'linear-gradient(135deg, oklch(var(--beige-light)) 0%, oklch(var(--beige-champagne)) 50%, oklch(var(--beige-sand)) 100%)',
                'silver-gradient': 'linear-gradient(135deg, oklch(var(--silver-light)) 0%, oklch(var(--silver-oxidized)) 50%, oklch(var(--silver-dark)) 100%)',
                'dual-tone': 'linear-gradient(135deg, oklch(var(--bottle-green-dark)) 0%, oklch(var(--navy-medium)) 50%, oklch(var(--gold-dark)) 100%)'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
