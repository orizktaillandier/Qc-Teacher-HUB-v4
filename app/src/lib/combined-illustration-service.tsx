import React from 'react';
import { FunIllustrations } from './original-github-themes';
// Import React Kawaii characters
import {
  Ghost,
  IceCream,
  Planet,
  Backpack,
  Cat,
  Mug,
  Browser,
  SpeechBubble,
  File,
  Folder,
  Chocolate
} from 'react-kawaii';

// Import Boring Avatars and Nice Avatar
import Avatar, { genConfig } from 'react-nice-avatar';
import BoringAvatar from 'boring-avatars';

// Import education-related icons from lucide-react
import {
  School, GraduationCap, BookOpen, Pencil, Calculator,
  Globe, Microscope, Palette, Music, Heart,
  Star, Trophy, Target, Lightbulb, Brain,
  Rocket, Atom, FlaskConical, Compass, Ruler,
  PenTool, Users, Smile, Baby, Bird,
  Fish, Flower, Trees, Sun, Moon,
  Cloud, Rainbow, Sparkles, Apple, Cherry,
  Cookie, Cake, Gamepad2, Puzzle, Drama,
  Camera, Headphones, Plane, Car, Bike,
  Train, Home, TreePine, Mountain, Waves,
  MapPin, Clock, Calendar, Flag, Shield,
  Award, Medal, Crown, Diamond, Gem,
  Guitar, Piano, Drum, Mic, Speaker,
  Brush, Scissors, Hammer, Wrench, Tool,
  Zap, Activity, Anchor, Archive, Bell,
  Gift, Package, Briefcase, Coffee, Feather
} from 'lucide-react';

// Import select Undraw illustrations (only existing components)
import {
  UndrawBackToSchool,
  UndrawStudying,
  UndrawBookLover,
  UndrawPresentation,
  UndrawCreativity,
  UndrawPlayfulCat,
  UndrawCelebration,
  UndrawCollaboration,
  UndrawGraduation,
  UndrawCalculator,
  UndrawFriendship,
  UndrawGaming,
  UndrawHappyBirthday,
  UndrawYoungAndHappy,
  UndrawFatherhood,
  UndrawMotherhood,
  UndrawWeather,
  UndrawCampfire,
  UndrawHealthyHabit,
  UndrawBasketball,
  UndrawDesigner,
  UndrawMusic,
  UndrawPodcast,
  UndrawSocialMedia,
  UndrawInfluencer,
  UndrawBlogging,
  UndrawArtLover,
  UndrawBrainstorming,
  UndrawBusinessPlan,
  UndrawCharts,
  UndrawCoding,
  UndrawDataReport,
  UndrawFocus,
  UndrawStartupLife,
  UndrawWorking,
  UndrawWorkout,
  UndrawYoga,
  UndrawRelaxation,
  UndrawJogging,
  UndrawPhotos,
  UndrawNavigation,
  UndrawOnline,
  UndrawSocialGrowth,
  UndrawTogether,
  UndrawWelcome,
  UndrawHiring,
  UndrawMeeting
} from 'react-undraw-illustrations';

// Available moods for kawaii characters
type Mood = 'sad' | 'shocked' | 'happy' | 'blissful' | 'lovestruck' | 'excited' | 'ko';

// Available illustration themes - combining all libraries
export type IllustrationTheme =
  // GitHub original fun illustrations
  | 'watermelon' | 'pineapple' | 'sunglasses' | 'pencil' | 'book' | 'star' | 'maple'
  // Kawaii themes
  | 'kawaii-cat' | 'kawaii-ghost' | 'kawaii-planet' | 'kawaii-icecream'
  | 'kawaii-backpack' | 'kawaii-mug' | 'kawaii-browser' | 'kawaii-chocolate'
  // Educational themes
  | 'learning' | 'teaching' | 'reading' | 'science' | 'math'
  | 'art' | 'music' | 'sports' | 'nature' | 'technology'
  | 'collaboration' | 'celebration' | 'creativity' | 'discovery'
  // Family & Children themes
  | 'family' | 'childhood' | 'playtime' | 'friendship'
  // Activity themes
  | 'gaming' | 'outdoor' | 'wellness' | 'birthday'
  // Avatar themes
  | 'avatars-beam' | 'avatars-marble' | 'avatars-pixel' | 'avatars-sunset' | 'avatars-ring'
  | 'avatars-bauhaus' | 'nice-avatar-boy' | 'nice-avatar-girl' | 'nice-avatar-teacher'
  // Media & Digital themes
  | 'digital' | 'social' | 'video'
  // Special themes
  | 'random' | 'mixed' | 'surprise';

