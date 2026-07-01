/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#059669", // Emerald-600
                secondary: "#2563eb", // Blue-600
            }
        },
    },
    plugins: [],
}