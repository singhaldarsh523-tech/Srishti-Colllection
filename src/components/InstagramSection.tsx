import { useState } from 'react';
import { ArrowUpRight, Heart, Instagram, MapPin, X } from 'lucide-react';
import { InstagramPost, Product, formatINR } from '../data/boutiqueData';
import { ResilientImage } from './ResilientImage';

interface InstagramSectionProps {
  posts: InstagramPost[];
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export function InstagramSection({
  posts,
  products,
  onSelectProduct,
}: InstagramSectionProps) {
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getLinkedProduct = (productId: string) =>
    products.find((p) => p.id === productId);

  return (
    <section id="instagram" className="py-16 sm:py-24 border-t border-[#E5E0D8] bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#8C1D2D]">
              Social Journal
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917] mt-2 text-balance">
              Live From @srishticollection.boutique
            </h2>
            <p className="text-sm text-[#57534E] mt-2 max-w-xl">
              Festive styling notes, loom stories, and new drop previews. Click any post to shop the featured saree, kurti, or salwar suit directly.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#1C1917] border border-[#E5E0D8] hover:border-[#1C1917] rounded-md transition-colors self-start md:self-auto whitespace-nowrap shrink-0 min-h-[40px]"
          >
            <Instagram className="w-4 h-4 text-[#8C1D2D]" />
            <span>Follow @srishticollection.boutique</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4-Column Shoppable Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => {
            const isLiked = !!likedIds[post.id];
            const displayLikes = post.likes + (isLiked ? 1 : 0);
            const linkedProduct = getLinkedProduct(post.productId);

            return (
              <div
                key={post.id}
                className="group border border-[#E5E0D8] rounded-lg overflow-hidden bg-[#FAF9F6] flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setActivePost(post)}
                  className="relative aspect-[3/4] bg-[#F3F1EC] overflow-hidden cursor-pointer text-left"
                >
                  <ResilientImage
                    src={post.image}
                    alt={post.caption}
                    fallbackTitle={linkedProduct?.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-medium text-white">
                      View Post & Shop Look
                    </span>
                  </div>
                </button>

                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#57534E]">
                      <span className="truncate">{post.location}</span>
                      <span className="shrink-0">{post.dateLabel}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-[#1C1917] mt-2 line-clamp-2">
                      {post.caption}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5E0D8] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      aria-label={isLiked ? 'Unlike Instagram post' : 'Like Instagram post'}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#57534E] hover:text-[#8C1D2D] cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isLiked ? 'fill-[#8C1D2D] text-[#8C1D2D]' : ''
                        }`}
                      />
                      <span className="tabular-nums">{displayLikes.toLocaleString('en-IN')}</span>
                    </button>

                    {linkedProduct && (
                      <button
                        type="button"
                        onClick={() => onSelectProduct(linkedProduct)}
                        className="text-xs font-semibold text-[#8C1D2D] hover:underline cursor-pointer whitespace-nowrap"
                      >
                        Shop Look
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instagram Post Modal */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1917]/65 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Instagram Post Details"
          onClick={() => setActivePost(null)}
        >
          <div
            className="w-full max-w-3xl bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[3/4] bg-[#F3F1EC]">
              <ResilientImage
                src={activePost.image}
                alt={activePost.caption}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-[#8C1D2D]" />
                    <span className="text-sm font-semibold text-[#1C1917]">
                      @srishticollection.boutique
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivePost(null)}
                    aria-label="Close Instagram post"
                    className="w-8 h-8 rounded-md flex items-center justify-center text-[#57534E] hover:bg-[#F3F1EC] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-[#57534E]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activePost.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activePost.dateLabel}</span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#1C1917]">
                  {activePost.caption}
                </p>
              </div>

              {(() => {
                const prod = getLinkedProduct(activePost.productId);
                if (!prod) return null;
                return (
                  <div className="p-4 bg-white border border-[#E5E0D8] rounded-lg space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] text-[#57534E]">Featured Outfit</p>
                        <p className="text-sm font-semibold text-[#1C1917]">{prod.name}</p>
                      </div>
                      <span className="text-sm font-semibold text-[#1C1917] tabular-nums shrink-0">
                        {formatINR(prod.price)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActivePost(null);
                        onSelectProduct(prod);
                      }}
                      className="w-full h-10 bg-[#8C1D2D] hover:bg-[#701522] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                    >
                      View & Add to Bag
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
