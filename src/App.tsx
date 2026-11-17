/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, Instagram, Lock, MessageCircle, Phone, Search, ShieldCheck, Truck } from 'lucide-react';
import {
  BOUTIQUE_CONTACT,
  HERO_IMAGE,
  INITIAL_REVIEWS,
  INSTAGRAM_POSTS,
  ImportOrigin,
  OutfitCategory,
  PRODUCTS,
  Product,
  Review,
  buildWhatsAppUrl,
  formatINR,
} from './data/boutiqueData';
import { Navbar } from './components/Navbar';
import { ResilientImage } from './components/ResilientImage';
import { ProductModal } from './components/ProductModal';
import { CartCheckoutDrawer, CartItem } from './components/CartCheckoutDrawer';
import { LookbookGallery } from './components/LookbookGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { InstagramSection } from './components/InstagramSection';
import { ContactSection } from './components/ContactSection';
import { BoutiqueMapSection } from './components/BoutiqueMapSection';
import { StylistChat } from './components/StylistChat';

type CategoryFilter = 'All' | OutfitCategory;
type OriginFilter = 'All' | ImportOrigin;
type SortOrder = 'featured' | 'price-asc' | 'price-desc';

const CART_STORAGE_KEY = 'srishti_collection_cart_v1';
const REVIEWS_STORAGE_KEY = 'srishti_collection_reviews_v1';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [selectedOrigin, setSelectedOrigin] = useState<OriginFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('featured');

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Review[]) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // Ignore storage quota errors
    }
  }, [reviews]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2600);
  };

  const handleAddToCart = (product: Product, size: string, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(10, updated[existingIndex].quantity + quantity),
        };
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });
    showToast(`Added ${product.name} to your bag`);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesOrigin =
        selectedOrigin === 'All' || product.importHub === selectedOrigin;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.craftOrigin.toLowerCase().includes(query) ||
        product.importHub.toLowerCase().includes(query) ||
        product.fabric.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesOrigin && matchesQuery;
    });

    if (sortOrder === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortOrder === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return [...list].sort((a, b) => a.featuredOrder - b.featuredOrder);
  }, [selectedCategory, selectedOrigin, searchQuery, sortOrder]);

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: 'All Outfits', value: 'All' },
    { label: 'Sarees', value: 'Sarees' },
    { label: 'Kurtis', value: 'Kurtis' },
    { label: 'Salwar Suits', value: 'Salwar Suits' },
    { label: 'Unstitched Suits', value: 'Unstitched Suits' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1C1917]">
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar cartCount={totalBagCount} onOpenCart={() => setIsCartOpen(true)} />

      {/* Subtle Toast Confirmation on Add to Bag */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 bg-[#1C1917] text-white px-4 py-3 rounded-lg shadow-lg border border-white/10 flex items-center gap-3 text-xs font-medium"
        >
          <Check className="w-4 h-4 text-[#9A7B3E] shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="text-[#FAF9F6] underline underline-offset-2 font-semibold ml-1 cursor-pointer whitespace-nowrap"
          >
            View Bag
          </button>
        </div>
      )}

      <main className="flex-1">
        {/* Storefront Split Hero */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 pb-12 sm:pt-10 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Copy Column */}
            <div className="lg:col-span-5 flex flex-col justify-center py-4 lg:py-8">
              <p className="text-xs font-medium tracking-widest uppercase text-[#8C1D2D]">
                Festive & Bridal Heritage
              </p>

              <h1 className="font-display text-4xl sm:text-5xl xl:text-[56px] font-semibold text-[#1C1917] leading-[1.08] mt-3 text-balance">
                Heirloom Sarees, Kurtis & Suits
              </h1>

              <p className="mt-5 text-base leading-relaxed text-[#57534E] max-w-lg">
                Imported directly from master textile hubs in Kolkata, Jaipur, and Surat. Every Srishti Collection saree, kurti, stitched salwar suit, and unstitched suit set celebrates authentic craftsmanship tailored for modern Indian celebrations.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#collection"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8C1D2D] hover:bg-[#701522] text-white text-sm font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Shop the Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={buildWhatsAppUrl('Hello Srishti Collection! I would like to explore your sarees, kurtis, and salwar suits.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-[#E5E0D8] hover:border-[#15803D] bg-white text-[#1C1917] text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-[#15803D]" />
                  <span>WhatsApp Boutique</span>
                </a>
              </div>
            </div>

            {/* Right Editorial Hero Photography */}
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden bg-[#F3F1EC] border border-[#E5E0D8] aspect-[16/10] lg:aspect-auto lg:min-h-[480px]">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Srishti Collection crimson zari silk saree editorial campaign"
                fallbackTitle="Suhag Sindoor Zari Silk Saree"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 text-white">
                <div>
                  <p className="text-xs text-white/80">Signature Campaign · Imported from Kolkata</p>
                  <p className="font-display text-2xl font-semibold mt-0.5">
                    Suhag Sindoor Zari Silk Saree
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const heroProd = PRODUCTS.find(
                      (p) => p.id === 'sc-saree-banarasi-sindoor'
                    );
                    if (heroProd) setActiveProduct(heroProd);
                  }}
                  className="px-4 py-2 bg-white text-[#1C1917] hover:bg-[#F3F1EC] text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Shop Featured Saree — ₹25,000
                </button>
              </div>
            </div>
          </div>

          {/* 4-Column Trust & Craft Strip Below Hero Split */}
          <div className="mt-10 pt-8 border-t border-[#E5E0D8] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#8C1D2D] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-semibold text-[#1C1917]">Kolkata, Jaipur & Surat Imports</h2>
                <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                  Directly sourced silk sarees, zardozi suits, and embroidered kurtis.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#8C1D2D] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-semibold text-[#1C1917]">Insured Pan-India Delivery</h2>
                <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                  Complimentary courier dispatch on all orders above ₹5,000.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#8C1D2D] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-semibold text-[#1C1917]">Encrypted Checkout</h2>
                <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                  Pay safely via UPI, Cards, Net Banking, or Cash on Delivery.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Instagram className="w-5 h-5 text-[#8C1D2D] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-semibold text-[#1C1917]">Bespoke Styling Desk</h2>
                <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                  Custom saree pre-pleating and tailored kurti sizing available.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Boutique Catalog Section */}
        <section id="collection" className="py-16 sm:py-20 border-t border-[#E5E0D8] bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-[#8C1D2D]">
                  Curated Boutique
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917] mt-2 text-balance">
                  Sarees, Kurtis, Salwar & Unstitched Suits
                </h2>
              </div>

              {/* Filter Tabs, Search & Sort Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Segmented Category Tabs */}
                <div
                  role="tablist"
                  aria-label="Filter outfits by category"
                  className="flex items-center gap-1 p-1 bg-[#F3F1EC] rounded-lg overflow-x-auto"
                >
                  {categories.map((cat) => {
                    const active = selectedCategory === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                            : 'text-[#57534E] hover:text-[#1C1917]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-[#57534E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search silk, kurti, zari..."
                    aria-label="Search outfits"
                    className="w-full sm:w-52 pl-9 pr-3 py-2 text-xs bg-[#FAF9F6] border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D] min-h-[38px]"
                  />
                </div>

                {/* Origin Select */}
                <select
                  aria-label="Filter by import city"
                  value={selectedOrigin}
                  onChange={(e) => setSelectedOrigin(e.target.value as OriginFilter)}
                  className="px-3 py-2 text-xs font-medium bg-[#FAF9F6] border border-[#E5E0D8] rounded-md text-[#1C1917] focus:outline-none focus:border-[#8C1D2D] min-h-[38px] cursor-pointer"
                >
                  <option value="All">Origin: All Hubs</option>
                  <option value="Kolkata">Imported from Kolkata</option>
                  <option value="Jaipur">Imported from Jaipur</option>
                  <option value="Surat">Imported from Surat</option>
                </select>

                {/* Sort Select */}
                <select
                  aria-label="Sort outfits"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                  className="px-3 py-2 text-xs font-medium bg-[#FAF9F6] border border-[#E5E0D8] rounded-md text-[#1C1917] focus:outline-none focus:border-[#8C1D2D] min-h-[38px] cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* 3-Column Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center border border-[#E5E0D8] rounded-lg bg-[#FAF9F6]">
                <p className="font-display text-2xl text-[#1C1917]">
                  No matching outfits found
                </p>
                <p className="text-sm text-[#57534E] mt-2">
                  Try clearing your search or switching back to all boutique categories.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedOrigin('All');
                    setSearchQuery('');
                  }}
                  className="mt-5 px-5 py-2 bg-[#1C1917] text-white text-xs font-semibold rounded-md cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <article
                    key={product.id}
                    className="group flex flex-col justify-between bg-[#FAF9F6] border border-[#E5E0D8] rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div>
                      <button
                        type="button"
                        onClick={() => setActiveProduct(product)}
                        className="block w-full aspect-[3/4] bg-[#F3F1EC] overflow-hidden cursor-pointer text-left"
                      >
                        <ResilientImage
                          src={product.image}
                          alt={product.name}
                          fallbackTitle={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </button>

                      <div className="p-5 pb-3">
                        {/* Clean Unboxed Metadata */}
                        <div className="flex items-center gap-2 text-xs text-[#57534E]">
                          <span>{product.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{product.craftOrigin}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveProduct(product)}
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
                          onClick={() => setActiveProduct(product)}
                          className="px-3 py-2 text-xs font-medium text-[#1C1917] border border-[#E5E0D8] hover:border-[#1C1917] bg-white rounded-md transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Details
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleAddToCart(product, product.sizes[0] || 'Standard', 1)
                          }
                          className="px-3.5 py-2 text-xs font-semibold text-white bg-[#8C1D2D] hover:bg-[#701522] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Lookbook & Outfit Gallery */}
        <LookbookGallery
          products={PRODUCTS}
          onSelectProduct={(product) => setActiveProduct(product)}
        />

        {/* Verified Customer Reviews */}
        <ReviewsSection
          reviews={reviews}
          products={PRODUCTS}
          onAddReview={handleAddReview}
        />

        {/* Shoppable Instagram Feed */}
        <InstagramSection
          posts={INSTAGRAM_POSTS}
          products={PRODUCTS}
          onSelectProduct={(product) => setActiveProduct(product)}
        />

        {/* Direct WhatsApp & Phone Contact */}
        <ContactSection products={PRODUCTS} />

        {/* Interactive Boutique & Sourcing Map */}
        <BoutiqueMapSection />
      </main>

      {/* Quiet Boutique Footer */}
      <footer className="border-t border-[#E5E0D8] bg-[#F3F1EC] py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-2xl font-semibold text-[#1C1917]">
              Srishti Collection
            </p>
            <p className="text-sm text-[#57534E] mt-3 leading-relaxed max-w-sm">
              Curated sarees, kurtis, salwar suits, and unstitched dress sets imported directly from Kolkata, Jaipur, and Surat textile ateliers.
            </p>
          </div>

          <div className="text-sm space-y-2 text-[#57534E]">
            <p className="font-semibold text-[#1C1917]">Flagship Boutique & Contact</p>
            <p>{BOUTIQUE_CONTACT.address}</p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={BOUTIQUE_CONTACT.phoneHref}
                className="inline-flex items-center gap-1.5 text-[#1C1917] font-medium hover:text-[#8C1D2D] tabular-nums"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{BOUTIQUE_CONTACT.phoneDisplay}</span>
              </a>
              <a
                href={buildWhatsAppUrl('Hello Srishti Collection! I have an enquiry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#15803D] font-medium hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
            <p>Email: {BOUTIQUE_CONTACT.email}</p>
            <p>{BOUTIQUE_CONTACT.hours}</p>
          </div>

          <div className="text-sm space-y-2 text-[#57534E] md:text-right">
            <p className="font-semibold text-[#1C1917]">Navigation</p>
            <div className="flex flex-wrap md:justify-end gap-4">
              <a href="#collection" className="hover:text-[#1C1917]">
                Collection
              </a>
              <a href="#gallery" className="hover:text-[#1C1917]">
                Gallery
              </a>
              <a href="#reviews" className="hover:text-[#1C1917]">
                Reviews
              </a>
              <a href="#instagram" className="hover:text-[#1C1917]">
                Instagram
              </a>
              <a href="#contact" className="hover:text-[#1C1917]">
                Contact
              </a>
              <a href="#locations" className="hover:text-[#1C1917]">
                Map
              </a>
            </div>
            <p className="text-xs pt-2">
              © {new Date().getFullYear()} Srishti Collection. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Product Detail / Quick-View Modal */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag & Secure Payment Drawer */}
      <CartCheckoutDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Multi-Turn Gemini Stylist Chatbot */}
      <StylistChat />
    </div>
  );
}
