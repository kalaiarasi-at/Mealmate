import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Sneha R.',
      role: 'Final Year CSE Student',
      rating: 5,
      content:
        'Between back-to-back lab practicals, we used to get only 20 minutes for lunch. Standing in the token queue took 15 minutes! With MealMate, I pre-order the Veg Thali at 12:15 PM and pick it up hot at Counter 1 at 12:45 PM.',
    },
    {
      name: 'Dr. K. Senthil Kumar',
      role: 'Associate Professor, Mechanical Dept.',
      rating: 5,
      content:
        'Faculty members usually avoid the cafeteria during peak student rush hours due to the sheer noise and long lines. MealMate enables us to schedule our filter coffee and light snack right before department meetings. Truly transforms campus life.',
    },
    {
      name: 'Rohan Deshmukh',
      role: 'Hostel Representative (2nd Year EEE)',
      rating: 5,
      content:
        'The live status tracking is the best feature. You know whether the kitchen is preparing or if your order is already packed at Counter 2. No more standing around guessing or getting cold samosas.',
    },
  ];

  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
            Campus Feedback
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Loved by Students & Faculty
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Real experiences from students and campus staff using MealMate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 text-amber-500 fill-amber-500"
                      />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-stone-300" />
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                  "{r.content}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 font-bold flex items-center justify-center text-xs">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{r.name}</h4>
                  <p className="text-[11px] text-stone-500">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
