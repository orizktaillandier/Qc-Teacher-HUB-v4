// Advanced creative themes with custom container shapes and integrated images
export interface AdvancedCreativeTheme {
  name: string;
  type: 'advanced';

  // Background and pattern
  background: string;
  pattern?: string;

  // Card container styles
  cardBackground?: string;
  cardBorder?: string;
  cardRadius?: string;
  cardShadow?: string;
  cardPadding?: string;

  // Question container with advanced shapes
  questionStyle?: {
    background?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    clipPath?: string;
    transform?: string;
    backdropFilter?: string;
    opacity?: string;
  };

  // Number badge styles
  numberBadgeStyle?: 'circle' | 'square' | 'hexagon' | 'star' | 'diamond' | 'cloud' | 'heart' | 'shield';
  numberBadgeBackground?: string;
  numberBadgeColor?: string;

  // Theme images - positioned strategically
  images?: {
    url: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right';
    size: string;
    opacity?: number;
    rotation?: string;
    zIndex?: number;
    blend?: string;
  }[];
}

export const advancedCreativeThemes: AdvancedCreativeTheme[] = [
  // 1. Space Station Theme - Bold neon tech
  {
    name: '🚀 Station Spatiale',
    type: 'advanced',
    background: 'linear-gradient(135deg, #0a0e27 0%, #000000 100%)',
    pattern: `radial-gradient(2px 2px at 20px 30px, #00ffff, transparent), radial-gradient(2px 2px at 40px 70px, #ff00ff, transparent), radial-gradient(1px 1px at 50px 90px, #00ff00, transparent)`,
    cardBackground: 'rgba(0, 0, 0, 0.8)',
    cardBorder: '3px solid #00ffff',
    cardRadius: '20px',
    cardShadow: '0 0 40px #00ffff, inset 0 0 30px rgba(0, 255, 255, 0.2)',
    cardPadding: '15px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '3px solid #ff00ff',
      borderRadius: '50% / 30%',
      padding: '30px 25px',
      clipPath: 'ellipse(95% 85% at 50% 50%)',
      backdropFilter: 'blur(10px)',
      transform: 'perspective(500px) rotateX(5deg)'
    },
    numberBadgeStyle: 'shield',
    numberBadgeBackground: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
    numberBadgeColor: '#000000',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg opacity='0.2'%3E%3Cpath d='M100 30 L100 10 L90 0 L80 0 L70 10 L70 30 L80 40 L90 40 L100 30' fill='%23ff6b6b'/%3E%3Crect x='85' y='40' width='10' height='30' fill='%23ff6b6b'/%3E%3Cpath d='M60 70 L85 70 L85 100 L60 100 Q50 85 60 70' fill='%23ff4444'/%3E%3Cpath d='M95 70 L120 70 Q130 85 120 100 L95 100 L95 70' fill='%23ff4444'/%3E%3Cpath d='M75 100 L105 100 L110 120 L100 140 L80 140 L70 120 L75 100' fill='%2300d2ff'/%3E%3Cpath d='M70 140 L60 150 L60 170 L70 180' stroke='%23ffa500' stroke-width='3' fill='none'/%3E%3Cpath d='M110 140 L120 150 L120 170 L110 180' stroke='%23ffa500' stroke-width='3' fill='none'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-left',
        size: '150px',
        opacity: 0.15,
        rotation: '15deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='%23ffd700'%3E%3Cpolygon points='12 2 15 9 22 9 16.5 14 19 21 12 16 5 21 7.5 14 2 9 9 9'/%3E%3C/svg%3E",
        position: 'bottom-left',
        size: '30px',
        opacity: 0.6,
        rotation: '-20deg',
        zIndex: 1
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%2300d2ff' stroke-width='2' opacity='0.3'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='%2300d2ff' stroke-width='1' opacity='0.2'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%2300d2ff' stroke-width='1' opacity='0.1'/%3E%3C/svg%3E",
        position: 'bottom-right',
        size: '100px',
        opacity: 0.4,
        rotation: '0deg',
        zIndex: 0
      }
    ]
  },

  // 2. Underwater Theme - Deep ocean contrast
  {
    name: '🐠 Monde Sous-Marin',
    type: 'advanced',
    background: 'linear-gradient(180deg, #001433 0%, #000514 100%)',
    pattern: `radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 150, 255, 0.2) 0%, transparent 30%)`,
    cardBackground: 'linear-gradient(135deg, rgba(0, 50, 100, 0.95) 0%, rgba(0, 20, 60, 0.95) 100%)',
    cardBorder: '3px solid #00ffff',
    cardRadius: '30px',
    cardShadow: '0 0 50px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 100, 200, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.92)',
      border: '3px solid #00ff88',
      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      padding: '25px',
      backdropFilter: 'blur(5px)',
      opacity: '1'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: 'linear-gradient(135deg, #ff0066, #ffaa00)',
    numberBadgeColor: '#ffffff',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 200 200'%3E%3Cg opacity='0.25'%3E%3Cellipse cx='100' cy='100' rx='40' ry='25' fill='%23ffa500' transform='rotate(-30 100 100)'/%3E%3Cpath d='M 60 100 Q 45 92 35 100 Q 45 108 60 100' fill='%23ffa500'/%3E%3Cpath d='M 140 100 Q 155 92 165 100 Q 155 108 140 100' fill='%23ffa500' transform='rotate(180 150 100)'/%3E%3Ccircle cx='85' cy='95' r='4' fill='black'/%3E%3Cpath d='M80 105 Q100 110 120 105' stroke='black' stroke-width='2' fill='none'/%3E%3C/g%3E%3Cg opacity='0.15'%3E%3Cellipse cx='40' cy='150' rx='25' ry='15' fill='%2300bfff' transform='rotate(20 40 150)'/%3E%3Cpath d='M 20 150 Q 12 145 7 150 Q 12 155 20 150' fill='%2300bfff'/%3E%3Ccircle cx='32' cy='148' r='2' fill='black'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-left',
        size: '140px',
        opacity: 0.3,
        rotation: '10deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='30' r='25' fill='rgba(255, 255, 255, 0.1)'/%3E%3Ccircle cx='30' cy='60' r='15' fill='rgba(255, 255, 255, 0.08)'/%3E%3Ccircle cx='70' cy='70' r='20' fill='rgba(255, 255, 255, 0.06)'/%3E%3Ccircle cx='20' cy='80' r='10' fill='rgba(255, 255, 255, 0.1)'/%3E%3C/svg%3E",
        position: 'bottom-right',
        size: '100px',
        opacity: 0.5,
        rotation: '0deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='100' viewBox='0 0 60 100'%3E%3Cpath d='M30 10 Q20 30 25 50 Q30 70 30 90' stroke='%2300ff88' stroke-width='2' fill='none' opacity='0.3'/%3E%3Cpath d='M15 20 Q10 35 12 55 Q15 70 15 85' stroke='%2300ff88' stroke-width='1.5' fill='none' opacity='0.2'/%3E%3Cpath d='M45 15 Q40 35 42 55 Q45 75 45 95' stroke='%2300ff88' stroke-width='1.5' fill='none' opacity='0.2'/%3E%3C/svg%3E",
        position: 'bottom-left',
        size: '60px',
        opacity: 0.4,
        rotation: '-5deg',
        zIndex: 0
      }
    ]
  },

  // 3. Magical Forest Theme - Enchanted contrast
  {
    name: '🌲 Forêt Magique',
    type: 'advanced',
    background: 'linear-gradient(180deg, #0a1f0a 0%, #001a00 100%)',
    pattern: `radial-gradient(circle at 25% 25%, rgba(0, 255, 0, 0.2) 0%, transparent 25%), radial-gradient(circle at 75% 75%, rgba(255, 255, 0, 0.15) 0%, transparent 25%)`,
    cardBackground: 'linear-gradient(135deg, rgba(20, 60, 20, 0.95) 0%, rgba(10, 30, 10, 0.95) 100%)',
    cardBorder: '3px solid #00ff00',
    cardRadius: '20px',
    cardShadow: '0 0 40px rgba(0, 255, 0, 0.4), inset 0 0 20px rgba(100, 255, 100, 0.2)',
    cardPadding: '18px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '3px solid #ffaa00',
      borderRadius: '0% 100% 0% 100% / 100% 0% 100% 0%',
      padding: '28px',
      clipPath: 'polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)',
      transform: 'rotate(45deg) scale(0.85)',
      backdropFilter: 'blur(3px)'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: 'linear-gradient(135deg, #ff00ff, #ffff00)',
    numberBadgeColor: '#000000',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='200' viewBox='0 0 150 200'%3E%3Cg opacity='0.2'%3E%3Crect x='70' y='50' width='10' height='100' fill='%238b4513'/%3E%3Cpath d='M75 50 Q50 30 30 40 Q20 50 25 65 Q35 70 50 60 Q60 55 75 50' fill='%234a7c59'/%3E%3Cpath d='M75 50 Q100 30 120 40 Q130 50 125 65 Q115 70 100 60 Q90 55 75 50' fill='%234a7c59'/%3E%3Cpath d='M75 80 Q55 70 40 75 Q30 85 35 95 Q45 100 60 90 Q70 85 75 80' fill='%2355a049'/%3E%3Cpath d='M75 80 Q95 70 110 75 Q120 85 115 95 Q105 100 90 90 Q80 85 75 80' fill='%2355a049'/%3E%3Cpath d='M75 30 Q60 15 45 20 Q35 30 40 40 Q50 45 65 35 Q70 32 75 30' fill='%232d5016'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-right',
        size: '120px',
        opacity: 0.25,
        rotation: '-10deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 100 100'%3E%3Cg opacity='0.6'%3E%3Ccircle cx='50' cy='50' r='35' fill='%23ff6b6b'/%3E%3Ccircle cx='50' cy='30' r='5' fill='white'/%3E%3Cpath d='M50 20 Q40 25 35 35 Q40 40 50 35 Q60 40 65 35 Q60 25 50 20' fill='%238b0000'/%3E%3Ccircle cx='35' cy='60' r='3' fill='black'/%3E%3Ccircle cx='50' cy='65' r='3' fill='black'/%3E%3Ccircle cx='65' cy='60' r='3' fill='black'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-left',
        size: '50px',
        opacity: 0.5,
        rotation: '15deg',
        zIndex: 1
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 Q30 30 20 50 Q30 70 50 90 Q70 70 80 50 Q70 30 50 10' fill='%234a7c59' opacity='0.15'/%3E%3Cpath d='M30 20 Q20 30 15 45 Q20 55 30 65 Q40 55 45 45 Q40 30 30 20' fill='%2355a049' opacity='0.1'/%3E%3C/svg%3E",
        position: 'top-left',
        size: '60px',
        opacity: 0.5,
        rotation: '30deg',
        zIndex: 0
      }
    ]
  },

  // 4. Crystal Cave Theme - Prismatic brilliance
  {
    name: '💎 Grotte de Cristaux',
    type: 'advanced',
    background: 'linear-gradient(135deg, #1a0033 0%, #000000 100%)',
    pattern: `conic-gradient(from 45deg at 50% 50%, transparent 0deg, rgba(255, 0, 255, 0.3) 45deg, transparent 90deg, rgba(0, 255, 255, 0.3) 135deg, transparent 180deg, rgba(255, 255, 0, 0.3) 225deg, transparent 270deg, rgba(255, 0, 255, 0.3) 315deg, transparent 360deg)`,
    cardBackground: 'linear-gradient(135deg, rgba(50, 0, 100, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%)',
    cardBorder: '3px solid #ff00ff',
    cardRadius: '15px',
    cardShadow: '0 0 60px rgba(255, 0, 255, 0.5), inset 0 0 30px rgba(150, 0, 255, 0.3)',
    cardPadding: '15px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.93)',
      border: '3px solid #00ffff',
      borderRadius: '10px',
      padding: '25px',
      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      backdropFilter: 'blur(8px)',
      transform: 'perspective(300px) rotateY(2deg)'
    },
    numberBadgeStyle: 'diamond',
    numberBadgeBackground: 'linear-gradient(45deg, #ffff00 0%, #ff00ff 100%)',
    numberBadgeColor: '#000000',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg opacity='0.2'%3E%3Cpolygon points='100,20 150,60 140,140 60,140 50,60' fill='%23e0c3fc' stroke='%23764ba2' stroke-width='2'/%3E%3Cpolygon points='100,40 130,70 125,120 75,120 70,70' fill='%23f0e0ff' stroke='%23967eea' stroke-width='1'/%3E%3Cpolygon points='30,80 50,90 45,120 15,120 10,90' fill='%23ffd700' opacity='0.4'/%3E%3Cpolygon points='170,80 190,90 185,120 155,120 150,90' fill='%23ff69b4' opacity='0.4'/%3E%3Cpolygon points='100,150 120,165 110,185 90,185 80,165' fill='%2300ffff' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-left',
        size: '150px',
        opacity: 0.3,
        rotation: '15deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg opacity='0.15'%3E%3Cpath d='M50 10 L70 30 L60 70 L40 70 L30 30 Z' fill='none' stroke='%23fff' stroke-width='2'/%3E%3Cpath d='M50 15 L65 30 L57 65 L43 65 L35 30 Z' fill='rgba(255,255,255,0.2)'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-right',
        size: '80px',
        opacity: 0.5,
        rotation: '-20deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 100 100'%3E%3Cpolygon points='50,20 80,50 50,80 20,50' fill='%23ffd700' opacity='0.3'/%3E%3Cpolygon points='50,35 65,50 50,65 35,50' fill='%23fff' opacity='0.4'/%3E%3C/svg%3E",
        position: 'bottom-left',
        size: '50px',
        opacity: 0.6,
        rotation: '45deg',
        zIndex: 1
      }
    ]
  },

  // 5. Cloud Castle Theme - Cloud-shaped container
  {
    name: '☁️ Château des Nuages',
    type: 'advanced',
    background: 'linear-gradient(180deg, #87ceeb 0%, #98d8e8 50%, #f0f8ff 100%)',
    pattern: `radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 30%), radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.7) 0%, transparent 40%)`,
    cardBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.95) 100%)',
    cardBorder: 'none',
    cardRadius: '30px',
    cardShadow: '0 10px 30px rgba(135, 206, 235, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.78) 0%, rgba(245, 250, 255, 0.75) 100%)',
      border: '3px solid rgba(135, 206, 235, 0.5)',
      borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%',
      padding: '28px 35px',
      backdropFilter: 'blur(2px)',
      opacity: '0.88'
    },
    numberBadgeStyle: 'cloud',
    numberBadgeBackground: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
    numberBadgeColor: '#ffffff',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='150' viewBox='0 0 180 150'%3E%3Cg opacity='0.2'%3E%3Crect x='75' y='60' width='30' height='60' fill='%23d4af37'/%3E%3Cpolygon points='90,20 110,60 70,60' fill='%23ff6b6b'/%3E%3Crect x='60' y='70' width='15' height='30' fill='%238b7355'/%3E%3Crect x='105' y='70' width='15' height='30' fill='%238b7355'/%3E%3Crect x='80' y='80' width='20' height='25' fill='%234169e1'/%3E%3Cpath d='M65 60 L65 40 L75 30 L75 60' fill='%23ff4500'/%3E%3Cpath d='M105 60 L105 40 L95 30 L95 60' fill='%23ff4500'/%3E%3Cpath d='M115 60 L115 45 L125 35 L125 60' fill='%23ffd700'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-right',
        size: '140px',
        opacity: 0.25,
        rotation: '5deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='80' viewBox='0 0 120 80'%3E%3Cg opacity='0.3'%3E%3Cellipse cx='30' cy='50' rx='25' ry='15' fill='white'/%3E%3Cellipse cx='60' cy='45' rx='35' ry='20' fill='white'/%3E%3Cellipse cx='90' cy='50' rx='25' ry='15' fill='white'/%3E%3Cellipse cx='20' cy='30' rx='18' ry='10' fill='white'/%3E%3Cellipse cx='100' cy='30' rx='18' ry='10' fill='white'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-left',
        size: '100px',
        opacity: 0.4,
        rotation: '0deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 100 100'%3E%3Cpolygon points='50,10 60,40 90,40 65,60 75,90 50,70 25,90 35,60 10,40 40,40' fill='%23ffd700' opacity='0.5'/%3E%3C/svg%3E",
        position: 'top-left',
        size: '40px',
        opacity: 0.6,
        rotation: '10deg',
        zIndex: 1
      }
    ]
  },

  // 6. Desert Oasis Theme - Scorching sand contrast
  {
    name: '🏜️ Oasis du Désert',
    type: 'advanced',
    background: 'linear-gradient(180deg, #ffaa00 0%, #ff6600 100%)',
    pattern: `repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255, 255, 255, 0.2) 50px, rgba(255, 255, 255, 0.2) 100px)`,
    cardBackground: 'linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(80, 40, 10, 0.95) 100%)',
    cardBorder: '4px solid #ffd700',
    cardRadius: '20px',
    cardShadow: '0 0 50px rgba(255, 215, 0, 0.5), inset 0 0 20px rgba(255, 140, 0, 0.3)',
    cardPadding: '18px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '3px solid #00bfff',
      borderRadius: '50px',
      padding: '25px',
      clipPath: 'polygon(0% 20%, 5% 5%, 20% 0%, 80% 0%, 95% 5%, 100% 20%, 100% 80%, 95% 95%, 80% 100%, 20% 100%, 5% 95%, 0% 80%)',
      backdropFilter: 'blur(3px)',
      transform: 'perspective(500px) rotateX(-3deg)'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: 'linear-gradient(135deg, #00bfff, #0066ff)',
    numberBadgeColor: '#ffffff',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'%3E%3Cg opacity='0.25'%3E%3Cpath d='M50 120 Q100 20 150 120 z' fill='%238b4513'/%3E%3Cpath d='M20 120 Q60 40 100 120 z' fill='%23d2691e'/%3E%3Cpath d='M100 120 Q140 50 180 120 z' fill='%23cd853f'/%3E%3Ccircle cx='170' cy='30' r='25' fill='%23ffd700'/%3E%3Cpath d='M170 15 L175 25 L185 25 L177 32 L180 42 L170 35 L160 42 L163 32 L155 25 L165 25 z' fill='%23ff8c00'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-left',
        size: '160px',
        opacity: 0.3,
        rotation: '0deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg opacity='0.2'%3E%3Cpath d='M50 80 Q40 70 30 80 Q25 60 35 50 Q50 45 65 50 Q75 60 70 80 Q60 70 50 80' fill='%2300a86b'/%3E%3Crect x='47' y='50' width='6' height='30' fill='%238b4513'/%3E%3Cpath d='M50 50 Q40 40 30 45 Q35 35 50 40 Q65 35 70 45 Q60 40 50 50' fill='%2300ff00'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-right',
        size: '80px',
        opacity: 0.4,
        rotation: '10deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 100 100'%3E%3Cg opacity='0.3'%3E%3Cpath d='M50 70 Q30 60 20 70 L20 80 L80 80 L80 70 Q70 60 50 70' fill='%238b4513'/%3E%3Cpath d='M50 60 Q40 50 35 60 Q30 55 40 45 Q50 40 60 45 Q70 55 65 60 Q60 50 50 60' fill='%2334a853'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-left',
        size: '50px',
        opacity: 0.5,
        rotation: '-5deg',
        zIndex: 1
      }
    ]
  },

  // 7. Candy Factory Theme - Electric candy pop
  {
    name: '🍬 Usine à Bonbons',
    type: 'advanced',
    background: 'linear-gradient(45deg, #ff00ff 0%, #00ffff 25%, #ffff00 50%, #ff00ff 75%, #00ffff 100%)',
    pattern: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.3) 10px, rgba(255, 255, 255, 0.3) 20px)`,
    cardBackground: 'rgba(0, 0, 0, 0.9)',
    cardBorder: '4px solid #ff00ff',
    cardRadius: '30px',
    cardShadow: '0 0 40px #ff00ff, 0 0 80px #00ffff',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '4px solid #ffff00',
      borderRadius: '15px 50px 15px 50px',
      padding: '25px',
      clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
      backdropFilter: 'blur(2px)',
      transform: 'rotate(-2deg)'
    },
    numberBadgeStyle: 'heart',
    numberBadgeBackground: 'linear-gradient(135deg, #ff00ff, #00ffff)',
    numberBadgeColor: '#000000',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cg opacity='0.25'%3E%3Cellipse cx='90' cy='90' rx='70' ry='40' fill='%23ff69b4'/%3E%3Cpath d='M20 90 Q35 60 50 90 Q65 120 80 90 Q95 60 110 90 Q125 120 140 90 Q155 60 170 90' stroke='white' stroke-width='4' fill='none'/%3E%3Ccircle cx='40' cy='40' r='25' fill='%23ffb347'/%3E%3Cpath d='M40 30 Q35 35 35 40 Q35 45 40 50 Q45 45 45 40 Q45 35 40 30' fill='%23ff1493'/%3E%3Ccircle cx='140' cy='40' r='20' fill='%2300ff00'/%3E%3Cpath d='M140 32 L135 38 L140 48 L145 38 z' fill='white'/%3E%3Ccircle cx='60' cy='140' r='18' fill='%23ff00ff'/%3E%3Ccircle cx='120' cy='140' r='22' fill='%23ffd700'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-right',
        size: '150px',
        opacity: 0.3,
        rotation: '15deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg opacity='0.4'%3E%3Crect x='10' y='40' rx='10' width='80' height='20' fill='%23ff1493'/%3E%3Crect x='40' y='10' rx='10' width='20' height='80' fill='%23ffb347'/%3E%3Ccircle cx='50' cy='50' r='15' fill='white' opacity='0.5'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-left',
        size: '80px',
        opacity: 0.3,
        rotation: '-20deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 100 100'%3E%3Cg opacity='0.5'%3E%3Cpath d='M50 20 Q40 30 40 50 Q40 70 50 80 Q60 70 60 50 Q60 30 50 20' fill='%23ff69b4'/%3E%3Cpath d='M20 50 Q30 40 50 40 Q70 40 80 50 Q70 60 50 60 Q30 60 20 50' fill='%23ffb347'/%3E%3C/g%3E%3C/svg%3E",
        position: 'top-left',
        size: '50px',
        opacity: 0.6,
        rotation: '45deg',
        zIndex: 1
      }
    ]
  },

  // 8. Arctic Adventure Theme - Iceberg-shaped container
  {
    name: '🐧 Aventure Arctique',
    type: 'advanced',
    background: 'linear-gradient(180deg, #cfd9df 0%, #e2ebf0 50%, #ffffff 100%)',
    pattern: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 30%), radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.6) 0%, transparent 40%)`,
    cardBackground: 'linear-gradient(135deg, rgba(207, 217, 223, 0.95) 0%, rgba(226, 235, 240, 0.95) 100%)',
    cardBorder: '3px solid #b0c4de',
    cardRadius: '10px',
    cardShadow: '0 15px 30px rgba(176, 196, 222, 0.4)',
    cardPadding: '18px',
    questionStyle: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(240, 248, 255, 0.78) 100%)',
      border: '3px solid #87ceeb',
      borderRadius: '10px',
      padding: '28px',
      clipPath: 'polygon(20% 0%, 80% 0%, 100% 30%, 90% 100%, 10% 100%, 0% 30%)',
      backdropFilter: 'blur(5px)',
      opacity: '0.85'
    },
    numberBadgeStyle: 'shield',
    numberBadgeBackground: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    numberBadgeColor: '#ffffff',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Cg opacity='0.3'%3E%3Cpath d='M75 30 L85 50 L80 80 L70 80 L65 50 z' fill='black'/%3E%3Cellipse cx='75' cy='95' rx='25' ry='12' fill='black'/%3E%3Ccircle cx='70' cy='35' r='3' fill='white'/%3E%3Ccircle cx='80' cy='35' r='3' fill='white'/%3E%3Cpath d='M68 42 Q75 46 82 42' stroke='white' stroke-width='2' fill='none'/%3E%3Cpath d='M60 50 L65 50' stroke='%23ff6b6b' stroke-width='3'/%3E%3Cpath d='M85 50 L90 50' stroke='%23ff6b6b' stroke-width='3'/%3E%3Cpath d='M30 120 L40 110 L35 130 z' fill='black' opacity='0.5'/%3E%3Cpath d='M110 120 L120 110 L115 130 z' fill='black' opacity='0.5'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-left',
        size: '120px',
        opacity: 0.25,
        rotation: '-5deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100' viewBox='0 0 200 100'%3E%3Cg opacity='0.2'%3E%3Cpolygon points='50,20 80,60 60,90 40,90 20,60' fill='%2387ceeb'/%3E%3Cpolygon points='50,35 70,60 55,80 45,80 30,60' fill='white'/%3E%3Cpolygon points='100,30 130,70 110,90 90,90 70,70' fill='%23b0e0e6'/%3E%3Cpolygon points='100,45 120,70 105,85 95,85 80,70' fill='white'/%3E%3Cpolygon points='150,25 180,65 160,95 140,95 120,65' fill='%2387ceeb'/%3E%3Cpolygon points='150,40 170,65 155,85 145,85 130,65' fill='white'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-right',
        size: '160px',
        opacity: 0.3,
        rotation: '10deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Cg opacity='0.4'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%2300bfff' stroke-width='2'/%3E%3Cpath d='M50 20 L55 30 L65 30 L57 38 L61 48 L50 40 L39 48 L43 38 L35 30 L45 30 z' fill='white'/%3E%3Cpath d='M20 50 Q30 40 40 50' stroke='%2387ceeb' stroke-width='2' fill='none'/%3E%3Cpath d='M60 50 Q70 40 80 50' stroke='%2387ceeb' stroke-width='2' fill='none'/%3E%3C/g%3E%3C/svg%3E",
        position: 'top-left',
        size: '60px',
        opacity: 0.5,
        rotation: '20deg',
        zIndex: 1
      }
    ]
  }
];

