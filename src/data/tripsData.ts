import { Trip } from '../types';

// Numéro requis par src/utils/whatsapp.ts (remplacez par votre vrai numéro si besoin)
export const WHATSAPP_NUMBER = '212600000000';

// Liste des voyages vide (supprime les 8 voyages de démo)
export const tripsData: Trip[] = [];

// Export par défaut au cas où
export default tripsData;

// Helpers utilitaires
export const getTripById = (id: string): Trip | undefined => {
  return tripsData.find((trip) => trip.id === id);
};

export const getFeaturedTrips = (): Trip[] => {
  return tripsData.filter((trip) => trip.featured);
};
