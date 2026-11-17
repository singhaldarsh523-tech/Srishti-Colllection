import { ArrowUpRight, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, formatINR } from '../data/boutiqueData';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

interface WishlistSectionProps {
  items: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onRemoveFromWishlist: (product: Product) => void;
  onAddAllToCart: () => void;
  onClearWishlist: () => void;
}

export function WishlistSection({
  items,
  onSelectProduct,
  onAddToCart,
  onRemoveFromWishlist,
  onAddAllToCart,
  onClearWishlist,
}: WishlistSectionProps) {
  return (
    <section
      id="wishlist"
      className="py-16 sm:py-20 border-t border-[#E5E0D8] bg-[#FAF9F6]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#8C1D2D]">
                Saved Favorites
              </p>
              <div className="flex flex-wrap items-baseline gap-3 mt-2">
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917] text-balance">
                  View Wishlist
                </h2>
                <span className="text-sm text-[#57534E] tabular-nums">
                  {items.length} {items.length === 1 ? 'outfit saved' : 'outfits saved'}
                </span>
              </div>
              <p className="text-sm text-[#57534E] mt-2 max-w-xl">
                Your curated sarees, kurtis, salwar suits, and unstitched sets are saved automatically in your browser so you can compare fabrics and move favorites straight to your shopping bag.
              </p>
            </div>

            {items.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onClearWishlist}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#57534E] hover:text-[#1C1917] border border-[#E5E0D8] hover:border-[#1C1917] bg-white rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[38px]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Wishlist</span>
                </button>
                <button
                  type="button"
                  onClick={onAddAllToCart}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#8C1D2D] hover:bg-[#701522] rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[38px]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add All to Bag</span>
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {items.length === 0 ? (
          <Reveal delayMs={80}>
            <div className="py-14 px-6 text-center bg-white border border-[#E5E0D8] rounded-xl">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-center text-[#8C1D2D]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#1C1917] mt-4">
                Your Wishlist is Empty
              </h3>
              <p className="text-sm text-[#57534E] mt-2 max-w-md mx-auto leading-relaxed">
                Tap the heart icon on any saree, kurti, salwar suit, or unstitched suit set in our collection to save it here for later.
              </p>
              <a
                href="#collection"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C1917] hover:bg-[#332E2A] text-white text-xs font-semibold rounded-md transition-colors whitespace-nowrap"
              >
                <span>Browse Collection</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((product) => (
              <article
                key={product.id}
                className="group animate-fade-up flex flex-col justify-between bg-white border border-[#E5E0D8] rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="relative aspect-[3/4] bg-[#F3F1EC] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="block w-full h-full cursor-pointer text-left"
                    >
                      <ResilientImage
                        src={product.image}
                        alt={product.name}
                        fallbackTitle={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveFromWishlist(product)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      title="Remove from wishlist"
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 border border-[#E5E0D8] shadow-xs flex items-center justify-center text-[#8C1D2D] hover:bg-[#FAF9F6] transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-[#8C1D2D] text-[#8C1D2D]" />
                    </button>
                  </div>

                  <div className="p-5 pb-3">
                    <div className="flex items-center gap-2 text-xs text-[#57534E]">
                      <span>{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.craftOrigin}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="text-left block w-full mt-1.5 cursor-pointer"
                    >
                      <h3 className="text-base font-semibold text-[#1C1917] group-hover:text-[#8C1D2D] transition-colors leading-snug">
                        {product.name}
                      </h3>
                    </button>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-3">
                  <span className="text-[15px] font-semibold text-[#1C1917] tabular-nums">
                    {formatINR(product.price)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-2 text-xs font-medium text-[#1C1917] border border-[#E5E0D8] hover:border-[#1C1917] bg-[#FAF9F6] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onAddToCart(product, product.sizes[0] || 'Standard', 1)
                      }
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-[#8C1D2D] hover:bg-[#701522] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Move to Bag
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
