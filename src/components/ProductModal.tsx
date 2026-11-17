import { useEffect, useState } from 'react';
import { Check, Heart, MessageCircle, Minus, Phone, Plus, Ruler, ShieldCheck, X } from 'lucide-react';
import {
  BOUTIQUE_CONTACT,
  Product,
  buildWhatsAppUrl,
  formatINR,
} from '../data/boutiqueData';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: Product | null;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export function ProductModal({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'Standard');
      setQuantity(1);
      setAddedFeedback(false);
      setShowSizeGuide(false);
    }
  }, [product]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSizeGuide) {
          setShowSizeGuide(false);
        } else {
          onClose();
        }
      }
    };
    if (product) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [product, onClose, showSizeGuide]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 1600);
  };

  const whatsappInquiryUrl = buildWhatsAppUrl(
    `Hello Srishti Collection! I would like to enquire about "${product.name}" (${product.craftOrigin}, Option: ${selectedSize}, Price: ${formatINR(product.price)}).`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1917]/60 backdrop-blur-xs animate-backdrop-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {onToggleWishlist && (
            <button
              type="button"
              onClick={() => onToggleWishlist(product)}
              aria-pressed={isWishlisted}
              aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
              className="w-10 h-10 rounded-full bg-[#FAF9F6]/95 border border-[#E5E0D8] flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1EC] transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted ? 'fill-[#8C1D2D] text-[#8C1D2D] animate-heart-pop' : 'text-[#1C1917]'
                }`}
              />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close outfit details"
            className="w-10 h-10 rounded-full bg-[#FAF9F6]/95 border border-[#E5E0D8] flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1EC] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Left: High-Resolution Studio Outfit Image */}
        <div className="md:w-1/2 bg-[#F3F1EC] shrink-0 aspect-[3/4] md:aspect-auto md:max-h-[90vh]">
          <ResilientImage
            src={product.image}
            alt={product.name}
            fallbackTitle={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.craftOrigin}</span>
              {product.secondaryNote && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#8C1D2D] font-medium">{product.secondaryNote}</span>
                </>
              )}
            </div>

            <h2
              id="pdp-title"
              className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917] mt-2 leading-tight text-balance"
            >
              {product.name}
            </h2>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-semibold text-[#1C1917] tabular-nums">
                {formatINR(product.price)}
              </span>
              <span className="text-xs text-[#57534E]">Inclusive of all taxes</span>
            </div>

            <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#57534E]">
              {product.description}
            </p>

            {/* Size / Draping / Unstitched Selection */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-medium text-[#1C1917] mb-2.5">
                <span>
                  {product.category === 'Sarees'
                    ? 'Draping Option'
                    : product.category === 'Unstitched Suits'
                      ? 'Fabric Length'
                      : 'Select Size'}
                </span>
                {product.category === 'Sarees' ? (
                  <span className="text-[#57534E]">5.5m Saree + 0.9m Blouse</span>
                ) : product.category === 'Unstitched Suits' ? (
                  <span className="text-[#57534E]">2.5m Kurta · 2.5m Salwar · 2.4m Dupatta</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="inline-flex items-center gap-1.5 text-[#8C1D2D] hover:underline font-semibold cursor-pointer whitespace-nowrap"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>View Size Guide</span>
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap min-h-[40px] ${
                      selectedSize === size
                        ? 'bg-[#1C1917] text-white border-[#1C1917]'
                        : 'bg-white text-[#1C1917] border-[#E5E0D8] hover:border-[#1C1917]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric & Care Details */}
            <div className="mt-6 pt-5 border-t border-[#E5E0D8] space-y-2.5 text-xs">
              <div>
                <span className="font-semibold text-[#1C1917]">Textile & Weave: </span>
                <span className="text-[#57534E]">{product.fabric}</span>
              </div>
              <div>
                <span className="font-semibold text-[#1C1917]">Care Guide: </span>
                <span className="text-[#57534E]">{product.care}</span>
              </div>
            </div>
          </div>

          {/* Quantity, Buy Bar & Direct WhatsApp Concierge */}
          <div className="pt-4 border-t border-[#E5E0D8] space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#E5E0D8] rounded-md bg-white h-11">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-full flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1EC] cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                  aria-label="Increase quantity"
                  className="w-10 h-full flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1EC] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 h-11 px-6 bg-[#8C1D2D] hover:bg-[#701522] text-white text-sm font-semibold rounded-md transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag — {formatINR(product.price * quantity)}</span>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 border border-[#15803D]/35 bg-[#15803D]/8 hover:bg-[#15803D]/15 text-[#14532D] text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Order / Ask on WhatsApp</span>
              </a>

              <a
                href={BOUTIQUE_CONTACT.phoneHref}
                className="h-10 px-4 border border-[#E5E0D8] bg-white hover:border-[#1C1917] text-[#1C1917] text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2 whitespace-nowrap tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>Call {BOUTIQUE_CONTACT.phoneDisplay}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#57534E]">
              <ShieldCheck className="w-4 h-4 text-[#8C1D2D] shrink-0" />
              <span>Curated directly from Kolkata, Jaipur & Surat · Free shipping over ₹5,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kurti & Salwar Suit Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#1C1917]/65 backdrop-blur-xs animate-backdrop-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-guide-title"
          onClick={(e) => {
            e.stopPropagation();
            setShowSizeGuide(false);
          }}
        >
          <div
            className="w-full max-w-xl bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl shadow-2xl overflow-hidden animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-white border-b border-[#E5E0D8] flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#8C1D2D] font-medium uppercase tracking-wider">
                  Srishti Collection Fit Standard
                </p>
                <h3
                  id="size-guide-title"
                  className="font-display text-2xl font-semibold text-[#1C1917] mt-0.5"
                >
                  Kurtis & Salwar Suits Size Guide (Inches)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                aria-label="Close size guide"
                className="w-9 h-9 rounded-md border border-[#E5E0D8] flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1EC] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="overflow-x-auto border border-[#E5E0D8] rounded-lg bg-white">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5E0D8] bg-[#F3F1EC] text-[#1C1917] font-semibold">
                      <th className="py-3 px-3.5">Size</th>
                      <th className="py-3 px-3.5">Bust (in)</th>
                      <th className="py-3 px-3.5">Waist (in)</th>
                      <th className="py-3 px-3.5">Hip (in)</th>
                      <th className="py-3 px-3.5">Kurti Length</th>
                      <th className="py-3 px-3.5">Salwar / Pant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E0D8] tabular-nums text-[#1C1917]">
                    {[
                      { size: 'XS', bust: '34"', waist: '28"', hip: '36"', top: '44"', bottom: '38"' },
                      { size: 'S', bust: '36"', waist: '30"', hip: '38"', top: '44"', bottom: '38"' },
                      { size: 'M', bust: '38"', waist: '32"', hip: '40"', top: '45"', bottom: '39"' },
                      { size: 'L', bust: '40"', waist: '34"', hip: '42"', top: '45"', bottom: '39"' },
                      { size: 'XL', bust: '42"', waist: '36"', hip: '44"', top: '46"', bottom: '40"' },
                    ].map((row) => (
                      <tr
                        key={row.size}
                        className={selectedSize === row.size ? 'bg-[#8C1D2D]/6 font-semibold' : ''}
                      >
                        <td className="py-2.5 px-3.5 font-semibold">{row.size}</td>
                        <td className="py-2.5 px-3.5">{row.bust}</td>
                        <td className="py-2.5 px-3.5">{row.waist}</td>
                        <td className="py-2.5 px-3.5">{row.hip}</td>
                        <td className="py-2.5 px-3.5">{row.top}</td>
                        <td className="py-2.5 px-3.5">{row.bottom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-1.5 text-xs text-[#57534E] leading-relaxed">
                <p>
                  <strong className="text-[#1C1917]">Boutique Fit Note:</strong> Measurements reflect garment body dimensions in inches. Anarkalis feature a comfortable 2" inner seam margin for easy local alteration; flared Patiala salwars measure 40" with an adjustable drawstring waist.
                </p>
                <p>
                  Between sizes? Choose the larger size or reach us on WhatsApp for custom tailoring assistance.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(false)}
                  className="px-5 py-2 bg-[#1C1917] hover:bg-[#332E2A] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Back to Outfit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
