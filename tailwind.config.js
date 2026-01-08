/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all files that contain Nativewind classes.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				brand: {
					50: "#f3faf7",
					100: "#d8efe8",
					200: "#b0dfd2",
					300: "#80c8b7",
					400: "#56ab9a",
					500: "#3c9081",
					600: "#2e7368",
					700: "#285c54",
					800: "#244b46",
					900: "#21403b",
					950: "#0f2422"
				},
				dark: {
					100: "0f0f0f",
					200: "272727",
					300: "3f3f3f"
				},
				light: {
					100: "ffffff",
					200: "f2f2f2",
					300: "e6e6e6"
				}
			}
		}
	},
	plugins: []
}
