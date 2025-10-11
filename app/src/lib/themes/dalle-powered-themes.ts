// DALL-E Powered Themes - Themes designed for AI-generated images
// These themes include prompts for DALL-E to generate appropriate images

export interface DallePoweredTheme {
  name: string;
  type: 'dalle-powered';

  // Background and card styles
  background: string;
  cardBorder?: string;
  cardRadius?: string;
  cardShadow?: string;
  cardPadding?: string;

  // Question container styles
  questionStyle?: {
    background?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    backdropFilter?: string;
  };

  // Number badge styles
  numberBadgeStyle?: 'circle' | 'square' | 'hexagon' | 'star' | 'diamond' | 'cloud' | 'heart';
  numberBadgeBackground?: string;
  numberBadgeColor?: string;

  // DALL-E prompts for this theme
  dallePrompts: {
    mainCharacter: string;      // Main character/element prompt
    background: string;          // Background elements prompt
    decorative: string;         // Decorative elements prompt
    style: string;              // Art style to apply to all prompts
  };

  // Image placement zones
  imageZones: {
    id: 'main' | 'background' | 'decorative1' | 'decorative2';
    position: 'center-bottom' | 'top-right' | 'bottom-left' | 'full-background' | 'floating';
    size: string;
    opacity?: number;
    zIndex?: number;
  }[];
}

// Temporary placeholder images that simulate DALL-E output
// In production, these would be replaced with actual DALL-E API calls
const placeholderImages = {
  unicorn: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='unicorn' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff6ec7'/%3E%3Cstop offset='50%25' style='stop-color:%23c77dff'/%3E%3Cstop offset='100%25' style='stop-color:%237209b7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='100' cy='120' rx='40' ry='50' fill='url(%23unicorn)'/%3E%3Cpath d='M100 70 L105 40 L100 45 L95 40 Z' fill='%23ffd60a'/%3E%3Ccircle cx='85' cy='110' r='5' fill='%23000'/%3E%3Ccircle cx='115' cy='110' r='5' fill='%23000'/%3E%3Cpath d='M60 120 Q60 140 80 140 L80 170 L90 170 L90 140' fill='url(%23unicorn)'/%3E%3Cpath d='M140 120 Q140 140 120 140 L120 170 L110 170 L110 140' fill='url(%23unicorn)'/%3E%3C/svg%3E",

  robot: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='robot' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2338bdf8'/%3E%3Cstop offset='100%25' style='stop-color:%230284c7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='70' y='80' width='60' height='80' rx='10' fill='url(%23robot)'/%3E%3Crect x='60' y='100' width='10' height='40' rx='5' fill='%2364748b'/%3E%3Crect x='130' y='100' width='10' height='40' rx='5' fill='%2364748b'/%3E%3Crect x='85' y='160' width='15' height='30' rx='5' fill='%2364748b'/%3E%3Crect x='100' y='160' width='15' height='30' rx='5' fill='%2364748b'/%3E%3Ccircle cx='85' cy='100' r='8' fill='%23fbbf24'/%3E%3Ccircle cx='115' cy='100' r='8' fill='%23fbbf24'/%3E%3Crect x='95' y='50' width='10' height='30' fill='%2364748b'/%3E%3Ccircle cx='100' cy='45' r='8' fill='%23ef4444'/%3E%3C/svg%3E",

  dragon: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='dragon' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2316a34a'/%3E%3Cstop offset='100%25' style='stop-color:%23059669'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='100' cy='100' rx='50' ry='40' fill='url(%23dragon)'/%3E%3Cpath d='M50 100 Q30 90 20 100 Q30 110 50 100' fill='%23059669'/%3E%3Cpath d='M150 100 Q170 90 180 100 Q170 110 150 100' fill='%23059669'/%3E%3Cpath d='M80 80 L85 70 L80 75 Z' fill='%23fbbf24'/%3E%3Cpath d='M120 80 L115 70 L120 75 Z' fill='%23fbbf24'/%3E%3Ccircle cx='80' cy='95' r='6' fill='%23dc2626'/%3E%3Ccircle cx='120' cy='95' r='6' fill='%23dc2626'/%3E%3Cpath d='M90 110 Q100 115 110 110' stroke='%23000' stroke-width='2' fill='none'/%3E%3C/svg%3E",

  mermaid: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='mermaid' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2306b6d4'/%3E%3Cstop offset='100%25' style='stop-color:%230891b2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='100' cy='80' rx='35' ry='40' fill='%23fde68a'/%3E%3Cellipse cx='100' cy='130' rx='40' ry='50' fill='url(%23mermaid)'/%3E%3Cpath d='M60 150 Q60 180 80 180 Q70 170 60 150' fill='%230891b2'/%3E%3Cpath d='M140 150 Q140 180 120 180 Q130 170 140 150' fill='%230891b2'/%3E%3Ccircle cx='85' cy='75' r='4' fill='%23000'/%3E%3Ccircle cx='115' cy='75' r='4' fill='%23000'/%3E%3Cpath d='M90 85 Q100 90 110 85' stroke='%23ec4899' stroke-width='2' fill='none'/%3E%3C/svg%3E",

  pirate: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='40' fill='%23fde68a'/%3E%3Cpath d='M60 80 L140 80 L140 90 Q100 100 60 90 Z' fill='%23dc2626'/%3E%3Cpath d='M75 85 L75 75' stroke='%23fff' stroke-width='2'/%3E%3Ccircle cx='80' cy='100' r='5' fill='%23000'/%3E%3Cpath d='M105 95 L125 95 L125 105 L105 105 Z' fill='%23000'/%3E%3Cpath d='M85 115 Q100 120 115 115' stroke='%23000' stroke-width='2' fill='none'/%3E%3Cpath d='M100 60 L105 50 Q100 48 95 50 Z' fill='%23000'/%3E%3C/svg%3E",

  sparkles: "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' opacity='0.8'%3E%3Cpath d='M20 20 L22 26 L28 26 L23 30 L25 36 L20 32 L15 36 L17 30 L12 26 L18 26 Z'/%3E%3Cpath d='M70 15 L72 21 L78 21 L73 25 L75 31 L70 27 L65 31 L67 25 L62 21 L68 21 Z'/%3E%3Cpath d='M50 60 L52 66 L58 66 L53 70 L55 76 L50 72 L45 76 L47 70 L42 66 L48 66 Z'/%3E%3C/g%3E%3Cg fill='%23ec4899' opacity='0.6'%3E%3Cpath d='M80 70 L81 73 L84 73 L81.5 75 L82.5 78 L80 76 L77.5 78 L78.5 75 L76 73 L79 73 Z'/%3E%3C/g%3E%3C/svg%3E",

  clouds: "data:image/svg+xml,%3Csvg viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='50' cy='60' rx='30' ry='20' fill='white' opacity='0.9'/%3E%3Cellipse cx='80' cy='55' rx='35' ry='25' fill='white' opacity='0.9'/%3E%3Cellipse cx='110' cy='60' rx='25' ry='18' fill='white'/%3E%3Cellipse cx='140' cy='50' rx='30' ry='20' fill='white' opacity='0.8'/%3E%3Cellipse cx='170' cy='55' rx='25' ry='15' fill='white' opacity='0.7'/%3E%3C/svg%3E",

  candyland: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='90' y='100' width='20' height='80' fill='%23ef4444' rx='10'/%3E%3Ccircle cx='100' cy='80' r='30' fill='%23ec4899'/%3E%3Cpath d='M70 80 Q70 50 100 50 Q130 50 130 80' fill='%23fbbf24' opacity='0.7'/%3E%3Ccircle cx='85' cy='75' r='5' fill='%23fff'/%3E%3Ccircle cx='115' cy='75' r='5' fill='%23fff'/%3E%3Ccircle cx='100' cy='85' r='5' fill='%23fff'/%3E%3C/svg%3E"
};

