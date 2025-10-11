// Font system configuration extracted from v4
export const fontCategories = [
  {
    name: '🎨 Polices Super Amusantes',
    fonts: [
      { value: '"Fredoka", sans-serif', label: 'Fredoka (Arrondi & Amical)' },
      { value: '"Bubblegum Sans", cursive', label: 'Bubblegum Sans (Bulle de gomme)' },
      { value: '"Baloo 2", cursive', label: 'Baloo (Joueur)' },
      { value: '"Chewy", cursive', label: 'Chewy (Bonbon)' },
      { value: '"Luckiest Guy", cursive', label: 'Luckiest Guy (BD)' },
      { value: '"Boogaloo", cursive', label: 'Boogaloo (Groovy)' },
      { value: '"Modak", cursive', label: 'Modak (Épais & Fun)' },
      { value: '"Titan One", cursive', label: 'Titan One (Héros)' },
      { value: '"Shrikhand", cursive', label: 'Shrikhand (Bollywood)' },
      { value: '"Comfortaa", cursive', label: 'Comfortaa (Moderne & Doux)' },
      { value: '"Quicksand", sans-serif', label: 'Quicksand (Léger & Fun)' },
      { value: '"Mali", cursive', label: 'Mali (Mignon)' },
      { value: '"Sniglet", cursive', label: 'Sniglet (Arrondi)' },
      { value: '"Cherry Cream Soda", cursive', label: 'Cherry Cream Soda' },
      { value: '"Comic Sans MS", cursive', label: 'Comic Sans' },
    ]
  },
  {
    name: '🦄 Polices Fantaisie',
    fonts: [
      { value: '"Creepster", cursive', label: 'Creepster (Halloween)' },
      { value: '"Griffy", cursive', label: 'Griffy (Conte de fées)' },
      { value: '"Mystery Quest", cursive', label: 'Mystery Quest (Mystère)' },
      { value: '"Rye", cursive', label: 'Rye (Western)' },
      { value: '"Pirata One", cursive', label: 'Pirata One (Pirate)' },
      { value: '"Bungee", cursive', label: 'Bungee (Urbain)' },
      { value: '"Bungee Shade", cursive', label: 'Bungee Shade (3D)' },
      { value: '"Rubik Mono One", sans-serif', label: 'Rubik Mono (Pixels)' },
      { value: '"Press Start 2P", cursive', label: 'Press Start (Jeu vidéo)' },
      { value: '"Bangers", cursive', label: 'Bangers (Comics)' },
      { value: '"Freckle Face", cursive', label: 'Freckle Face (Taches de rousseur)' },
      { value: '"Lakki Reddy", cursive', label: 'Lakki Reddy (Indien)' },
    ]
  },
  {
    name: '✏️ Écriture Manuscrite',
    fonts: [
      { value: '"Kalam", cursive', label: 'Kalam (Crayon)' },
      { value: '"Indie Flower", cursive', label: 'Indie Flower (Décontracté)' },
      { value: '"Patrick Hand", cursive', label: 'Patrick Hand (Main écrite)' },
      { value: '"Caveat", cursive', label: 'Caveat (Craie)' },
      { value: '"Architects Daughter", cursive', label: 'Architects Daughter' },
      { value: '"Schoolbell", cursive', label: 'Schoolbell (École)' },
      { value: '"Gloria Hallelujah", cursive', label: 'Gloria Hallelujah' },
      { value: '"Shadows Into Light", cursive', label: 'Shadows Into Light' },
      { value: '"Permanent Marker", cursive', label: 'Permanent Marker (Marqueur)' },
      { value: '"Amatic SC", cursive', label: 'Amatic SC (Tableau)' },
      { value: '"Gochi Hand", cursive', label: 'Gochi Hand (Manga)' },
      { value: '"Rock Salt", cursive', label: 'Rock Salt (Sel gemme)' },
      { value: '"Reenie Beanie", cursive', label: 'Reenie Beanie (Stylo)' },
      { value: '"Covered By Your Grace", cursive', label: 'Covered By Your Grace' },
      { value: '"Just Me Again Down Here", cursive', label: 'Just Me Again (Cahier)' },
    ]
  },
  {
    name: '🎭 Polices Rigolotes',
    fonts: [
      { value: '"Bowlby One", cursive', label: 'Bowlby One (Ballon)' },
      { value: '"Sigmar One", cursive', label: 'Sigmar One (Grosse)' },
      { value: '"Coiny", cursive', label: 'Coiny (Pièce de monnaie)' },
      { value: '"Chango", cursive', label: 'Chango (Mexicain)' },
      { value: '"Lemon", cursive', label: 'Lemon (Citron)' },
      { value: '"Chicle", cursive', label: 'Chicle (Gomme)' },
      { value: '"Ribeye", cursive', label: 'Ribeye (Steak)' },
      { value: '"Wendy One", sans-serif', label: 'Wendy One' },
      { value: '"Flavors", cursive', label: 'Flavors (Saveurs)' },
      { value: '"Emilys Candy", cursive', label: 'Emilys Candy (Bonbons)' },
    ]
  },
  {
    name: '🌟 Polices Décoratives',
    fonts: [
      { value: '"Pacifico", cursive', label: 'Pacifico (Plage)' },
      { value: '"Kaushan Script", cursive', label: 'Kaushan Script (Script)' },
      { value: '"Dancing Script", cursive', label: 'Dancing Script (Danse)' },
      { value: '"Satisfy", cursive', label: 'Satisfy (Élégant)' },
      { value: '"Lobster", cursive', label: 'Lobster (Homard)' },
      { value: '"Righteous", cursive', label: 'Righteous (Justice)' },
      { value: '"Acme", sans-serif', label: 'Acme (Cartoon)' },
      { value: '"Alfaslab One", cursive', label: 'Alfa Slab (Épais)' },
    ]
  },
  {
    name: '📚 Polices Classiques',
    fonts: [
      { value: 'Arial, sans-serif', label: 'Arial' },
      { value: 'Georgia, serif', label: 'Georgia' },
      { value: '"Times New Roman", serif', label: 'Times New Roman' },
      { value: 'Verdana, sans-serif', label: 'Verdana' },
      { value: 'system-ui', label: 'System Default' },
    ]
  }
];

// Helper to get all fonts flat
export const getAllFonts = () => {
  return fontCategories.flatMap(category => category.fonts);
};

// Default font settings
export const defaultFontSettings = {
  fontFamily: 'system-ui',
  fontSize: 21,
  isBold: false,
  isItalic: false
};