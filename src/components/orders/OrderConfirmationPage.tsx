import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  Clock,
  MapPin,
  QrCode,
  ArrowRight,
  ShoppingBag,
  Printer,
  Sparkles,
  AlertCircle,
  Copy,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OrderConfirmationPage: React.FC = () => {
  const { orders, selectedOrderId, navigateTo, showToast } = useApp();

  // Find the placed order
  const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

  useEffect(() => {
    // Launch celebratory confetti upon arriving at confirmation
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#f59e0b', '#10b981', '#3b82f6'],
      });
    } catch {
      // safe fallback if canvas is unavailable
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-stone-50 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-stone-900 mb-2">
          Order Not Found
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mb-6 max-w-sm">
          We couldn't retrieve the requested order details. Please check your order history.
        </p>
        <button
          onClick={() => navigateTo('orders')}
          className="px-6 py-3 bg-orange-600 text-white font-semibold text-xs rounded-xl"
        >
          View My Orders
        </button>
      </div>
    );
  }

  const copyOrderId = () => {
    try {
      navigator.clipboard.writeText(order.id);
      showToast(`Copied Order Token #${order.id} to clipboard!`);
    } catch {
      showToast(`Order Token: #${order.id}`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 lg:py-16 bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-8">
        {/* Large Prominent Success Banner */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-lg text-center relative overflow-hidden mb-8">
          {/* Subtle decorative background circle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-b from-emerald-100/50 to-transparent rounded-full blur-2xl -z-10" />

          {/* Large Success Checkmark */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
            <CheckCircle className="w-10 h-10 stroke-[2.25]" />
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1">
            Confirmed & Queued
          </p>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
            ORDER PLACED SUCCESSFULLY!
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
            Your pre-order has been securely registered in the campus canteen database. Show your token ID at the pickup counter.
          </p>

          {/* Token Voucher Box */}
          <div className="mt-8 p-6 bg-stone-900 text-white rounded-2xl max-w-md mx-auto shadow-md relative border border-stone-800">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                  Digital Canteen Token
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-display text-2xl sm:text-3xl font-black text-amber-400 tracking-wider tabular-nums font-mono">
                    #{order.id}
                  </span>
                  <button
                    onClick={copyOrderId}
                    className="p-1 text-stone-400 hover:text-white transition-colors"
                    title="Copy Token ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scannable Simulated QR representation */}
              <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center text-stone-900">
                <QrCode className="w-11 h-11" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 text-left text-xs">
              <div>
                <span className="text-stone-400 text-[10px] block">Pickup Window</span>
                <span className="font-semibold text-stone-100">{order.pickupTime}</span>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] block">Designated Counter</span>
                <span className="font-semibold text-amber-400">{order.counterNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Order Receipt Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 mb-8">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <h2 className="font-display text-lg font-bold text-stone-900">
              Order Receipt & Details
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 capitalize">
                Status: {order.status}
              </span>
            </div>
          </div>

          {/* Student & College Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-stone-50 text-xs border border-stone-200/60">
            <div>
              <span className="text-stone-400 text-[11px] block">Student Name</span>
              <span className="font-bold text-stone-900 text-sm">{order.studentName}</span>
            </div>
            <div>
              <span className="text-stone-400 text-[11px] block">Register Number</span>
              <span className="font-mono font-bold text-stone-900 text-sm uppercase">
                {order.registerNumber}
              </span>
            </div>
            <div>
              <span className="text-stone-400 text-[11px] block">Department & Year</span>
              <span className="text-stone-700 font-medium">
                {order.department} ({order.yearOfStudy})
              </span>
            </div>
            <div>
              <span className="text-stone-400 text-[11px] block">Contact Mobile</span>
              <span className="text-stone-700 font-mono">{order.contactNumber}</span>
            </div>
          </div>

          {/* Ordered Food Items List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Ordered Food Items
            </h3>
            <div className="divide-y divide-stone-100 border-t border-b border-stone-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 border border-emerald-600 p-0.5 flex items-center justify-center rounded-sm shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block"></span>
                    </span>
                    <span className="font-bold text-stone-900 tabular-nums">
                      {item.quantity}×
                    </span>
                    <span className="font-medium text-stone-800">{item.name}</span>
                  </div>
                  <span className="font-bold text-stone-900 tabular-nums">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Special notes if any */}
          {order.specialInstructions && (
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900">
              <span className="font-semibold block mb-0.5">Special Instructions:</span>
              <p className="italic">"{order.specialInstructions}"</p>
            </div>
          )}

          {/* Financial Calculation Summary */}
          <div className="pt-2 space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-600">
              <span>Items Subtotal</span>
              <span className="tabular-nums font-semibold text-stone-900">₹{order.subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <span>Canteen Parcel Packaging</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <span>Payment Mode</span>
              <span className="font-semibold text-stone-800">
                {order.paymentMethod === 'demo_upi'
                  ? 'Demo UPI / Digital Token (Pre-paid)'
                  : 'Pay at Canteen Counter'}
              </span>
            </div>
            <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-sm sm:text-base font-bold text-stone-900">
              <span>Final Total Paid</span>
              <span className="font-display text-2xl font-black text-orange-600 tabular-nums">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: View My Orders, Back to Menu, Print */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => navigateTo('orders')}
            className="w-full sm:w-auto px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" />
            <span>View My Orders & Track Status</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('menu')}
              className="flex-1 sm:flex-none px-5 py-3.5 bg-white hover:bg-stone-100 text-stone-700 font-semibold text-xs sm:text-sm rounded-xl border border-stone-300 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Back to Menu</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
              title="Print Token Receipt"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
