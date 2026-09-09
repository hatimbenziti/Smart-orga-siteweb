import React from 'react';
import { instagramPosts } from '../data/instagram';
import { Instagram, MapPin } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-pink-600 uppercase mb-2">
            <Instagram className="w-4 h-4" />
            <span>@smart_orga • Instagram Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Instants de Bonheur Capturés
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Suivez nos aventures régulières en temps réel sur les réseaux sociaux.
          </p>
        </div>

        {/* Grille des publications issues du CMS */}
        {instagramPosts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPosts.map((post, index) => (
              <a
                key={post.id || index}
                href={post.post_url || 'https://www.instagram.com/smart_orga/'}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden aspect-square bg-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={post.image}
                  alt={post.caption || 'Instagram Post'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                  {post.location && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-pink-300 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{post.location}</span>
                    </span>
                  )}
                  {post.caption && (
                    <p className="text-xs line-clamp-2 font-medium leading-snug">
                      {post.caption}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80">
            <Instagram className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-500">
              Aucun instant Instagram publié pour le moment.
            </p>
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href="https://www.instagram.com/smart_orga/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
          >
            <Instagram className="w-4 h-4" />
            <span>Suivez-nous sur Instagram @smart_orga</span>
          </a>
        </div>
      </div>
    </section>
  );
};
