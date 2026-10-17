import React from 'react';
import {
  UtensilsCrossed,
  Clock,
  Users,
  Code,
  ShieldCheck,
  CheckCircle,
  Lightbulb,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  const personas = [
    {
      title: 'Day Scholar Student',
      name: 'Arun (3rd Year CSE)',
      painPoint: 'Has only 30 minutes between afternoon lab sessions. Usually misses lunch because 20 minutes are spent waiting in token and delivery lines.',
      mealMateBenefit: 'Pre-orders the Veg Thali at 12:15 PM during break; picks it up in under 60 seconds from Counter 1 at 12:45 PM.',
    },
    {
      title: 'Hostel Resident',
      name: 'Priya (2nd Year ECE)',
      painPoint: 'Evening snacks like samosas and tea run out before she reaches the counter after her 5:00 PM lecture.',
      mealMateBenefit: 'Reserves her samosa plate and filter coffee in advance; inventory is locked and freshly packed for her arrival.',
    },
    {
      title: 'Campus Faculty / Staff',
      name: 'Prof. Senthil (HOD Mech)',
      painPoint: 'Avoids visiting the noisy cafeteria due to overcrowding and lack of separate faculty billing counter.',
      mealMateBenefit: 'Schedules morning degree filter coffee to be picked up exactly at 10:15 AM prior to departmental reviews.',
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Project Header */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-4">
            <UtensilsCrossed className="w-3.5 h-3.5 text-orange-600" />
            <span>Academic UI/UX Capstone Project</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight mb-2">
            MealMate
          </h1>
          <p className="font-display text-xl sm:text-2xl font-bold text-orange-600 mb-4">
            “Good Food. Less Waiting. More Living.”
          </p>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            A human-centered web application built to modernize Indian collegiate cafeteria workflows. MealMate eliminates token counter congestion, cuts average food collection time from 18 minutes to under 2 minutes, and gives students and staff their break time back.
          </p>

          <div className="mt-8 pt-8 border-t border-stone-100 flex flex-wrap gap-4 text-xs text-stone-500">
            <span className="font-semibold text-stone-900">Project Type: Full-Stack Web Application</span>
            <span>·</span>
            <span>Framework: React 19 + TypeScript + Vite</span>
            <span>·</span>
            <span>Styling: Tailwind CSS v4</span>
            <span>·</span>
            <span>Icons: Lucide React</span>
          </div>
        </div>

        {/* The Problem Statement vs MealMate Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-rose-200/80 p-6 sm:p-8 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="font-display text-xl font-bold text-stone-900 mb-2">
              The Campus Bottleneck Problem
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed list-disc list-inside">
              <li>
                <strong>20-Minute Token Lines:</strong> Between 12:45 PM and 1:15 PM, over 800 students rush into the cafeteria simultaneously.
              </li>
              <li>
                <strong>Missed Lunch Breaks:</strong> Students with laboratory assignments or tight schedules often skip meals entirely to avoid being late.
              </li>
              <li>
                <strong>Cashier Bottlenecks:</strong> Manual paper tokens, change calculation delays, and lost paper slips cause friction.
              </li>
              <li>
                <strong>Food Wastage & Shortages:</strong> Canteen chefs struggle to forecast real-time demand, running out of popular dishes while overproducing others.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-emerald-200/80 p-6 sm:p-8 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h2 className="font-display text-xl font-bold text-stone-900 mb-2">
              The MealMate Solution
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed list-disc list-inside">
              <li>
                <strong>Pre-Ordering During Lectures:</strong> Students select break-time slots (e.g. 12:45 PM Lunch) from their laptop or phone.
              </li>
              <li>
                <strong>Live Kitchen Queue (KDS):</strong> Chefs receive orders 10 minutes ahead of scheduled time and stage them at Counter 1 & 2.
              </li>
              <li>
                <strong>Digital Canteen Tokens (#MM-xxxxx):</strong> Unique scannable token voucher removes paper receipts and prevents lost tokens.
              </li>
              <li>
                <strong>Role-Based Administrative Portal:</strong> Supervisors toggle out-of-stock items, adjust rates, and track throughput live.
              </li>
            </ul>
          </div>
        </div>

        {/* User Personas */}
        <div className="space-y-6">
          <div className="text-left">
            <h2 className="font-display text-2xl font-bold text-stone-900">
              User Research & Student Personas
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Validated through cafeteria user interviews across engineering, science, and management departments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personas.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 block mb-1">
                    {p.title}
                  </span>
                  <h3 className="font-display text-lg font-bold text-stone-900 mb-3">
                    {p.name}
                  </h3>
                  <div className="space-y-3 text-xs text-stone-600">
                    <div>
                      <strong className="text-stone-800 block mb-0.5">Frustration:</strong>
                      <p className="leading-relaxed">{p.painPoint}</p>
                    </div>
                    <div>
                      <strong className="text-emerald-700 block mb-0.5">MealMate Impact:</strong>
                      <p className="leading-relaxed">{p.mealMateBenefit}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Architecture & Technology Stack */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <Layers className="w-5 h-5 text-orange-600" />
            <h2 className="font-display text-xl font-bold text-stone-900">
              System Architecture & UI/UX Design System
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-stone-600">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 space-y-1.5">
              <h3 className="font-bold text-stone-900 text-sm">Visual & Color Palette</h3>
              <p>
                Warm canteen orange (<code className="text-orange-600 font-mono">#EA580C</code>), warm cream canvas (<code className="font-mono">#FAF7F2</code>), deep charcoal (<code className="font-mono">#1C1917</code>), and subtle emerald accents for vegetarian freshness.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 space-y-1.5">
              <h3 className="font-bold text-stone-900 text-sm">Strict Zero-Pill Hierarchy</h3>
              <p>
                Adheres to typographic discipline: unboxed metadata text separated by typographic middots (·), clean single-line controls, zero fake telemetry clutter.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 space-y-1.5">
              <h3 className="font-bold text-stone-900 text-sm">Demo Data Persistence</h3>
              <p>
                Uses reactive <code className="font-mono">localStorage</code> serialization so cart items, added dishes, updated statuses, and registered student accounts survive page refresh and browser restarts.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-500">
              Prepared for university demonstration and GitHub academic repository submission.
            </p>
            <button
              onClick={() => navigateTo('menu')}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-2"
            >
              <span>Explore Live Demonstration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
