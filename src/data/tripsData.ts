export const WHATSAPP_NUMBER = '+212690060366';
export const WHATSAPP_DISPLAY = '+212 690-060366';

export interface Trip {
  id: string;
  title: string;
  subtitle: string;
  category: 'Désert & Dunes' | 'Plages & Surf' | 'Villes Impériales' | 'Nature & Randonnée';
  price: number;
  originalPrice?: number;
  duration: string;
  image: string;
  isPopular?: boolean;
  rating: number;
  reviewsCount: number;
  highlights: string[];
}

export const DEFAULT_TRIPS: Trip[] = [
  {
    id: 'merzouga-desert',
    title: 'Magie du Désert de Merzouga & Gorges du Dadès',
    subtitle: 'Merzouga & Sud Marocain',
    category: 'Désert & Dunes',
    price: 1450,
    originalPrice: 1750,
    duration: '3 jours / 2 nuits',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    rating: 4.9,
    reviewsCount: 142,
    highlights: [
      'Nuitée en bivouac de luxe au cœur des dunes de l\'Erg Chebbi',
      'Balade à dos de dromadaire au coucher et lever du soleil',
      'Soirée animée autour du feu de camp avec musiciens sahraouis'
    ]
  },
  {
    id: 'dakhla-lagoon',
    title: 'Échappée Sauvage à Dakhla & Lagon Blanc',
    subtitle: 'Dakhla & Sahara Océanique',
    category: 'Plages & Surf',
    price: 2950,
    originalPrice: 3400,
    duration: '4 jours / 3 nuits',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    rating: 5.0,
    reviewsCount: 98,
    highlights: [
      'Excursion en 4x4 vers la Dune Blanche et le lagon',
      'Dégustation d\'huîtres fraîches au parc ostréicole',
      'Baignade à la source thermale d\'Asnaa (38°C sous le sable)'
    ]
  },
  {
    id: 'chefchaouen-tanger',
    title: 'Chefchaouen la Perle Bleue & Cap Spartel Tanger',
    subtitle: 'Chefchaouen & Tanger',
    category: 'Villes Impériales',
    price: 950,
    originalPrice: 1150,
    duration: '2 jours / 1 nuit',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    rating: 4.8,
    reviewsCount: 215,
    highlights: [
      'Flânerie magique dans les ruelles azurées de la médina',
      'Coucher de soleil inoubliable depuis la Mosquée Espagnole',
      'Visite des Grottes d\'Hercule et du mythique Cap Spartel'
    ]
  }
];

const loadCmsTrips = (): Trip[] => {
  try {
    const globFiles = import.meta.glob<Record<string, any>>(
      [
        '/src/content/trips/*.json',
        '/content/trips/*.json',
        '/src/data/trips/*.json'
      ],
      { eager: true }
    );

    const items: Trip[] = [];
    Object.entries(globFiles).forEach(([, content], idx) => {
      const data = content.default || content;
      if (data && data.title) {
        items.push({
          id: data.id || `cms-trip-${idx}`,
          title: data.title,
          subtitle: data.subtitle || 'Maroc',
          category: data.category || 'Désert & Dunes',
          price: Number(data.price) || 1000,
          originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
          duration: data.duration || '2 jours / 1 nuit',
          image: data.image || DEFAULT_TRIPS[0].image,
          isPopular: data.isPopular ?? true,
          rating: Number(data.rating) || 4.9,
          reviewsCount: Number(data.reviewsCount) || 50,
          highlights: Array.isArray(data.highlights) ? data.highlights : ['Circuit guidé grand confort']
        });
      }
    });

    return items;
  } catch (e) {
    return [];
  }
};

const cmsList = loadCmsTrips();
export const tripsData: Trip[] = cmsList.length > 0 ? [...cmsList, ...DEFAULT_TRIPS] : DEFAULT_TRIPS;
