import { Trip } from '../types';

// Constantes requises pour WhatsApp
export const WHATSAPP_NUMBER = '212600000000';
export const WHATSAPP_DISPLAY = '+212 6 00 00 00 00';

// Liste des voyages vide (supprime les voyages de démo)
export const tripsData: Trip[] = [];
export const TRIPS_DATA: Trip[] = [];

// Fonctions utilitaires
export const getTripById = (id: string): Trip | undefined => {
  return tripsData.find((trip) => trip.id === id);
};

export const getFeaturedTrips = (): Trip[] => {
  return tripsData.filter((trip) => trip.featured);
};

export default tripsData;
