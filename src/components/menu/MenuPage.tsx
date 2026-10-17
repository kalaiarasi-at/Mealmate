import React, { useMemo } from 'react';
import {
  Search,
  Filter,
  Star,
  Clock,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  SlidersHorizontal,
  Flame,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FoodCategory, MenuItem } from '../../types';
import { FoodImage } from '../common/FoodImage';

export const MenuPage: React.FC = () => {
  const {
    menu,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    vegOnlyFilter,
    setVegOnlyFilter,
    sortBy,
    setSortBy,
    cart,
    addToCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    navigateTo,
  } = useApp();

  const categories: FoodCategory[] = [
    'All',
    'Breakfast',
    'Meals',
    'Snacks',
    'Beverages',
    'Desserts',
  ];

  // Filtering and Sorting logic
  const filteredDishes = useMemo(() => {
    return menu
      .filter((dish) => {
        // Category filter
        if (activeCategory !== 'All' && dish.category !== activeCategory) {
          return false;
        }
        // Veg only filter
        if (vegOnlyFilter && !dish.isVeg) {
          return false;
        }
        // Search query filter (matches name, description, category)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = dish.name.toLowerCase().includes(query);
          const matchDesc = dish.description.toLowerCase().includes(query);
          const matchCat = dish.category.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchCat) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
        // Default 'featured'
        if (a.isSpecial && !b.isSpecial) return -1;
        if (!a.isSpecial && b.isSpecial) return 1;
        return 0;
      });
  }, [menu, activeCategory, vegOnlyFilter, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setVegOnlyFilter(false);
    setSortBy('featured');
  };

  return (
    <div className="py-8 lg:py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">
                Campus Food Court · Fresh Prep Daily
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Canteen Food Menu
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Showing {filteredDishes.length} freshly prepared Indian dishes & beverages.
              </p>
            </div>

            {/* Quick Actions / Active Cart Pill */}
            {cartCount > 0 && (
              <button
                onClick={() => navigateTo('cart')}
                className="self-start md:self-auto px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-2.5 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  Tray ({cartCount} items) · ₹{cartSubtotal}
                </span>
                <span className="bg-orange-700/60 px-2 py-0.5 rounded text-[11px]">
                  Proceed &rarr;
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Search, Filter Bar & Sorting */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by dish name, e.g. Dosa, Biryani, Coffee, Samosa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-orange-500 focus:outline-none transition-all placeholder:text-stone-400"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Veg Only Toggle */}
            <label className="inline-flex items-center gap-2 cursor-pointer select-none bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 hover:bg-stone-100 transition-colors shrink-0">
              <input
                type="checkbox"
                checked={vegOnlyFilter}
                onChange={(e) => setVegOnlyFilter(e.target.checked)}
                className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 border border-emerald-600 p-0.5 flex items-center justify-center rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block"></span>
                </span>
                Pure Veg Only
              </span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <label htmlFor="sort-select" className="text-xs text-stone-500 font-medium whitespace-nowrap">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-stone-800 bg-transparent focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured">Featured / Specials</option>
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-stone-100">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
                  activeCategory === category
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {category === 'All' ? 'All Dishes' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredDishes.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
              No matching canteen dishes
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
              We couldn't find any dish matching "{searchQuery || activeCategory}". Try searching for idli, dosa, noodles, or clear your filters.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Food Items Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => {
              const cartItem = cart.find((ci) => ci.menuItem.id === dish.id);
              const quantityInCart = cartItem?.quantity || 0;

              return (
                <div
                  key={dish.id}
                  className={`bg-white rounded-2xl border transition-all flex flex-col justify-between overflow-hidden group ${
                    !dish.isAvailable
                      ? 'border-stone-200 opacity-75'
                      : 'border-stone-200 hover:border-orange-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Image Area with badges */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <FoodImage
                        src={dish.image}
                        alt={dish.name}
                        category={dish.category}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Veg / Non-veg symbol */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-1 rounded-md shadow-sm">
                        <div className="w-4 h-4 border-2 border-emerald-600 flex items-center justify-center rounded-sm">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        </div>
                      </div>

                      {/* Sold out overlay */}
                      {!dish.isAvailable && (
                        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[1px] flex items-center justify-center">
                          <span className="bg-rose-600 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
                            Sold Out for Today
                          </span>
                        </div>
                      )}

                      {/* Special or Popular Badge */}
                      {dish.isAvailable && dish.isSpecial && (
                        <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-stone-950" />
                          <span>Special</span>
                        </div>
                      )}

                      {/* Prep time badge */}
                      <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{dish.preparationTimeMinutes}m prep</span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span className="font-semibold uppercase tracking-wider text-[10px] text-orange-600">
                          {dish.category}
                        </span>
                        <div className="flex items-center gap-1 text-stone-700 font-semibold text-xs">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="tabular-nums">{dish.rating}</span>
                          <span className="text-stone-400 font-normal">({dish.reviewCount})</span>
                        </div>
                      </div>

                      <h3 className="font-display text-base font-bold text-stone-900 line-clamp-1">
                        {dish.name}
                      </h3>

                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Add to Cart Section */}
                  <div className="p-4 pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Canteen Price
                      </span>
                      <span className="font-display text-xl font-bold text-stone-900 tabular-nums">
                        ₹{dish.price}
                      </span>
                    </div>

                    {/* Interactive Quantity / Add to Cart Controls */}
                    {!dish.isAvailable ? (
                      <span className="text-xs font-semibold text-stone-400 px-3 py-1.5 bg-stone-100 rounded-xl">
                        Unavailable
                      </span>
                    ) : quantityInCart > 0 ? (
                      <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(dish.id, -1)}
                          className="w-7 h-7 rounded-lg bg-white text-orange-700 hover:bg-orange-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-display font-bold text-xs text-orange-900 min-w-4 text-center tabular-nums">
                          {quantityInCart}
                        </span>
                        <button
                          onClick={() => addToCart(dish, 1)}
                          className="w-7 h-7 rounded-lg bg-orange-600 text-white hover:bg-orange-700 flex items-center justify-center transition-colors shadow-xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(dish)}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Tray</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating bottom checkout pill when cart has items */}
        {cartCount > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-md animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-stone-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center justify-between border border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                  {cartCount}
                </div>
                <div>
                  <p className="text-xs text-stone-400">Total in Tray</p>
                  <p className="text-sm font-bold text-white tabular-nums">
                    ₹{cartSubtotal}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('cart')}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>Review Tray</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
