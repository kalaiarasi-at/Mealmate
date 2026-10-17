import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  CartItem,
  Order,
  StudentUser,
  AppView,
  FoodCategory,
  OrderStatus,
  PaymentMethod,
} from '../types';
import { INITIAL_MENU_ITEMS } from '../data/initialMenu';
import { DEMO_STUDENT, DEMO_ADMIN, SAMPLE_ORDERS } from '../data/sampleOrders';

interface ToastInfo {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // Navigation & View
  currentView: AppView;
  navigateTo: (view: AppView, orderId?: string) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;

  // Menu State & Filters
  menu: MenuItem[];
  activeCategory: FoodCategory;
  setActiveCategory: (cat: FoodCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  vegOnlyFilter: boolean;
  setVegOnlyFilter: (val: boolean | ((prev: boolean) => boolean)) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'popular';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'popular') => void;

  // Cart State & Operations
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (item: MenuItem, quantity?: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  // Orders
  orders: Order[];
  placeOrder: (orderPayload: {
    studentName: string;
    registerNumber: string;
    collegeEmail: string;
    department: string;
    yearOfStudy: string;
    contactNumber: string;
    pickupDate: string;
    pickupTime: string;
    specialInstructions?: string;
    paymentMethod: PaymentMethod;
  }) => Promise<{ success: boolean; orderId?: string; error?: string }>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  advanceOrderStatus: (orderId: string) => void;
  cancelOrder: (orderId: string, reason?: string) => void;

  // Admin Menu CRUD
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  toggleItemAvailability: (id: string) => void;

  // Auth & Profile
  currentUser: StudentUser | null;
  login: (regNoOrEmail: string, pass: string) => { success: boolean; message: string };
  register: (user: Omit<StudentUser, 'id' | 'createdAt'>, pass: string) => { success: boolean; message: string };
  logout: () => void;
  switchUserRole: (role: 'student' | 'admin') => void;

  // Notification Toast
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;

  // Data reset for academic demo
  resetToInitialDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  MENU: 'mealmate_menu_v2',
  CART: 'mealmate_cart_v2',
  ORDERS: 'mealmate_orders_v2',
  USER: 'mealmate_current_user_v2',
  USERS: 'mealmate_registered_users_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Filters
  const [activeCategory, setActiveCategory] = useState<FoodCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'popular'>('featured');

  // Menu State with LocalStorage persistence
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.MENU);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MENU_ITEMS;
  });

  // Cart State with LocalStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Orders State with LocalStorage persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SAMPLE_ORDERS;
  });

  // Registered Users (for local demo auth)
  const [registeredUsers, setRegisteredUsers] = useState<StudentUser[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.USERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [DEMO_STUDENT, DEMO_ADMIN];
  });

  // Active Current User
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEMO_STUDENT; // Default logged in as student for instant demo readiness
  });

  // Toast
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3800);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.MENU, JSON.stringify(menu));
    } catch (e) {
      console.warn('LocalStorage error saving menu', e);
    }
  }, [menu]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error saving cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage error saving orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.warn('LocalStorage error saving user', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(registeredUsers));
    } catch (e) {
      console.warn('LocalStorage error saving users', e);
    }
  }, [registeredUsers]);

  // Navigate helper
  const navigateTo = (view: AppView, orderId?: string) => {
    if (orderId) {
      setSelectedOrderId(orderId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.menuItem.price * item.quantity,
    0
  );

  // Cart Actions
  const addToCart = (item: MenuItem, quantity = 1) => {
    if (!item.isAvailable) {
      showToast(`Sorry, "${item.name}" is currently sold out.`, 'error');
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prevCart.map((ci) =>
          ci.menuItem.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }
      return [...prevCart, { menuItem: item, quantity }];
    });

    showToast(`Added ${item.name} to cart!`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((ci) => {
          if (ci.menuItem.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== id));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Orders Actions
  const placeOrder = async (payload: {
    studentName: string;
    registerNumber: string;
    collegeEmail: string;
    department: string;
    yearOfStudy: string;
    contactNumber: string;
    pickupDate: string;
    pickupTime: string;
    specialInstructions?: string;
    paymentMethod: PaymentMethod;
  }) => {
    if (cart.length === 0) {
      return { success: false, error: 'Your cart is empty!' };
    }

    // Check if any item in cart became unavailable
    const unavailableItem = cart.find((ci) => !ci.menuItem.isAvailable);
    if (unavailableItem) {
      return {
        success: false,
        error: `Item "${unavailableItem.menuItem.name}" is no longer available. Please remove it to proceed.`,
      };
    }

    // Generate unique order ID like MM-84912
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `MM-${randomNum}`;

    // Determine counter based on items
    const hasMeals = cart.some((ci) => ci.menuItem.category === 'Meals');
    const counterNumber = hasMeals ? 'Counter 1 (Meals Section)' : 'Counter 2 (Quick Tiffin & Beverages)';

    const orderItems = cart.map((ci) => ({
      id: ci.menuItem.id,
      name: ci.menuItem.name,
      price: ci.menuItem.price,
      quantity: ci.quantity,
      isVeg: ci.menuItem.isVeg,
    }));

    const now = new Date();
    // Estimated ready time: 10 mins from now
    const estTime = new Date(now.getTime() + 12 * 60 * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: orderId,
      studentName: payload.studentName.trim(),
      registerNumber: payload.registerNumber.trim().toUpperCase(),
      collegeEmail: payload.collegeEmail.trim(),
      department: payload.department.trim(),
      yearOfStudy: payload.yearOfStudy,
      contactNumber: payload.contactNumber.trim(),
      pickupDate: payload.pickupDate,
      pickupTime: payload.pickupTime,
      counterNumber,
      specialInstructions: payload.specialInstructions?.trim() || undefined,
      items: orderItems,
      subtotal: cartSubtotal,
      tax: 0,
      totalAmount: cartSubtotal,
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentMethod === 'demo_upi' ? 'simulated_paid' : 'pending',
      status: 'placed',
      createdAt: now.toISOString(),
      estimatedReadyAt: estTime,
    };

    // Save order
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setSelectedOrderId(orderId);
    showToast(`Order #${orderId} placed successfully!`, 'success');

    return { success: true, orderId };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Order ${orderId} updated to ${status.toUpperCase()}`);
  };

  const advanceOrderStatus = (orderId: string) => {
    const statusOrder: OrderStatus[] = ['placed', 'accepted', 'preparing', 'ready', 'completed'];
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const currentIndex = statusOrder.indexOf(ord.status);
        if (currentIndex >= 0 && currentIndex < statusOrder.length - 1) {
          const nextStatus = statusOrder[currentIndex + 1];
          showToast(`Order ${orderId} advanced to ${nextStatus.toUpperCase()}`);
          return { ...ord, status: nextStatus };
        }
        return ord;
      })
    );
  };

  const cancelOrder = (orderId: string, reason = 'Cancelled by user') => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: 'cancelled', cancellationReason: reason } : ord
      )
    );
    showToast(`Order ${orderId} has been cancelled`, 'info');
  };

  // Menu Admin CRUD
  const addMenuItem = (itemData: Omit<MenuItem, 'id'>) => {
    const newId = `dish-${Date.now()}`;
    const newItem: MenuItem = {
      ...itemData,
      id: newId,
    };
    setMenu((prev) => [newItem, ...prev]);
    showToast(`Dish "${newItem.name}" added to menu!`);
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenu((prev) => prev.map((m) => (m.id === item.id ? item : m)));
    showToast(`Updated "${item.name}"`);
  };

  const deleteMenuItem = (id: string) => {
    const item = menu.find((m) => m.id === id);
    setMenu((prev) => prev.filter((m) => m.id !== id));
    showToast(`Deleted "${item?.name || 'Item'}" from menu`, 'info');
  };

  const toggleItemAvailability = (id: string) => {
    setMenu((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextVal = !item.isAvailable;
          showToast(
            `"${item.name}" is now ${nextVal ? 'Available' : 'Marked Out of Stock'}`
          );
          return { ...item, isAvailable: nextVal };
        }
        return item;
      })
    );
  };

  // Auth
  const login = (regNoOrEmail: string, pass: string) => {
    const cleanId = regNoOrEmail.trim().toLowerCase();
    if (!cleanId || !pass) {
      return { success: false, message: 'Please enter both Register Number/Email and Password.' };
    }

    // Check registered users
    const matched = registeredUsers.find(
      (u) =>
        u.collegeEmail.toLowerCase() === cleanId ||
        u.registerNumber.toLowerCase() === cleanId
    );

    if (matched) {
      setCurrentUser(matched);
      showToast(`Welcome back, ${matched.fullName}!`);
      return { success: true, message: 'Login successful' };
    }

    // Demo lenient login: allow any college registration number
    const isRegNum = cleanId.length >= 4;
    if (isRegNum) {
      const newUser: StudentUser = {
        id: `usr-${Date.now()}`,
        fullName: cleanId.toUpperCase(),
        registerNumber: cleanId.toUpperCase(),
        collegeEmail: cleanId.includes('@') ? cleanId : `${cleanId.toLowerCase()}@college.edu`,
        department: 'General Engineering',
        yearOfStudy: '2nd Year',
        role: 'student',
        createdAt: new Date().toISOString(),
      };
      setRegisteredUsers((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
      showToast(`Signed in as ${newUser.fullName}`);
      return { success: true, message: 'Logged in successfully' };
    }

    return { success: false, message: 'Invalid credentials. Please register or use Demo credentials.' };
  };

  const register = (
    userData: Omit<StudentUser, 'id' | 'createdAt'>,
    pass: string
  ) => {
    if (!userData.fullName.trim() || !userData.registerNumber.trim() || !userData.collegeEmail.trim()) {
      return { success: false, message: 'Please complete all required fields.' };
    }

    if (pass.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters long.' };
    }

    // Duplicate check
    const existing = registeredUsers.find(
      (u) =>
        u.registerNumber.toLowerCase() === userData.registerNumber.trim().toLowerCase() ||
        u.collegeEmail.toLowerCase() === userData.collegeEmail.trim().toLowerCase()
    );

    if (existing) {
      return {
        success: false,
        message: 'A student account with this Register Number or Email already exists.',
      };
    }

    const newUser: StudentUser = {
      ...userData,
      id: `usr-${Date.now()}`,
      registerNumber: userData.registerNumber.trim().toUpperCase(),
      createdAt: new Date().toISOString(),
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Account created! Welcome to MealMate, ${newUser.fullName}.`);
    return { success: true, message: 'Registration successful' };
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  const switchUserRole = (role: 'student' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(DEMO_ADMIN);
      showToast('Switched to Canteen Admin role');
    } else {
      setCurrentUser(DEMO_STUDENT);
      showToast('Switched to Student role (Arun Kumar)');
    }
  };

  const resetToInitialDemoData = () => {
    setMenu(INITIAL_MENU_ITEMS);
    setOrders(SAMPLE_ORDERS);
    setCart([]);
    setCurrentUser(DEMO_STUDENT);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.MENU);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CART);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ORDERS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    showToast('Reset to original demo college canteen data!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        navigateTo,
        selectedOrderId,
        setSelectedOrderId,
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
        cartCount,
        cartSubtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        orders,
        placeOrder,
        updateOrderStatus,
        advanceOrderStatus,
        cancelOrder,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability,
        currentUser,
        login,
        register,
        logout,
        switchUserRole,
        toast,
        showToast,
        resetToInitialDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
