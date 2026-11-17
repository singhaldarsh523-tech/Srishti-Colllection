import { useState } from 'react';
import { Check, Copy, MessageCircle, Phone, Sparkles } from 'lucide-react';
import {
  BOUTIQUE_CONTACT,
  Product,
  buildWhatsAppUrl,
} from '../data/boutiqueData';

interface ContactSectionProps {
  products: Product[];
}

export function ContactSection({ products }: ContactSectionProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedOutfit, setSelectedOutfit] = useState(
    products[0]?.name || 'Salwar Suits & Sarees'
  );
  const [inquiryNote, setInquiryNote] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);

  const composedMessage = [
    `Hello Srishti Collection!`,
    customerName.trim() ? `My name is ${customerName.trim()}.` : '',
    customerPhone.trim() ? `Phone: ${customerPhone.trim()}.` : '',
    `I am interested in: ${selectedOutfit}.`,
    inquiryNote.trim()
      ? `Message: ${inquiryNote.trim()}`
      : `Please share sizing, availability, and customisation details.`,
  ]
    .filter(Boolean)
    .join(' ');

  const whatsappDirectLink = buildWhatsAppUrl(composedMessage);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(BOUTIQUE_CONTACT.phoneDisplay);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // Clipboard API fallback ignored
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 border-t border-[#E5E0D8] bg-[#FAF9F6]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Direct Phone & WhatsApp Concierge */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#8C1D2D]">
                Personal Boutique Concierge
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917] mt-2 text-balance">
                Connect Directly on WhatsApp or Phone
              </h2>
              <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#57534E]">
                Need live fabric videos, custom salwar measurements, or bulk bridal styling? Reach Srishti Collection directly—every saree, kurti, and salwar suit is curated and imported from our partner weavers in Kolkata, Jaipur, and Surat.
              </p>

              {/* Phone & WhatsApp Direct Cards */}
              <div className="mt-8 space-y-4">
                <div className="p-5 bg-white border border-[#E5E0D8] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-[#57534E]">Direct Boutique Phone</p>
                    <a
                      href={BOUTIQUE_CONTACT.phoneHref}
                      className="text-xl font-semibold text-[#1C1917] hover:text-[#8C1D2D] transition-colors tabular-nums mt-0.5 inline-block"
                    >
                      {BOUTIQUE_CONTACT.phoneDisplay}
                    </a>
                    <p className="text-xs text-[#57534E] mt-1">{BOUTIQUE_CONTACT.hours}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      aria-label="Copy phone number"
                      className="h-10 px-3 border border-[#E5E0D8] hover:border-[#1C1917] bg-[#FAF9F6] text-xs font-medium text-[#1C1917] rounded-md inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      {copiedPhone ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#15803D]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <a
                      href={BOUTIQUE_CONTACT.phoneHref}
                      className="h-10 px-4 bg-[#1C1917] hover:bg-[#332E2A] text-white text-xs font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#E5E0D8] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-[#57534E]">Instant WhatsApp Styling Desk</p>
                    <p className="text-base font-semibold text-[#1C1917] mt-0.5 tabular-nums">
                      WhatsApp {BOUTIQUE_CONTACT.phoneDisplay}
                    </p>
                    <p className="text-xs text-[#57534E] mt-1">
                      Video call previews · Custom fitting · Dispatch tracking
                    </p>
                  </div>

                  <a
                    href={buildWhatsAppUrl(
                      'Hello Srishti Collection! I would like assistance choosing a saree, kurti, or salwar suit.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-colors shrink-0 whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E0D8] space-y-1.5 text-xs text-[#57534E]">
              <p className="font-semibold text-[#1C1917]">
                Flagship Boutique: {BOUTIQUE_CONTACT.address}
              </p>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8C1D2D] shrink-0" />
                <span>
                  Direct sourcing hubs: Kolkata Handloom Houses · Jaipur Craft Ateliers · Surat Zari Studios
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Custom WhatsApp Message Composer */}
          <div className="lg:col-span-7 bg-white border border-[#E5E0D8] rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                Send a Direct WhatsApp Enquiry
              </h3>
              <p className="text-sm text-[#57534E] mt-1.5">
                Fill in your preferences below to open a pre-filled WhatsApp chat directly with our boutique phone ({BOUTIQUE_CONTACT.phoneDisplay}).
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[#57534E] mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Nidhi Verma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-medium text-[#57534E] mb-1.5"
                  >
                    Your Phone / WhatsApp Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="e.g. +91 98XXX XXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D] tabular-nums"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-outfit"
                    className="block text-xs font-medium text-[#57534E] mb-1.5"
                  >
                    Outfit or Suit You Are Enquiring About
                  </label>
                  <select
                    id="contact-outfit"
                    value={selectedOutfit}
                    onChange={(e) => setSelectedOutfit(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                  >
                    <option value="General Collection (Sarees, Kurtis & Salwar Suits)">
                      General Collection (Sarees, Kurtis & Salwar Suits)
                    </option>
                    {products.map((product) => (
                      <option key={product.id} value={`${product.name} (${product.craftOrigin})`}>
                        {product.name} — {product.craftOrigin}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-note"
                    className="block text-xs font-medium text-[#57534E] mb-1.5"
                  >
                    Message (Size, Occasion, or Custom Request)
                  </label>
                  <textarea
                    id="contact-note"
                    rows={3}
                    placeholder="Tell us your preferred size, delivery date, or ask for a WhatsApp video preview..."
                    value={inquiryNote}
                    onChange={(e) => setInquiryNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-[#57534E]">
                Connects directly to WhatsApp {BOUTIQUE_CONTACT.phoneDisplay}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={BOUTIQUE_CONTACT.phoneHref}
                  className="h-11 px-4 border border-[#E5E0D8] hover:border-[#1C1917] text-[#1C1917] text-xs font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Boutique</span>
                </a>

                <a
                  href={whatsappDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-6 bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
