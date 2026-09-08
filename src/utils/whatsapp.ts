import { WHATSAPP_NUMBER } from '../data/tripsData';

export const createGeneralWhatsAppUrl = (lang: string = 'fr') => {
  const text = lang === 'ar' 
    ? "مرحباً، أود الحصول على مزيد من المعلومات حول رحلاتكم."
    : "Bonjour, je souhaite avoir plus d'informations sur vos voyages.";
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
};

export const createTripWhatsAppUrl = (trip: any, lang: string = 'fr') => {
  // Sécurisation du prix pour éviter le crash
  const priceFormatted = trip?.price != null ? Number(trip.price).toLocaleString() : '0';
  const title = trip?.title || 'Voyage';

  if (lang === 'ar') {
    const text = `مرحباً Smart Orga،\nأود حجز الرحلة التالية:\n- **${title}**\n- السعر: ${priceFormatted} درهم / للشخص`;
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  }

  const text = `Bonjour Smart Orga,\nJe souhaite réserver le séjour suivant :\n- **${title}**\n- Tarif : ${priceFormatted} DH / personne`;
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
};