export const dallePoweredThemes: DallePoweredTheme[] = [
  {
    name: '🦄 Royaume Magique',
    type: 'dalle-powered',
    background: 'linear-gradient(135deg, #fce7f3 0%, #e9d5ff 50%, #c084fc 100%)',
    cardBorder: '3px solid #a855f7',
    cardRadius: '30px',
    cardShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #e9d5ff',
      borderRadius: '25px',
      padding: '30px',
      backdropFilter: 'blur(10px)'
    },
    numberBadgeStyle: 'star',
    numberBadgeBackground: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    numberBadgeColor: '#7c2d12',
    dallePrompts: {
      mainCharacter: 'Cute cartoon unicorn with rainbow mane, pink and purple colors, kawaii style, standing on clouds',
      background: 'Magical castle in clouds, pastel colors, fairy tale style, sparkles and stars',
      decorative: 'Rainbow, shooting stars, magical sparkles, butterflies',
      style: '3D Pixar animation style, bright pastel colors, child-friendly, magical atmosphere'
    },
    imageZones: [
      {
        id: 'main',
        position: 'center-bottom',
        size: '120px',
        opacity: 0.95,
        zIndex: 3
      },
      {
        id: 'background',
        position: 'full-background',
        size: '100%',
        opacity: 0.15,
        zIndex: 0
      },
      {
        id: 'decorative1',
        position: 'top-right',
        size: '80px',
        opacity: 0.7,
        zIndex: 1
      }
    ]
  },

  {
    name: '🤖 Laboratoire du Futur',
    type: 'dalle-powered',
    background: 'linear-gradient(180deg, #1e293b 0%, #334155 50%, #475569 100%)',
    cardBorder: '3px solid #38bdf8',
    cardRadius: '20px',
    cardShadow: '0 0 40px rgba(56, 189, 248, 0.4)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.93)',
      border: '3px solid #0ea5e9',
      borderRadius: '15px',
      padding: '25px'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
    numberBadgeColor: '#ffffff',
    dallePrompts: {
      mainCharacter: 'Friendly cartoon robot assistant, blue and silver colors, round design with big eyes, LED lights',
      background: 'Futuristic laboratory, holographic displays, neon lights, high-tech equipment',
      decorative: 'Circuit patterns, data streams, binary code, glowing orbs',
      style: 'Modern 3D render, clean design, neon accents, tech aesthetic, child-friendly'
    },
    imageZones: [
      {
        id: 'main',
        position: 'bottom-left',
        size: '110px',
        opacity: 0.9,
        zIndex: 3
      },
      {
        id: 'decorative1',
        position: 'floating',
        size: '150px',
        opacity: 0.3,
        zIndex: 1
      }
    ]
  },

  {
    name: '🐲 Terre des Dragons',
    type: 'dalle-powered',
    background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #facc15 100%)',
    cardBorder: '4px solid #991b1b',
    cardRadius: '25px',
    cardShadow: '0 25px 50px rgba(220, 38, 38, 0.4)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.92)',
      border: '3px solid #f97316',
      borderRadius: '20px',
      padding: '25px'
    },
    numberBadgeStyle: 'diamond',
    numberBadgeBackground: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    numberBadgeColor: '#451a03',
    dallePrompts: {
      mainCharacter: 'Cute baby dragon, green with orange wings, big friendly eyes, breathing small puffs of smoke',
      background: 'Medieval castle on mountain, volcano in distance, fantasy landscape',
      decorative: 'Fire effects, smoke clouds, treasure coins, gems',
      style: 'Fantasy art style, warm colors, dramatic lighting, whimsical and friendly'
    },
    imageZones: [
      {
        id: 'main',
        position: 'center-bottom',
        size: '130px',
        opacity: 0.95,
        zIndex: 3
      },
      {
        id: 'decorative1',
        position: 'top-right',
        size: '70px',
        opacity: 0.6,
        zIndex: 2
      },
      {
        id: 'decorative2',
        position: 'bottom-left',
        size: '60px',
        opacity: 0.5,
        zIndex: 1
      }
    ]
  },

  {
    name: '🧜‍♀️ Palais Sous-Marin',
    type: 'dalle-powered',
    background: 'linear-gradient(180deg, #0891b2 0%, #0e7490 40%, #155e75 100%)',
    cardBorder: '3px solid #06b6d4',
    cardRadius: '30px',
    cardShadow: '0 20px 40px rgba(6, 182, 212, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.93)',
      border: '3px solid #67e8f9',
      borderRadius: '25px',
      padding: '25px',
      backdropFilter: 'blur(5px)'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: 'linear-gradient(135deg, #fbbf24 0%, #fcd34d 100%)',
    numberBadgeColor: '#0c4a6e',
    dallePrompts: {
      mainCharacter: 'Adorable cartoon mermaid with turquoise tail, long flowing hair, holding a pearl',
      background: 'Underwater palace made of coral, seashells, pearls, sunlight filtering through water',
      decorative: 'Colorful fish, bubbles, seaweed, starfish, seahorses',
      style: 'Disney animation style, vibrant underwater colors, dreamy atmosphere, magical lighting'
    },
    imageZones: [
      {
        id: 'main',
        position: 'center-bottom',
        size: '115px',
        opacity: 0.9,
        zIndex: 3
      },
      {
        id: 'background',
        position: 'full-background',
        size: '100%',
        opacity: 0.2,
        zIndex: 0
      },
      {
        id: 'decorative1',
        position: 'floating',
        size: '80px',
        opacity: 0.6,
        zIndex: 2
      }
    ]
  },

  {
    name: '🏴‍☠️ Île aux Pirates',
    type: 'dalle-powered',
    background: 'linear-gradient(135deg, #92400e 0%, #b45309 50%, #fbbf24 100%)',
    cardBorder: '4px solid #451a03',
    cardRadius: '20px',
    cardShadow: '0 15px 35px rgba(69, 26, 3, 0.4)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.94)',
      border: '3px solid #d97706',
      borderRadius: '18px',
      padding: '25px'
    },
    numberBadgeStyle: 'cloud',
    numberBadgeBackground: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    numberBadgeColor: '#fbbf24',
    dallePrompts: {
      mainCharacter: 'Friendly cartoon pirate parrot, colorful feathers, eye patch, sitting on treasure chest',
      background: 'Tropical island with palm trees, pirate ship in distance, beach, treasure map',
      decorative: 'Gold coins, treasure chest, compass, pirate flag, tropical flowers',
      style: 'Cartoon adventure style, warm tropical colors, fun and playful, storybook illustration'
    },
    imageZones: [
      {
        id: 'main',
        position: 'bottom-left',
        size: '100px',
        opacity: 0.95,
        zIndex: 3
      },
      {
        id: 'decorative1',
        position: 'top-right',
        size: '90px',
        opacity: 0.7,
        zIndex: 2
      },
      {
        id: 'decorative2',
        position: 'center-bottom',
        size: '70px',
        opacity: 0.5,
        zIndex: 1
      }
    ]
  }
];

