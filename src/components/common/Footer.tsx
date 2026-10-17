import React from 'react';
import { UtensilsCrossed, Clock, MapPin, Phone, ShieldCheck, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo, resetToInitialDemoData } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                MealMate
              </span>
            </div>
            <p className="text-sm text-stone-400 font-medium italic">
              “Good Food. Less Waiting. More Living.”
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              Smart college canteen pre-ordering ecosystem designed to eliminate counter crowding, shorten lunch recess bottlenecks, and serve students hot, freshly prepared meals on time.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-4">
              Explore Canteen
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => navigateTo('menu')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Full Food Menu (25+ Dishes)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('orders')}
                  className="hover:text-amber-400 transition-colors"
                >
                  My Orders & Live Pickup Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('cart')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Shopping Tray & Checkout
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  Canteen Staff Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  UI/UX Project Documentation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Canteen Location & Hours */}
          <div>
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-4">
              Canteen Hours & Counters
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-200">Daily Operating Hours</p>
                  <p>Breakfast: 7:30 AM – 10:30 AM</p>
                  <p>Lunch Meals: 12:00 PM – 2:30 PM</p>
                  <p>Evening Snacks: 3:30 PM – 8:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-200">Campus Food Court</p>
                  <p>Block B Ground Floor, Central Plaza</p>
                  <p className="text-stone-500">Counter 1: Meals · Counter 2: Tiffin & Coffee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Academic Project & Faculty Demo Helper */}
          <div>
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-4">
              Academic UI/UX Project
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Built as a comprehensive responsive web application demonstrating human-centered design, zero-waiting service queuing, and state persistence.
            </p>
            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-stone-300 font-medium">Evaluation Demo State</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded font-mono">
                  ACTIVE
                </span>
              </div>
              <button
                onClick={resetToInitialDemoData}
                className="w-full py-1.5 px-3 bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                title="Reset sample menu items and demo orders"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Sample Data
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 MealMate · Academic UI/UX Demonstration · All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>React + TypeScript + Vite</span>
            <span>·</span>
            <span>Local Demo Persistence</span>
            <span>·</span>
            <span>Desktop & Mobile Optimized</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
