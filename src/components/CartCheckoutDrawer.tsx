import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Landmark,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Smartphone,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { Product, formatINR } from '../data/boutiqueData';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartCheckoutDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

type DrawerStep = 'cart' | 'checkout' | 'confirmed';
type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

interface OrderSummary {
  orderId: string;
  customerName: string;
  city: string;
  paymentMethod: PaymentMethod;
  total: number;
  items: CartItem[];
}

export function CartCheckoutDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartCheckoutDrawerProps) {
  const [step, setStep] = useState<DrawerStep>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderSummary | null>(null);

  // Delivery fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  // Payment fields
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      setFormError('');
      if (step === 'confirmed') {
        setStep('cart');
      }
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 5000;
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 250;
  const codFee = paymentMethod === 'cod' && step === 'checkout' ? 100 : 0;
  const grandTotal = subtotal + shippingFee + codFee;
  const amountRemainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const formatCardNumberInput = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryInput = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
      setFormError('Please complete all required delivery address fields.');
      return;
    }
    if (!/^\d{10}$/.test(phone.replace(/\D/g, '').slice(-10))) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!/^\d{6}$/.test(pincode.trim())) {
      setFormError('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    if (paymentMethod === 'upi' && (!upiId.includes('@') || upiId.trim().length < 5)) {
      setFormError('Please enter a valid UPI ID (for example, name@okhdfcbank).');
      return;
    }
    if (paymentMethod === 'card') {
      const rawDigits = cardNumber.replace(/\s/g, '');
      if (rawDigits.length < 16 || cardExpiry.length < 5 || cardCvv.length < 3) {
        setFormError('Please enter complete card number, expiry (MM/YY), and CVV.');
        return;
      }
    }

    setIsProcessing(true);
    setTimeout(() => {
      const orderNum = `SC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedOrder({
        orderId: orderNum,
        customerName: fullName.trim(),
        city: city.trim(),
        paymentMethod,
        total: grandTotal,
        items: [...items],
      });
      setIsProcessing(false);
      onClearCart();
      setStep('confirmed');
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1C1917]/55 backdrop-blur-xs animate-backdrop-in"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag and Secure Checkout"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FAF9F6] h-full shadow-2xl border-l border-[#E5E0D8] flex flex-col animate-drawer-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#E5E0D8] flex items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => {
                  setStep('cart');
                  setFormError('');
                }}
                aria-label="Back to shopping bag"
                className="w-8 h-8 rounded-md border border-[#E5E0D8] flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1EC] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-2xl font-semibold text-[#1C1917]">
              {step === 'cart' && 'Your Shopping Bag'}
              {step === 'checkout' && 'Secure Checkout'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="w-10 h-10 rounded-md flex items-center justify-center text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3F1EC] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Shopping Bag */}
        {step === 'cart' && (
          <>
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#F3F1EC] flex items-center justify-center text-[#8C1D2D] mb-4">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#1C1917]">
                  Your bag is empty
                </h3>
                <p className="text-sm text-[#57534E] mt-2 max-w-xs leading-relaxed">
                  Explore our handwoven sarees, Chanderi kurtis, and atelier salwar suits to add pieces to your bag.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-[#8C1D2D] hover:bg-[#701522] text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              <>
                {/* Free Shipping Progress */}
                <div className="px-6 py-3 bg-[#F3F1EC] border-b border-[#E5E0D8] text-xs text-[#1C1917]">
                  {amountRemainingForFreeShipping === 0 ? (
                    <span className="font-medium">
                      Your order qualifies for complimentary insured shipping across India.
                    </span>
                  ) : (
                    <span>
                      Add <strong className="tabular-nums">{formatINR(amountRemainingForFreeShipping)}</strong> more for complimentary insured shipping.
                    </span>
                  )}
                </div>

                {/* Line Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#E5E0D8]">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="py-4 flex gap-4 items-start"
                    >
                      <div className="w-20 aspect-[3/4] bg-[#F3F1EC] rounded-md overflow-hidden shrink-0 border border-[#E5E0D8]">
                        <ResilientImage
                          src={item.product.image}
                          alt={item.product.name}
                          fallbackTitle={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs text-[#57534E]">{item.product.category}</p>
                            <h3 className="text-sm font-semibold text-[#1C1917] leading-snug mt-0.5">
                              {item.product.name}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id, item.size)}
                            aria-label={`Remove ${item.product.name}`}
                            className="text-[#57534E] hover:text-[#8C1D2D] p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-[#57534E] mt-1">Option: {item.size}</p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#E5E0D8] rounded-md bg-white h-8">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.size, -1)
                              }
                              aria-label="Decrease quantity"
                              className="w-8 h-full flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1EC] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-medium tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.size, 1)
                              }
                              aria-label="Increase quantity"
                              className="w-8 h-full flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1EC] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                            {formatINR(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bag Footer */}
                <div className="p-6 border-t border-[#E5E0D8] bg-white space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[#57534E]">
                      <span>Subtotal (Incl. GST)</span>
                      <span className="tabular-nums text-[#1C1917] font-medium">
                        {formatINR(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#57534E]">
                      <span>Insured Shipping</span>
                      <span className="tabular-nums text-[#1C1917] font-medium">
                        {shippingFee === 0 ? 'Complimentary' : formatINR(shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-semibold text-[#1C1917] pt-2 border-t border-[#E5E0D8]">
                      <span>Estimated Total</span>
                      <span className="tabular-nums">{formatINR(subtotal + shippingFee)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep('checkout')}
                    className="w-full h-12 bg-[#8C1D2D] hover:bg-[#701522] text-white text-sm font-semibold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Proceed to Secure Checkout</span>
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* Step 2: Secure Payment Integration */}
        {step === 'checkout' && (
          <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {formError && (
                <div
                  role="alert"
                  className="p-3 bg-[#8C1D2D]/10 border border-[#8C1D2D]/30 rounded-md text-xs font-medium text-[#8C1D2D]"
                >
                  {formError}
                </div>
              )}

              {/* Delivery Details */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                  1. Delivery Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="sm:col-span-2 w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="10-Digit Mobile *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                  />
                  <input
                    type="email"
                    placeholder="Email (for receipt)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="House / Flat, Street, Landmark *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="sm:col-span-2 w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City *"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                  />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="PIN Code *"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D] tabular-nums"
                  />
                </div>
              </section>

              {/* Payment Method */}
              <section className="space-y-3 pt-2 border-t border-[#E5E0D8]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                    2. Payment Method
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-[#57534E]">
                    <Lock className="w-3.5 h-3.5 text-[#8C1D2D]" />
                    256-Bit TLS Encrypted
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'upi' as const, label: 'UPI / QR', icon: Smartphone },
                    { id: 'card' as const, label: 'Credit / Debit Card', icon: CreditCard },
                    { id: 'netbanking' as const, label: 'Net Banking', icon: Landmark },
                    { id: 'cod' as const, label: 'Cash on Delivery', icon: Truck },
                  ].map((method) => {
                    const Icon = method.icon;
                    const active = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex items-center gap-2 px-3 py-2.5 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[#1C1917] text-white border-[#1C1917]'
                            : 'bg-white text-[#1C1917] border-[#E5E0D8] hover:border-[#1C1917]'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Payment Method Sub-Form */}
                <div className="p-4 bg-white border border-[#E5E0D8] rounded-md space-y-3">
                  {paymentMethod === 'upi' && (
                    <div>
                      <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                        Enter UPI ID (GPay, PhonePe, Paytm, BHIM)
                      </label>
                      <input
                        type="text"
                        placeholder="yourname@okicici"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                      />
                      <p className="text-xs text-[#57534E] mt-1.5">
                        Instant collect request sent to your UPI app upon confirmation.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                          Card Number (Visa / Mastercard / RuPay)
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="4532 8910 2345 6789"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumberInput(e.target.value))}
                          className="w-full px-3.5 py-2 text-sm border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D] tabular-nums"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="08/29"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiryInput(e.target.value))}
                            className="w-full px-3.5 py-2 text-sm border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D] tabular-nums"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                            CVV
                          </label>
                          <input
                            type="password"
                            inputMode="numeric"
                            maxLength={4}
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            className="w-full px-3.5 py-2 text-sm border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D] tabular-nums"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div>
                      <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                        Select Issuing Bank
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-white border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
                      >
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>State Bank of India</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="text-xs text-[#57534E] leading-relaxed space-y-1">
                      <p className="font-medium text-[#1C1917]">
                        Pay by cash or UPI QR at your doorstep.
                      </p>
                      <p>
                        A nominal ₹100 COD handling fee applies. Our dispatch desk will verify your mobile number before shipping.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Checkout Footer */}
            <div className="p-6 border-t border-[#E5E0D8] bg-white space-y-3">
              <div className="flex justify-between items-baseline text-sm">
                <span className="text-[#57534E]">
                  Payable Total {codFee > 0 ? '(Incl. ₹100 COD fee)' : ''}
                </span>
                <span className="text-xl font-semibold text-[#1C1917] tabular-nums">
                  {formatINR(grandTotal)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full h-12 bg-[#8C1D2D] hover:bg-[#701522] disabled:opacity-60 text-white text-sm font-semibold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Authorizing Secure Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {paymentMethod === 'cod'
                        ? `Confirm COD Order — ${formatINR(grandTotal)}`
                        : `Pay ${formatINR(grandTotal)} Securely`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmation Receipt */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-8 h-8 text-[#15803D] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-[#15803D]">
                    Order #{confirmedOrder.orderId} Confirmed
                  </p>
                  <h3 className="font-display text-3xl font-semibold text-[#1C1917] mt-1">
                    Thank you, {confirmedOrder.customerName}
                  </h3>
                  <p className="text-sm text-[#57534E] mt-2 leading-relaxed">
                    Your handcrafted Srishti Collection garments are being inspected and packed in breathable muslin for dispatch to {confirmedOrder.city}.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E5E0D8] rounded-md space-y-3">
                <div className="flex justify-between text-xs text-[#57534E] pb-2 border-b border-[#E5E0D8]">
                  <span>Payment Mode</span>
                  <span className="font-medium text-[#1C1917] uppercase">
                    {confirmedOrder.paymentMethod === 'cod'
                      ? 'Cash on Delivery'
                      : confirmedOrder.paymentMethod}
                  </span>
                </div>

                <div className="space-y-2">
                  {confirmedOrder.items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex justify-between text-xs"
                    >
                      <span className="text-[#1C1917]">
                        {item.product.name} ({item.size}) × {item.quantity}
                      </span>
                      <span className="tabular-nums font-medium text-[#1C1917]">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-sm font-semibold text-[#1C1917] pt-2 border-t border-[#E5E0D8]">
                  <span>Total Paid</span>
                  <span className="tabular-nums">{formatINR(confirmedOrder.total)}</span>
                </div>
              </div>

              <p className="text-xs text-[#57534E]">
                Estimated dispatch within 24 hours · Insured courier tracking will be shared via SMS.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setStep('cart');
                onClose();
              }}
              className="mt-8 w-full h-11 bg-[#1C1917] hover:bg-[#332E2A] text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
            >
              Continue Exploring Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
