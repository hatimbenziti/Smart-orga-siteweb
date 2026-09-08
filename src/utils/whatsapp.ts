import { WHATSAPP_NUMBER } from '../data/tripsData';

// Sécurisation du numéro
const cleanPhoneNumber = (phone: any) => (typeof phone === 'string' ? phone.replace(/[^0-9]/g, '') : '');

/**
 * Message générique
 */
export const createGeneralWhatsAppUrl = (lang: any = 'fr'): string => {
  const isAr = lang === 'ar';
  const text = isAr 
    ? "مرحباً، أود الحصول على مزيد من المعلومات حول رحلاتكم."
    : "Bonjour, je souhaite avoir plus d'informations sur vos voyages.";
    
  return `https://wa.me/${cleanPhoneNumber(WHATSAPP_NUMBER)}?text=${encodeURIComponent(text)}`;
};

/**
 * Message rapide de réservation
 */
export const createTripWhatsAppUrl = (trip: any, lang: any = 'fr'): string => {
  const isAr = lang === 'ar';
  const priceFormatted = trip?.price != null ? Number(trip.price).toLocaleString() : '0';
  const title = trip?.title || trip?.name || 'Voyage';

  const text = isAr
    ? `مرحباً Smart Orga،\nأود حجز الرحلة التالية:\n- ${title}\n- السعر: ${priceFormatted} درهم / للشخص`
    : `Bonjour Smart Orga,\nJe souhaite réserver le séjour suivant :\n- ${title}\n- Tarif : ${priceFormatted} DH / personne`;

  return `https://wa.me/${cleanPhoneNumber(WHATSAPP_NUMBER)}?text=${encodeURIComponent(text)}`;
};

/**
 * Message complet du formulaire (Signature ultra-flexible)
 */
export const createFormBookingWhatsAppUrl = (
  trip: any, 
  formData?: any, 
  lang?: any
): string => {
  const isAr = lang === 'ar' || formData === 'ar';
  const data = typeof formData === 'object' ? formData : {};

  const title = trip?.title || trip?.name || 'Voyage';
  const name = data?.name || 'Non renseigné';
  const travelers = data?.travelers || data?.guests || 1;
  const date = data?.date || 'Non spécifiée';
  const notes = data?.notes ? `\n- Notes: ${data.notes}` : '';

  let text = '';

  if (isAr) {
    text = `مرحباً فريق Smart Orga،\n\nأود حجز الرحلة التالية:\n- الرحلة: ${title}\n- الاسم: ${name}\n- عدد المسافرين: ${travelers}\n- التاريخ المفصل: ${date}${notes}\n\nهل يمكنك تأكيد التوفر وإجراءات الحجز؟ شكراً!`;
  } else {
    text = `Bonjour l'équipe Smart Orga,\n\nJe souhaite réserver la prestation suivante :\n- Voyage : ${title}\n- Nom : ${name}\n- Nombre de voyageurs : ${travelers}\n- Date souhaitée : ${date}${notes}\n\nPourriez-vous me confirmer la disponibilité et les détails de réservation ? Merci !`;
  }

  return `https://wa.me/${cleanPhoneNumber(WHATSAPP_NUMBER)}?text=${encodeURIComponent(text)}`;
};

// Aliases au cas où d'autres composants réclament un nom légèrement différent
export const createBookingWhatsAppUrl = createFormBookingWhatsAppUrl;
export const getWhatsAppUrl = createFormBookingWhatsAppUrl;