// Illustration configuration
export interface IllustrationConfig {
  type: 'kawaii' | 'undraw' | 'icon' | 'emoji' | 'boring-avatar' | 'nice-avatar';
  component?: React.ComponentType<any>;
  icon?: React.ComponentType<any>;
  emoji?: string;
  mood?: Mood;
  primaryColor?: string;
  size?: number;
  variant?: string;
}

// Fun color palette for kids
const kidColors = {
  pink: '#FFB3E6',
  purple: '#B19CD9',
  blue: '#87CEEB',
  green: '#90EE90',
  yellow: '#FFEB9C',
  orange: '#FFB366',
  red: '#FF9999',
  teal: '#40E0D0',
  mint: '#98FF98',
  peach: '#FFDAB9',
  lavender: '#E6E6FA',
  coral: '#FF7F50'
};

// Theme colors
const themeColors = {
  'kawaii-cat': '#FFB3E6',
  'kawaii-ghost': '#E6E6FA',
  'kawaii-planet': '#87CEEB',
  'kawaii-icecream': '#FFDAB9',
  'kawaii-backpack': '#90EE90',
  'kawaii-mug': '#FFB366',
  'kawaii-browser': '#B19CD9',
  'kawaii-chocolate': '#8B4513',
  learning: '#3B82F6',
  teaching: '#8B5CF6',
  reading: '#10B981',
  science: '#06B6D4',
  math: '#F59E0B',
  art: '#EC4899',
  music: '#A78BFA',
  sports: '#EF4444',
  nature: '#34D399',
  technology: '#6366F1',
  collaboration: '#F472B6',
  celebration: '#FBBF24',
  creativity: '#C084FC',
  discovery: '#14B8A6',
  family: '#FB923C',
  childhood: '#F0ABFC',
  playtime: '#94A3B8',
  friendship: '#FB7185',
  gaming: '#8B5CF6',
  outdoor: '#65A30D',
  wellness: '#0EA5E9',
  birthday: '#F97316',
  'avatars-beam': '#FF6B6B',
  'avatars-marble': '#4ECDC4',
  'avatars-pixel': '#95E1D3',
  'avatars-sunset': '#FFD93D',
  'avatars-ring': '#6C5CE7',
  'avatars-bauhaus': '#FDA7DF',
  'nice-avatar-boy': '#74B9FF',
  'nice-avatar-girl': '#FD79A8',
  'nice-avatar-teacher': '#A29BFE',
  digital: '#00B894',
  social: '#E17055',
  video: '#FDCB6E',
  surprise: '#FF69B4'
};

// Educational emojis
const themeEmojis = {
  learning: ['📚', '✏️', '🎓', '💡', '🧠'],
  teaching: ['👨‍🏫', '👩‍🏫', '📝', '🎯', '📖'],
  reading: ['📖', '📚', '📕', '📗', '📘'],
  science: ['🔬', '🧪', '⚗️', '🔭', '🧬'],
  math: ['🔢', '➕', '➖', '✖️', '➗', '📐', '📏'],
  art: ['🎨', '🖌️', '🖍️', '✏️', '🎭'],
  music: ['🎵', '🎶', '🎼', '🎹', '🎸', '🥁'],
  sports: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐'],
  nature: ['🌳', '🌲', '🌺', '🌻', '🌈', '☀️', '🌙'],
  technology: ['💻', '🖥️', '⌨️', '🖱️', '💾', '🤖'],
  collaboration: ['🤝', '👥', '💪', '🙌', '👫'],
  celebration: ['🎉', '🎊', '🏆', '🥇', '⭐', '🌟'],
  creativity: ['💡', '🎨', '✨', '🌟', '🔮'],
  discovery: ['🔍', '🗺️', '🧭', '🏔️', '🌍'],
  family: ['👨‍👩‍👧‍👦', '👪', '🏠', '❤️', '👶'],
  childhood: ['👶', '🍼', '🧸', '👧', '👦'],
  playtime: ['🧸', '🎪', '🎠', '🧩', '🎲'],
  friendship: ['👯', '🤗', '💝', '👫', '👬'],
  gaming: ['🎮', '🕹️', '🎯', '🎲', '👾'],
  outdoor: ['⛺', '🏕️', '🥾', '🏔️', '🌄'],
  wellness: ['🧘', '💆', '🏃', '💪', '🥗'],
  birthday: ['🎂', '🎈', '🎁', '🎊', '🥳'],
  digital: ['📱', '💻', '📷', '🎬', '📹'],
  social: ['💬', '📢', '👥', '🤳', '📱'],
  video: ['🎬', '📹', '📺', '🎥', '📽️']
};

