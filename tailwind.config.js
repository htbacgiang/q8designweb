/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Pattern approach for better coverage
    {
      pattern: /^(bg-gradient-to-|from-|via-|to-)(r|l|t|b|tr|tl|br|bl|amber|yellow|orange|green|emerald|blue|purple|indigo|gray|black|white)(-\d+)?(\/(10|20|30|40|50|60|70|80|90|95))?$/,
    },
    {
      pattern: /^(hover:|group-hover:|focus:)?(bg-|text-|border-|ring-)(amber|yellow|orange|green|emerald|blue|purple|indigo|gray|black|white)(-\d+)?(\/(10|20|30|40|50|60|70|80|90|95))?$/,
    },
    {
      pattern: /^(scale-|translate-|rotate-|skew-)\d+$/,
    },
    {
      pattern: /^(hover:|group-hover:)?(scale-|translate-|rotate-|skew-)\d+$/,
    },
    // Specific classes that need to be always included
    'bg-gradient-to-br',
    'bg-gradient-to-r',
    'bg-gradient-to-t',
    'bg-gradient-to-tr',
    'via-transparent',
    'via-black/50',
    'from-black/70',
    'from-black/80',
    'to-black/30',
    'to-transparent',
    'backdrop-blur-sm',
    'backdrop-blur-xl',
    'animate-pulse',
    'animate-spin',
    'animate-in',
    'fade-in',
    'duration-300',
    'duration-500',
    'duration-700',
    'transition-all',
    'transition-transform',
    'transition-colors',
    'transition-opacity',
    'shadow-lg',
    'shadow-xl',
    'shadow-2xl',
    'hover:shadow-lg',
    'hover:shadow-xl',
    'hover:shadow-2xl',
    'ring-4',
    'ring-offset-2',
    'opacity-0',
    'opacity-50',
    'opacity-80',
    'opacity-100',
    'hover:opacity-100',
    'group-hover:opacity-100',
    'hover:-translate-y-1',
    'hover:scale-100',
    'hover:scale-105',
    'hover:scale-110',
    'group-hover:scale-105',
    'group-hover:scale-110',
    
    // Green classes for Eco Bắc Giang
    'from-green-400',
    'to-emerald-600',
    'from-green-500',
    'to-emerald-600',
    'from-green-600',
    'to-emerald-700',
    'from-green-600',
    'to-blue-600',
    'from-blue-600',
    'to-green-600',
    'from-green-700',
    'to-emerald-800',
    'hover:from-green-700',
    'hover:to-emerald-800',
    'bg-green-100',
    'bg-green-50',
    'text-green-600',
    'text-green-700',
    'border-green-200',
    
    // Amber classes for PropertyDetail
    'from-amber-400',
    'to-amber-600',
    'from-amber-500', 
    'to-amber-600',
    'from-amber-600',
    'to-amber-700',
    'hover:from-amber-600',
    'hover:to-amber-700',
    'bg-amber-400',
    'bg-amber-500',
    'text-amber-100',
    'text-amber-300',
    'text-amber-400',
    'text-amber-600',
    'border-amber-200',
    'border-amber-300',
    'border-amber-400',
    'hover:border-amber-200',
    'focus:border-amber-400',
    'ring-amber-400',
    'bg-amber-400/10',
    'bg-amber-300/10',
    
    // Purple, Blue, Emerald
    'from-purple-400',
    'to-purple-600',
    'from-blue-400',
    'to-blue-600',
    'from-blue-500',
    'to-blue-600', 
    'from-emerald-400',
    'to-emerald-600',
    'bg-purple-100',
    'bg-blue-100', 
    'bg-emerald-100',
    'bg-emerald-50',
    'text-purple-600',
    'text-blue-600',
    'text-emerald-600',
    'text-emerald-700',
    'border-purple-100',
    'border-purple-200',
    'border-blue-100',
    'border-blue-200',
    'border-emerald-100',
    'border-emerald-200',
    'hover:border-purple-200',
    'hover:border-blue-200',
    'hover:border-emerald-200',
    
    // Additional gradient classes for hero section
    'from-purple-100',
    'via-blue-50',
    'to-indigo-100',
    'from-purple-500',
    'to-pink-500',
    'from-green-500',
    'to-blue-500',
    'from-pink-500',
    'to-red-500',
    'from-blue-500',
    'to-purple-500',
    'from-blue-500',
    'to-teal-500',
    'via-blue-500',
    'to-indigo-600',
    'bg-purple-50',
    'bg-indigo-100',
    'bg-indigo-50'
  ],
  theme: {
    extend: {
      animation: {
        blink: "blink 1.5s infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { backgroundColor: "#000000" }, // màu đen
          "50%": { backgroundColor: "#6b7280" }, // màu xám
        },
      },
      fontFamily: {
        heading: ["var(--ltn__heading-font)", "sans-serif"], // Sử dụng font Rajdhani
      },
      colors: {
        "primary-dark": "#000000",
        primary: "#ffffff",
        highlight: {
          dark: "#FFFFFF",
          light: "#000000",
        },
        secondary: {
          dark: "#6b7280", // gray-500
          light: "#f3f4f6", // gray-100
        },
        action: "#374151", // gray-700
        brand: {
          50: "#f9fafb",   // gray-50
          100: "#f3f4f6",  // gray-100
          200: "#e5e7eb",  // gray-200
          300: "#d1d5db",  // gray-300
          400: "#9ca3af",  // gray-400
          500: "#6b7280",  // gray-500
          600: "#4b5563",  // gray-600
          700: "#374151",  // gray-700
          800: "#1f2937",  // gray-800
          900: "#111827",  // gray-900
        },
      },
      transitionProperty: {
        width: "width",
      },
    },
    extend: {
      backgroundImage: {
        "png-pattern": "url('/empty-bg.jpg')",
        "gradient-to-b": "linear-gradient(to bottom, #374151, #111827)",
        "gradient-brand": "linear-gradient(135deg, #000000 0%, #374151 50%, #6b7280 100%)",
        "gradient-brand-light": "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)",
      },
      colors: {
        'q8-cod-gray': '#1a1a1a',
        'q8-nevada': '#6b7280',
        'q8-silver': '#c0c0c0',
        'q8-charcoal': '#36454f',
        'q8-gunmetal': '#2c3539',
        // Color palette for Q8 Design
        'q8-primary': {
          '50': '#F9F9F9',  // Light background
          '100': '#F9F9F9',
          '200': '#F9F9F9',
          '300': '#F9F9F9',
          '400': '#F9F9F9',
          '500': '#B0B5B8',  // Light gray
          '600': '#878E92',  // Medium gray
          '700': '#5E676B',  // Dark gray
          '800': '#5E676B',
          '900': '#121212',  // Dark background/text
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwind-scrollbar")],
};
