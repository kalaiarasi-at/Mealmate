import React from 'react';
import { Utensils, Coffee, Cake, Flame, Salad, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FoodCategory } from '../../types';

interface CategoryItem {
  id: FoodCategory;
  title: string;
  count: string;
  icon: React.ElementType;
  description: string;
  accent: string;
}

export const CategoryRail: React.FC = () => {
  const { setActiveCategory, navigateTo } = useApp();

  const categories: CategoryItem[] = [
    {
      id: 'Breakfast',
      title: 'Breakfast & Tiffin',
      count: '6 items',
      icon: Salad,
      description: 'Ghee dosas, hot idlis, pongal & crispy poori bhaji',
      accent: 'text-amber-700 bg-amber-50 group-hover:bg-amber-100',
    },
    {
      id: 'Meals',
      title: 'Campus Lunch Meals',
      count: '6 items',
      icon: Utensils,
      description: 'Executive thalis, dum biryani, curd rice & combos',
      accent: 'text-orange-700 bg-orange-50 group-hover:bg-orange-100',
    },
    {
      id: 'Snacks',
      title: 'Snacks & Quick Bites',
      count: '6 items',
      icon: Flame,
      description: 'Hot samosas, grilled cheese sandwiches & noodles',
      accent: 'text-red-700 bg-red-50 group-hover:bg-red-100',
    },
    {
      id: 'Beverages',
      title: 'Beverages & Coolers',
      count: '5 items',
      icon: Coffee,
      description: 'Degree filter coffee, cutting chai & fresh lassi',
      accent: 'text-stone-700 bg-stone-100 group-hover:bg-stone-200',
    },
    {
      id: 'Desserts',
      title: 'Desserts & Sweets',
      count: '3 items',
      icon: Cake,
      description: 'Warm gulab jamuns, roasted payasam & mango kulfi',
      accent: 'text-rose-700 bg-rose-50 group-hover:bg-rose-100',
    },
  ];

  const handleSelect = (category: FoodCategory) => {
    setActiveCategory(category);
    navigateTo('menu');
  };

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">
              Campus Dining Categories
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              What are you craving today?
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveCategory('All');
              navigateTo('menu');
            }}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-colors group"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className="group p-5 rounded-2xl border border-stone-200 hover:border-orange-300 hover:shadow-md transition-all text-left bg-stone-50/50 hover:bg-white flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${cat.accent}`}
                  >
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="font-display text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-medium">{cat.count}</span>
                  <span className="text-orange-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explore &rarr;
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
