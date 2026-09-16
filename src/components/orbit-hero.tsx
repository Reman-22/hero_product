"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProductKind = "sofa" | "lamp" | "chair" | "plant" | "stool" | "cushion";

type StoreProduct = {
  id: string;
  name: string;
  dimensions: string;
  kind: ProductKind;
  color: string;
};

type StoreScene = {
  id: string;
  word: string;
  kicker: string;
  /** Short editorial copy rendered only for the active category. */
  description: string;
  color: string;
  secondaryColor: string;
  products: StoreProduct[];
  hero: ReactNode;
};

export type OrbitItem = {
  id: string;
  name: string;
  category: string;
  accent: string;
  svg: ReactNode;
};

export type OrbitHeroProps = {
  scenes?: StoreScene[];
};

const svgBase = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  focusable: false,
};

function ProductIcon({
  kind,
  color,
  className,
}: {
  kind: ProductKind;
  color: string;
  className?: string;
}) {
  if (kind === "sofa") {
    return (
      <svg {...svgBase} viewBox="0 0 120 100" className={className} aria-hidden="true">
        <path d="M17 50c0-9 7-16 16-16h54c9 0 16 7 16 16v19H17V50Z" fill={color} stroke="#26272A" strokeWidth="2.2" />
        <path d="M12 69h86v10H12V69ZM19 79v8M91 79v8" stroke="#26272A" strokeWidth="3" strokeLinecap="round" />
        <path d="M27 48c0-5 4-9 9-9h48c5 0 9 4 9 9v9H27v-9Z" fill="#fff" fillOpacity=".22" stroke="#26272A" strokeWidth="2" />
        <path d="M51 45v22M71 45v22" stroke="#26272A" strokeWidth="1.6" opacity=".45" />
      </svg>
    );
  }

  if (kind === "lamp") {
    return (
      <svg {...svgBase} viewBox="0 0 120 100" className={className} aria-hidden="true">
        <path d="M27 32h66l-8 29H35l-8-29Z" fill={color} stroke="#26272A" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M43 61h34l7 27H36l7-27Z" fill="#F6F5F0" stroke="#26272A" strokeWidth="2.2" />
        <path d="M60 61v27M47 79h26" stroke="#26272A" strokeWidth="1.7" opacity=".55" />
        <path d="M20 88h80" stroke="#26272A" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="60" cy="45" r="5" fill="#FFD36A" stroke="#26272A" strokeWidth="1.5" />
      </svg>
    );
  }

  if (kind === "chair") {
    return (
      <svg {...svgBase} viewBox="0 0 120 100" className={className} aria-hidden="true">
        <path d="M33 22h45c5 0 9 4 9 9v32H33V22Z" fill={color} stroke="#26272A" strokeWidth="2.2" />
        <path d="M26 57h64c5 0 9 4 9 9v7H17v-7c0-5 4-9 9-9Z" fill={color} stroke="#26272A" strokeWidth="2.2" />
        <path d="M28 73 22 91M88 73l6 18M39 73l-2 18M77 73l2 18" stroke="#26272A" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M44 32h23" stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "plant") {
    return (
      <svg {...svgBase} viewBox="0 0 120 100" className={className} aria-hidden="true">
        <path d="M36 50h48l-6 38H42l-6-38Z" fill={color} stroke="#26272A" strokeWidth="2.2" />
        <path d="M60 50V20M60 37C47 33 42 25 46 19c10 0 15 6 14 18ZM61 31c5-12 13-16 21-13 0 9-7 15-21 18ZM59 42c-10-7-19-5-23 3 7 7 15 6 23 1Z" fill="#78BE9B" stroke="#26272A" strokeWidth="2" strokeLinejoin="round" />
        <path d="M36 57h48" stroke="#fff" strokeOpacity=".4" strokeWidth="2" />
      </svg>
    );
  }

  if (kind === "stool") {
    return (
      <svg {...svgBase} viewBox="0 0 120 100" className={className} aria-hidden="true">
        <path d="M28 35c0-7 7-12 16-12h32c9 0 16 5 16 12s-7 12-16 12H44c-9 0-16-5-16-12Z" fill={color} stroke="#26272A" strokeWidth="2.2" />
        <path d="M39 47 31 86M81 47l8 39M51 47l-2 39M69 47l2 39" stroke="#26272A" strokeWidth="3" strokeLinecap="round" />
        <path d="M27 86h66" stroke="#26272A" strokeWidth="2.3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...svgBase} viewBox="0 0 120 100" className={className} aria-hidden="true">
      <path d="m26 41 33-17 36 17-34 18-35-18Z" fill={color} stroke="#26272A" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="m26 41 1 29 34 17 34-19V41L61 59 26 41Z" fill={color} fillOpacity=".78" stroke="#26272A" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="m61 59 1 28M27 55l34 18 33-18" stroke="#fff" strokeOpacity=".38" strokeWidth="1.8" />
    </svg>
  );
}

function AbstractAccent({
  variant,
  uid,
  sceneId,
  primary,
  secondary,
}: {
  variant: number;
  uid: string;
  sceneId: string;
  primary: string;
  secondary: string;
}) {
  if (variant === 0 && sceneId === "purple-cake") {
    return (
      <svg {...svgBase} viewBox="0 0 160 120" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-sofa`} x1="26" y1="24" x2="133" y2="101" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b381ff" />
            <stop offset=".48" stopColor="#7441df" />
            <stop offset="1" stopColor="#4825a4" />
          </linearGradient>
          <filter id={`${uid}-sofa-shadow`} x="-35%" y="-50%" width="180%" height="220%">
            <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#321277" floodOpacity=".38" />
          </filter>
        </defs>
        <g filter={`url(#${uid}-sofa-shadow)`}>
          <path d="M25 55c0-20 16-35 36-35h42c20 0 34 14 34 34v32H25V55Z" fill={`url(#${uid}-sofa)`} />
          <path d="M15 75c0-10 8-18 18-18h10c8 0 14 6 14 14v13h48V71c0-8 6-14 14-14h8c10 0 18 8 18 18v19c0 7-6 13-13 13H28c-7 0-13-6-13-13V75Z" fill={`url(#${uid}-sofa)`} />
          <path d="M54 45c0-6 5-11 11-11h31c6 0 11 5 11 11v25H54V45Z" fill="#a875f7" fillOpacity=".52" />
          <path d="M33 107v8M128 107v8" stroke="#2f176d" strokeWidth="5" strokeLinecap="round" />
          <path d="M61 38c11-5 26-5 38 0" stroke="#fff" strokeOpacity=".24" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  if (variant === 0 && sceneId === "blob-sofa") {
    return (
      <svg {...svgBase} viewBox="0 0 160 130" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-blob`} x1="40" y1="31" x2="122" y2="116" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffe36e" />
            <stop offset=".52" stopColor="#f6b91f" />
            <stop offset="1" stopColor="#bd7410" />
          </linearGradient>
          <linearGradient id={`${uid}-loop`} x1="38" y1="17" x2="124" y2="89" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffdce8" />
            <stop offset=".48" stopColor="#f5a6bf" />
            <stop offset="1" stopColor="#d9718f" />
          </linearGradient>
          <filter id={`${uid}-blob-shadow`} x="-40%" y="-45%" width="190%" height="220%">
            <feDropShadow dx="0" dy="11" stdDeviation="8" floodColor="#8c570d" floodOpacity=".3" />
          </filter>
        </defs>
        <g filter={`url(#${uid}-blob-shadow)`}>
          <path d="M43 58c13-17 61-20 76-2 12 14 18 43 7 57-13 16-72 17-88-1-11-12-5-41 5-54Z" fill={`url(#${uid}-blob)`} />
          <path d="M41 60c-10-25 4-42 23-39 10 2 13 13 22 13 10 0 13-13 26-13 19 1 27 24 14 42-8 11-20 17-35 14-18-3-40 8-50-17Z" stroke={`url(#${uid}-loop)`} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M57 88c16 5 37 4 54-2" stroke="#fff" strokeOpacity=".2" strokeWidth="5" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  if (variant === 0) {
    return (
      <svg {...svgBase} viewBox="0 0 140 120" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-curve`} x1="12" y1="14" x2="126" y2="102" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff684e" />
            <stop offset=".55" stopColor={secondary} />
            <stop offset="1" stopColor="#f6b5c7" />
          </linearGradient>
          <filter id={`${uid}-curve-shadow`} x="-40%" y="-50%" width="190%" height="220%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="blur" />
            <feOffset dy="9" result="offset" />
            <feColorMatrix in="offset" type="matrix" values="0 0 0 0 0.25 0 0 0 0 0.08 0 0 0 0 0.12 0 0 0 .3 0" />
            <feBlend in="SourceGraphic" />
          </filter>
        </defs>
        <path
          d="M27 82C8 62 17 27 43 21c22-5 31 17 45 23 16 7 28-8 40 5 13 15 1 43-20 50-29 10-59 6-81-17Z"
          fill={`url(#${uid}-curve)`}
          filter={`url(#${uid}-curve-shadow)`}
        />
        <path d="M39 70c14-15 24-18 42-8 14 8 25 6 35-2" stroke="#fff" strokeOpacity=".3" strokeWidth="8" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === 1) {
    return (
      <svg {...svgBase} viewBox="0 0 140 120" aria-hidden="true">
        <defs>
          <filter id={`${uid}-blur`} x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="6.5" />
          </filter>
        </defs>
        <g filter={`url(#${uid}-blur)`} opacity=".94">
          <ellipse cx="70" cy="77" rx="40" ry="13" fill="#4178e8" />
          <ellipse cx="65" cy="63" rx="35" ry="13" fill="#ffd43f" />
          <ellipse cx="76" cy="48" rx="31" ry="13" fill="#f04f50" />
          <circle cx="104" cy="38" r="12" fill={secondary} />
        </g>
        <path d="M35 99h16M58 103h9M76 98h23" stroke="#34363a" strokeOpacity=".22" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...svgBase} viewBox="0 0 140 120" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-soft`} x1="24" y1="20" x2="113" y2="103" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor={primary} stopOpacity=".22" />
        </linearGradient>
        <filter id={`${uid}-soft-shadow`} x="-40%" y="-40%" width="180%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#25262a" floodOpacity=".16" />
        </filter>
      </defs>
      <path d="M25 66c14-25 32-42 57-43 27-1 42 19 31 39-8 15-28 14-36 31-9 18-30 17-45 5-11-9-14-20-7-32Z" fill={`url(#${uid}-soft)`} filter={`url(#${uid}-soft-shadow)`} />
      <path d="M46 71c12-13 23-21 40-23" stroke="#fff" strokeOpacity=".88" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function SceneHeroArt({ scene }: { scene: StoreScene }) {
  const { id, color, secondaryColor } = scene;

  return (
    <svg
      viewBox="0 0 480 390"
      className="scene-hero-svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-glow`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={color} stopOpacity=".98" />
          <stop offset=".55" stopColor={secondaryColor} stopOpacity=".82" />
          <stop offset="1" stopColor="#fff" stopOpacity=".12" />
        </linearGradient>
        <filter id={`${id}-soft-shadow`} x="-40%" y="-40%" width="180%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="11" result="blur" />
          <feOffset dy="18" result="offset" />
          <feColorMatrix in="offset" type="matrix" values="0 0 0 0 0.08 0 0 0 0 0.1 0 0 0 0 0.12 0 0 0 .28 0" />
          <feBlend in="SourceGraphic" />
        </filter>
      </defs>

      <path d="M42 35C111-2 225 7 280 36c65 34 106 84 76 144-35 70-120 31-165 86-45 55-137 41-157-12C10 202 4 62 42 35Z" fill={`url(#${id}-glow)`} opacity=".72" />
      <circle cx="387" cy="72" r="26" fill={secondaryColor} opacity=".9" />
      <circle cx="91" cy="305" r="15" fill="#fff" opacity=".86" />
      <path d="M95 73c7-8 13-8 20 0-7 8-13 8-20 0ZM385 215c7-8 13-8 20 0-7 8-13 8-20 0Z" fill="#fff" opacity=".8" />

      {scene.id === "blob-sofa" && (
        <g filter={`url(#${id}-soft-shadow)`}>
          <path d="M115 233c0-43 30-69 75-69h127c42 0 69 25 69 67v43H115v-41Z" fill={color} stroke="#26272A" strokeWidth="3" />
          <path d="M102 266h300v29c0 9-7 16-16 16H118c-9 0-16-7-16-16v-29Z" fill={color} stroke="#26272A" strokeWidth="3" />
          <path d="M130 265c-4-31 13-58 44-58h160c31 0 50 27 45 58H130Z" fill="#fff" fillOpacity=".13" stroke="#26272A" strokeWidth="2.5" />
          <path d="M203 215v50M266 215v50" stroke="#26272A" strokeOpacity=".38" strokeWidth="2" />
          <path d="M139 311 128 357M365 311l11 46" stroke="#26272A" strokeWidth="4" strokeLinecap="round" />
          <path d="M105 193c12-29 39-42 65-32l41 15-27 35-44-4c-18-2-30-5-35-14Z" fill={secondaryColor} stroke="#26272A" strokeWidth="3" />
          <circle cx="343" cy="192" r="23" fill={secondaryColor} stroke="#26272A" strokeWidth="3" />
        </g>
      )}

      {scene.id === "purple-cake" && (
        <g filter={`url(#${id}-soft-shadow)`}>
          <path d="M105 219c0-45 36-71 75-71h134c39 0 64 27 64 69v46H105v-44Z" fill={color} stroke="#26272A" strokeWidth="3" />
          <path d="M94 263h292v31c0 10-8 18-18 18H112c-10 0-18-8-18-18v-31Z" fill={color} stroke="#26272A" strokeWidth="3" />
          <path d="M153 214h172M185 214v49M250 214v49" stroke="#fff" strokeOpacity=".23" strokeWidth="3" />
          <path d="M128 312 116 355M350 312l12 43" stroke="#26272A" strokeWidth="4" strokeLinecap="round" />
          <path d="M100 185c7-30 29-45 55-45h36v63h-59c-22 0-34-7-32-18Z" fill={secondaryColor} stroke="#26272A" strokeWidth="3" />
          <path d="M304 170c20-16 45-13 58 5 10 14 4 34-17 43l-43 16-16-43 18-21Z" fill={secondaryColor} stroke="#26272A" strokeWidth="3" />
          <path d="M148 137c-4-16 8-27 23-24 5 1 9 4 12 8" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".8" />
        </g>
      )}

      {scene.id === "herb-pods" && (
        <g filter={`url(#${id}-soft-shadow)`}>
          <path d="M151 190h174l-16 139H167l-16-139Z" fill="#EDEDE7" stroke="#26272A" strokeWidth="3" />
          <path d="M170 190c3-39 26-59 68-59s65 20 68 59" fill="#D7E4D7" stroke="#26272A" strokeWidth="3" />
          <path d="M239 136V60M239 113c-38-14-54-38-39-57 29 4 43 26 40 57ZM242 91c21-33 48-39 64-20-12 30-35 36-64 31ZM234 129c-31-16-57-9-65 14 26 19 45 8 65-7Z" fill="#78BE9B" stroke="#26272A" strokeWidth="3" strokeLinejoin="round" />
          <path d="M184 231h108M184 264h108" stroke="#C1D3C1" strokeWidth="4" />
          <path d="M185 329h108" stroke="#26272A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="104" cy="282" r="29" fill={secondaryColor} stroke="#26272A" strokeWidth="3" />
        </g>
      )}

      {scene.id === "peach-chair" && (
        <g filter={`url(#${id}-soft-shadow)`}>
          <path d="M161 93h139c18 0 31 14 31 31v94H130v-94c0-17 13-31 31-31Z" fill={color} stroke="#26272A" strokeWidth="3" />
          <path d="M119 213h222v50H119v-50Z" fill={color} stroke="#26272A" strokeWidth="3" />
          <path d="M144 263 125 350M316 263l19 87M186 263l-7 87M274 263l7 87" stroke="#26272A" strokeWidth="4" strokeLinecap="round" />
          <path d="M175 120h105M175 154h105" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
          <path d="M338 109c23-24 49-19 57 3 7 18-9 36-33 37l-32-1-1-22 9-17Z" fill={secondaryColor} stroke="#26272A" strokeWidth="3" />
        </g>
      )}

      {scene.id === "soft-lamp" && (
        <g filter={`url(#${id}-soft-shadow)`}>
          <path d="M121 116h238l-31 111H152l-31-111Z" fill={color} stroke="#26272A" strokeWidth="3" strokeLinejoin="round" />
          <path d="M179 227h122l26 112H153l26-112Z" fill="#F5F4EE" stroke="#26272A" strokeWidth="3" strokeLinejoin="round" />
          <path d="M240 227v112M191 295h98" stroke="#26272A" strokeOpacity=".44" strokeWidth="3" />
          <path d="M102 339h276" stroke="#26272A" strokeWidth="4" strokeLinecap="round" />
          <circle cx="240" cy="171" r="19" fill="#FFD36A" stroke="#26272A" strokeWidth="3" />
          <path d="M240 81v39M179 103l27 27M301 103l-27 27" stroke={secondaryColor} strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

const storehouseScenes: StoreScene[] = ([
  {
    id: "purple-cake",
    word: "Sofa\ncake",
    kicker: "Soft forms / 01",
    description: "Plush modular seating with soft curves and a midnight-purple finish.",
    color: "#8F50E8",
    secondaryColor: "#B877F3",
    hero: null,
    products: [
      { id: "worktop", name: "Worktop", dimensions: "110 x 110", kind: "stool", color: "#F2A24E" },
      { id: "capsule", name: "Couch capsule", dimensions: "110 x 110", kind: "cushion", color: "#F79E8A" },
      { id: "couch-cake", name: "Couch cake", dimensions: "110 x 110", kind: "sofa", color: "#7140D7" },
    ],
  },
  {
    id: "blob-sofa",
    word: "Blob\nsofa",
    kicker: "Soft forms / 02",
    description: "Rounded golden silhouettes made for playful, low-slung lounging.",
    color: "#FFD65C",
    secondaryColor: "#F2B5D4",
    hero: null,
    products: [
      { id: "purifier", name: "Purifier O2", dimensions: "110 x 110", kind: "lamp", color: "#E94E42" },
      { id: "copse", name: "Copse combo", dimensions: "110 x 110", kind: "chair", color: "#D9B998" },
      { id: "bouncy", name: "Bouncy prop", dimensions: "110 x 110", kind: "chair", color: "#F08777" },
    ],
  },
  {
    id: "herb-pods",
    word: "Herb\npods",
    kicker: "Green rooms / 03",
    description: "Small botanical objects that bring a quiet piece of the outdoors in.",
    color: "#8DE8B7",
    secondaryColor: "#D7A57A",
    hero: null,
    products: [
      { id: "herbs", name: "Herbs pods", dimensions: "110 x 110", kind: "plant", color: "#EDEDE7" },
      { id: "garden", name: "Garden pack", dimensions: "110 x 110", kind: "chair", color: "#B6A48A" },
      { id: "outdoor", name: "Outdoor light", dimensions: "110 x 110", kind: "lamp", color: "#F08B75" },
    ],
  },
  {
    id: "peach-chair",
    word: "Mellow\nchair",
    kicker: "Quiet comfort / 04",
    description: "A relaxed collection of soft seats, cushions, and companion tables.",
    color: "#FFAF95",
    secondaryColor: "#C7A3E9",
    hero: null,
    products: [
      { id: "soft-seat", name: "Soft seat", dimensions: "110 x 110", kind: "chair", color: "#F38E79" },
      { id: "round-pouf", name: "Round pouf", dimensions: "110 x 110", kind: "stool", color: "#C9B0EE" },
      { id: "side-table", name: "Side table", dimensions: "110 x 110", kind: "stool", color: "#E5C078" },
    ],
  },
  {
    id: "soft-lamp",
    word: "Soft\nlight",
    kicker: "Everyday glow / 05",
    description: "Warm glowing objects designed to soften every corner of a room.",
    color: "#F4C3D5",
    secondaryColor: "#F5D271",
    hero: null,
    products: [
      { id: "halo", name: "Halo light", dimensions: "110 x 110", kind: "lamp", color: "#F3A7C5" },
      { id: "low-table", name: "Low table", dimensions: "110 x 110", kind: "stool", color: "#EDC66F" },
      { id: "cloud-cushion", name: "Cloud cushion", dimensions: "110 x 110", kind: "cushion", color: "#B8D7EF" },
    ],
  },
] as StoreScene[]).map((scene) => ({ ...scene, hero: <SceneHeroArt scene={scene} /> }));

function normalizeIndex(value: number, length: number) {
  return ((value % length) + length) % length;
}

function getScrollDistance() {
  if (typeof window === "undefined") return 2200;
  if (window.innerWidth < 768) return 1500;
  if (window.innerWidth < 1024) return 1900;
  return 2400;
}

export default function OrbitHero({ scenes = storehouseScenes }: OrbitHeroProps) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const activeScene = scenes[activeSceneIndex] ?? scenes[0];
  const sectionRef = useRef<HTMLElement>(null);
  const scenePanelRef = useRef<HTMLDivElement>(null);
  const sceneShapeRef = useRef<HTMLDivElement>(null);
  const sceneProductGroupRefs = useRef<HTMLDivElement[]>([]);
  const sceneWordRefs = useRef<HTMLHeadingElement[]>([]);
  const sceneIndexRef = useRef(0);
  const displayedSceneRef = useRef(0);
  const initialSceneReadyRef = useRef(false);
  const previousSceneRef = useRef(activeScene);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const shape = sceneShapeRef.current;
    const productGroups = sceneProductGroupRefs.current;
    const productVisuals = Array.from(section?.querySelectorAll<HTMLElement>(".scene-product-visual") ?? []);
    if (!section || !shape || productGroups.length !== scenes.length || scenes.length === 0) return undefined;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const autoDriver = { phase: 0 };
      const scrollDriver = { phase: 0 };
      let completedAutoCycles = 0;

      const renderCombinedMotion = () => {
        const combinedPhase = completedAutoCycles + autoDriver.phase + scrollDriver.phase;
        const angle = -9 + combinedPhase * 180;
        gsap.set([shape, ...productGroups], { rotation: angle });
        gsap.set(productVisuals, { rotation: -angle });

        const nextSceneIndex = normalizeIndex(Math.floor(combinedPhase + 0.04), scenes.length);
        if (nextSceneIndex !== sceneIndexRef.current) {
          sceneIndexRef.current = nextSceneIndex;
          setActiveSceneIndex(nextSceneIndex);
        }
      };

      renderCombinedMotion();

      if (reducedMotion) {
        gsap.set([shape, ...productGroups], { rotation: 0 });
        gsap.set(productVisuals, { rotation: 0 });
        setActiveSceneIndex(0);
        return;
      }

      const automaticSequence = gsap.timeline({
        repeat: -1,
        onRepeat: () => {
          completedAutoCycles += 1;
          autoDriver.phase = 0;
          renderCombinedMotion();
        },
      });

      automaticSequence
        .to(autoDriver, {
          phase: 0.52,
          duration: 3.65,
          ease: "none",
          onUpdate: renderCombinedMotion,
        })
        .to(autoDriver, {
          phase: 1,
          duration: 0.62,
          ease: "power3.in",
          onUpdate: renderCombinedMotion,
        })
        .to({}, { duration: 0.53 });

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: renderCombinedMotion,
        },
      });

      scrollTimeline.to(scrollDriver, {
        phase: scenes.length,
        duration: 1,
        ease: "none",
        onUpdate: renderCombinedMotion,
      });

      return () => {
        automaticSequence.kill();
        scrollTimeline.scrollTrigger?.kill();
        scrollTimeline.kill();
      };
    }, section);

    return () => ctx.revert();
  }, [scenes]);

  useLayoutEffect(() => {
    const panel = scenePanelRef.current;
    const shape = sceneShapeRef.current;
    const productGroups = sceneProductGroupRefs.current;
    const wordGroups = sceneWordRefs.current;
    if (
      !panel ||
      !shape ||
      productGroups.length !== scenes.length ||
      wordGroups.length !== scenes.length
    )
      return undefined;

    const fromIndex = displayedSceneRef.current;
    const incomingGroup = productGroups[activeSceneIndex];
    const outgoingGroup = productGroups[fromIndex];
    const incomingWord = wordGroups[activeSceneIndex];
    const outgoingWord = wordGroups[fromIndex];
    const previousScene = previousSceneRef.current;
    previousSceneRef.current = activeScene;
    displayedSceneRef.current = activeSceneIndex;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const transitionContext = gsap.context(() => {
      const transition = gsap.timeline({ defaults: { overwrite: "auto" } });
      const incomingCards = incomingGroup ? Array.from(incomingGroup.children) : [];
      const outgoingCards = outgoingGroup ? Array.from(outgoingGroup.children) : [];

      if (reducedMotion) {
        gsap.set(panel, {
          "--scene-color": activeScene.color,
          "--scene-secondary": activeScene.secondaryColor,
        });
        gsap.set(productGroups, { autoAlpha: 0, x: 0, y: 0, scale: 1 });
        gsap.set(wordGroups, { autoAlpha: 0, x: 0, y: 0 });
        gsap.set(incomingGroup, { autoAlpha: 1 });
        gsap.set(incomingWord, { autoAlpha: 1 });
        gsap.set(shape, { rotation: 0, scale: 1 });
        return;
      }

      gsap.set(panel, {
        "--scene-color": previousScene.color,
        "--scene-secondary": previousScene.secondaryColor,
      });

      if (!initialSceneReadyRef.current) {
        initialSceneReadyRef.current = true;
        gsap.set(panel, {
          "--scene-color": activeScene.color,
          "--scene-secondary": activeScene.secondaryColor,
        });
        gsap.set(productGroups, { autoAlpha: 0, x: 0, y: 0, scale: 1 });
        gsap.set(wordGroups, { autoAlpha: 0, x: 0, y: 0, scale: 1 });
        if (incomingGroup) gsap.set(incomingGroup, { autoAlpha: 1 });
        if (incomingWord) gsap.set(incomingWord, { autoAlpha: 1 });
        gsap.set(shape, { autoAlpha: 1, scale: 1 });
      } else {
        gsap.set(shape, { autoAlpha: 1, scale: 1 });
        gsap.set(outgoingGroup, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
        gsap.set(outgoingWord, { autoAlpha: 1, y: 0, x: 0, scale: 1 });
        // every new set always enters from above the square — never from
        // the previous set's exit position
        if (incomingGroup) {
          gsap.set(incomingGroup, { autoAlpha: 0, x: 0, y: -150, scale: 0.7 });
        }
        // strip staging: the new word waits at the left edge and the new
        // rows at the right edge — fully opaque, no fades, no offsets
        if (incomingWord) {
          gsap.set(incomingWord, { autoAlpha: 1, y: 0, x: "-100%", scale: 1 });
        }
        transition
          // title strip: old word exits right while the new word enters
          // from the left — same distance, same speed, same start time
          .to(outgoingWord, {
            x: "100%",
            duration: 0.9,
            ease: "power2.inOut",
          }, 0.1)
          .to(incomingWord, {
            x: 0,
            duration: 0.9,
            ease: "power2.inOut",
          }, 0.1)
          .set(outgoingWord, { autoAlpha: 0 }, 1)
          .to(shape, {
            autoAlpha: 0.5,
            scale: 0.94,
            duration: 0.72,
            ease: "power2.inOut",
          }, 0)
          // outgoing products speed up and vanish back up
          .to(outgoingGroup, {
            autoAlpha: 0,
            x: 0,
            y: -55,
            scale: 0.8,
            duration: 0.45,
            ease: "power3.in",
          }, 0.02)
          .to(panel, {
            "--scene-color": activeScene.color,
            "--scene-secondary": activeScene.secondaryColor,
            duration: 0.9,
            ease: "power2.inOut",
          }, 0.34)
          .set(shape, { autoAlpha: 0.5, scale: 0.94 }, 0.7)
          .to(shape, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.78,
            ease: "power2.out",
          }, 0.71)
          // slow descent from the top edge...
          .to(incomingGroup, {
            autoAlpha: 1,
            x: 0,
            y: -45,
            scale: 0.82,
            duration: 0.95,
            ease: "sine.inOut",
          }, 0.7)
          // ...then accelerate into their orbiting positions
          .to(incomingGroup, {
            y: 0,
            scale: 1,
            duration: 0.42,
            ease: "power2.in",
          }, 1.65);
      }

      if (incomingGroup) {
        gsap.to(incomingCards, {
          y: -5,
          scale: 1.035,
          duration: 2.5,
          stagger: 0.16,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.05,
          overwrite: false,
        });
      }
      if (outgoingCards.length) {
        gsap.set(outgoingCards, { clearProps: "y" });
      }
    }, panel);

    return () => transitionContext.revert();
  }, [activeSceneIndex, activeScene, scenes.length]);

  const setSceneProductGroupRef = (index: number) => (node: HTMLDivElement | null) => {
    if (node) sceneProductGroupRefs.current[index] = node;
  };

  const setSceneWordRef = (index: number) => (node: HTMLHeadingElement | null) => {
    if (node) sceneWordRefs.current[index] = node;
  };

  return (
    <section ref={sectionRef} id="top" className="storehouse-hero" aria-labelledby="storehouse-title">
      <div className="storehouse-topbar">
        <a className="storehouse-brand" href="#top" aria-label="Storehouse home">
          <span className="brand-dot" />
          storehouse
        </a>
        <p>Objects for a softer everyday</p>
        <button className="storehouse-menu" type="button" aria-label="Open menu">
          <span />
          <span />
        </button>
      </div>

      <div className="storehouse-stage">

        <div className="showcase-card">
          <div
            className="scene-panel"
            style={{
              "--scene-color": activeScene.color,
              "--scene-secondary": activeScene.secondaryColor,
            } as CSSProperties}
          >
            <div ref={sceneShapeRef} className="scene-panel-shape" aria-hidden="true" />
            <div className="scene-word-stack" aria-live="polite">
              {scenes.map((scene, index) => (
                <h1
                  ref={setSceneWordRef(index)}
                  className={`scene-word${index === activeSceneIndex ? " scene-word-active" : ""}`}
                  aria-hidden={index !== activeSceneIndex}
                  key={scene.id}
                >
                  {scene.word.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>
              ))}
            </div>
            <div className="scene-products-layer" aria-hidden="true">
              {scenes.map((scene, sceneIndex) => (
                <div
                  ref={setSceneProductGroupRef(sceneIndex)}
                  className={`scene-product-group${sceneIndex === activeSceneIndex ? " scene-product-group-active" : ""}`}
                  key={scene.id}
                >
                  {scene.products.map((product) => (
                    <div className="scene-product-card" key={product.id}>
                      <div className="scene-product-visual">
                        <ProductIcon kind={product.kind} color={product.color} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="products-panel">
            <div className="products-heading">
              <h2 id="storehouse-title">My storehouse</h2>
              <span className="smile-mark" aria-hidden="true">⌣</span>
            </div>
            <div className="products-columns" aria-hidden="true">
              <span>COLLECTIONS</span>
              <span>NOW</span>
            </div>
            <div className="category-list" aria-live="polite" aria-label="Product categories">
              {scenes.map((scene, sceneIndex) => {
                const featuredProduct = scene.products[0];
                const categoryName = scene.word.replace("\n", " ");
                const isActive = sceneIndex === activeSceneIndex;

                return (
                  <article
                    className={`category-row${isActive ? " category-row-active" : ""}`}
                    aria-current={isActive ? "true" : undefined}
                    key={scene.id}
                  >
                    <p className="category-name">{categoryName}</p>
                    <div className="category-detail">
                      <div className="category-detail-art" aria-hidden="true">
                        <ProductIcon kind={featuredProduct.kind} color={featuredProduct.color} />
                      </div>
                      <div className="category-detail-copy">
                        <p className="category-detail-kicker">Featured category</p>
                        <h3>{categoryName}</h3>
                        <p>{scene.description}</p>
                        <span>{featuredProduct.name}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      <div className="storehouse-footer-line">
        <span>Scroll or wait to explore</span>
        <span className="footer-line-center"><i /> <b>{String(activeSceneIndex + 1).padStart(2, "0")}</b> / {String(scenes.length).padStart(2, "0")}</span>
        <span>2024 — 2026</span>
      </div>
    </section>
  );
}
