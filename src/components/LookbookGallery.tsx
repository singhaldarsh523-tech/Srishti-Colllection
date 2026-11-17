import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { Product, formatINR } from '../data/boutiqueData';
import { ResilientImage } from './ResilientImage';

interface LookbookGalleryProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export function LookbookGallery({ products, onSelectProduct }: LookbookGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems = [
    ...products.filter((p) => p.category === 'Sarees').slice(0, 2),
    ...products.filter((p) => p.category === 'Kurtis').slice(0, 1),
    ...products.filter((p) => p.category === 'Salwar Suits').slice(0, 2),
    ...products.filter((p) => p.category === 'Unstitched Suits').slice(0, 1),
  ];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % galleryItems.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, galleryItems.length]);

  const activeItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 border-t border-[#E5E0D8] bg-[#F3F1EC]/55">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#8C1D2D]">
              Editorial Lookbook
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917] mt-2 text-balance">
              Silhouette & Loom Gallery
            </h2>
          </div>
          <p className="text-sm text-[#57534E] max-w-md leading-relaxed">
            Inspect the drape, zari border precision, and hand-embroidered details across our signature sarees, kurtis, and salwar suits.
          </p>
        </div>

        {/* Asymmetric Editorial Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[3/4] bg-[#F3F1EC] rounded-lg overflow-hidden border border-[#E5E0D8] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#8C1D2D]"
            >
              <ResilientImage
                src={item.image}
                alt={`${item.name} gallery portrait`}
                fallbackTitle={item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#1C1917] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[11px] text-white/80 truncate">{item.craftOrigin}</p>
                <p className="text-xs font-semibold leading-snug line-clamp-2 mt-0.5">
                  {item.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Viewer */}
      {activeItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1917]/90 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery Lightbox"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close gallery lightbox"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (lightboxIndex - 1 + galleryItems.length) % galleryItems.length
              );
            }}
            aria-label="Previous outfit"
            className="hidden sm:flex w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center mr-4 cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            className="max-w-3xl w-full bg-[#FAF9F6] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[3/4] bg-[#F3F1EC]">
              <ResilientImage
                src={activeItem.image}
                alt={activeItem.name}
                fallbackTitle={activeItem.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs text-[#57534E]">
                  {activeItem.category} · {activeItem.craftOrigin}
                </p>
                <h3 className="font-display text-3xl font-semibold text-[#1C1917] mt-2">
                  {activeItem.name}
                </h3>
                <p className="text-lg font-semibold text-[#1C1917] mt-2 tabular-nums">
                  {formatINR(activeItem.price)}
                </p>
                <p className="text-sm text-[#57534E] mt-4 leading-relaxed">
                  {activeItem.description}
                </p>
                <p className="text-xs text-[#57534E] mt-4 pt-4 border-t border-[#E5E0D8]">
                  {activeItem.fabric}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    const selected = activeItem;
                    setLightboxIndex(null);
                    onSelectProduct(selected);
                  }}
                  className="w-full h-11 bg-[#8C1D2D] hover:bg-[#701522] text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Select Size & Shop Outfit
                </button>
                <div className="flex items-center justify-between text-xs text-[#57534E]">
                  <span>
                    Look {lightboxIndex + 1} of {galleryItems.length}
                  </span>
                  <div className="flex gap-2 sm:hidden">
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex(
                          (lightboxIndex - 1 + galleryItems.length) % galleryItems.length
                        )
                      }
                      className="px-2.5 py-1 border border-[#E5E0D8] rounded"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex((lightboxIndex + 1) % galleryItems.length)
                      }
                      className="px-2.5 py-1 border border-[#E5E0D8] rounded"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
            }}
            aria-label="Next outfit"
            className="hidden sm:flex w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center ml-4 cursor-pointer shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
}
