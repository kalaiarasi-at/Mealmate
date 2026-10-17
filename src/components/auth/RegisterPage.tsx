import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
  Phone,
  AlertCircle,
  UtensilsCrossed,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RegisterPage: React.FC = () => {
  const { register, navigateTo } = useApp();

  const [fullName, setFullName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [collegeEmail, setCollegeEmail] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [yearOfStudy, setYearOfStudy] = useState('1st Year');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState('');

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) errs.fullName = 'Full Name is required';
    if (!registerNumber.trim()) errs.registerNumber = 'College Register Number is required';
    else if (registerNumber.trim().length < 4) errs.registerNumber = 'Must be at least 4 characters';

    if (!collegeEmail.trim()) errs.collegeEmail = 'College Email is required';
    else if (!collegeEmail.includes('@') || !collegeEmail.includes('.'))
      errs.collegeEmail = 'Enter a valid email address';

    if (!department.trim()) errs.department = 'Department is required';

    if (phoneNumber.trim() && !/^\d{10}$/.test(phoneNumber.replace(/[\s-]/g, ''))) {
      errs.phoneNumber = 'Phone number must be exactly 10 digits';
    }

    if (!password) errs.password = 'Password is required';
    else if (password.length < 4) errs.password = 'Password must be at least 4 characters';

    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError('');

    if (!validate()) return;

    const res = register(
      {
        fullName: fullName.trim(),
        registerNumber: registerNumber.trim().toUpperCase(),
        collegeEmail: collegeEmail.trim().toLowerCase(),
        department: department.trim(),
        yearOfStudy,
        phoneNumber: phoneNumber.trim() || undefined,
        role: 'student',
      },
      password
    );

    if (res.success) {
      navigateTo('menu');
    } else {
      setGlobalError(res.message);
    }
  };

  const handleFillDemoValues = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setFullName('Kavya Natarajan');
    setRegisterNumber(`23IT${randomSuffix}`);
    setCollegeEmail(`kavya${randomSuffix}@college.edu`);
    setDepartment('Information Technology');
    setYearOfStudy('2nd Year');
    setPhoneNumber('9841023456');
    setPassword('student123');
    setConfirmPassword('student123');
    setErrors({});
    setGlobalError('');
  };

  return (
    <div className="py-12 sm:py-16 bg-stone-50 min-h-[85vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <UtensilsCrossed className="w-6 h-6 stroke-[2]" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Student Registration
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Register your college ID to order fresh canteen food with live tracking.
          </p>
        </div>

        {/* Demo Fast-fill banner */}
        <div className="mb-6 p-3.5 rounded-xl bg-orange-50/70 border border-orange-200 text-xs text-stone-700 flex items-center justify-between gap-3">
          <div>
            <span className="font-bold text-orange-950 block">Faculty Evaluation Helper</span>
            <span className="text-[11px] text-stone-600">
              Click to autofill valid test credentials and test registration.
            </span>
          </div>
          <button
            type="button"
            onClick={handleFillDemoValues}
            className="px-3 py-1.5 bg-orange-600 text-white font-semibold rounded-lg text-[11px] whitespace-nowrap hover:bg-orange-700 transition-colors shadow-xs"
          >
            Autofill Sample Student
          </button>
        </div>

        {globalError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{globalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Kavya Natarajan"
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all ${
                    errors.fullName ? 'border-rose-400' : 'border-stone-200 focus:border-orange-500'
                  }`}
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              {errors.fullName && <p className="text-rose-600 text-[10px] mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1.5">
                College Register Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={registerNumber}
                onChange={(e) => setRegisterNumber(e.target.value.toUpperCase())}
                placeholder="e.g. 23IT1042"
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all font-mono uppercase ${
                  errors.registerNumber ? 'border-rose-400' : 'border-stone-200 focus:border-orange-500'
                }`}
              />
              {errors.registerNumber && (
                <p className="text-rose-600 text-[10px] mt-1">{errors.registerNumber}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1.5">
                College Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={collegeEmail}
                  onChange={(e) => setCollegeEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all ${
                    errors.collegeEmail ? 'border-rose-400' : 'border-stone-200 focus:border-orange-500'
                  }`}
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              {errors.collegeEmail && (
                <p className="text-rose-600 text-[10px] mt-1">{errors.collegeEmail}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1.5">
                Contact Phone Number (Optional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="10 digit mobile"
                  maxLength={10}
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all tabular-nums ${
                    errors.phoneNumber ? 'border-rose-400' : 'border-stone-200 focus:border-orange-500'
                  }`}
                />
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              {errors.phoneNumber && (
                <p className="text-rose-600 text-[10px] mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1.5">
                Department <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Information Technology"
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all ${
                    errors.department ? 'border-rose-400' : 'border-stone-200 focus:border-orange-500'
                  }`}
                />
                <Building className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              {errors.department && (
                <p className="text-rose-600 text-[10px] mt-1">{errors.department}</p>
              )}
            </div>

            <div>
              <label htmlFor="reg-year-select" className="block font-semibold text-stone-700 mb-1.5">
                Year of Study
              </label>
              <select
                id="reg-year-select"
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all cursor-pointer"
              >
                <option value="1st Year">1st Year (Fresher)</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">Final Year</option>
                <option value="Postgraduate / Staff">Postgraduate / Staff</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1.5">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 4 characters"
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all ${
                    errors.password ? 'border-rose-400' : 'border-stone-200 focus:border-orange-500'
                  }`}
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              {errors.password && <p className="text-rose-600 text-[10px] mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1.5">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all ${
                    errors.confirmPassword
                      ? 'border-rose-400'
                      : 'border-stone-200 focus:border-orange-500'
                  }`}
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              {errors.confirmPassword && (
                <p className="text-rose-600 text-[10px] mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>Create Student Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-stone-100 text-center text-xs text-stone-500">
          <span>Already registered with your College ID? </span>
          <button
            onClick={() => navigateTo('login')}
            className="font-bold text-orange-600 hover:underline"
          >
            Sign In here &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