// Function to get placeholder images for a theme (simulating DALL-E)
export function getPlaceholderImages(theme: DallePoweredTheme): { [key: string]: string } {
  const themeIndex = dallePoweredThemes.findIndex(t => t.name === theme.name);

  // Map theme names to placeholder images
  const themeImageMap: { [key: string]: { main: string; decorative1: string; decorative2?: string; background?: string } } = {
    '🦄 Royaume Magique': {
      main: placeholderImages.unicorn,
      decorative1: placeholderImages.sparkles,
      decorative2: placeholderImages.clouds,
      background: placeholderImages.sparkles
    },
    '🤖 Laboratoire du Futur': {
      main: placeholderImages.robot,
      decorative1: placeholderImages.sparkles
    },
    '🐲 Terre des Dragons': {
      main: placeholderImages.dragon,
      decorative1: placeholderImages.sparkles,
      decorative2: placeholderImages.clouds
    },
    '🧜‍♀️ Palais Sous-Marin': {
      main: placeholderImages.mermaid,
      decorative1: placeholderImages.sparkles,
      background: placeholderImages.clouds
    },
    '🏴‍☠️ Île aux Pirates': {
      main: placeholderImages.pirate,
      decorative1: placeholderImages.sparkles,
      decorative2: placeholderImages.candyland
    }
  };

  const images = themeImageMap[theme.name] || { main: placeholderImages.sparkles };

  // Return with keys that match what CardRenderer expects
  const result: { [key: string]: string } = {};
  Object.entries(images).forEach(([key, value]) => {
    result[`${key}-${themeIndex}`] = value;
  });

  return result;
}

