import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  QrCode,
  Clock,
  User,
  Phone,
  BookOpen,
  ChevronLeft,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    currentUser,
    placeOrder,
    navigateTo,
    showToast,
  } = useApp();

  // Pre-fill form from logged in student user or default demo student
  const [studentName, setStudentName] = useState(currentUser?.fullName || 'Arun Kumar');
  const [registerNumber, setRegisterNumber] = useState(currentUser?.registerNumber || '21CS1042');
  const [collegeEmail, setCollegeEmail] = useState(currentUser?.collegeEmail || 'arunkumar@college.edu');
  const [department, setDepartment] = useState(currentUser?.department || 'Computer Science & Engineering');
  const [yearOfStudy, setYearOfStudy] = useState(currentUser?.yearOfStudy || '3rd Year');
  const [contactNumber, setContactNumber] = useState(currentUser?.phoneNumber || '9876543210');

  // Pickup Time slots
  const [pickupDate, setPickupDate] = useState('Today');
  const [pickupTime, setPickupTime] = useState('12:45 PM - Lunch Break');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('demo_upi');

  // Form errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect to menu
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-stone-50 text-center">
        <p className="text-sm text-stone-600 mb-4">Your tray is empty.</p>
        <button
          onClick={() => navigateTo('menu')}
          className="px-5 py-2.5 bg-orange-600 text-white font-semibold text-xs rounded-xl"
        >
          Return to Menu
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!studentName.trim()) {
      errs.studentName = 'Full Name is required';
    }
    if (!registerNumber.trim()) {
      errs.registerNumber = 'College Register Number is required';
    } else if (registerNumber.trim().length < 4) {
      errs.registerNumber = 'Please enter a valid Register Number';
    }
    if (!collegeEmail.trim()) {
      errs.collegeEmail = 'College Email is required';
    } else if (!collegeEmail.includes('@')) {
      errs.collegeEmail = 'Enter a valid email address';
    }
    if (!department.trim()) {
      errs.department = 'Department is required';
    }
    if (!contactNumber.trim()) {
      errs.contactNumber = 'Contact Phone Number is required';
    } else if (!/^\d{10}$/.test(contactNumber.replace(/[\s-]/g, ''))) {
      errs.contactNumber = 'Please enter a 10-digit mobile number';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent duplicate submission

    if (!validateForm()) {
      showToast('Please fix the highlighted fields in the form.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate real network processing time for UI feedback
      await new Promise((res) => setTimeout(res, 800));

      const result = await placeOrder({
        studentName,
        registerNumber,
        collegeEmail,
        department,
        yearOfStudy,
        contactNumber,
        pickupDate,
        pickupTime,
        specialInstructions,
        paymentMethod,
      });

      if (result.success && result.orderId) {
        navigateTo('confirmation', result.orderId);
      } else {
        showToast(result.error || 'Failed to place order. Please try again.', 'error');
      }
    } catch (err: any) {
      showToast('An unexpected error occurred while placing your order.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => navigateTo('cart')}
            className="text-xs font-semibold text-stone-500 hover:text-stone-900 flex items-center gap-1.5 mb-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Tray</span>
          </button>
          <h1 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight">
            Checkout & Pickup Details
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Specify student information and choose your preferred canteen pickup window.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Fields (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Section 1: Student Verification */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <User className="w-4 h-4 text-orange-600" />
                  <h3 className="font-display text-base font-bold text-stone-900">
                    Student Details & ID
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1.5">
                      Full Student Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Arun Kumar"
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all ${
                        errors.studentName
                          ? 'border-rose-400 focus:border-rose-500'
                          : 'border-stone-200 focus:border-orange-500'
                      }`}
                    />
                    {errors.studentName && (
                      <p className="text-rose-600 text-[11px] mt-1">{errors.studentName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1.5">
                      College Register No. <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={registerNumber}
                      onChange={(e) => setRegisterNumber(e.target.value.toUpperCase())}
                      placeholder="e.g. 21CS1042"
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all font-mono uppercase ${
                        errors.registerNumber
                          ? 'border-rose-400 focus:border-rose-500'
                          : 'border-stone-200 focus:border-orange-500'
                      }`}
                    />
                    {errors.registerNumber && (
                      <p className="text-rose-600 text-[11px] mt-1">{errors.registerNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1.5">
                      College Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={collegeEmail}
                      onChange={(e) => setCollegeEmail(e.target.value)}
                      placeholder="e.g. arun@college.edu"
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all ${
                        errors.collegeEmail
                          ? 'border-rose-400 focus:border-rose-500'
                          : 'border-stone-200 focus:border-orange-500'
                      }`}
                    />
                    {errors.collegeEmail && (
                      <p className="text-rose-600 text-[11px] mt-1">{errors.collegeEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1.5">
                      Contact Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="10 digit phone number"
                      maxLength={10}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all tabular-nums ${
                        errors.contactNumber
                          ? 'border-rose-400 focus:border-rose-500'
                          : 'border-stone-200 focus:border-orange-500'
                      }`}
                    />
                    {errors.contactNumber && (
                      <p className="text-rose-600 text-[11px] mt-1">{errors.contactNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1.5">
                      Department <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Computer Science & Engg."
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all ${
                        errors.department
                          ? 'border-rose-400 focus:border-rose-500'
                          : 'border-stone-200 focus:border-orange-500'
                      }`}
                    />
                    {errors.department && (
                      <p className="text-rose-600 text-[11px] mt-1">{errors.department}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="year-select" className="block font-semibold text-stone-700 mb-1.5">
                      Year of Study
                    </label>
                    <select
                      id="year-select"
                      value={yearOfStudy}
                      onChange={(e) => setYearOfStudy(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="1st Year">1st Year (Fresher)</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">Final Year</option>
                      <option value="Postgraduate / Staff">PG / Research / Staff</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Pickup Scheduling */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <h3 className="font-display text-base font-bold text-stone-900">
                    Pickup Timing & Special Notes
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label htmlFor="pickup-slot-select" className="block font-semibold text-stone-700 mb-1.5">
                      Select Break Time Slot
                    </label>
                    <select
                      id="pickup-slot-select"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all cursor-pointer font-medium"
                    >
                      <option value="Next 10-15 Mins (Immediate)">Next 10-15 Mins (Immediate)</option>
                      <option value="10:30 AM - Morning Recess">10:30 AM - Morning Recess</option>
                      <option value="12:45 PM - Lunch Break">12:45 PM - Lunch Break (Standard)</option>
                      <option value="01:15 PM - Afternoon Slot">01:15 PM - Afternoon Slot</option>
                      <option value="03:30 PM - Tea & Snack Break">03:30 PM - Tea & Snack Break</option>
                      <option value="05:15 PM - Evening Post-Class">05:15 PM - Evening Post-Class</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1.5">
                      Pickup Location
                    </label>
                    <div className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-100 text-stone-700 font-medium">
                      Campus Main Food Court (Counter 1 & 2)
                    </div>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-stone-700 mb-1.5">
                    Optional Special Cooking or Packaging Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Less spicy, pack extra coconut chutney, sugar separate for coffee..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all placeholder:text-stone-400"
                  />
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <CreditCard className="w-4 h-4 text-orange-600" />
                  <h3 className="font-display text-base font-bold text-stone-900">
                    Payment Choice
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Demo UPI */}
                  <label
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'demo_upi'
                        ? 'border-orange-600 bg-orange-50/40 ring-1 ring-orange-600'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <QrCode className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="font-bold text-xs text-stone-900">
                            Demo UPI / QR Simulation
                          </p>
                          <p className="text-[11px] text-stone-500">
                            Instant Token Generation
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="demo_upi"
                        checked={paymentMethod === 'demo_upi'}
                        onChange={() => setPaymentMethod('demo_upi')}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                    </div>
                    <span className="mt-3 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium inline-block self-start">
                      Simulated Payment (Academic Demo)
                    </span>
                  </label>

                  {/* Pay at Canteen */}
                  <label
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === 'pay_at_canteen'
                        ? 'border-orange-600 bg-orange-50/40 ring-1 ring-orange-600'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <Banknote className="w-5 h-5 text-stone-600" />
                        <div>
                          <p className="font-bold text-xs text-stone-900">
                            Pay at Canteen Counter
                          </p>
                          <p className="text-[11px] text-stone-500">
                            Cash / College Smartcard
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pay_at_canteen"
                        checked={paymentMethod === 'pay_at_canteen'}
                        onChange={() => setPaymentMethod('pay_at_canteen')}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                    </div>
                    <span className="mt-3 text-[10px] text-stone-600 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded font-medium inline-block self-start">
                      Pay When Collecting Food
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Bill Breakdown & Confirm (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
                <h3 className="font-display text-base font-bold text-stone-900 border-b border-stone-100 pb-3">
                  Selected Items ({cartCount})
                </h3>

                {/* Items Summary */}
                <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="py-2.5 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-800 tabular-nums">
                          {item.quantity}×
                        </span>
                        <span className="text-stone-700 font-medium line-clamp-1 max-w-[200px]">
                          {item.menuItem.name}
                        </span>
                      </div>
                      <span className="font-semibold text-stone-900 tabular-nums">
                        ₹{item.menuItem.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-100 pt-3 space-y-2 text-xs text-stone-600">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900 tabular-nums">
                      ₹{cartSubtotal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Canteen Packaging</span>
                    <span className="font-semibold text-emerald-600">FREE</span>
                  </div>
                  <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-sm">
                    <span className="font-bold text-stone-900">Total Payable</span>
                    <span className="font-display text-2xl font-black text-orange-600 tabular-nums">
                      ₹{cartSubtotal}
                    </span>
                  </div>
                </div>

                {/* Submit Order Button with Loading State */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-orange-400 text-white cursor-wait'
                      : 'bg-orange-600 hover:bg-orange-700 text-white hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating Canteen Token...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Confirm & Place Pre-Order (₹{cartSubtotal})</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-stone-400 text-center leading-normal">
                  By confirming, your order will be sent straight to the campus kitchen terminal for queue preparation.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
