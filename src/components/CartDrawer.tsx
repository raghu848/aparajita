import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types/store';
import { STORE_INFO } from '../data/storeData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreProducts,
}) => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 1999;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingAmount = isFreeShipping ? 0 : 99;
  const total = subtotal + shippingAmount;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const getWhatsAppCheckoutUrl = () => {
    let text = `Hello ${STORE_INFO.name},\n\nI would like to place an order for the following items:\n\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. ${item.name}`;
      if (item.selectedSize) text += ` (Size: ${item.selectedSize})`;
      if (item.selectedColor) text += ` (Color: ${item.selectedColor})`;
      text += ` - ₹${item.price.toLocaleString('en-IN')} x ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
    });
    text += `\nSubtotal: ₹${subtotal.toLocaleString('en-IN')}`;
    text += `\nShipping: ${shippingAmount === 0 ? 'FREE' : `₹${shippingAmount}`}`;
    text += `\nTotal Payable: ₹${total.toLocaleString('en-IN')}\n\n`;
    text += `Please send payment QR / bank details and confirm my order.`;
    return `https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleStandardCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutSuccess(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-warm-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between text-left">
        {/* Header */}
        <div className="p-5 border-b border-warm-200/80 flex items-center justify-between bg-cream-50">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={18} className="text-warm-800" />
            <h3 className="font-serif text-lg font-semibold text-warm-900">
              Your Shopping Bag ({cart.reduce((count, i) => count + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-warm-500 hover:text-warm-900 hover:bg-cream-200 transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        {cart.length > 0 && (
          <div className="bg-blush-50 px-5 py-2.5 border-b border-blush-200/60 text-xs font-sans text-warm-800">
            {isFreeShipping ? (
              <p className="flex items-center space-x-1.5 text-blush-700 font-semibold">
                <CheckCircle2 size={14} className="text-[#25D366]" />
                <span>You’ve unlocked Free Express Shipping Across India!</span>
              </p>
            ) : (
              <p>
                Add <strong className="text-blush-700">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong className="text-warm-900">FREE Express Delivery</strong>
              </p>
            )}
            <div className="w-full bg-blush-200/70 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-blush-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutSuccess ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 border border-green-300 mx-auto flex items-center justify-center text-green-600">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-serif text-2xl text-warm-900">Order Placed Successfully!</h4>
              <p className="text-xs font-sans text-warm-600 max-w-xs mx-auto leading-relaxed">
                Thank you for your order with Atelier Aparajita. Our concierge team in Ludhiana will WhatsApp you shortly with dispatch updates.
              </p>
            </div>
          ) : cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex items-start space-x-3.5 pb-4 border-b border-warm-100 last:border-b-0"
              >
                {/* Product Thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover object-top rounded-lg bg-warm-100 border border-warm-200 shrink-0"
                />

                {/* Info */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-serif text-sm font-medium text-warm-900 line-clamp-1">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-warm-400 hover:text-red-500 p-0.5 ml-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] text-warm-500 font-sans">
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    {item.selectedColor && (
                      <>
                        <span>·</span>
                        <span>{item.selectedColor}</span>
                      </>
                    )}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-warm-200 rounded-md bg-cream-50 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-warm-600 hover:text-warm-900 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 font-sans font-semibold text-warm-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-warm-600 hover:text-warm-900 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-sans text-sm font-bold text-warm-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-cream-100 mx-auto flex items-center justify-center text-warm-400">
                <ShoppingBag size={24} />
              </div>
              <p className="font-serif text-lg text-warm-800">Your shopping bag is empty</p>
              <p className="text-xs font-sans text-warm-500 max-w-xs mx-auto">
                Explore our women's collection, cozy kids essentials, or luxury bedsheets to add to your bag.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="px-6 py-2.5 rounded-xl bg-warm-900 text-cream-50 text-xs font-sans font-semibold tracking-wider uppercase hover:bg-warm-800 transition-colors"
              >
                Browse Store Products
              </button>
            </div>
          )}
        </div>

        {/* Footer Subtotal & Action */}
        {cart.length > 0 && !checkoutSuccess && (
          <div className="p-5 border-t border-warm-200/80 bg-cream-50/80 space-y-3 font-sans">
            <div className="space-y-1.5 text-xs text-warm-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-warm-900">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shippingAmount === 0 ? <strong className="text-green-600">FREE</strong> : `₹${shippingAmount}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-warm-900 pt-1 border-t border-warm-200">
                <span>Total Amount:</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Direct WhatsApp Checkout Button */}
            <a
              href={getWhatsAppCheckoutUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-sm transition-colors"
            >
              <MessageCircle size={16} />
              <span>Checkout via WhatsApp</span>
            </a>

            {/* Quick Standard Order */}
            <button
              onClick={handleStandardCheckout}
              className="w-full py-3 px-4 rounded-xl border border-warm-300 hover:border-warm-900 text-warm-800 text-xs font-sans font-medium transition-colors text-center"
            >
              Confirm Order for Cash on Delivery / Studio Pickup
            </button>

            <p className="text-[10px] text-center text-warm-500 pt-1 flex items-center justify-center space-x-1">
              <ShieldCheck size={12} className="text-warm-400" />
              <span>100% Secure Checkout · Direct Support: {STORE_INFO.phone}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