// Function to generate DALL-E API request
export async function generateDalleImages(
  theme: DallePoweredTheme,
  themeIndex: number
): Promise<{ [key: string]: string }> {
  const images: { [key: string]: string } = {};

  try {
    // Generate images for each zone
    for (const zone of theme.imageZones) {
      let prompt = '';

      // Build appropriate prompt based on zone type
      switch (zone.id) {
        case 'main':
          prompt = `${theme.dallePrompts.mainCharacter}, ${theme.dallePrompts.style}`;
          break;
        case 'background':
          prompt = `${theme.dallePrompts.background}, ${theme.dallePrompts.style}`;
          break;
        case 'decorative1':
        case 'decorative2':
          prompt = `${theme.dallePrompts.decorative}, ${theme.dallePrompts.style}`;
          break;
      }

      // Enhance prompt for educational context
      prompt += ', suitable for children ages 6-12, educational card game, transparent or white background for easy overlay';

      console.log(`Generating DALL-E image for ${zone.id}:`, prompt);

      try {
        const response = await fetch('/api/generate-dalle-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: prompt,
            size: '1024x1024', // Using square for flexibility
            quality: 'standard', // Can change to 'hd' for better quality
            style: 'vivid' // More vibrant colors for kids
          })
        });

        if (!response.ok) {
          const error = await response.json();
          console.error(`Failed to generate image for ${zone.id}:`, error);
          // Use placeholder as fallback
          images[`${zone.id}-${themeIndex}`] = placeholderImages[
            zone.id === 'main' ?
              (theme.name.includes('Royaume') ? 'unicorn' :
               theme.name.includes('Laboratoire') ? 'robot' :
               theme.name.includes('Dragon') ? 'dragon' :
               theme.name.includes('Palais') ? 'mermaid' : 'pirate') :
            'sparkles'
          ];
        } else {
          const data = await response.json();
          images[`${zone.id}-${themeIndex}`] = data.image;
          console.log(`Successfully generated image for ${zone.id}`);
        }
      } catch (error) {
        console.error(`Error generating image for ${zone.id}:`, error);
        // Use placeholder as fallback
        images[`${zone.id}-${themeIndex}`] = getPlaceholderImages(theme)[`${zone.id}-${themeIndex}`] || placeholderImages.sparkles;
      }
    }

    return images;

  } catch (error) {
    console.error('Error generating DALL-E images:', error);
    // Return placeholder images as fallback
    return getPlaceholderImages(theme);
  }
}

export default dallePoweredThemes;