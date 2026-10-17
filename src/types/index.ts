export type FoodCategory =
  | 'All'
  | 'Breakfast'
  | 'Meals'
  | 'Snacks'
  | 'Beverages'
  | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  isVeg: boolean;
  isAvailable: boolean;
  isSpecial?: boolean;
  isPopular?: boolean;
  preparationTimeMinutes: number;
  calories?: number;
  image: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialNote?: string;
}

export type OrderStatus =
  | 'placed'
  | 'accepted'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 'pay_at_canteen' | 'demo_upi';

export interface OrderItemDetail {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

export interface Order {
  id: string;
  studentName: string;
  registerNumber: string;
  collegeEmail: string;
  department: string;
  yearOfStudy: string;
  contactNumber: string;
  pickupDate: string;
  pickupTime: string;
  counterNumber: string;
  specialInstructions?: string;
  items: OrderItemDetail[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'simulated_paid';
  status: OrderStatus;
  createdAt: string;
  estimatedReadyAt: string;
  cancellationReason?: string;
}

export interface StudentUser {
  id: string;
  fullName: string;
  registerNumber: string;
  collegeEmail: string;
  department: string;
  yearOfStudy: string;
  phoneNumber?: string;
  role: 'student' | 'admin';
  createdAt: string;
}

export type AppView =
  | 'home'
  | 'menu'
  | 'cart'
  | 'checkout'
  | 'confirmation'
  | 'orders'
  | 'admin'
  | 'login'
  | 'register'
  | 'about';
