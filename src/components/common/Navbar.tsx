import React, { useState } from 'react';
import {
  ShoppingBag,
  UtensilsCrossed,
  User,
  LogOut,
  ShieldCheck,
  Menu as MenuIcon,
  X,
  Search,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    currentView,
    navigateTo,
    cartCount,
    currentUser,
    logout,
    switchUserRole,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (view: any) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner: Canteen Open Status & Demo Notice */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-amber-400 font-semibold flex items-center gap-1.5 shrink-0">
              <Clock className="w-3.5 h-3.5" /> Open Today: 7:30 AM – 8:30 PM
            </span>
            <span className="hidden sm:inline text-stone-500">|</span>
            <span className="hidden sm:inline text-stone-400">
              Campus Main Food Court (Block B) · Average Counter Prep: 8 mins
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-stone-400 text-[11px] hidden md:inline">
              Demo Mode · Data stored on this device
            </span>
            <button
              onClick={() => switchUserRole(currentUser?.role === 'admin' ? 'student' : 'admin')}
              className="text-[11px] font-medium text-amber-300 hover:text-amber-200 underline underline-offset-2 ml-1"
              title="Click to toggle between Student and Admin perspective"
            >
              Switch to {currentUser?.role === 'admin' ? 'Student' : 'Admin'} Mode
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-sm group-hover:bg-orange-700 transition-colors">
              <UtensilsCrossed className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
                MealMate
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-stone-500 -mt-1">
                College Canteen
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-orange-600 ${
                currentView === 'home' ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-orange-600 ${
                currentView === 'menu' ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => handleNavClick('orders')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-orange-600 ${
                currentView === 'orders' ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              My Orders
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-orange-600 ${
                currentView === 'about' ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              About Project
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-orange-600 ${
                currentView === 'admin' ? 'text-orange-600 font-semibold' : 'text-stone-500'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Admin Console</span>
            </button>
          </nav>

          {/* Zone 3: Search, Cart & User Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Search Shortcut */}
            <div className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search canteen dishes..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'menu') navigateTo('menu');
                }}
                className="w-48 xl:w-56 pl-9 pr-3 py-1.5 text-xs bg-stone-100 rounded-lg border border-transparent focus:border-orange-500 focus:bg-white focus:outline-none transition-all placeholder:text-stone-400"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-2 pointer-events-none" />
            </div>

            {/* Cart Button */}
            <button
              onClick={() => handleNavClick('cart')}
              className="relative p-2.5 text-stone-700 hover:text-orange-600 hover:bg-stone-100 rounded-xl transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label={`View cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown or Sign In */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-stone-200 hover:border-orange-300 hover:bg-orange-50/50 transition-colors text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 font-semibold flex items-center justify-center text-xs">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-semibold text-stone-900 leading-tight line-clamp-1 max-w-[120px]">
                      {currentUser.fullName}
                    </p>
                    <p className="text-[10px] text-stone-500 leading-tight">
                      {currentUser.role === 'admin' ? 'Canteen Admin' : currentUser.registerNumber}
                    </p>
                  </div>
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs text-stone-500">Signed in as</p>
                      <p className="text-sm font-semibold text-stone-900 truncate">
                        {currentUser.fullName}
                      </p>
                      <p className="text-xs text-stone-500 font-mono">
                        {currentUser.collegeEmail}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        handleNavClick('orders');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      My Orders & Tracking
                    </button>

                    <button
                      onClick={() => {
                        handleNavClick('admin');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      Admin Canteen Dashboard
                    </button>

                    <div className="border-t border-stone-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="px-4 py-2 text-xs font-semibold text-white bg-orange-600 rounded-xl hover:bg-orange-700 transition-colors shadow-sm whitespace-nowrap"
              >
                Sign In / Register
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 focus-visible:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search food items..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  navigateTo('menu');
                }}
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-100 rounded-lg border border-stone-200 focus:outline-none"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            </div>

            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentView === 'home' ? 'bg-orange-50 text-orange-600' : 'text-stone-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('menu')}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentView === 'menu' ? 'bg-orange-50 text-orange-600' : 'text-stone-700'
                }`}
              >
                Canteen Menu
              </button>
              <button
                onClick={() => handleNavClick('orders')}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentView === 'orders' ? 'bg-orange-50 text-orange-600' : 'text-stone-700'
                }`}
              >
                My Orders & Live Tracking
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                  currentView === 'admin' ? 'bg-orange-50 text-orange-600' : 'text-stone-700'
                }`}
              >
                <span>Admin Canteen Portal</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">
                  STAFF
                </span>
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentView === 'about' ? 'bg-orange-50 text-orange-600' : 'text-stone-700'
                }`}
              >
                About Project & Architecture
              </button>
            </nav>

            {!currentUser && (
              <div className="pt-2 border-t border-stone-100 flex gap-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="flex-1 py-2 text-center text-sm font-medium bg-orange-600 text-white rounded-lg"
                >
                  Student Login
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="flex-1 py-2 text-center text-sm font-medium border border-stone-300 rounded-lg"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};
