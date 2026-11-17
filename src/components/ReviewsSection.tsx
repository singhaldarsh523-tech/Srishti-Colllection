import { FormEvent, useState } from 'react';
import { Star } from 'lucide-react';
import { Product, Review } from '../data/boutiqueData';
import { Reveal } from './Reveal';

interface ReviewsSectionProps {
  reviews: Review[];
  products: Product[];
  onAddReview: (review: Review) => void;
}

export function ReviewsSection({ reviews, products, onAddReview }: ReviewsSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [outfitName, setOutfitName] = useState(products[0]?.name || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittedNote, setSubmittedNote] = useState(false);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !city.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      city: city.trim(),
      outfitName,
      rating,
      date: 'November 2026',
      comment: comment.trim(),
      verified: true,
    };

    onAddReview(newReview);
    setAuthor('');
    setCity('');
    setComment('');
    setRating(5);
    setShowForm(false);
    setSubmittedNote(true);
    setTimeout(() => setSubmittedNote(false), 3000);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 border-t border-[#E5E0D8] bg-[#FAF9F6]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#8C1D2D]">
              Patron Chronicles
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917] mt-2 text-balance">
              Worn & Loved Across India
            </h2>
            <div className="mt-3 flex items-center gap-3 text-sm text-[#57534E]">
              <div className="flex items-center gap-1 text-[#9A7B3E]" aria-label={`${avgRating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-[#1C1917] tabular-nums">{avgRating} / 5.0</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Based on {reviews.length} verified client reviews</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="px-5 py-2.5 text-xs font-semibold border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white rounded-md transition-colors cursor-pointer self-start md:self-auto whitespace-nowrap shrink-0 min-h-[40px]"
          >
            {showForm ? 'Close Review Form' : 'Write a Review'}
          </button>
        </div>
        </Reveal>

        {submittedNote && (
          <div className="mb-6 p-4 bg-white border border-[#E5E0D8] rounded-lg text-sm text-[#1C1917]">
            Thank you for sharing your experience with Srishti Collection. Your review is now live.
          </div>
        )}

        {/* Interactive Review Submission Panel */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 p-6 sm:p-8 bg-white border border-[#E5E0D8] rounded-xl space-y-4"
          >
            <h3 className="font-display text-2xl font-semibold text-[#1C1917]">
              Share Your Outfit Experience
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#57534E] mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kavita Sharma"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#57534E] mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaipur"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#57534E] mb-1.5">
                  Outfit Purchased
                </label>
                <select
                  value={outfitName}
                  onChange={(e) => setOutfitName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium text-[#57534E] mb-1.5">Rating</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    aria-label={`Rate ${num} stars`}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        num <= rating
                          ? 'text-[#9A7B3E] fill-current'
                          : 'text-[#E5E0D8]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#57534E] mb-1.5">
                Your Review *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tell us about the fabric weave, fit, drape, and delivery experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#8C1D2D] hover:bg-[#701522] text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
              >
                Publish Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews Grid */}
        <Reveal delayMs={80}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="p-6 sm:p-7 bg-white border border-[#E5E0D8] rounded-lg flex flex-col justify-between gap-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1 text-[#9A7B3E]">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#57534E]">{review.date}</span>
                </div>

                <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#1C1917]">
                  “{review.comment}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E0D8] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-semibold text-[#1C1917]">{review.author}</span>
                  <span className="text-[#57534E]"> · {review.city}</span>
                </div>
                <span className="text-[#57534E] truncate max-w-[240px]">
                  {review.outfitName}
                </span>
              </div>
            </article>
          ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
