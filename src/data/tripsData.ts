import { Trip } from '../types';

// Tableau vide pour supprimer les voyages de démo
export const tripsData: Trip[] = [];

// Exporter la variable par défaut au cas où elle est importée sous un autre nom
export default tripsData;

// Garder les fonctions utilitaires pour éviter d'interrompre la compilation TypeScript
export const getTripById = (id: string): Trip | undefined => {
  return tripsData.find((trip) => trip.id === id);
};

export const getFeaturedTrips = (): Trip[] => {
  return tripsData.filter((trip) => trip.featured);
};
