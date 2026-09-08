import { Trip } from '../types';

// Vider le tableau des voyages
export const tripsData: Trip[] = [];

// Garder les helpers pour éviter les erreurs de compilation dans le reste du site
export const getTripById = (id: string): Trip | undefined => {
  return tripsData.find((trip) => trip.id === id);
};

export const getFeaturedTrips = (): Trip[] => {
  return tripsData.filter((trip) => trip.featured);
};
