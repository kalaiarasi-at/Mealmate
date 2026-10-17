import React from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Clock,
  ShieldCheck,
  Utensils,
  ChevronLeft,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FoodImage } from '../common/FoodImage';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    navigateTo,
  } = useApp();

  if (cart.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-stone-50">
        <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 text-center shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-2">
            Your Canteen Tray is Empty
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mb-8 leading-relaxed">
            Looks like you haven't added any dishes yet. Explore today's freshly prepared breakfast, meals, snacks, and beverages!
          </p>
          <button
            onClick={() => navigateTo('menu')}
            className="w-full py-3.5 px-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Browse Full Canteen Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Packaging fee is ₹0 (included in college canteen)
  const packagingFee = 0;
  const finalTotal = cartSubtotal + packagingFee;

  // Check if any items in cart are now unavailable
  const hasUnavailableItems = cart.some((c) => !c.menuItem.isAvailable);

  return (
    <div className="py-8 sm:py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Back and Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigateTo('menu')}
              className="text-xs font-semibold text-stone-500 hover:text-stone-900 flex items-center gap-1.5 mb-2 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Food Menu</span>
            </button>
            <h1 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight">
              Your Pre-Order Tray
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Review your selected dishes before proceeding to counter pickup checkout.
            </p>
          </div>

          <button
            onClick={clearCart}
            className="self-start sm:self-auto text-xs font-semibold text-stone-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Entire Tray</span>
          </button>
        </div>

        {/* Unavailable items warning */}
        {hasUnavailableItems && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center justify-between">
            <span>
              One or more items in your cart is currently sold out. Please remove it to proceed to checkout.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 shadow-sm overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
                >
                  {/* Dish Thumbnail & Name */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                      <FoodImage
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        category={item.menuItem.category}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-3.5 h-3.5 border border-emerald-600 p-0.5 flex items-center justify-center rounded-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block"></span>
                        </span>
                        <span className="text-[11px] font-semibold text-orange-600 uppercase">
                          {item.menuItem.category}
                        </span>
                      </div>
                      <h3 className="font-display text-base font-bold text-stone-900 leading-snug">
                        {item.menuItem.name}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium tabular-nums mt-0.5">
                        ₹{item.menuItem.price} each
                      </p>
                      {!item.menuItem.isAvailable && (
                        <p className="text-xs font-semibold text-rose-600 mt-1">
                          Sold Out — Please remove
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper & Price Calculation */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <div className="flex items-center gap-2 bg-stone-100 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.menuItem.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white text-stone-700 hover:bg-orange-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-display font-bold text-xs text-stone-900 min-w-5 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.menuItem.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white text-stone-700 hover:bg-orange-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <span className="font-display text-base font-bold text-stone-900 tabular-nums">
                        ₹{item.menuItem.price * item.quantity}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.menuItem.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick add more dishes suggestion */}
            <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Utensils className="w-5 h-5 text-orange-600 shrink-0" />
                <p className="text-xs text-stone-700 font-medium">
                  Forgot filter coffee, cutting chai, or a dessert sweet?
                </p>
              </div>
              <button
                onClick={() => navigateTo('menu')}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 whitespace-nowrap"
              >
                + Add More Dishes
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Action (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
              <h3 className="font-display text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
                Order Bill Summary
              </h3>

              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex items-center justify-between">
                  <span>Items Subtotal ({cartCount} dishes)</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    ₹{cartSubtotal}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Canteen Packaging & Parcel</span>
                  <span className="font-semibold text-emerald-600 uppercase">
                    FREE (₹0)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Student Concession Tax</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    ₹0
                  </span>
                </div>

                <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-sm">
                  <span className="font-bold text-stone-900">Total Payable</span>
                  <span className="font-display text-2xl font-extrabold text-orange-600 tabular-nums">
                    ₹{finalTotal}
                  </span>
                </div>
              </div>

              {/* Express counter pickup guarantee note */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-500 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-stone-700">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  <span>Express Canteen Pickup</span>
                </div>
                <p>
                  You will receive a unique token number. Food will be kept ready at Counter 1 or 2.
                </p>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => navigateTo('checkout')}
                disabled={hasUnavailableItems}
                className={`w-full py-3.5 px-6 font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                  hasUnavailableItems
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-700 text-white'
                }`}
              >
                <span>Proceed to Student Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