// Icon collections for themes
const themeIcons = {
  learning: [School, BookOpen, Pencil, Brain, Lightbulb],
  teaching: [GraduationCap, Users, BookOpen, School],
  reading: [BookOpen, School, GraduationCap],
  science: [Microscope, Atom, FlaskConical, Brain],
  math: [Calculator, Ruler, Compass],
  art: [Palette, PenTool, Drama, Brush],
  music: [Music, Headphones, Guitar, Piano, Mic],
  sports: [Trophy, Target, Activity, Medal],
  nature: [Trees, Flower, Sun, Moon, Cloud, Rainbow],
  technology: [Rocket, Atom, Zap],
  collaboration: [Users, Heart],
  celebration: [Trophy, Star, Sparkles, Award, Crown],
  creativity: [Lightbulb, Brain, Palette],
  discovery: [Compass, Globe, Mountain, MapPin],
  family: [Home, Heart, Baby, Shield],
  childhood: [Baby, Smile, Gift],
  playtime: [Gamepad2, Puzzle, Cake],
  friendship: [Heart, Users, Smile],
  gaming: [Gamepad2, Target, Trophy],
  outdoor: [Mountain, Trees, Sun, TreePine],
  wellness: [Heart, Activity, Apple],
  birthday: [Cake, Gift, Star],
  digital: [Camera, Headphones, Mic],
  social: [Users, Heart, Bell],
  video: [Camera, Headphones, Speaker],
  technology: [Rocket, Atom, Zap],
  discovery: [Compass, Globe, Mountain, MapPin, Flag]
};

class CombinedIllustrationService {
  // Get a random element from array
  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Get a random mood
  private getRandomMood(): Mood {
    const moods: Mood[] = ['happy', 'blissful', 'excited', 'lovestruck'];
    return this.getRandomElement(moods);
  }

  // Get a random kid color
  private getRandomColor(): string {
    const colors = Object.values(kidColors);
    return this.getRandomElement(colors);
  }

  // Get available themes for dropdown
  getAvailableThemes() {
    return [
      { value: 'random', label: '🎲 Aléatoire', icon: '🎲' },
      { value: 'mixed', label: '🌈 Mélangé', icon: '🌈' },
      { value: 'surprise', label: '🎁 Surprise', icon: '🎁' },

      // Educational themes
      { value: 'learning', label: '📚 Apprentissage', icon: '📚' },
      { value: 'teaching', label: '👨‍🏫 Enseignement', icon: '👨‍🏫' },
      { value: 'reading', label: '📖 Lecture', icon: '📖' },
      { value: 'science', label: '🔬 Science', icon: '🔬' },
      { value: 'math', label: '🔢 Mathématiques', icon: '🔢' },
      { value: 'art', label: '🎨 Art', icon: '🎨' },
      { value: 'music', label: '🎵 Musique', icon: '🎵' },
      { value: 'sports', label: '⚽ Sports', icon: '⚽' },
      { value: 'nature', label: '🌿 Nature', icon: '🌿' },
      { value: 'technology', label: '💻 Technologie', icon: '💻' },
      { value: 'collaboration', label: '🤝 Collaboration', icon: '🤝' },
      { value: 'celebration', label: '🎉 Célébration', icon: '🎉' },
      { value: 'creativity', label: '✨ Créativité', icon: '✨' },
      { value: 'discovery', label: '🧭 Découverte', icon: '🧭' },

      // Family & Children themes
      { value: 'family', label: '👨‍👩‍👧‍👦 Famille', icon: '👨‍👩‍👧‍👦' },
      { value: 'childhood', label: '👶 Enfance', icon: '👶' },
      { value: 'playtime', label: '🧸 Récréation', icon: '🧸' },
      { value: 'friendship', label: '👯 Amitié', icon: '👯' },

      // Activity themes
      { value: 'gaming', label: '🎮 Jeux', icon: '🎮' },
      { value: 'outdoor', label: '🏕️ Plein air', icon: '🏕️' },
      { value: 'wellness', label: '🧘 Bien-être', icon: '🧘' },
      { value: 'birthday', label: '🎂 Anniversaire', icon: '🎂' },

      // Avatar themes
      { value: 'avatars-beam', label: '😊 Avatar Beam', icon: '😊' },
      { value: 'avatars-marble', label: '🎨 Avatar Marble', icon: '🎨' },
      { value: 'avatars-pixel', label: '👾 Avatar Pixel', icon: '👾' },
      { value: 'avatars-sunset', label: '🌅 Avatar Sunset', icon: '🌅' },
      { value: 'avatars-ring', label: '⭕ Avatar Ring', icon: '⭕' },
      { value: 'avatars-bauhaus', label: '🔲 Avatar Bauhaus', icon: '🔲' },
      { value: 'nice-avatar-boy', label: '👦 Avatar Garçon', icon: '👦' },
      { value: 'nice-avatar-girl', label: '👧 Avatar Fille', icon: '👧' },
      { value: 'nice-avatar-teacher', label: '👩‍🏫 Avatar Prof', icon: '👩‍🏫' },

      // Media & Digital themes
      { value: 'digital', label: '📱 Numérique', icon: '📱' },
      { value: 'social', label: '💬 Social', icon: '💬' },
      { value: 'video', label: '📹 Vidéo', icon: '📹' },

      // Kawaii character themes
      { value: 'kawaii-cat', label: '🐱 Chat Kawaii', icon: '🐱' },
      { value: 'kawaii-ghost', label: '👻 Fantôme Kawaii', icon: '👻' },
      { value: 'kawaii-planet', label: '🪐 Planète Kawaii', icon: '🪐' },
      { value: 'kawaii-icecream', label: '🍦 Crème glacée Kawaii', icon: '🍦' },
      { value: 'kawaii-backpack', label: '🎒 Sac à dos Kawaii', icon: '🎒' },
      { value: 'kawaii-mug', label: '☕ Tasse Kawaii', icon: '☕' },
      { value: 'kawaii-browser', label: '🌐 Navigateur Kawaii', icon: '🌐' },
      { value: 'kawaii-chocolate', label: '🍫 Chocolat Kawaii', icon: '🍫' }
    ];
  }

