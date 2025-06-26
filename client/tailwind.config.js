import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter', 'ui-sans-serif', 'system-ui',
          '-apple-system', 'BlinkMacSystemFont', 'Segoe UI',
          'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'
        ],
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        secondary: {
          50: '#f9fafb',   // Very light grayish white
          100: '#f3f4f6',   // Light gray background
          200: '#e5e7eb',   // Soft gray (for borders/shadows)
          300: '#d1d5db',   // Medium gray
          400: '#9ca3af',   // Gray with tone, good for disabled states
          500: '#6b7280',   // Neutral dark gray, good for text
          600: '#4b5563',   // Darker gray
          700: '#374151',   // Dark gray (headings, stronger text)
          800: '#1f2937',   // Almost black gray for dark mode backgrounds
          900: '#111827',   // Nearly black, main text color dark mode
          1000: '#0f172a',  // Deep midnight blue tone for dark backgrounds
        },
        primary: {
          50: '#eff6ff',   // Light blue background
          100: '#dbeafe',   // Soft blue
          200: '#bfdbfe',   // Medium light blue
          300: '#93c5fd',   // Accent blue lighter
          400: '#60a5fa',   // Accent blue medium
          500: '#3b82f6',   // Primary blue for buttons, links
          600: '#2563eb',   // Darker blue for hover states
          700: '#1d4ed8',   // Dark blue for stronger emphasis
          800: '#1e40af',   // Navy blue shade
          900: '#1e3a8a',   // Very dark blue
        },
        danger: {
          50: '#fef2f2',   // Very light red background
          100: '#fee2e2',   // Light red alert background
          200: '#fecaca',   // Soft red
          300: '#fca5a5',   // Medium red
          400: '#f87171',   // Warning red
          500: '#ef4444',   // Base red for errors
          600: '#dc2626',   // Stronger red for emphasis
          700: '#b91c1c',   // Dark red
          800: '#991b1b',   // Very dark red
          900: '#7f1d1d',   // Deep red for serious errors
        },
        neutral: {
          light: '#f9fafb',  // off-white neutral background
          DEFAULT: '#6b7280',// medium gray for text and UI
          dark: '#374151'    // dark gray for stronger text or borders
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [forms, typography, aspectRatio],

}
