/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                "main": "1fr min(1440px, 95VW) 1fr",
            }
        },
    },
    plugins: [],
}

