import React from 'react';
import { Smartphone, Clock, CheckCircle2, Zap, Coffee, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { navigateTo } = useApp();

  const steps = [
    {
      step: '01',
      title: 'Select Your Meal & Timing',
      desc: 'Browse 25+ canteen items during your lecture or free hour. Pick your exact break time slot (e.g. 12:45 PM Lunch Break).',
      icon: Smartphone,
    },
    {
      step: '02',
      title: 'Instant Order & Token Generation',
      desc: 'Confirm your order with Pay-at-Counter or Demo UPI. Receive a unique digital token ID (e.g., #MM-78210) right away.',
      icon: Zap,
    },
    {
      step: '03',
      title: 'Express Counter Pickup',
      desc: 'Head to Counter 1 (Meals) or Counter 2 (Tiffin). Flash your token to the staff and pick up your hot, freshly packed meal.',
      icon: CheckCircle2,
    },
  ];

  const benefits = [
    {
      title: 'No Crowded Token Queues',
      desc: 'Never spend 20 minutes of your 30-minute break crushed in the billing line.',
      icon: Clock,
    },
    {
      title: 'Guaranteed Hot & Fresh Food',
      desc: 'The kitchen prepares items right before your scheduled pickup slot.',
      icon: Coffee,
    },
    {
      title: 'Zero Food Wastage',
      desc: 'Helps the campus canteen manage inventory and prepare exact portion numbers.',
      icon: Shield,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
            Simple 3-Step Experience
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            How MealMate Works
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Engineered specifically to solve the peak rush hour bottleneck in college cafeterias.
          </p>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-20">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative bg-stone-50/70 border border-stone-200/90 rounded-2xl p-7 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-3xl font-extrabold text-orange-600/30 tabular-nums">
                    {s.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Benefits Strip */}
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-12 text-white">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Campus Benefits
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1 text-white">
              Why Students & Faculty Love MealMate
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const BIcon = b.icon;
              return (
                <div key={i} className="space-y-2.5">
                  <div className="w-10 h-10 rounded-lg bg-stone-800 text-amber-400 flex items-center justify-center">
                    <BIcon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-stone-100">{b.title}</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-400">
              Ready to experience express canteen pre-ordering?
            </p>
            <button
              onClick={() => navigateTo('menu')}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
            >
              Start Your Pre-Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
