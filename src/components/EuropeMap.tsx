import { useState } from 'react';
import { motion } from 'motion/react';

interface Country {
  name: string;
  code: string;
  path: string;
  agencies: number;
}

interface EuropeMapProps {
  variant?: 'hero' | 'network';
  agenciesLabel?: string; // "agences partenaires" / "partner agencies"
}

export default function EuropeMap({ variant = 'hero', agenciesLabel = 'agences partenaires' }: EuropeMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);

  const handleMouseEnter = (country: Country) => {
    setHoveredCountry(country);
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  // Style configurations for each variant
  const isNetwork = variant === 'network';

  return (
    <div className={`relative ${isNetwork ? 'w-full' : 'w-full max-w-4xl mx-auto'} flex items-center justify-center`}>
      {/* Glassmorphism wrapper */}
      <div className={`relative w-full ${isNetwork ? 'max-w-sm mx-auto' : ''}`}>
        <svg
          viewBox={isNetwork ? "925 85 210 280" : "925 85 210 280"}
          className="w-full h-auto relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Enhanced gradients */}
          <defs>
            {/* Country base gradient - Premium violet/blue */}
            <linearGradient id={`countryBase-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#7C3AED', stopOpacity: 0.35 }} />
              <stop offset="50%" style={{ stopColor: '#1E3A8A', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 0.25 }} />
            </linearGradient>

            {/* Country hover gradient - Cyan to Violet */}
            <linearGradient id={`countryHover-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#06B6D4', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 0.85 }} />
            </linearGradient>

            {/* Border gradient - Subtle white/cyan */}
            <linearGradient id={`borderGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
              <stop offset="50%" style={{ stopColor: '#06B6D4', stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 0.3 }} />
            </linearGradient>

            {/* Pulse dot gradient */}
            <radialGradient id={`pulseGradient-${variant}`}>
              <stop offset="0%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#7C3AED', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 0.4 }} />
            </radialGradient>

            {/* Enhanced glow filter */}
            <filter id={`glow-${variant}`}>
              <feGaussianBlur stdDeviation={isNetwork ? '4' : '3'} result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Intense glow for hover */}
            <filter id={`glowIntense-${variant}`}>
              <feGaussianBlur stdDeviation={isNetwork ? '6' : '5'} result="coloredBlur"/>
              <feColorMatrix in="coloredBlur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 0"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Shadow filter */}
            <filter id={`shadow-${variant}`}>
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#06B6D4" floodOpacity="0.4"/>
            </filter>
          </defs>

          {/* Countries */}
          {countries.map((country, index) => (
            <motion.path
              key={country.code}
              d={country.path}
              fill={hoveredCountry?.code === country.code ? `url(#countryHover-${variant})` : `url(#countryBase-${variant})`}
              stroke={`url(#borderGradient-${variant})`}
              strokeWidth={hoveredCountry?.code === country.code ? (isNetwork ? '1' : '0.9') : (isNetwork ? '0.8' : '0.7')}
              className="cursor-pointer transition-all duration-500"
              style={{ 
                filter: hoveredCountry?.code === country.code ? `url(#glowIntense-${variant}) url(#shadow-${variant})` : 'none',
                transformOrigin: 'center'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: hoveredCountry?.code === country.code ? 1 : (isNetwork ? 0.9 : 0.85),
                scale: hoveredCountry?.code === country.code ? 1.04 : 1
              }}
              whileHover={{ 
                opacity: 1, 
                scale: isNetwork ? 1.08 : 1.06,
              }}
              transition={{
                delay: index * 0.02,
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              onMouseEnter={() => handleMouseEnter(country)}
              onMouseLeave={handleMouseLeave}
            />
          ))}

          {/* Animated pulse dots on major cities */}
          {countries.filter(c => c.agencies > 20).map((country, index) => {
            // Extract approximate center from path
            const pathMatch = country.path.match(/M([\d.]+),([\d.]+)/);
            if (!pathMatch) return null;
            const cx = parseFloat(pathMatch[1]);
            const cy = parseFloat(pathMatch[2]);

            return (
              <g key={`pulse-${country.code}`}>
                {/* Outer glow pulse */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={isNetwork ? '3' : '2.5'}
                  fill={`url(#pulseGradient-${variant})`}
                  filter={`url(#glow-${variant})`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.8, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: 'easeInOut'
                  }}
                />
                {/* Middle ring */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={isNetwork ? '1.5' : '1.2'}
                  fill="#06B6D4"
                  opacity="0.7"
                  animate={{
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: 'easeInOut'
                  }}
                />
                {/* Core white dot */}
                <circle cx={cx} cy={cy} r={isNetwork ? '0.8' : '0.6'} fill="#FFFFFF" opacity="1" />
              </g>
            );
          })}
        </svg>

        {/* Tooltip - Enhanced Glassmorphism style */}
        {hoveredCountry && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className={`absolute bg-gradient-to-br from-violet-600/30 via-blue-600/25 to-cyan-500/30 backdrop-blur-xl text-white ${isNetwork ? 'px-6 py-4' : 'px-5 py-3'} ${isNetwork ? 'rounded-3xl' : 'rounded-2xl'} shadow-2xl shadow-cyan-500/30 pointer-events-none z-30 border-2 border-white/40 ring-1 ring-violet-400/50`}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={`font-semibold ${isNetwork ? 'text-lg' : 'text-base'} mb-1 drop-shadow-lg text-white`}>{hoveredCountry.name}</div>
            <div className={`bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent ${isNetwork ? 'text-base' : 'text-sm'} font-semibold drop-shadow-md`}>
              ✓ {hoveredCountry.agencies} {agenciesLabel}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

const countries: Country[] = [
  {
    name: "France",
    code: "FR",
    path: "M1025.7 303.8l-1.1-5.2-3.2 2.3-1 2.3 1.4 4.2 2.4 1.2 1.5-4.8zm-31.5-50.9l-2.4-2.4-2.2-.1-.7-2.2-4.3 1.2-1.4 5.1-11.3 4.8-4.6-2.6 1.4 7-8.2-1.6-6.4 1.3.4 4.6 7.5 2.4 3.6 3.1 5.1 6.5-1 12.3-2.7 3.7 2 2.4 9.4 2.8 1.9-1.3 5.7 2.8 6-.8.5-3.7 7.4-2 10 1.6 4.5-3.4.5-2.7-2.7-.8-1.5-4.8 1.7-1.8-1.6-2.4.2-1.7-1.8-2.7-2.4.9v-2.8l3.5-3.5-.2-1.6 2.3.6 1.3-1 .5-4.5 2.3-4.2-7.1-1.2-2.4-1.6-1.4.1-1.1-.5-4.4-2.8-2.5.4-3.4-2.9z",
    agencies: 85
  },
  {
    name: "Allemagne",
    code: "DE",
    path: "M1043.6 232.3l-2.4-1.9-5.5-2.4-2.5 1.7-4.7 1.1-.1-2.1-4.9-1.4-.2-2.3-3 .9-3.6-.8.4 3.4 1.2 2.2-3 3-1-1.3-3.9.3-.9 1.3 1 2-1 5.6-1.1 2.3h-2.9l1.1 6.4-.4 4.2 1 1.4-.2 2.7 2.4 1.6 7.1 1.2-2.3 4.2-.5 4.5h4.2l1-1.4 5.4 1.9 1.5-.3 2.6 1.7.6-1.6 4.4.3 3.4-1.2 2.4.2 1.7 1.3.4-1.1-1-4 1.7-.8 1.5-2.9-2.9-2.6-2.6-1.5-.7-2.6-1-1.9 3.4-1.3 1.7-1.5 3.4-1.2 1.1-1.2 1.4.7 2.1-.6-2.3-3.9.1-2.1-1.4-3.3-2-2.2 1.2-1.6-1.4-3.1z",
    agencies: 68
  },
  {
    name: "Espagne",
    code: "ES",
    path: "M967 296l-8.2-.2-4.2.3-5.4-1h-6.8l-6.2-1.1-7.4 4.5 2 2.6-.4 4.4 1.9-1.6 2.1-.9 1.2 3.1h3l.9-.8 3 .2 1.3 3.1-2.4 1.7-.2 4.9-.9.9-.3 3-2.2.5 2 3.8-1.6 4.3 1.8 1.9-.8 1.7-2 2.5.4 2.1 4.8 1 1.4 3.7 2 2.2 2.5.6 2.1-2.5 3.3-2.3 5 .1h6.7l3.8-5 3.9-1.3 1.2-4.2 3-2.9-2-3.7 2-5.1 3.1-3.5.5-2.1 6.6-1.3 4.8-4.2-.3-3.5-6 .8-5.7-2.8-1.9 1.3-9.4-2.8-2-2.4z",
    agencies: 52
  },
  {
    name: "Italie",
    code: "IT",
    path: "M1057.8 328.6l-4 .5-5.2.7-6.2-.6-.6 3.4 7.5 3.3 2.7.7 4.2 2.4.9-3.3-.9-2 1.6-5.1zm-33.7-18.9l-2.5 1.9-2.8-.3 1.3 3.6.4 7.6 2.1 1.7 2-2.1 2.4.4.4-8.4-3.3-4.4zm14.3-34.3l-1.3-2.2-4.8 1.1-.5 1.2-3.1-.9-.3 2.5-2.1 1.1-3.8-.8-.9 2.5-2.4.2-.9-1-2.7 2.1-2.4.3-2.2-1.3-.2 1.7 1.6 2.4-1.7 1.8 1.5 4.8 2.7.8-.5 2.7 2.1-.5 2.8-2.8 2.3-.9 4.2 2.1 2.6.7 1.9 6 3.6 3.6 4.9 4 4.2 2.8 3.9.4 2.3 2.5 3.4 1.2 1.7 2.7 2.2.8 1.8 3.2 2.3 3.7-1.1 1.3-.8 3.5.1 2 2.1-.5 2.5-5.6 2.1-.4.4-3.3-3.9-2.3 1.9-4.1 4.5 1 3.1 3 .8-2.3-.6-1.2-4.7-3.2-3.9-1.9-4.8-2.3 1.4-1.2-1.4-1.4-4 .1-6-5-2.9-5.1-4.9-3.1-1.9-3.1.5-1.8-.4-3 3.9-2.2 4.1.9-1.4-2.7.3-3-7.2-1.6z",
    agencies: 42
  },
  {
    name: "Portugal",
    code: "PT",
    path: "M937.6 335.9l-.4-2.1 2-2.5.8-1.7-1.8-1.9 1.6-4.3-2-3.8 2.2-.5.3-3 .9-.9.2-4.9 2.4-1.7-1.3-3.1-3-.2-.9.8h-3l-1.2-3.1-2.1.9-1.9 1.6.1 2.1.9 2.2.1 2.7-1.3 3.8-.4 2.5-2.2 2.3-.6 4.2 1.2 2.4 2.3.6.4 4-1 5.1 2.8-.7 2.7.9 2.2-1.7z",
    agencies: 18
  },
  {
    name: "Royaume-Uni",
    code: "GB",
    path: "M950 227.5l-4.9-3.7-3.9.3.8 3.2-1.1 3.2 2.9-.1 3.5 1.3 2.7-4.2zm13-24.3l-5.5.5-3.6-.4-3.7 4.8-1.9 6.1 2.2 3 .1 5.8 2.6-2.8 1.4 1.6-1.7 2.7 1 1.6 5.7 1.1h.1l3.1 3.8-.8 3.5-7.1-.6-1 4 2.6 3.3-5.1 1.9 1.3 2.4 7.5 1-4.3 1.3-7.3 6.5 2.5 1.2 3.5-2.3 4.5.7 3.3-2.9 2.2 1.2 8.3-1.7 6.5.1 4.3-3.3-1.9-3.1 2.4-1.8.5-3.9-5.8-1.2-1.3-2.3-2.9-6.9-3.2-1-4.1-7.1-.4-.6-4.8-.4 4.2-5.3 1.3-4.9h-5l-4.7.8 5-6.4z",
    agencies: 48
  },
  {
    name: "Irlande",
    code: "IE",
    path: "M947.3 231.7l-3.5-1.3-2.9.1 1.1-3.2-.8-3.2-3.7 2.8-6.7 4.7 2.1 6.1-4.2 6.4 6.7.9 8.7-3.6 3.9-5.4-.7-4.3z",
    agencies: 15
  },
  {
    name: "Pologne",
    code: "PL",
    path: "M1069.4 228.3l-4.6-.1-.5-1.4-4.8-1.1-5.7 2.1-7.1 2.8-3.1 1.7 1.4 3.1-1.2 1.6 2 2.2 1.4 3.3-.1 2.1 2.3 3.9 2.4 1.9 3.7.6-.1 1.7 2.7 1.2.6-1.5 3.4.6.7 2 3.6.3 2.6 3.1.3.4 1.9-.9 2.7 2.2 2.8-1.3 2.4.6 3.4-.8 4.9 2.3 1.1.4-1.6-2.8 3.8-5.1 2.3-.7.3-1.8-3.1-5.3-.5-2.7-1.9-2.9 2.7-1.2-.3-2.4-1.7-2.3-.6-2.7-1.4-1.9-2.5-.6-8.7.1-5.9-.7z",
    agencies: 45
  },
  {
    name: "Roumanie",
    code: "RO",
    path: "M1108.1 266.3h-2.1l-1 1.5-3.6.6-1.6.9-2.4-1.5h-3.2l-3.2-.7-1.9 1.3-2.9 1.3-1.9 4.2-2.6 4.3-3.8 1.1 2.9 2.5.8 1.9 3.2 1.5.7 2.5 3.1 1.8 1.4-1.3 1.4.7-1.1 1.1 1 1 1.8 2.6 1.9-.5 4 1 7.5.3 2.3-1.6 5.8-1.4 4 2.2 3 .7.4-7.4 1.6.5 2.3-1.3-.4-1.6-2.4-1.1-2.2 1-2.4-1.1-1.3-2.8.2-2.7-.6-2.7-3.4-3.7-1.9-2.6-1.8-1.9-1.6-.6z",
    agencies: 35
  },
  {
    name: "Grèce",
    code: "GR",
    path: "M1101.9 344.9l-.8 2.8 6.6 1.2v1.1l7.6-.6.5-1.9-2.8.8v-1.1l-3.9-.5-4.1.4-3.1-2.2zm11.5-37.4l-2.7-1.6.3 3-4.6.6-3.9-2.1-3.9 1.7-3.8-.2-1 .2-.7 1.1-2.8-.1-1.9 1.3-3.3.6v1.6l-1.6.9-.1 2.1-2.1 3 .5 1.9 2.9 3.6 2.3 3 1.3 4.3 2.3 5.1 4.6 2.9 3.4-.1-2.4-5.7 3.3-.7-1.9-3.3 5 1.7-.4-3.7-2.7-1.8-3.2-3 1.8-1.4-2.8-3-1.6-3.8.9-1.3 3 3.2h2.9l2.5-1-3.9-3.6 6.1-1.6 2.7.6 3.2.2 1.1-.7 1.2-3.9z",
    agencies: 12
  },
  {
    name: "Pays-Bas",
    code: "NL",
    path: "M1005.5 243.9h2.9l1.1-2.3 1-5.6-1-2-3.9-.2-6.5 2.6-3.9 8.9-2.5 1.7 3.6.5 4.4-1.3 3.1 2.7 2.8 1.4-1.1-6.4z",
    agencies: 28
  },
  {
    name: "Belgique",
    code: "BE",
    path: "M1000.7 246.2l-4.4 1.3-3.6-.5-3.8 1.2.7 2.2 2.2.1 2.4 2.4 3.4 2.9 2.5-.4 4.4 2.8.4-3.5 1.3-.2.4-4.2-2.8-1.4-3.1-2.7z",
    agencies: 22
  },
  {
    name: "Autriche",
    code: "AT",
    path: "M1060.2 264l-2.3-1.2-2.3.3-4-1.9-1.7.5-2.6 2.5-3.8-2-1.5 2.9-1.7.8 1 4-.4 1.1-1.7-1.3-2.4-.2-3.4 1.2-4.4-.3-.6 1.6-2.6-1.7-1.5.3.2 1.1-.7 1.6 2.3 1.1 2.6.2 3.1.9.5-1.2 4.8-1.1 1.3 2.2 7.2 1.6 4.2.4 2.4-1.4 4.3-.1.9-1.1 1.3-4-1.1-1.3h2.8l.2-2.6-.7-2.1.3-.8z",
    agencies: 25
  },
  {
    name: "Suisse",
    code: "CH",
    path: "M1024.3 270.6l-5.4-1.9-1 1.4h-4.2l-1.3 1-2.3-.6.2 1.6-3.5 3.5v2.8l2.4-.9 1.8 2.7 2.2 1.3 2.4-.3 2.7-2.1.9 1 2.4-.2.9-2.5 3.8.8 2.1-1.1.3-2.5-2.6-.2-2.3-1.1.7-1.6-.2-1.1z",
    agencies: 32
  },
  {
    name: "République tchèque",
    code: "CZ",
    path: "M1049.4 248.5l-2.1.6-1.4-.7-1.1 1.2-3.4 1.2-1.7 1.5-3.4 1.3 1 1.9.7 2.6 2.6 1.5 2.9 2.6 3.8 2 2.6-2.5 1.7-.5 4 1.9 2.3-.3 2.3 1.2.6-1.4 2.2.1 1.6-.6.1-.6.9-.3.2-1.4 1.1-.3.6-1.1h1.5l-2.6-3.1-3.6-.3-.7-2-3.4-.6-.6 1.5-2.7-1.2.1-1.7-3.7-.6-2.4-1.9z",
    agencies: 20
  },
  {
    name: "Hongrie",
    code: "HU",
    path: "M1079.1 263.8l-1.6.4-1 1.5-2.2.7-.6-.4-2.3 1-1.9.2-.3 1.2-4.1.8-1.9-.7-2.6-1.6-.2 2.6h-2.8l1.1 1.3-1.3 4 .8.1 1.2 2.1 1.6.8 4 2.6 4.2 1.2 1.8-.9 3.7-1.6 3.2.2 3.8-1.1 2.6-4.3 1.9-4.2 2.9-1.3-.6-1.6-2.9-1.7-1 .6-5.5-1.9z",
    agencies: 18
  },
  {
    name: "Slovaquie",
    code: "SK",
    path: "M1087.4 260.9l-4.9-2.3-3.4.8-2.4-.6-2.8 1.3-2.7-2.2-1.9.9-.3-.4h-1.5l-.6 1.1-1.1.3-.2 1.4-.9.3-.1.6-1.6.6-2.2-.1-.6 1.4-.3.8.7 2.1 2.6 1.6 1.9.7 4.1-.8.3-1.2 1.9-.2 2.3-1 .6.4 2.2-.7 1-1.5 1.6-.4 5.5 1.9 1-.6.7-2.5 1.1-1.7z",
    agencies: 14
  },
  {
    name: "Croatie",
    code: "HR",
    path: "M1065 280.4l-4-2.6-1.6-.8-3.9 1.7-.3 2.5-1.7.6.2 1.7-2-.1-1.8-1-.8 1-3.5-.2-.2.1v2.2l1.7 2 1.3-2.6 3.3 1 .3 2 2.5 2.6-1 .5 4.6 4.5 4.8 1.8 3.1 2.2 5 2.3.5-1-4.7-2.4-2.2-2.5-2-1.4-2.5-2.3-1.3-1.9-2.7-2.9.9-2.5 1.9 1.4 1-1.3 2.3-.1 4.4 1 3.5-.1 2.4 1.4 1.7-2.3-1.7-1.8-1.5-2.4-1.8.9-4.2-1.2z",
    agencies: 10
  },
  {
    name: "Bulgarie",
    code: "BG",
    path: "M1121.6 294.3l-3-.7-4-2.2-5.8 1.4-2.3 1.6-7.5-.3-4-1-1.9.5-1.8-2.6-1.1 1.4.7 2.3 2.8 2.6-1.7 1.9-.7 2 .6.7-.7.9 2.8 2 .8 4.1 3.8.2 3.9-1.7 3.9 2.1 4.6-.6-.3-3 5-2 4.5.8-2.1-3.5 1.3-4.4 2.2-2.5z",
    agencies: 11
  },
  {
    name: "Estonie",
    code: "EE",
    path: "M1093.2 197.5l-5.5.9-5.4 1.6.9 3.4 3.3 2.1 1.5-.8.1 3.5 3.7-1 2.1.7 4.4 2.2h3.8l1.6-1.9-2.5-5.5 2.6-3.4-.9-1-4.6.2-5.1-1z",
    agencies: 8
  },
  {
    name: "Lettonie",
    code: "LV",
    path: "M1102.1 210.1h-3.8l-4.4-2.2-2.1-.7-3.7 1-.2 4.6-3.6.1-4.4-4.5-4 2.1-1.7 3.7.5 4.5 5-1.9 7.9.4 4.4-.6.9 1.3 2.5.4 5 2.9 2.6-1 4.6-2.3-2.1-3.6-1-2.8-2.4-1.4z",
    agencies: 9
  },
  {
    name: "Lituanie",
    code: "LT",
    path: "M1100.4 221.2l-5-2.9-2.5-.4-.9-1.3-4.4.6-7.9-.4-5 1.9 1.7 5 5 1.1 2.2.9-.2 1.7.6 1.5 2.5.6 1.4 1.9h4.6l4.8-2.2.5-3.4 3.5-2-.9-2.6z",
    agencies: 10
  },
  {
    name: "Slovénie",
    code: "SI",
    path: "M1059.4 277l-1.2-2.1-.8-.1-.9 1.1-4.3.1-2.4 1.4-4.2-.4-.3 3 1.4 2.7-1.1.5 3.5.2.8-1 1.8 1 2 .1-.2-1.7 1.7-.6.3-2.5 3.9-1.7z",
    agencies: 11
  },
  {
    name: "Danemark",
    code: "DK",
    path: "M1035.9 221.2l-1.7-3-6.7 2 .9 2.5 5.1 3.4 2.4-4.9zm-8.6-5.1l-2.6-.9-.7-1.6 1.3-2-.1-3-3.6 1.6-1.5 1.7-4 .4-1.2 1.7-.7 1.6.4 6.1 2.1 3.4 3.6.8 3-.9-1.5-3 3.1-4.3 1.4.7 1-2.3z",
    agencies: 19
  },
  {
    name: "Suède",
    code: "SE",
    path: "M1077.7 161.1l-1.9-2.2-1.7-8.4-7.2-3.7-5.9-2.7-2.5.3v3.5l-7.9-.9-.6 3.1-4-.1-2.2 3.9-3.4 6.1-5.7 7.9 1.8 1.9-1.3 2.2-4.3-.1-2.3 5.3 1 7.6 3.1 2.9-.9 6.9-3.4 4-1.7 3.3 4.2 8.4 4.4 6.7 2 5.7 5.3-.3 2.2-4.7 5.7.5 2-5.5.6-10 4.6-1.3 3.3-6.6-4.8-3.3-3.6-4 2.1-8.1 7.7-4.9 6.1-4.5-1.2-3.5 3.4-3.9 7-1.5z",
    agencies: 30
  },
  {
    name: "Norvège",
    code: "NO",
    path: "M1088.8 133.1l-6.9 1.1-7.3-.3-5.1 4.4-6.7-.3-8.5 2.3-10.1 6.8-6.4 4-8.8 10.7-7.1 7.8-8.1 5.8-11.2 4.8-3.9 3.6 1.9 13.4 1.9 6.3 6.4 3 6-1.4 8.5-6.8 3.3 3.6 1.7-3.3 3.4-4 .9-6.9-3.1-2.9-1-7.6 2.3-5.3 4.3.1 1.3-2.2-1.8-1.9 5.7-7.9 3.4-6.1 2.2-3.9 4 .1.6-3.1 7.9.9v-3.5l2.5-.3 2.1-1.4 5.1 2.9 5.3-.3 4.7 1.3 3.4-2.4 1.1-3.9 5.8-1.8 5.7 2.1-.8 3.8 3.2-.5 6.4-2.2-5.4-3.3 4.8-1.4-13.6-3.9zm-22.6-33.3l-5.6-1-1.9-1.7-7.2.9 2.6 1.5-2.2 1.2 6.7 1.1 7.6-2zm-25.4-8.3l-4.8-1.6-5.1.2-1 1.5h-5l-2.2-1.5-9.3 1.6 3.2 3.5 7.6 3.8 5.7 1.4-3 1.7 8.4 2.9 4.4-.2.9-3.9 3-.9 1.2-3.4 8.5-1.8-12.5-3.3zm24.2-3.1l-9.1-1-3.2 1.2-5.3-1-10.4 1.2 4.3 2h5.1l.9 1.3 10.6.7 10.1-.5 4.3-2.4-7.3-1.5z",
    agencies: 22
  },
  {
    name: "Finlande",
    code: "FI",
    path: "M1093.4 144.4l.8-3.8-5.7-2.1-5.8 1.8-1.1 3.9-3.4 2.4-4.7-1.3-5.3.3-5.1-2.9-2.1 1.4 5.9 2.7 7.2 3.7 1.7 8.4 1.9 2.2 6.4 2.6.9 2.3-2.6 1.2-8.7 6.1-3.3 3.6-1.5 3.3 2.9 5.2-.1 5.7 4.7 1.9 3.1 3.1 7.1-1.2 7.5-2.1 8-.5 7.9-7.4 3.3-3.3.9-2.9-7.3-3.9.9-3.7-4.9-4.1 1.7-4.8-6.4-6.3 2.8-4.1-7.2-3.7-.4-3.7z",
    agencies: 16
  }
];