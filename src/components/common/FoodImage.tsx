import React, { useState } from 'react';
import { Utensils, Coffee, Cake, Flame, Salad } from 'lucide-react';
import { FoodCategory } from '../../types';

interface FoodImageProps {
  src: string;
  alt: string;
  category?: FoodCategory;
  className?: string;
  isVeg?: boolean;
}

export const FoodImage: React.FC<FoodImageProps> = ({
  src,
  alt,
  category = 'Meals',
  className = 'w-full h-48 object-cover',
  isVeg = true,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCategoryTheme = (cat: FoodCategory) => {
    switch (cat) {
      case 'Breakfast':
        return {
          icon: Salad,
          bg: 'from-amber-100 to-orange-100',
          accent: 'text-amber-800',
          label: 'Fresh Breakfast',
        };
      case 'Meals':
        return {
          icon: Utensils,
          bg: 'from-orange-100 to-amber-100',
          accent: 'text-orange-900',
          label: 'Executive Meal',
        };
      case 'Snacks':
        return {
          icon: Flame,
          bg: 'from-amber-100 to-yellow-100',
          accent: 'text-amber-900',
          label: 'Crispy Snack',
        };
      case 'Beverages':
        return {
          icon: Coffee,
          bg: 'from-stone-200 to-amber-100',
          accent: 'text-stone-800',
          label: 'Fresh Brewed',
        };
      case 'Desserts':
        return {
          icon: Cake,
          bg: 'from-rose-100 to-orange-100',
          accent: 'text-rose-900',
          label: 'Sweet Treat',
        };
      default:
        return {
          icon: Utensils,
          bg: 'from-orange-100 to-stone-100',
          accent: 'text-orange-800',
          label: 'Canteen Kitchen',
        };
    }
  };

  const theme = getCategoryTheme(category);
  const IconComponent = theme.icon;

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br ${theme.bg} flex flex-col items-center justify-center p-4 relative overflow-hidden select-none ${className}`}
      >
        <div className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm flex items-center justify-center text-orange-600 mb-2">
          <IconComponent className="w-6 h-6 stroke-[1.75]" />
        </div>
        <p className={`text-xs font-semibold tracking-wide uppercase ${theme.accent} text-center line-clamp-1`}>
          {theme.label}
        </p>
        <p className="text-xs text-stone-600 text-center font-medium line-clamp-1 mt-0.5 max-w-[85%]">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
          <Utensils className="w-6 h-6 text-stone-400 animate-bounce" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