// New image-focused themes
export const imageFocusedThemes: AdvancedCreativeTheme[] = [
  // 1. Safari Adventure - Multiple animal silhouettes
  {
    name: '🦁 Safari Aventure',
    type: 'advanced',
    background: 'linear-gradient(180deg, #ffdb58 0%, #ffa500 50%, #ff8c00 100%)',
    pattern: `repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(139, 69, 19, 0.1) 60px, rgba(139, 69, 19, 0.1) 120px)`,
    cardBackground: 'linear-gradient(135deg, rgba(255, 248, 220, 0.95) 0%, rgba(255, 228, 181, 0.95) 100%)',
    cardBorder: '4px solid #8b4513',
    cardRadius: '25px',
    cardShadow: '0 20px 40px rgba(139, 69, 19, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '3px solid #ff8c00',
      borderRadius: '20px',
      padding: '25px',
      backdropFilter: 'blur(5px)'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)',
    numberBadgeColor: '#ffffff',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg opacity='0.3'%3E%3Cpath d='M40 60 Q30 50 20 50 Q10 50 10 60 Q10 70 20 70 Q30 70 40 65 L50 65 L50 75 L35 75 L35 85 L45 85 L45 75 L55 75 L55 85 L65 85 L65 75 L50 75 L50 65 L60 60 Q70 65 80 70 Q90 70 100 70 Q110 70 110 60 Q110 50 100 50 Q90 50 80 60' fill='%23d2691e'/%3E%3Cpath d='M35 40 Q40 30 45 35 L45 50' fill='%238b4513'/%3E%3Cpath d='M75 40 Q70 30 65 35 L65 50' fill='%238b4513'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-left',
        size: '100px',
        opacity: 0.4,
        rotation: '0deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Cg opacity='0.25'%3E%3Cpath d='M50 30 L50 60 L30 60 L30 70 L40 70 L40 80 L45 80 L45 70 L55 70 L55 80 L60 80 L60 70 L70 70 L70 60 L50 60' fill='%23ff8c00'/%3E%3Cpath d='M35 35 Q30 25 25 30 Q25 35 30 40 L40 40 z' fill='%23d2691e'/%3E%3Cpath d='M65 35 Q70 25 75 30 Q75 35 70 40 L60 40 z' fill='%23d2691e'/%3E%3Ccircle cx='40' cy='45' r='3' fill='black'/%3E%3Ccircle cx='60' cy='45' r='3' fill='black'/%3E%3C/g%3E%3C/svg%3E",
        position: 'top-left',
        size: '70px',
        opacity: 0.3,
        rotation: '15deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg opacity='0.2'%3E%3Cellipse cx='50' cy='60' rx='25' ry='20' fill='%238b4513'/%3E%3Cpath d='M50 40 Q40 20 30 25 Q30 35 40 40' fill='%23d2691e'/%3E%3Cpath d='M50 40 Q60 20 70 25 Q70 35 60 40' fill='%23d2691e'/%3E%3Cpath d='M25 60 Q20 55 15 60 Q20 65 25 60' fill='%23ffa500'/%3E%3Cpath d='M75 60 Q80 55 85 60 Q80 65 75 60' fill='%23ffa500'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-right',
        size: '90px',
        opacity: 0.35,
        rotation: '-10deg',
        zIndex: 0
      }
    ]
  },

  // 2. Ocean Treasures - Multiple sea creatures and elements
  {
    name: '🏴‍☠️ Trésors Océaniques',
    type: 'advanced',
    background: 'linear-gradient(180deg, #006994 0%, #003d5b 50%, #001a2e 100%)',
    pattern: `radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.2) 0%, transparent 40%)`,
    cardBackground: 'linear-gradient(135deg, rgba(0, 105, 148, 0.9) 0%, rgba(0, 52, 89, 0.9) 100%)',
    cardBorder: '3px solid #ffd700',
    cardRadius: '20px',
    cardShadow: '0 0 40px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(0, 150, 255, 0.2)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.92)',
      border: '3px solid #ff6347',
      borderRadius: '15px',
      padding: '25px',
      backdropFilter: 'blur(5px)'
    },
    numberBadgeStyle: 'diamond',
    numberBadgeBackground: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
    numberBadgeColor: '#000000',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Cg opacity='0.3'%3E%3Crect x='60' y='60' width='30' height='30' rx='5' fill='%23d4af37' stroke='%23b8860b' stroke-width='2'/%3E%3Cpath d='M75 50 L65 60 L85 60 z' fill='%23ffd700'/%3E%3Cpath d='M60 75 L50 65 L50 85 z' fill='%23ffd700'/%3E%3Cpath d='M90 75 L100 65 L100 85 z' fill='%23ffd700'/%3E%3Cpath d='M75 90 L65 90 L85 90 z' fill='%23ffd700'/%3E%3Ccircle cx='75' cy='75' r='5' fill='%23ff0000'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-left',
        size: '120px',
        opacity: 0.25,
        rotation: '20deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Cg opacity='0.4'%3E%3Cpath d='M50 20 L30 50 L50 80 L70 50 z' fill='%2300bfff'/%3E%3Cpath d='M50 30 L40 50 L50 70 L60 50 z' fill='%2300ffff'/%3E%3Ccircle cx='45' cy='45' r='3' fill='black'/%3E%3Cpath d='M30 50 Q20 45 10 50' stroke='%2300bfff' stroke-width='2' fill='none'/%3E%3Cpath d='M70 50 Q80 45 90 50' stroke='%2300bfff' stroke-width='2' fill='none'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-right',
        size: '70px',
        opacity: 0.5,
        rotation: '-15deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 100 100'%3E%3Cg opacity='0.35'%3E%3Cpath d='M50 50 m-30 0 a30,30 0 1,1 60,0 a30,30 0 1,1 -60,0' fill='none' stroke='%23ffd700' stroke-width='3'/%3E%3Cpath d='M50 20 L55 35 L70 35 L58 45 L63 60 L50 50 L37 60 L42 45 L30 35 L45 35 z' fill='%23ff6347'/%3E%3C/g%3E%3C/svg%3E",
        position: 'top-left',
        size: '50px',
        opacity: 0.4,
        rotation: '30deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 100 100'%3E%3Cg opacity='0.2'%3E%3Cpath d='M20 80 Q30 70 40 80 Q50 70 60 80 Q70 70 80 80' stroke='%2300ff88' stroke-width='3' fill='none'/%3E%3Cpath d='M25 70 Q35 60 45 70 Q55 60 65 70 Q75 60 85 70' stroke='%2300ff88' stroke-width='2' fill='none'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-left',
        size: '80px',
        opacity: 0.3,
        rotation: '0deg',
        zIndex: 0
      }
    ]
  },

  // 3. Space Odyssey - Planets, stars, and spacecraft
  {
    name: '🌌 Odyssée Spatiale',
    type: 'advanced',
    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    pattern: `radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(2px 2px at 60% 70%, white, transparent), radial-gradient(1px 1px at 80% 20%, white, transparent)`,
    cardBackground: 'linear-gradient(135deg, rgba(48, 43, 99, 0.9) 0%, rgba(36, 36, 62, 0.9) 100%)',
    cardBorder: '3px solid #9d4edd',
    cardRadius: '20px',
    cardShadow: '0 0 50px rgba(157, 78, 221, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.93)',
      border: '3px solid #ff6b9d',
      borderRadius: '25px',
      padding: '25px',
      backdropFilter: 'blur(5px)'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: 'linear-gradient(135deg, #ff6b9d 0%, #feca57 100%)',
    numberBadgeColor: '#000000',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg opacity='0.4'%3E%3Ccircle cx='50' cy='50' r='30' fill='%239d4edd'/%3E%3Cellipse cx='50' cy='50' rx='45' ry='8' fill='%23ff6b9d' transform='rotate(-20 50 50)'/%3E%3C/g%3E%3C/svg%3E",
        position: 'top-left',
        size: '80px',
        opacity: 0.5,
        rotation: '0deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 100 100'%3E%3Cg opacity='0.3'%3E%3Ccircle cx='50' cy='50' r='20' fill='%23feca57'/%3E%3Ccircle cx='40' cy='45' r='5' fill='%23ff8c00'/%3E%3Ccircle cx='55' cy='55' r='3' fill='%23ff6347'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-right',
        size: '60px',
        opacity: 0.4,
        rotation: '0deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Cg opacity='0.35'%3E%3Cpath d='M50 20 L40 50 L30 50 L50 80 L70 50 L60 50 z' fill='%23ff6b9d'/%3E%3Cpath d='M30 50 L20 55 L15 60' stroke='%23feca57' stroke-width='2' fill='none'/%3E%3Cpath d='M70 50 L80 55 L85 60' stroke='%23feca57' stroke-width='2' fill='none'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-right',
        size: '70px',
        opacity: 0.4,
        rotation: '45deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg opacity='0.2'%3E%3Cpath d='M60 30 L65 45 L80 45 L68 55 L73 70 L60 60 L47 70 L52 55 L40 45 L55 45 z' fill='white'/%3E%3Cpath d='M20 20 L22 26 L28 26 L23 30 L25 36 L20 32 L15 36 L17 30 L12 26 L18 26 z' fill='white'/%3E%3Cpath d='M100 70 L102 76 L108 76 L103 80 L105 86 L100 82 L95 86 L97 80 L92 76 L98 76 z' fill='white'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-left',
        size: '100px',
        opacity: 0.3,
        rotation: '0deg',
        zIndex: 0
      }
    ]
  },

  // 4. Enchanted Garden - Flowers, butterflies, and nature elements
  {
    name: '🦋 Jardin Enchanté',
    type: 'advanced',
    background: 'linear-gradient(180deg, #ffeaa7 0%, #fdcb6e 50%, #e17055 100%)',
    pattern: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 30%)`,
    cardBackground: 'linear-gradient(135deg, rgba(255, 234, 167, 0.95) 0%, rgba(253, 203, 110, 0.95) 100%)',
    cardBorder: '3px solid #6c5ce7',
    cardRadius: '25px',
    cardShadow: '0 20px 40px rgba(108, 92, 231, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.92)',
      border: '3px solid #fd79a8',
      borderRadius: '20px',
      padding: '25px',
      backdropFilter: 'blur(5px)'
    },
    numberBadgeStyle: 'heart',
    numberBadgeBackground: 'linear-gradient(135deg, #fd79a8 0%, #a29bfe 100%)',
    numberBadgeColor: '#ffffff',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg opacity='0.4'%3E%3Ccircle cx='50' cy='50' r='20' fill='%23fd79a8'/%3E%3Cpath d='M50 30 Q40 20 30 30 Q40 40 50 30' fill='%23e84393'/%3E%3Cpath d='M50 30 Q60 20 70 30 Q60 40 50 30' fill='%23e84393'/%3E%3Cpath d='M50 70 Q40 80 30 70 Q40 60 50 70' fill='%23e84393'/%3E%3Cpath d='M50 70 Q60 80 70 70 Q60 60 50 70' fill='%23e84393'/%3E%3Cpath d='M30 50 Q20 40 30 30 Q40 40 30 50' fill='%23e84393'/%3E%3Cpath d='M70 50 Q80 40 70 30 Q60 40 70 50' fill='%23e84393'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-left',
        size: '80px',
        opacity: 0.4,
        rotation: '0deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70' viewBox='0 0 100 100'%3E%3Cg opacity='0.35'%3E%3Cellipse cx='40' cy='50' rx='20' ry='30' fill='%236c5ce7' transform='rotate(-30 40 50)'/%3E%3Cellipse cx='60' cy='50' rx='20' ry='30' fill='%23a29bfe' transform='rotate(30 60 50)'/%3E%3Ccircle cx='50' cy='50' r='8' fill='%23fdcb6e'/%3E%3C/g%3E%3C/svg%3E",
        position: 'top-left',
        size: '60px',
        opacity: 0.4,
        rotation: '20deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 100 100'%3E%3Cg opacity='0.3'%3E%3Cpath d='M50 70 L50 40' stroke='%2300b894' stroke-width='3'/%3E%3Cpath d='M50 50 Q40 45 35 50 Q40 55 50 50' fill='%2300b894'/%3E%3Cpath d='M50 50 Q60 45 65 50 Q60 55 50 50' fill='%2300b894'/%3E%3Cpath d='M50 60 Q45 55 40 60 Q45 65 50 60' fill='%2300b894'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-right',
        size: '70px',
        opacity: 0.3,
        rotation: '-10deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 100 100'%3E%3Cg opacity='0.25'%3E%3Ccircle cx='30' cy='30' r='5' fill='%23ffeaa7'/%3E%3Ccircle cx='70' cy='30' r='5' fill='%23ffeaa7'/%3E%3Ccircle cx='50' cy='50' r='5' fill='%23ffeaa7'/%3E%3Ccircle cx='30' cy='70' r='5' fill='%23ffeaa7'/%3E%3Ccircle cx='70' cy='70' r='5' fill='%23ffeaa7'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-right',
        size: '50px',
        opacity: 0.5,
        rotation: '0deg',
        zIndex: 0
      }
    ]
  },

  // 5. Dinosaur Valley - Various dinosaur silhouettes
  {
    name: '🦕 Vallée des Dinosaures',
    type: 'advanced',
    background: 'linear-gradient(180deg, #2d3436 0%, #636e72 50%, #b2bec3 100%)',
    pattern: `repeating-linear-gradient(180deg, transparent, transparent 50px, rgba(0, 0, 0, 0.1) 50px, rgba(0, 0, 0, 0.1) 100px)`,
    cardBackground: 'linear-gradient(135deg, rgba(99, 110, 114, 0.9) 0%, rgba(45, 52, 54, 0.9) 100%)',
    cardBorder: '4px solid #00b894',
    cardRadius: '20px',
    cardShadow: '0 20px 50px rgba(0, 184, 148, 0.4)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.92)',
      border: '3px solid #e17055',
      borderRadius: '15px',
      padding: '25px',
      backdropFilter: 'blur(5px)'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
    numberBadgeColor: '#ffffff',
    images: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg opacity='0.3'%3E%3Cpath d='M30 100 L30 80 L35 75 L40 70 L50 65 L60 62 L70 60 L80 62 L90 65 L95 70 L95 75 L100 80 L100 100 L95 100 L95 85 L90 85 L90 100 L85 100 L85 85 L80 85 L80 100 L40 100 L40 85 L35 85 L35 100 z' fill='%2300b894'/%3E%3Cpath d='M70 60 L75 55 L80 50 L85 48 L90 48 L95 50 L95 55 L90 58 L85 60' fill='%2300b894'/%3E%3Cpath d='M100 80 L110 75 L115 75 L120 80' fill='%2300b894'/%3E%3Ccircle cx='85' cy='52' r='2' fill='black'/%3E%3C/g%3E%3C/svg%3E",
        position: 'center-left',
        size: '120px',
        opacity: 0.3,
        rotation: '0deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Cg opacity='0.35'%3E%3Cpath d='M20 70 L25 65 L30 60 L40 58 L50 58 L55 60 L55 65 L50 70 L50 75 L55 75 L55 80 L50 80 L50 75 L45 75 L45 80 L40 80 L40 75 L30 75 L30 80 L25 80 L25 75 L30 75 L30 70 z' fill='%23e17055'/%3E%3Cpath d='M55 60 L60 55 L65 53 L70 53 L73 55 L73 58 L70 60' fill='%23e17055'/%3E%3Ccircle cx='67' cy='55' r='1.5' fill='black'/%3E%3Cpath d='M20 70 L15 72 L10 75' fill='%23e17055'/%3E%3C/g%3E%3C/svg%3E",
        position: 'bottom-right',
        size: '70px',
        opacity: 0.4,
        rotation: '10deg',
        zIndex: 0
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg opacity='0.25'%3E%3Cpath d='M30 60 L35 50 L40 45 L50 40 L60 38 L70 38 L75 40 L75 45 L70 50 L65 55 L60 60 L60 65 L65 65 L65 70 L60 70 L60 65 L55 65 L55 70 L50 70 L50 65 L35 65 L35 70 L30 70 L30 65 L35 65 L35 60 z' fill='%2300cec9'/%3E%3Cpath d='M40 45 Q35 40 30 42' fill='%2300cec9'/%3E%3Cpath d='M50 40 Q48 35 45 36' fill='%2300cec9'/%3E%3Cpath d='M60 38 Q62 33 65 34' fill='%2300cec9'/%3E%3C/g%3E%3C/svg%3E",
        position: 'top-left',
        size: '80px',
        opacity: 0.3,
        rotation: '-15deg',
        zIndex: 0
      }
    ]
  }
];

// Add new themes to the main export
advancedCreativeThemes.push(...imageFocusedThemes);

export default advancedCreativeThemes;