import React from 'react';
import { Trip } from '../types';
import { Calendar, MapPin, Users, Clock, CheckCircle } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
  onSelect: (trip: Trip) => void;
  onBook: (trip: Trip) => void;
}

// Nettoyage des chemins d'images générés par Decap CMS
const formatImagePath = (path?: string) => {
  if (!path) return 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80';
  if (path.startsWith('public/')) return path.replace('public/', '/');
  if (!path.startsWith('/') && !path.startsWith('http')) return `/${path}`;
  return path;
};

export const TripCard: React.FC<TripCardProps> = ({ trip, onSelect, onBook }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      {/* Container Image */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={formatImagePath(trip.image)}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold">
            {trip.region || 'Maroc'}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {trip.duration || `${trip.days || 1} Jours`}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{trip.destination}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {trip.title}
        </h3>

        {/* Date / Information de départ */}
        <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl mb-4">
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4 text-emerald-600" />
            {(trip as any).nextDeparture || (trip as any).date || 'Départs chaque semaine'}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Users className="w-3.5 h-3.5" />
            {trip.groupSize || 'Flexible'}
          </span>
        </div>

        {/* Points forts */}
        {trip.highlights && trip.highlights.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Points Forts :</p>
            <ul className="space-y-1">
              {trip.highlights.slice(0, 2).map((h, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5 truncate">
                  <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span className="truncate">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prix & Boutons */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xl font-extrabold text-slate-900">
              {trip.priceMAD ? trip.priceMAD.toLocaleString() : 'Sur devis'} <span className="text-xs font-semibold text-slate-500">MAD</span>
            </div>
            <span className="text-[10px] text-slate-400 block">Par personne • Tout compris</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onSelect(trip)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Programme
            </button>
            <button
              onClick={() => onBook(trip)}
              className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
