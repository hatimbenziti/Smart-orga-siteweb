import { Trip } from '../types';

// Utilisation d'un chemin relatif strict pour éviter les échecs de résolution Vite
const modules = import.meta.glob('../../content/voyages/*.json', { eager: true });

export const trips: Trip[] = Object.values(modules).map((file: any) => {
  const data = file.default || file;
  return {
    id: data.id || Math.random().toString(),
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
