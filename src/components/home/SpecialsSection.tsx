import React from 'react';
import { Star, Clock, Plus, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FoodImage } from '../common/FoodImage';

export const SpecialsSection: React.FC = () => {
  const { menu, addToCart, cart, navigateTo } = useApp();

  // Pick top 4 featured specials
  const specials = menu.filter((item) => item.isSpecial).slice(0, 4);

  return (
    <section className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-md mb-2">
              <span>Chef's Daily Recommendation</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Today's Canteen Specials
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Cooked fresh in small batches every morning and afternoon.
            </p>
          </div>

          <button
            onClick={() => navigateTo('menu')}
            className="text-xs font-semibold text-stone-700 hover:text-orange-600 bg-white border border-stone-300 hover:border-orange-300 px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            Explore All 25+ Dishes
          </button>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.map((dish) => {
            const inCart = cart.find((c) => c.menuItem.id === dish.id);
            return (
              <div
                key={dish.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <FoodImage
                      src={dish.image}
                      alt={dish.name}
                      category={dish.category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Veg marker */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1 rounded-md shadow-sm">
                      <div className="w-4 h-4 border-2 border-emerald-600 flex items-center justify-center rounded-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      </div>
                    </div>

                    {/* Prep time badge */}
                    <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{dish.preparationTimeMinutes} mins</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-semibold uppercase tracking-wider text-[10px] text-amber-700">
                        {dish.category}
                      </span>
                      <div className="flex items-center gap-1 font-semibold text-stone-700">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="tabular-nums">{dish.rating}</span>
                        <span className="text-stone-400 font-normal">({dish.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-display text-base font-bold text-stone-900 leading-snug line-clamp-1">
                      {dish.name}
                    </h3>

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 mt-2 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      Price
                    </span>
                    <span className="font-display text-lg font-bold text-stone-900 tabular-nums">
                      ₹{dish.price}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(dish)}
                    disabled={!dish.isAvailable}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      !dish.isAvailable
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        : inCart
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm'
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added ({inCart.quantity})</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Tray</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
