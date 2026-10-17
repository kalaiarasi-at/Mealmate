import React from 'react';
import { ArrowRight, Clock, ShieldCheck, Flame, Zap, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FoodImage } from '../common/FoodImage';

export const Hero: React.FC = () => {
  const { navigateTo, menu, addToCart } = useApp();

  // Find a popular special dish for the interactive hero preview card
  const heroDish = menu.find((item) => item.id === 'dish-1') || menu[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100/70 via-stone-50 to-stone-50 pt-10 pb-16 lg:py-20 border-b border-stone-200">
      {/* Background glow circle */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-orange-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Call-To-Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold tracking-wide border border-orange-200">
              <Zap className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
              <span>Smart Pre-Order Campus System</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.1] text-balance">
              Good Food. <br />
              <span className="text-orange-600">Less Waiting.</span> <br />
              More Living.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
              Skip the noisy canteen stampede during break time. Browse today's live menu, pre-order in 30 seconds, and collect piping-hot meals directly from Counter 1 & 2 the moment your bell rings.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('menu')}
                className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>Explore Canteen Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('orders')}
                className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm rounded-xl border border-stone-300 shadow-sm transition-all flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-stone-500" />
                <span>Track Active Order</span>
              </button>
            </div>

            {/* Adjacent Trust Metrics */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4">
              <div>
                <p className="font-display text-2xl font-bold text-stone-900 tabular-nums">8 min</p>
                <p className="text-xs text-stone-500 font-medium">Avg. Pickup Time</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-stone-900 tabular-nums">25+</p>
                <p className="text-xs text-stone-500 font-medium">Fresh Daily Dishes</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-stone-900 tabular-nums">0 min</p>
                <p className="text-xs text-stone-500 font-medium">Counter Queue Time</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-4 shadow-xl border border-stone-200/90 transition-all">
              {/* Highlight badge */}
              <div className="absolute top-7 left-7 z-10 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900/85 backdrop-blur-md text-white text-xs font-medium shadow-sm">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Today's Morning Favourite</span>
              </div>

              {/* Main Food Picture */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
                <FoodImage
                  src={heroDish.image}
                  alt={heroDish.name}
                  category={heroDish.category}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Meta details */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                      <span className="w-3.5 h-3.5 border border-emerald-600 p-0.5 flex items-center justify-center rounded-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 block"></span>
                      </span>
                      <span>{heroDish.category}</span>
                      <span>·</span>
                      <span>{heroDish.preparationTimeMinutes} mins prep</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-stone-900">
                      {heroDish.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-xl font-extrabold text-orange-600 tabular-nums">
                      ₹{heroDish.price}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-500 line-clamp-2">
                  {heroDish.description}
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => addToCart(heroDish)}
                    className="flex-1 py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Quick Add to Tray</span>
                    <span>·</span>
                    <span className="tabular-nums">₹{heroDish.price}</span>
                  </button>

                  <button
                    onClick={() => navigateTo('menu')}
                    className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl transition-all"
                  >
                    View Menu
                  </button>
                </div>
              </div>

              {/* Live Canteen Token floating micro-card */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-2xl p-3 shadow-lg border border-stone-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-stone-900">Token #MM-78210 Ready</p>
                  <p className="text-[10px] text-stone-500">Collect at Counter 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
