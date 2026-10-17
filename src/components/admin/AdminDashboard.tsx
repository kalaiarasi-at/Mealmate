import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Clock,
  Package,
  ChefHat,
  CheckCircle,
  Plus,
  Edit2,
  Trash2,
  Search,
  Eye,
  EyeOff,
  Filter,
  DollarSign,
  AlertTriangle,
  X,
  UtensilsCrossed,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MenuItem, OrderStatus, FoodCategory } from '../../types';
import { FoodImage } from '../common/FoodImage';

export const AdminDashboard: React.FC = () => {
  const {
    menu,
    orders,
    updateOrderStatus,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    currentUser,
    switchUserRole,
    navigateTo,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Menu Modal State (Add / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form State for Menu Item
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 50,
    category: 'Breakfast' as FoodCategory,
    isVeg: true,
    isAvailable: true,
    preparationTimeMinutes: 8,
    calories: 300,
    image: '',
  });

  // Calculate Metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'placed' || o.status === 'accepted').length;
  const preparingOrders = orders.filter((o) => o.status === 'preparing').length;
  const readyOrCompleted = orders.filter((o) => o.status === 'ready' || o.status === 'completed').length;
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'cancelled' ? sum + o.totalAmount : sum), 0);

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.studentName.toLowerCase().includes(q) ||
        o.registerNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: 50,
      category: 'Breakfast',
      isVeg: true,
      isAvailable: true,
      preparationTimeMinutes: 8,
      calories: 300,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      isVeg: item.isVeg,
      isAvailable: item.isAvailable,
      preparationTimeMinutes: item.preparationTimeMinutes,
      calories: item.calories || 300,
      image: item.image,
    });
    setIsModalOpen(true);
  };

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.price <= 0) {
      showToast('Please provide a valid dish name and price.', 'error');
      return;
    }

    if (editingItem) {
      updateMenuItem({
        ...editingItem,
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category,
        isVeg: formData.isVeg,
        isAvailable: formData.isAvailable,
        preparationTimeMinutes: Number(formData.preparationTimeMinutes),
        calories: Number(formData.calories),
        image: formData.image || editingItem.image,
      });
    } else {
      addMenuItem({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category,
        isVeg: formData.isVeg,
        isAvailable: formData.isAvailable,
        preparationTimeMinutes: Number(formData.preparationTimeMinutes),
        calories: Number(formData.calories),
        image:
          formData.image.trim() ||
          'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        reviewCount: 1,
      });
    }

    setIsModalOpen(false);
  };

  const handleDeleteWithConfirm = (item: MenuItem) => {
    if (window.confirm(`Are you sure you want to remove "${item.name}" from the canteen menu?`)) {
      deleteMenuItem(item.id);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header & Role Switcher */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Canteen Supervisor Portal (Demo Mode)</span>
            </div>
            <h1 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight">
              Canteen Staff Kitchen Terminal
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Manage incoming student pre-orders, update kitchen preparation stages, and configure live menu pricing & availability.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {currentUser?.role !== 'admin' && (
              <button
                onClick={() => switchUserRole('admin')}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs"
              >
                Switch to Admin Account
              </button>
            )}
            <button
              onClick={() => navigateTo('menu')}
              className="px-4 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs rounded-xl shadow-xs"
            >
              View Student Menu
            </button>
          </div>
        </div>

        {/* 5 KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Total Pre-Orders
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-black text-stone-900 tabular-nums">
                {totalOrders}
              </span>
              <Package className="w-5 h-5 text-stone-400" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
              Pending Acceptance
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-black text-amber-600 tabular-nums">
                {pendingOrders}
              </span>
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 block mb-1">
              Cooking in Kitchen
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-black text-orange-600 tabular-nums">
                {preparingOrders}
              </span>
              <ChefHat className="w-5 h-5 text-orange-500" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
              Ready / Picked Up
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-black text-emerald-600 tabular-nums">
                {readyOrCompleted}
              </span>
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Today's Volume
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-black text-stone-900 tabular-nums">
                ₹{totalRevenue}
              </span>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Tab Switching: Orders Management vs Menu Management */}
        <div className="flex items-center gap-2 mb-6 border-b border-stone-200 pb-3">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Active Student Orders ({filteredOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'menu'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Manage Food Menu ({menu.length} Dishes)</span>
          </button>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter controls */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search by student name or token #..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['all', 'placed', 'accepted', 'preparing', 'ready', 'completed', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-all ${
                      statusFilter === st
                        ? 'bg-orange-600 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-100/70 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-3.5 px-4">Token ID</th>
                      <th className="py-3.5 px-4">Student & Reg No</th>
                      <th className="py-3.5 px-4">Dishes & Quantities</th>
                      <th className="py-3.5 px-4">Slot & Counter</th>
                      <th className="py-3.5 px-4">Bill</th>
                      <th className="py-3.5 px-4">Current Status</th>
                      <th className="py-3.5 px-4 text-right">Update Stage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-stone-900 whitespace-nowrap">
                          #{ord.id}
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-stone-900">{ord.studentName}</p>
                          <p className="text-[11px] text-stone-500 font-mono">{ord.registerNumber}</p>
                          <p className="text-[10px] text-stone-400">{ord.department}</p>
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          <div className="space-y-1">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="text-stone-700">
                                <span className="font-bold text-stone-900">{it.quantity}×</span> {it.name}
                              </div>
                            ))}
                          </div>
                          {ord.specialInstructions && (
                            <p className="text-[10px] text-amber-700 italic mt-1 bg-amber-50 p-1 rounded">
                              Note: {ord.specialInstructions}
                            </p>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-semibold text-stone-800">{ord.pickupTime}</p>
                          <p className="text-[11px] text-stone-500">{ord.counterNumber}</p>
                        </td>
                        <td className="py-4 px-4 font-bold text-stone-900 tabular-nums whitespace-nowrap">
                          ₹{ord.totalAmount}
                          <span className="block text-[10px] font-normal text-stone-400">
                            {ord.paymentMethod === 'demo_upi' ? 'Demo UPI' : 'Counter Cash'}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full font-bold text-[11px] capitalize ${
                              ord.status === 'ready'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'preparing'
                                ? 'bg-amber-100 text-amber-800'
                                : ord.status === 'completed'
                                ? 'bg-stone-200 text-stone-700'
                                : ord.status === 'cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {ord.status === 'placed' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'accepted')}
                                className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-[11px]"
                              >
                                Accept Order
                              </button>
                            )}
                            {ord.status === 'accepted' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'preparing')}
                                className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg text-[11px]"
                              >
                                Send to Kitchen
                              </button>
                            )}
                            {ord.status === 'preparing' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'ready')}
                                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-[11px]"
                              >
                                Mark Ready
                              </button>
                            )}
                            {ord.status === 'ready' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'completed')}
                                className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-900 text-white font-semibold rounded-lg text-[11px]"
                              >
                                Handed to Student
                              </button>
                            )}
                            {ord.status !== 'completed' && ord.status !== 'cancelled' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'cancelled')}
                                className="px-2 py-1 text-rose-600 hover:bg-rose-50 rounded-lg text-[11px]"
                                title="Cancel this order"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MENU MANAGEMENT */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900">
                  Canteen Food Items & Pricing
                </h3>
                <p className="text-xs text-stone-500">
                  Update item rates, descriptions, mark dishes in/out of stock in real-time.
                </p>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Canteen Dish</span>
              </button>
            </div>

            {/* Menu Items Table */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-100/70 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-3.5 px-4">Dish</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Price (₹)</th>
                      <th className="py-3.5 px-4">Prep Time</th>
                      <th className="py-3.5 px-4">Stock Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {menu.map((dish) => (
                      <tr key={dish.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-stone-200 shrink-0">
                              <FoodImage
                                src={dish.image}
                                alt={dish.name}
                                category={dish.category}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-stone-900">{dish.name}</p>
                              <p className="text-[11px] text-stone-500 line-clamp-1 max-w-sm">
                                {dish.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-semibold text-stone-700">
                          {dish.category}
                        </td>
                        <td className="py-3 px-4 font-bold text-stone-900 tabular-nums">
                          ₹{dish.price}
                        </td>
                        <td className="py-3 px-4 text-stone-600">
                          {dish.preparationTimeMinutes} mins
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleItemAvailability(dish.id)}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                              dish.isAvailable
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                            title="Click to toggle in-stock / sold out"
                          >
                            {dish.isAvailable ? (
                              <>
                                <Eye className="w-3 h-3" />
                                <span>In Stock</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3" />
                                <span>Sold Out</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(dish)}
                              className="p-1.5 text-stone-600 hover:text-orange-600 hover:bg-stone-100 rounded-lg transition-colors"
                              title="Edit dish"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteWithConfirm(dish)}
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete dish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add or Edit Dish */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-stone-200 max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <h3 className="font-display text-lg font-bold text-stone-900">
                  {editingItem ? 'Edit Canteen Dish' : 'Add New Canteen Dish'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveDish} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Dish Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Masala Dosa, Paneer Roll..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as FoodCategory })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="Meals">Meals</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Desserts">Desserts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Price in ₹ (INR) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={5}
                      max={500}
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Description & Ingredients
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Short description of taste, spices, and sides..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Prep Time (Minutes)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={formData.preparationTimeMinutes}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preparationTimeMinutes: Number(e.target.value),
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Calories (kcal)
                    </label>
                    <input
                      type="number"
                      min={20}
                      max={1200}
                      value={formData.calories}
                      onChange={(e) =>
                        setFormData({ ...formData, calories: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isVeg}
                      onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-semibold text-stone-700">Vegetarian Dish</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAvailable}
                      onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                      className="rounded text-orange-600 focus:ring-orange-500"
                    />
                    <span className="font-semibold text-stone-700">Available Today</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 text-stone-600 hover:bg-stone-100 font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-sm"
                  >
                    {editingItem ? 'Save Changes' : 'Create Dish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
