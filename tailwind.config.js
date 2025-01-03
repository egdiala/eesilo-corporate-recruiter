/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				"25": "#E5F8EF",
  				"50": "#CCF1DE",
  				"100": "#99E2BD",
  				"200": "#66D49D",
  				"300": "#4DCD8C",
  				"400": "#1ABE6B",
  				"500": "#00B75B",
  				"600": "#009D42",
  				"700": "#008428",
  				"800": "#005100",
  				"900": "#003800",
  				DEFAULT: "hsl(var(--primary))",
  				foreground: "hsl(var(--primary-foreground))"
  			},
  			gray: {
  				"25": "#FCFCFD",
  				"50": "#F9FAFB",
  				"100": "#F2F4F7",
  				"200": "#EAECF0",
  				"300": "#D0D5DD",
  				"400": "#98A2B3",
  				"500": "#667085",
  				"600": "#475467",
  				"700": "#344054",
  				"800": "#1D2939",
  				"900": "#101828"
  			},
  			error: {
  				"25": "#FFFBFA",
  				"50": "#FEF3F2",
  				"100": "#FEE4E2",
  				"200": "#FECDCA",
  				"300": "#FDA29B",
  				"400": "#F97066",
  				"500": "#F04438",
  				"600": "#D92D20",
  				"700": "#B42318",
  				"800": "#912018",
  				"900": "#7A271A"
  			},
  			warning: {
  				"25": "#FFFCF5",
  				"50": "#FFFAEB",
  				"100": "#FEF0C7",
  				"200": "#FEDF89",
  				"300": "#FEC84B",
  				"400": "#FDB022",
  				"500": "#F79009",
  				"600": "#DC6803",
  				"700": "#B54708",
  				"800": "#93370D",
  				"900": "#7A2E0E"
  			},
  			success: {
  				"25": "#F6FEF9",
  				"50": "#ECFDF3",
  				"100": "#D1FADF",
  				"200": "#A6F4C5",
  				"300": "#6CE9A6",
  				"400": "#32D583",
  				"500": "#12B76A",
  				"600": "#039855",
  				"700": "#027A48",
  				"800": "#05603A",
  				"900": "#054F31"
  			},
  			blue: {
  				"25": "#F5F8FF",
  				"50": "#EFF4FF",
  				"100": "#D1E0FF",
  				"200": "#B2CCFF",
  				"300": "#84ADFF",
  				"400": "#528BFF",
  				"500": "#2970FF",
  				"600": "#155EEF",
  				"700": "#004EEB",
  				"800": "#0040C1",
  				"900": "#00359E"
  			},
  			background: "hsl(var(--background))",
  			foreground: "hsl(var(--foreground))",
  			card: {
  				DEFAULT: "hsl(var(--card))",
  				foreground: "hsl(var(--card-foreground))"
  			},
  			popover: {
  				DEFAULT: "hsl(var(--popover))",
  				foreground: "hsl(var(--popover-foreground))"
  			},
  			secondary: {
  				DEFAULT: "hsl(var(--secondary))",
  				foreground: "hsl(var(--secondary-foreground))"
  			},
  			muted: {
  				DEFAULT: "hsl(var(--muted))",
  				foreground: "hsl(var(--muted-foreground))"
  			},
  			accent: {
  				DEFAULT: "hsl(var(--accent))",
  				foreground: "hsl(var(--accent-foreground))"
  			},
  			destructive: {
  				DEFAULT: "hsl(var(--destructive))",
  				foreground: "hsl(var(--destructive-foreground))"
  			},
  			border: "hsl(var(--border))",
  			input: "hsl(var(--input))",
  			ring: "hsl(var(--ring))",
  			chart: {
  				"1": "hsl(var(--chart-1))",
  				"2": "hsl(var(--chart-2))",
  				"3": "hsl(var(--chart-3))",
  				"4": "hsl(var(--chart-4))",
  				"5": "hsl(var(--chart-5))"
  			}
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)"
  		},
  	},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
}

