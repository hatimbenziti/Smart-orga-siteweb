import { Trip } from '../types';

// Importation dynamique de tous les fichiers .json créés par Decap CMS dans content/voyages/ ou content/trips/
const cmsTripModules = import.meta.glob([
  '../../content/voyages/*.json',
  '../../content/trips/*.json',
  '../content/voyages/*.json',
  '../content/trips/*.json'
], { eager: true });

// Extraction et normalisation des données issues du CMS
const loadedCmsTrips: Trip[] = Object.values(cmsTripModules).map((fileModule: any) => {
  const data = fileModule.default || fileModule;

  return {
    id: data.id || (data.title ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `trip-${Math.random()}`),
    title: data.title || 'Voyage sans titre',
    titleAr: data.titleAr || data.title || '',
    destination: data.destination || 'Maroc',
    destinationAr: data.destinationAr || data.destination || '',
    region: data.region || 'Maroc',
    priceMAD: Number(data.priceMAD || data.price || 0),
    originalPriceMAD: data.originalPriceMAD || data.originalPrice ? Number(data.originalPriceMAD || data.originalPrice) : undefined,
    days: Number(data.days || data.duration || 1),
    duration: data.duration || `${data.days || 1} Jours`,
    durationAr: data.durationAr || '',
    image: data.image || 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70',
    groupSize: data.groupSize || 'Flexible',
    departureCities: Array.isArray(data.departureCities) ? data.departureCities : ['Toutes les villes'],
    highlights: Array.isArray(data.highlights) ? data.highlights : [],
    included: Array.isArray(data.included) ? data.included : [],
    notIncluded: Array.isArray(data.notIncluded) ? data.notIncluded : [],
    itinerary: Array.isArray(data.itinerary) ? data.itinerary : []
  };
});

// Tableau d'export final : utilise les données CMS s'il y en a, sinon fallback sur un tableau vide
export const trips: Trip[] = loadedCmsTrips.length > 0 ? loadedCmsTrips : [];

export default trips;
