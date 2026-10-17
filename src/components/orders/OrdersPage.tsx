import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  Package,
  ChefHat,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';

export const OrdersPage: React.FC = () => {
  const {
    orders,
    currentUser,
    advanceOrderStatus,
    cancelOrder,
    navigateTo,
    setSelectedOrderId,
    showToast,
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Timeline steps
  const steps: { key: OrderStatus; label: string; icon: React.ElementType }[] = [
    { key: 'placed', label: 'Placed', icon: Clock },
    { key: 'accepted', label: 'Accepted', icon: CheckCircle2 },
    { key: 'preparing', label: 'In Kitchen', icon: ChefHat },
    { key: 'ready', label: 'Ready for Pickup', icon: Package },
    { key: 'completed', label: 'Collected', icon: CheckCircle2 },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 0;
      case 'accepted':
        return 1;
      case 'preparing':
        return 2;
      case 'ready':
        return 3;
      case 'completed':
        return 4;
      default:
        return -1;
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((ord) => {
    // If logged in as student, prioritize showing their orders, but allow viewing all in demo if they want
    if (filterStatus !== 'all' && ord.status !== filterStatus) {
      return false;
    }
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        ord.id.toLowerCase().includes(q) ||
        ord.studentName.toLowerCase().includes(q) ||
        ord.registerNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="py-8 sm:py-12 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">
              Live Campus Canteen Queue
            </p>
            <h1 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight">
              My Orders & Live Tracking
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Track kitchen preparation stages and collect your food without waiting at the counter.
            </p>
          </div>

          <button
            onClick={() => navigateTo('menu')}
            className="self-start md:self-auto px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-2 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order More Food</span>
          </button>
        </div>

        {/* Demo Helper Banner for UI/UX Evaluation */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Flame className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Faculty Demo Feature:</span> Click the{' '}
              <span className="font-semibold underline">“Advance Status”</span> button on any active order to simulate the canteen kitchen progressing from Placed &rarr; Accepted &rarr; Preparing &rarr; Ready for Pickup!
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Filter by Order ID (#MM-...)"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['all', 'placed', 'preparing', 'ready', 'completed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize whitespace-nowrap transition-all ${
                  filterStatus === st
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {st === 'all' ? 'All Orders' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto my-8">
            <Clock className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold text-stone-900 mb-1">
              No orders found
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              You haven't placed any orders matching this filter yet.
            </p>
            <button
              onClick={() => navigateTo('menu')}
              className="px-5 py-2.5 bg-orange-600 text-white text-xs font-semibold rounded-xl"
            >
              Explore Menu & Order
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const currentStepIdx = getStepIndex(order.status);
              const isCancelled = order.status === 'cancelled';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:border-orange-200 transition-all"
                >
                  {/* Order Top Bar */}
                  <div className="p-5 sm:px-6 bg-stone-50/60 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-bold text-stone-900 font-mono">
                        #{order.id}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${
                          order.status === 'ready'
                            ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                            : order.status === 'preparing'
                            ? 'bg-amber-100 text-amber-800'
                            : order.status === 'completed'
                            ? 'bg-stone-200 text-stone-700'
                            : order.status === 'cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status === 'ready' ? 'Ready for Pickup!' : order.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-stone-500">
                      <span>Placed: {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>·</span>
                      <span className="font-semibold text-stone-900">{order.counterNumber}</span>
                    </div>
                  </div>

                  {/* Visual Tracking Timeline */}
                  {!isCancelled && (
                    <div className="p-5 sm:p-6 bg-white border-b border-stone-100">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-4">
                        Kitchen Progress Tracker
                      </p>
                      <div className="grid grid-cols-5 gap-2 relative">
                        {steps.map((st, i) => {
                          const StepIcon = st.icon;
                          const isDone = i <= currentStepIdx;
                          const isCurrent = i === currentStepIdx;

                          return (
                            <div key={st.key} className="flex flex-col items-center text-center relative z-10">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                  isCurrent
                                    ? 'bg-orange-600 text-white ring-4 ring-orange-100 shadow'
                                    : isDone
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-stone-100 text-stone-400'
                                }`}
                              >
                                <StepIcon className="w-4 h-4" />
                              </div>
                              <span
                                className={`text-[10px] sm:text-xs mt-2 font-medium leading-tight ${
                                  isCurrent
                                    ? 'text-orange-600 font-bold'
                                    : isDone
                                    ? 'text-stone-900 font-semibold'
                                    : 'text-stone-400'
                                }`}
                              >
                                {st.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {isCancelled && (
                    <div className="p-4 bg-rose-50 text-rose-800 text-xs font-medium flex items-center gap-2 border-b border-rose-100">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>This order was cancelled ({order.cancellationReason || 'by student'}).</span>
                    </div>
                  )}

                  {/* Items List & Summary */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[11px] font-bold text-stone-400 block uppercase">
                          Items Ordered ({order.items.length})
                        </span>
                        <div className="mt-1 space-y-1">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between text-stone-800">
                              <span>
                                <strong className="tabular-nums">{it.quantity}×</strong> {it.name}
                              </span>
                              <span className="font-semibold tabular-nums">
                                ₹{it.price * it.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1 sm:border-l sm:border-stone-100 sm:pl-4">
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase font-bold block">
                            Student Name & Reg No
                          </span>
                          <span className="font-semibold text-stone-900">
                            {order.studentName} ({order.registerNumber})
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase font-bold block">
                            Pickup Window
                          </span>
                          <span className="font-semibold text-stone-900">{order.pickupTime}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase font-bold block">
                            Payment Method
                          </span>
                          <span className="text-stone-700 font-medium">
                            {order.paymentMethod === 'demo_upi' ? 'Demo UPI (Instant Token)' : 'Pay at Counter'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions: View receipt, Advance demo state, Cancel */}
                    <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500 font-medium">Total:</span>
                        <span className="font-display text-lg font-extrabold text-stone-900 tabular-nums">
                          ₹{order.totalAmount}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Simulation trigger */}
                        {!isCancelled && order.status !== 'completed' && (
                          <button
                            onClick={() => advanceOrderStatus(order.id)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                            title="Simulate kitchen staff advancing this order's status"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Advance Status</span>
                          </button>
                        )}

                        {/* View digital token voucher button */}
                        <button
                          onClick={() => {
                            setSelectedOrderId(order.id);
                            navigateTo('confirmation', order.id);
                          }}
                          className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1"
                        >
                          <span>View Digital Token</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>

                        {/* Cancel order if in placed stage */}
                        {order.status === 'placed' && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
