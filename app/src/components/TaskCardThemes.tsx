// Task Card Theme Components with SVG illustrations

export const FunIllustrations = {
  watermelon: (
    <svg width="60" height="60" viewBox="0 0 60 60" className="absolute bottom-4 left-4 opacity-80">
      <path d="M10 30 Q30 10, 50 30 Q30 50, 10 30" fill="#ff6b6b" />
      <path d="M15 30 Q30 15, 45 30 Q30 45, 15 30" fill="#ff8787" />
      <path d="M20 30 Q30 20, 40 30 Q30 40, 20 30" fill="#4ecdc4" />
      <circle cx="25" cy="28" r="1.5" fill="#2d3436" />
      <circle cx="30" cy="32" r="1.5" fill="#2d3436" />
      <circle cx="35" cy="28" r="1.5" fill="#2d3436" />
    </svg>
  ),

  pineapple: (
    <svg width="50" height="70" viewBox="0 0 50 70" className="absolute bottom-4 right-4 opacity-80">
      <ellipse cx="25" cy="45" rx="18" ry="22" fill="#ffd93d" />
      <path d="M25 10 L20 25 L25 30 L30 25 Z" fill="#6bcf7f" />
      <path d="M15 10 L18 25 M35 10 L32 25" stroke="#6bcf7f" strokeWidth="2" fill="none" />
      <pattern id="pinePattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M2 2 L6 2 L4 6 Z" fill="#e8b800" />
      </pattern>
      <ellipse cx="25" cy="45" rx="18" ry="22" fill="url(#pinePattern)" opacity="0.3" />
      <circle cx="25" cy="45" r="3" fill="#2d3436" />
      <path d="M20 50 Q25 52, 30 50" stroke="#2d3436" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),

  sunglasses: (
    <svg width="60" height="20" viewBox="0 0 60 20" className="absolute bottom-4 left-4 opacity-80">
      <rect x="5" y="5" width="20" height="12" rx="3" fill="#2d3436" />
      <rect x="35" y="5" width="20" height="12" rx="3" fill="#2d3436" />
      <path d="M25 10 Q30 8, 35 10" stroke="#2d3436" strokeWidth="2" fill="none" />
      <rect x="0" y="9" width="5" height="2" fill="#2d3436" />
      <rect x="55" y="9" width="5" height="2" fill="#2d3436" />
    </svg>
  ),

  pencil: (
    <svg width="80" height="20" viewBox="0 0 80 20" className="absolute top-4 right-4 opacity-60">
      <rect x="10" y="6" width="50" height="8" fill="#ffd93d" />
      <polygon points="60,6 70,10 60,14" fill="#ffb3ba" />
      <polygon points="10,6 5,10 10,14" fill="#2d3436" />
      <rect x="20" y="8" width="30" height="4" fill="#2d3436" opacity="0.1" />
    </svg>
  ),

  book: (
    <svg width="50" height="40" viewBox="0 0 50 40" className="absolute bottom-4 right-4 opacity-60">
      <rect x="5" y="5" width="40" height="30" rx="2" fill="#6c63ff" />
      <rect x="10" y="10" width="30" height="2" fill="white" opacity="0.7" />
      <rect x="10" y="15" width="25" height="2" fill="white" opacity="0.5" />
      <rect x="10" y="20" width="28" height="2" fill="white" opacity="0.5" />
      <path d="M25 5 L25 35" stroke="#5650d6" strokeWidth="1" />
    </svg>
  ),

  star: (
    <svg width="40" height="40" viewBox="0 0 40 40" className="absolute top-4 left-4 opacity-60">
      <path
        d="M20 5 L25 15 L35 15 L27 22 L30 32 L20 25 L10 32 L13 22 L5 15 L15 15 Z"
        fill="#ffd93d"
        stroke="#e8b800"
        strokeWidth="1"
      />
    </svg>
  ),

  maple: (
    <svg width="50" height="50" viewBox="0 0 50 50" className="absolute bottom-4 left-4 opacity-60">
      <path
        d="M25 40 L25 35 L20 35 L22 30 L18 32 L20 27 L15 30 L18 25 L13 28 L17 23 L12 25 L18 20 L15 18 L20 18 L18 15 L23 17 L22 12 L25 15 L28 12 L27 17 L32 15 L30 18 L35 18 L32 20 L38 25 L33 23 L37 28 L32 25 L35 30 L30 27 L32 32 L28 30 L30 35 L25 35 Z"
        fill="#dc2626"
        stroke="#b91c1c"
        strokeWidth="1"
      />
    </svg>
  )
};

export const GradientBackgrounds = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
];

export const PastelGradients = [
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
  'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)'
];