  // Get theme color
  getThemeColor(theme: IllustrationTheme): string {
    if (theme === 'random' || theme === 'mixed' || theme === 'surprise') {
      return this.getRandomColor();
    }
    return themeColors[theme] || '#3B82F6';
  }

  // Safe wrapper for Undraw components to handle SVG issues
  private SafeUndrawWrapper({ Component, color, size = 200 }: { Component: any, color: string, size?: number }) {
    // Create a wrapper component that renders the Undraw component and cleans its output
    const CleanedComponent = () => {
      try {
        // Render the Undraw component with the required props
        const rendered = Component({ primaryColor: color, height: "100%" });

        // If it's a React element, clean its props recursively
        if (React.isValidElement(rendered)) {
          const cleanElement = (element: any): any => {
            if (!React.isValidElement(element)) return element;

            // Filter out dataName and other problematic props from DOM elements
            const elementType = element.type;
            const isDOMElement = typeof elementType === 'string';

            if (isDOMElement) {
              // For DOM elements, use a whitelist approach for allowed props
              const props = element.props as any;
              const cleanedProps: any = {};

              // Define allowed SVG and HTML attributes
              const allowedProps = new Set([
                'children', 'style', 'className', 'id',
                'onClick', 'onMouseOver', 'onMouseOut', 'onMouseEnter', 'onMouseLeave',
                'width', 'height', 'viewBox', 'xmlns', 'xmlnsXlink',
                'fill', 'stroke', 'strokeWidth', 'strokeLinecap', 'strokeLinejoin',
                'strokeDasharray', 'strokeDashoffset', 'strokeMiterlimit',
                'opacity', 'transform', 'clipPath', 'mask', 'filter',
                'd', 'cx', 'cy', 'r', 'rx', 'ry',
                'x', 'y', 'x1', 'y1', 'x2', 'y2',
                'points', 'pathLength', 'preserveAspectRatio',
                'xlinkHref', 'href', 'offset', 'stopColor', 'stopOpacity',
                'gradientUnits', 'gradientTransform', 'spreadMethod',
                'markerEnd', 'markerMid', 'markerStart', 'textAnchor',
                'alignmentBaseline', 'baselineShift', 'dominantBaseline',
                'fontFamily', 'fontSize', 'fontStyle', 'fontWeight',
                'letterSpacing', 'textDecoration', 'wordSpacing'
              ]);

              // Copy only allowed props
              for (const key in props) {
                // Allow standard data-* attributes (with hyphen)
                if (key.startsWith('data-') && key.includes('-')) {
                  cleanedProps[key] = props[key];
                }
                // Allow aria-* attributes
                else if (key.startsWith('aria-')) {
                  cleanedProps[key] = props[key];
                }
                // Allow whitelisted props
                else if (allowedProps.has(key)) {
                  cleanedProps[key] = props[key];
                }
                // Skip all other props including dataName, dataAnything, etc.
              }

              // Recursively clean children
              const cleanedChildren = React.Children.map(cleanedProps.children, cleanElement);

              return React.cloneElement(element, {
                ...cleanedProps,
                children: cleanedChildren
              });
            } else {
              // For React components, just recursively clean children
              const cleanedChildren = React.Children.map(element.props.children, cleanElement);

              if (cleanedChildren !== element.props.children) {
                return React.cloneElement(element, {
                  ...element.props,
                  children: cleanedChildren
                });
              }

              return element;
            }
          };

          return cleanElement(rendered);
        }

        return rendered;
      } catch (error) {
        console.warn('Error rendering Undraw illustration:', error);
        return null;
      }
    };

    // Use suppressHydrationWarning to prevent React warnings about SVG attributes
    return (
      <div style={{ width: size, height: size }} suppressHydrationWarning>
        <CleanedComponent />
      </div>
    );
  }

