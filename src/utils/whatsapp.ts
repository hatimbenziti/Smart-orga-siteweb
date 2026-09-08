import { WHATSAPP_NUMBER } from '../data/tripsData';

// Helper interne pour nettoyer le numéro de téléphone
const cleanPhoneNumber = (phone: string) => (phone || '').replace(/[^0-9]/g, '');

/**
 * Message générique d'information
 */
export const createGeneralWhatsAppUrl = (lang: string = 'fr'): string => {
  const text = lang === 'ar' 
    ? "مرحباً، أود الحصول على مزيد من المعلومات حول رحلاتكم."
    : "Bonjour, je souhaite avoir plus d'informations sur vos voyages.";
    
  return `https://wa.me/${cleanPhoneNumber(WHATSAPP_NUMBER)}?text=${encodeURIComponent(text)}`;
};

/**
 * Message de réservation rapide d'un voyage
 */
export const createTripWhatsAppUrl = (trip: any, lang: string = 'fr'): string => {
  const priceFormatted = trip?.price != null ? Number(trip.price).toLocaleString() : '0';
  const title = trip?.title || trip?.name || 'Voyage';

  const text = lang === 'ar'
    ? `مرحباً Smart Orga،\nأود حجز الرحلة التالية:\n- ${title}\n- السعر: ${priceFormatted} درهم / للشخص`
    : `Bonjour Smart Orga,\nJe souhaite réserver le séjour suivant :\n- ${title}\n- Tarif : ${priceFormatted} DH / personne`;

  return `https://wa.me/${cleanPhoneNumber(WHATSAPP_NUMBER)}?text=${encodeURIComponent(text)}`;
};

/**
 * Message complet du formulaire de réservation (C'est la fonction manquante qui bloquait le Build Netlify)
 */
export const createFormBookingWhatsAppUrl = (
  trip: any, 
  formData: { name?: string; phone?: string; travelers?: number; date?: string; notes?: string }, 
  lang: string = 'fr'
): string => {
  const title = trip?.title || trip?.name || 'Voyage';
  const name = formData?.name || 'Non renseigné';
  const travelers = formData?.travelers || 1;
  const date = formData?.date || 'Non spécifiée';
  const notes = formData?.notes ? `\n- Notes: ${formData.notes}` : '';

  let text = '';

  if (lang === 'ar') {
    text = `مرحباً فريق Smart Orga،\n\nأود حجز الرحلة التالية:\n- الرحلة: ${title}\n- الاسم: ${name}\n- عدد المسافرين: ${travelers}\n- التاريخ المفصل: ${date}${notes}\n\nهل يمكنك تأكيد التوفر وإجراءات الحجز؟ شكراً!`;
  } else {
    text = `Bonjour l'équipe Smart Orga,\n\nJe souhaite réserver la prestation suivante :\n- Voyage : ${title}\n- Nom : ${name}\n- Nombre de voyageurs : ${travelers}\n- Date souhaitée : ${date}${notes}\n\nPourriez-vous me confirmer la disponibilité et les détails de réservation ? Merci !`;
  }

  return `https://wa.me/${cleanPhoneNumber(WHATSAPP_NUMBER)}?text=${encodeURIComponent(text)}`;
};
