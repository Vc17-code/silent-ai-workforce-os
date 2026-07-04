export const WHATSAPP_NUMBER = '+61 432 751 093';
export const WHATSAPP_NUMBER_RAW = '61432751093';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER_RAW}`;

export function whatsAppUrl(message?: string): string {
  if (!message) return WHATSAPP_URL;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_PASSKEY_MESSAGE =
  'Hi, I would like to request an access passkey for AI Report Generator.';

export const WHATSAPP_SUBSCRIPTION_MESSAGE =
  'Hi, I would like to enquire about a subscription plan for AI Report Generator.';