  // Get kawaii character illustration
  private getKawaiiIllustration(theme: IllustrationTheme, index: number = 0): React.ReactElement | null {
    const mood = this.getRandomMood();
    const color = this.getThemeColor(theme);

    switch (theme) {
      case 'kawaii-cat':
        return <Cat size={100} mood={mood} color={color} />;
      case 'kawaii-ghost':
        return <Ghost size={100} mood={mood} color={color} />;
      case 'kawaii-planet':
        return <Planet size={100} mood={mood} color={color} />;
      case 'kawaii-icecream':
        return <IceCream size={100} mood={mood} color={color} />;
      case 'kawaii-backpack':
        return <Backpack size={100} mood={mood} color={color} />;
      case 'kawaii-mug':
        return <Mug size={100} mood={mood} color={color} />;
      case 'kawaii-browser':
        return <Browser size={100} mood={mood} color={color} />;
      case 'kawaii-chocolate':
        return <Chocolate size={100} mood={mood} color={color} />;
      default:
        return null;
    }
  }

  // Get educational theme illustration
  private getEducationalIllustration(theme: IllustrationTheme, index: number = 0): React.ReactElement | null {
    const color = this.getThemeColor(theme);

    // Try Undraw illustrations for educational themes
    switch (theme) {
      case 'learning':
        const learningComponents = [UndrawStudying, UndrawBackToSchool, UndrawFocus, UndrawBrainstorming];
        const LearningComponent = learningComponents[index % learningComponents.length];
        return this.SafeUndrawWrapper({ Component: LearningComponent, color });

      case 'teaching':
        const teachingComponents = [UndrawPresentation, UndrawMeeting, UndrawHiring, UndrawBusinessPlan];
        const TeachingComponent = teachingComponents[index % teachingComponents.length];
        return this.SafeUndrawWrapper({ Component: TeachingComponent, color });

      case 'reading':
        const readingComponents = [UndrawBookLover, UndrawArtLover, UndrawFocus];
        const ReadingComponent = readingComponents[index % readingComponents.length];
        return this.SafeUndrawWrapper({ Component: ReadingComponent, color });

      case 'science':
        const scienceComponents = [UndrawCharts, UndrawDataReport, UndrawNavigation];
        const ScienceComponent = scienceComponents[index % scienceComponents.length];
        return this.SafeUndrawWrapper({ Component: ScienceComponent, color });

      case 'math':
        const mathComponents = [UndrawCalculator, UndrawCharts, UndrawDataReport];
        const MathComponent = mathComponents[index % mathComponents.length];
        return this.SafeUndrawWrapper({ Component: MathComponent, color });

      case 'art':
        const artComponents = [UndrawDesigner, UndrawCreativity, UndrawArtLover, UndrawPhotos];
        const ArtComponent = artComponents[index % artComponents.length];
        return this.SafeUndrawWrapper({ Component: ArtComponent, color });

      case 'music':
        const musicComponents = [UndrawMusic, UndrawPodcast, UndrawRelaxation];
        const MusicComponent = musicComponents[index % musicComponents.length];
        return this.SafeUndrawWrapper({ Component: MusicComponent, color });

      case 'sports':
        const sportsComponents = [UndrawHealthyHabit, UndrawWorkout, UndrawYoga, UndrawBasketball, UndrawJogging];
        const SportsComponent = sportsComponents[index % sportsComponents.length];
        return this.SafeUndrawWrapper({ Component: SportsComponent, color });

      case 'nature':
        const natureComponents = [UndrawWeather, UndrawCampfire, UndrawRelaxation];
        const NatureComponent = natureComponents[index % natureComponents.length];
        return this.SafeUndrawWrapper({ Component: NatureComponent, color });

      case 'collaboration':
        const collabComponents = [UndrawCollaboration, UndrawFriendship, UndrawTogether, UndrawMeeting];
        const CollabComponent = collabComponents[index % collabComponents.length];
        return this.SafeUndrawWrapper({ Component: CollabComponent, color });

      case 'celebration':
        const celebrationComponents = [UndrawCelebration, UndrawGraduation, UndrawHappyBirthday, UndrawWelcome];
        const CelebrationComponent = celebrationComponents[index % celebrationComponents.length];
        return this.SafeUndrawWrapper({ Component: CelebrationComponent, color });

      case 'creativity':
        const creativityComponents = [UndrawCreativity, UndrawDesigner, UndrawBrainstorming, UndrawStartupLife];
        const CreativityComponent = creativityComponents[index % creativityComponents.length];
        return this.SafeUndrawWrapper({ Component: CreativityComponent, color });

      case 'family':
        const familyComponents = [UndrawFatherhood, UndrawMotherhood, UndrawTogether, UndrawWelcome];
        const FamilyComponent = familyComponents[index % familyComponents.length];
        return this.SafeUndrawWrapper({ Component: FamilyComponent, color });

      case 'childhood':
        const childhoodComponents = [UndrawYoungAndHappy, UndrawPlayfulCat, UndrawWelcome];
        const ChildhoodComponent = childhoodComponents[index % childhoodComponents.length];
        return this.SafeUndrawWrapper({ Component: ChildhoodComponent, color });

      case 'playtime':
        const playtimeComponents = [UndrawGaming, UndrawPlayfulCat, UndrawYoungAndHappy];
        const PlaytimeComponent = playtimeComponents[index % playtimeComponents.length];
        return this.SafeUndrawWrapper({ Component: PlaytimeComponent, color });

      case 'friendship':
        const friendshipComponents = [UndrawFriendship, UndrawYoungAndHappy, UndrawTogether];
        const FriendshipComponent = friendshipComponents[index % friendshipComponents.length];
        return this.SafeUndrawWrapper({ Component: FriendshipComponent, color });

      case 'gaming':
        const gamingComponents = [UndrawGaming, UndrawOnline, UndrawFocus];
        const GamingComponent = gamingComponents[index % gamingComponents.length];
        return this.SafeUndrawWrapper({ Component: GamingComponent, color });

      case 'outdoor':
        const outdoorComponents = [UndrawCampfire, UndrawWeather, UndrawJogging, UndrawBasketball];
        const OutdoorComponent = outdoorComponents[index % outdoorComponents.length];
        return this.SafeUndrawWrapper({ Component: OutdoorComponent, color });

      case 'wellness':
        const wellnessComponents = [UndrawHealthyHabit, UndrawYoga, UndrawWorkout, UndrawRelaxation];
        const WellnessComponent = wellnessComponents[index % wellnessComponents.length];
        return this.SafeUndrawWrapper({ Component: WellnessComponent, color });

      case 'birthday':
        const birthdayComponents = [UndrawHappyBirthday, UndrawCelebration];
        const BirthdayComponent = birthdayComponents[index % birthdayComponents.length];
        return this.SafeUndrawWrapper({ Component: BirthdayComponent, color });

      case 'digital':
        const digitalComponents = [UndrawOnline, UndrawBlogging, UndrawPodcast, UndrawCoding];
        const DigitalComponent = digitalComponents[index % digitalComponents.length];
        return this.SafeUndrawWrapper({ Component: DigitalComponent, color });

      case 'social':
        const socialComponents = [UndrawSocialMedia, UndrawInfluencer, UndrawSocialGrowth, UndrawBlogging];
        const SocialComponent = socialComponents[index % socialComponents.length];
        return this.SafeUndrawWrapper({ Component: SocialComponent, color });

      case 'video':
        const videoComponents = [UndrawPodcast, UndrawPhotos, UndrawOnline];
        const VideoComponent = videoComponents[index % videoComponents.length];
        return this.SafeUndrawWrapper({ Component: VideoComponent, color });

      case 'technology':
        const techComponents = [UndrawCoding, UndrawStartupLife, UndrawWorking, UndrawOnline];
        const TechComponent = techComponents[index % techComponents.length];
        return this.SafeUndrawWrapper({ Component: TechComponent, color });

      case 'discovery':
        const discoveryComponents = [UndrawNavigation, UndrawOnline, UndrawStartupLife];
        const DiscoveryComponent = discoveryComponents[index % discoveryComponents.length];
        return this.SafeUndrawWrapper({ Component: DiscoveryComponent, color });

      default:
        // Fallback to icons for themes without Undraw components
        return this.getIconIllustration(theme, index);
    }
  }

