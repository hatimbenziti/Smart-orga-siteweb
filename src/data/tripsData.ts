import { Trip } from '../types';

// --- CONFIGURATION WHATSAPP ---
export const WHATSAPP_NUMBER = "212600000000";
export const WHATSAPP_DISPLAY = "+212 6 00 00 00 00";

// --- HERO SLIDES ---
export const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70",
    title: "Aventures Uniques au Maroc",
    subtitle: "Découvrez nos destinations exclusives"
  }
];

// --- FAQ DATA ---
export const FAQ_DATA = [
  {
    question: "Comment effectuer une réservation ?",
    questionAr: "كيف يمكنني إجراء الحجز؟",
    answer: "Vous pouvez réserver directement via notre site ou par WhatsApp.",
    answerAr: "يمكنك الحجز مباشرة عبر موقعنا أو عبر الواتساب."
  }
];

// --- VOYAGES & DÉPLACEMENTS (DECAP CMS) ---
const modules = import.meta.glob([
  '/content/voyages/*.json',
  '/content/trips/*.json',
  '../../content/voyages/*.json',
  '../../content/trips/*.json'
], { eager: true });

export const trips: Trip[] = Object.values(modules).map((file: any) => {
  const data = file.default || file;
  return {
    id: data.id || (data.title ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : Math.random().toString()),
    title: data.title || '',
    titleAr: data.titleAr || '',
    destination: data.destination || '',
    destinationAr: data.destinationAr || '',
    region: data.region || 'Maroc',
    priceMAD: Number(data.priceMAD || data.price || 0),
    days: Number(data.days || 1),
    duration: data.duration || `${data.days || 1} Jours`,
    image: data.image || '',
    groupSize: data.groupSize || 'Flexible',
    departureCities: Array.isArray(data.departureCities) ? data.departureCities : [],
    highlights: Array.isArray(data.highlights) ? data.highlights : [],
    included: Array.isArray(data.included) ? data.included : [],
    notIncluded: Array.isArray(data.notIncluded) ? data.notIncluded : [],
    itinerary: Array.isArray(data.itinerary) ? data.itinerary : []
  };
});

export const tripsData = trips;
export default trips;
