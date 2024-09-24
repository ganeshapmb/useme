import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // /^bg-/, // Safelist all classes that start with 'bg-'
    // Add specific classes if needed, e.g., 'bg-red-500', 'bg-blue-500', etc.
    // 'bg-red-500',
    //   'bg-blue-500',
    //   'bg-green-500',
      {
        pattern: /bg-(red|green|blue|black|sky|slate|amber)-(100|200|300|500)/,
        variants: ['lg', 'hover', 'focus', 'lg:hover'],
      }
  ],
  theme: {
    // extend: {
    //   backgroundImage: {
    //     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    //     "gradient-conic":
    //       "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    //   },
    // },
  },
  plugins: [],
};
export default config;