  // Get icon illustration
  private getIconIllustration(theme: IllustrationTheme, index: number = 0): React.ReactElement | null {
    const color = this.getThemeColor(theme);
    const icons = themeIcons[theme as keyof typeof themeIcons];

    if (icons && icons.length > 0) {
      const IconComponent = icons[index % icons.length];
      return (
        <div style={{
          width: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconComponent
            size={80}
            color={color}
            strokeWidth={1.5}
          />
        </div>
      );
    }

    // Final fallback to emojis
    const emojis = themeEmojis[theme as keyof typeof themeEmojis];
    if (emojis && emojis.length > 0) {
      const emoji = emojis[index % emojis.length];
      return (
        <div style={{
          width: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '64px'
        }}>
          {emoji}
        </div>
      );
    }

    return null;
  }

  // Get boring avatar illustration
  private getBoringAvatar(theme: IllustrationTheme, index: number = 0): React.ReactElement | null {
    const color = this.getThemeColor(theme);
    const variants = {
      'avatars-beam': 'beam',
      'avatars-marble': 'marble',
      'avatars-pixel': 'pixel',
      'avatars-sunset': 'sunset',
      'avatars-ring': 'ring',
      'avatars-bauhaus': 'bauhaus'
    };

    const variant = variants[theme as keyof typeof variants] || 'beam';
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
    const name = names[index % names.length];

    return (
      <BoringAvatar
        size={100}
        name={name}
        variant={variant as any}
        colors={[color, this.getRandomColor(), this.getRandomColor(), this.getRandomColor()]}
      />
    );
  }

  // Get nice avatar illustration
  private getNiceAvatar(theme: IllustrationTheme, index: number = 0): React.ReactElement | null {
    const color = this.getThemeColor(theme);
    const configs = {
      'nice-avatar-boy': { sex: 'man', hairStyle: 'normal', hatStyle: 'none' },
      'nice-avatar-girl': { sex: 'woman', hairStyle: 'womanLong', hatStyle: 'none' },
      'nice-avatar-teacher': { sex: 'woman', hairStyle: 'womanShort', glassesStyle: 'round' }
    };

    const config = configs[theme as keyof typeof configs] || { sex: 'man', hairStyle: 'normal' };
    const finalConfig = genConfig(config as any);

    return (
      <Avatar
        style={{ width: '100px', height: '100px' }}
        {...finalConfig}
      />
    );
  }

  // Get GitHub fun illustration (SVG)
  private getGitHubFunIllustration(theme: IllustrationTheme): React.ReactElement | null {
    const svgString = FunIllustrations[theme as keyof typeof FunIllustrations];
    if (!svgString) return null;

    return (
      <div dangerouslySetInnerHTML={{ __html: svgString }} />
    );
  }

  // Main method to get illustration for a theme
  getThemeIllustration(theme: IllustrationTheme, index: number = 0): React.ReactElement | null {
    // Handle random and mixed themes
    if (theme === 'random') {
      const allThemes = this.getAvailableThemes()
        .filter(t => t.value !== 'random' && t.value !== 'mixed' && t.value !== 'surprise')
        .map(t => t.value as IllustrationTheme);
      theme = this.getRandomElement(allThemes);
    }

    if (theme === 'mixed') {
      // Mix between different types randomly
      const mixChoice = Math.random();
      if (mixChoice < 0.25) {
        // Choose a kawaii character
        const kawaiiThemes: IllustrationTheme[] = [
          'kawaii-cat', 'kawaii-ghost', 'kawaii-planet', 'kawaii-icecream',
          'kawaii-backpack', 'kawaii-mug', 'kawaii-browser', 'kawaii-chocolate'
        ];
        theme = this.getRandomElement(kawaiiThemes);
      } else if (mixChoice < 0.5) {
        // Choose an educational theme with Undraw
        const educationalThemes: IllustrationTheme[] = [
          'learning', 'teaching', 'reading', 'science', 'math',
          'collaboration', 'celebration', 'creativity', 'art', 'music', 'sports',
          'nature', 'family', 'childhood', 'playtime', 'friendship'
        ];
        theme = this.getRandomElement(educationalThemes);
      } else if (mixChoice < 0.75) {
        // Choose an avatar theme
        const avatarThemes: IllustrationTheme[] = [
          'avatars-beam', 'avatars-marble', 'avatars-pixel', 'avatars-sunset',
          'avatars-ring', 'avatars-bauhaus', 'nice-avatar-boy', 'nice-avatar-girl',
          'nice-avatar-teacher'
        ];
        theme = this.getRandomElement(avatarThemes);
      } else {
        // Choose an activity or digital theme
        const activityThemes: IllustrationTheme[] = [
          'gaming', 'outdoor', 'wellness', 'birthday', 'digital', 'social', 'video'
        ];
        theme = this.getRandomElement(activityThemes);
      }
    }

    if (theme === 'surprise') {
      // Completely random selection with weighted distribution
      const surpriseChoice = Math.random();
      if (surpriseChoice < 0.4) {
        // 40% chance for educational/activity themes
        return this.getEducationalIllustration(
          this.getRandomElement(['learning', 'teaching', 'playtime', 'art', 'music', 'sports']),
          index
        );
      } else if (surpriseChoice < 0.6) {
        // 20% chance for kawaii
        return this.getKawaiiIllustration(
          this.getRandomElement(['kawaii-cat', 'kawaii-ghost', 'kawaii-planet', 'kawaii-icecream']),
          index
        );
      } else if (surpriseChoice < 0.8) {
        // 20% chance for avatars
        return Math.random() > 0.5
          ? this.getBoringAvatar(
              this.getRandomElement(['avatars-beam', 'avatars-marble', 'avatars-pixel']),
              index
            )
          : this.getNiceAvatar(
              this.getRandomElement(['nice-avatar-boy', 'nice-avatar-girl', 'nice-avatar-teacher']),
              index
            );
      } else {
        // 20% chance for icons
        return this.getIconIllustration('discovery', index);
      }
    }

    // Check if it's a kawaii theme
    if (theme.startsWith('kawaii-')) {
      return this.getKawaiiIllustration(theme, index);
    }

    // Check if it's a boring avatar theme
    if (theme.startsWith('avatars-')) {
      return this.getBoringAvatar(theme, index);
    }

    // Check if it's a nice avatar theme
    if (theme.startsWith('nice-avatar-')) {
      return this.getNiceAvatar(theme, index);
    }

    // Check if it's a GitHub fun illustration
    const githubIllustrations = ['watermelon', 'pineapple', 'sunglasses', 'pencil', 'book', 'star', 'maple'];
    if (githubIllustrations.includes(theme)) {
      return this.getGitHubFunIllustration(theme);
    }

    // Otherwise, it's an educational/activity theme
    return this.getEducationalIllustration(theme, index);
  }

  // Get smart illustration based on content keywords
  getSmartIllustration(keywords: string[], index: number = 0): React.ReactElement | null {
    const keywordLower = keywords.join(' ').toLowerCase();

    // Map keywords to themes
    if (keywordLower.includes('math') || keywordLower.includes('calcul') || keywordLower.includes('nombre')) {
      return this.getThemeIllustration('math', index);
    }
    if (keywordLower.includes('science') || keywordLower.includes('expérience') || keywordLower.includes('découv')) {
      return this.getThemeIllustration('science', index);
    }
    if (keywordLower.includes('lire') || keywordLower.includes('lecture') || keywordLower.includes('livre')) {
      return this.getThemeIllustration('reading', index);
    }
    if (keywordLower.includes('art') || keywordLower.includes('dessin') || keywordLower.includes('couleur')) {
      return this.getThemeIllustration('art', index);
    }
    if (keywordLower.includes('musique') || keywordLower.includes('chanson') || keywordLower.includes('son')) {
      return this.getThemeIllustration('music', index);
    }
    if (keywordLower.includes('sport') || keywordLower.includes('exercice') || keywordLower.includes('jeu')) {
      return this.getThemeIllustration('sports', index);
    }
    if (keywordLower.includes('nature') || keywordLower.includes('animal') || keywordLower.includes('plante')) {
      return this.getThemeIllustration('nature', index);
    }
    if (keywordLower.includes('équipe') || keywordLower.includes('ensemble') || keywordLower.includes('groupe')) {
      return this.getThemeIllustration('collaboration', index);
    }

    // Default to learning theme
    return this.getThemeIllustration('learning', index);
  }
}

// Export singleton instance
const CombinedIllustrationServiceInstance = new CombinedIllustrationService();
export default CombinedIllustrationServiceInstance;