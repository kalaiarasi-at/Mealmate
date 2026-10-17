# MealMate – Smart College Canteen Pre-Order Website

> **“Good Food. Less Waiting. More Living.”**

MealMate is a modern, responsive, and full-featured college canteen pre-ordering web application built as an academic UI/UX and web development project. It eliminates canteen token counter crowding, resolves peak recess bottlenecks, and allows students and staff to collect freshly prepared meals with zero wait time.

---

## 🌟 Key Features

1. **Brand Identity & Responsive UI/UX**:
   - Palette tailored for dining: Warm orange (`#EA580C`), warm cream canvas (`#FAF7F2`), deep charcoal (`#1C1917`), and pure emerald vegetarian accents.
   - Strict zero-pill typographic discipline, clean metadata separators (`·`), and high-contrast WCAG-compliant design.
   - Fully responsive for Windows desktops, laptops, tablets, and smartphones.

2. **Campus Food Menu (25+ Authentic Indian Canteen Dishes)**:
   - **Breakfast**: Butter Masala Dosa, Ghee Podi Idli with Vada, Ven Pongal, Poori Bhaji, Medu Vada Dip, Rava Onion Dosa.
   - **Meals**: Executive South Indian Veg Thali, Hyderabadi Veg Dum Biryani, Lemon Rice, Curd Rice, Sambar Sadham, Paneer Butter Masala Combo.
   - **Snacks**: Punjabi Samosas, Bombay Grilled Sandwich, Schezwan Hakka Noodles, Peri-Peri Fries, Paneer Frankie Roll, Hot Pakoda.
   - **Beverages**: Kumbakonam Degree Filter Coffee, Masala Cutting Chai, Cold Badam Milk, Mint Lemonade, Sweet Lassi.
   - **Desserts**: Ghee Gulab Jamun, Roasted Semiya Payasam, Mango Kulfi.
   - Real-time search, category filters, pure vegetarian filter, price sorting, and stock status indicators.

3. **Cart & Pre-Order Tray**:
   - Increment/decrement items, calculate subtotal and zero-cost canteen parcel fee.
   - Out-of-stock item warning indicators.
   - Persistent tray state across page refreshes.

4. **Student Checkout & Pickup Scheduling**:
   - Verification of student name, college register number, department, email, and 10-digit mobile number.
   - Break-time window selection: *Immediate (10-15 mins)*, *10:30 AM Morning Recess*, *12:45 PM Lunch Break*, *3:30 PM Tea Break*, etc.
   - Payment method toggle: **Demo UPI / QR Simulation (Instant Token)** or **Pay at Canteen Counter**.
   - Duplicate submission protection with live loader state.

5. **Dedicated Order Confirmation Page (Critical Feature)**:
   - Celebratory confetti animation.
   - Prominent **“ORDER PLACED SUCCESSFULLY!”** header.
   - Digital Canteen Token voucher (`#MM-xxxxx`) with simulated counter QR code.
   - Designated counter assignment (Counter 1 for Meals, Counter 2 for Tiffin/Snacks).
   - Itemized bill breakdown, student register number, and printable token receipt.

6. **My Orders & Visual Kitchen Tracking Timeline**:
   - Real-time progress bar: **Placed → Accepted → In Kitchen → Ready for Pickup → Collected**.
   - Faculty evaluation simulation button: **“Advance Status”** directly moves active orders to the next kitchen stage with 1 click.

7. **Canteen Staff Kitchen Terminal (Admin Portal)**:
   - Live KPI counters: Total Orders, Pending, In Kitchen, Ready for Pickup, Today's Volume (₹).
   - Kitchen dispatch order queue with status controls (Accept, Send to Kitchen, Mark Ready, Handed Over).
   - Full menu management: Add new dishes, edit price/prep time/category, and toggle *In Stock / Sold Out*.

8. **Student Registration & Authentication**:
   - Validation for college email, register number, department, year of study, and password confirmation.
   - One-click *Autofill Sample Student* and *Quick Login as Admin* buttons for fast professor grading.
   - Local on-device persistence: All student accounts, orders, and menu updates survive browser refresh.

---

## 💻 Running MealMate Locally on Windows (VS Code)

### Prerequisites
1. **Node.js** (v18.0.0 or higher):
   - Download and install the LTS version from [nodejs.org](https://nodejs.org).
   - Verify in Windows Command Prompt or PowerShell:
     ```bash
     node -v
     npm -v
     ```
2. **Visual Studio Code**:
   - Download from [code.visualstudio.com](https://code.visualstudio.com).

### Step-by-Step Instructions

1. **Extract / Open the Project**:
   - Extract the project ZIP to a folder on your Windows PC (e.g. `C:\Projects\MealMate`).
   - Open VS Code, select **File > Open Folder...**, and select the `MealMate` folder.

2. **Open Terminal in VS Code**:
   - Press `` Ctrl + ` `` (backtick) or go to **Terminal > New Terminal**.

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   - The terminal will display:
     ```text
     VITE v8.x ready in 350 ms
     ➜  Local:   http://localhost:3000/
     ➜  Network: use --host to expose
     ```
   - Hold `Ctrl` and click the `http://localhost:3000` link, or open your web browser (Chrome, Edge, Brave) and navigate to `http://localhost:3000`.

5. **Production Build & Verification**:
   - To test the production build:
     ```bash
     npm run build
     npm run preview
     ```

---

## 🚀 Pushing to GitHub

To upload this project to your GitHub account:

1. Create a new empty repository on [GitHub](https://github.com/new) named `mealmate-college-canteen`.
2. In your VS Code terminal, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: MealMate smart college canteen pre-order website"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/mealmate-college-canteen.git
   git push -u origin main
   ```

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript
- **Bundler & Server**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React
- **Animations & Delight**: Canvas-Confetti, CSS transitions
- **State & Data Store**: Context API with reactive `localStorage` fallback and zero-configuration on-device execution.
- **Optional Cloud Backend**: Firebase Firestore & Firebase Auth can be plugged into `src/context/AppContext.tsx` using the environment variables in `.env.example`.

---

## 📋 Faculty & Demonstration Walkthrough Script

For a 3-minute live presentation to academic evaluators:

1. **Home Page**: Show headline *“Good Food. Less Waiting. More Living.”*, live canteen operating hours, category cards, and today's specials.
2. **Food Menu**: Search for *"Dosa"*, toggle *Pure Veg Only*, sort by *Most Popular*, and add dishes to tray.
3. **Tray & Checkout**: Review cart, view student details (`21CS1042`), pick *12:45 PM Lunch Break*, and choose *Demo UPI*.
4. **Order Confirmation**: Click *Confirm & Place Pre-Order*. Watch confetti trigger, observe digital token `#MM-xxxxx`, and QR pickup counter assignment.
5. **Kitchen Tracking**: Click *My Orders*. Use the **“Advance Status”** button to advance the order from *Placed* to *In Kitchen* to *Ready for Pickup*.
6. **Admin Dashboard**: Click *Admin Console* in the top bar to inspect total canteen volume, incoming student queue, or toggle a dish to *Sold Out*.

---

## 📄 License & Academic Attribution
Created for Academic UI/UX & Web Development Coursework.
Designed with human-centered principles to solve cafeteria rush hour bottlenecks.
