/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ios: {
                    bg: 'var(--ios-bg-primary)',
                    glass: 'var(--ios-glass-bg)',
                    border: 'var(--ios-glass-border)',
                }
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'sans-serif'],
            },
            animation: {
                'aurora': 'aurora 10s ease infinite alternate',
            },
            keyframes: {
                aurora: {
                    '0%': { transform: 'scale(1)', opacity: '0.5' },
                    '100%': { transform: 'scale(1.1)', opacity: '0.7' },
                }
            }
        },
    },
    plugins: [],
}
