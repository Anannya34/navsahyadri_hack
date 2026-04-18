<div align="center">

# ⚡ SOLIQ
### *Energy-as-a-Service — Mobile Application Architecture*

<br/>

[![Framework](https://img.shields.io/badge/React_Native-Expo_Managed-000000?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![Routing](https://img.shields.io/badge/Router-Custom_FSM-f0c040?style=flat-square)](.)
[![Animations](https://img.shields.io/badge/Animations-Reanimated_3-764abc?style=flat-square&logo=react&logoColor=white)](https://docs.swmansion.com/react-native-reanimated/)
[![Database](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Architecture](https://img.shields.io/badge/Pattern-Atomic_Design-3dd6c8?style=flat-square)](.)
[![Status](https://img.shields.io/badge/Stage-Active_Development-brightgreen?style=flat-square)](.)

<br/>

> A dual-funnel **Energy-as-a-Service** platform serving both physical solar owners and virtual solar subscribers — built on a custom finite state machine router with high-fidelity animated UI/UX.

<br/>

[Overview](#-overview) · [Tech Stack](#-tech-stack) · [Directory Structure](#-directory-structure) · [App Flow](#-core-application-flow) · [Screens](#-screen--feature-architecture) · [Constraints](#-architecture-constraints--conventions)

</div>

---

## 📋 Overview

**SOLIQ** is a React Native + Expo mobile application built around two completely independent operational funnels:

| Funnel | User Type | Description |
|---|---|---|
| 🏠 **Owner Flow** | Physical Solar Owner | Manages real hardware, monitors owned solar infrastructure |
| ☁️ **Renter Flow** | Digital Resident / Subscriber | Subscribes to virtual solar capacity with no physical hardware |

The architecture deliberately avoids standard navigation libraries in favour of a **custom bounded-state router**, granting full control over uncoupled flows, custom tab-bars, and complex animated transitions without layout shift.

---

## 🛠 Tech Stack

### Framework & Core

| Category | Technology | Purpose |
|---|---|---|
| **Framework** | React Native + Expo (Managed) | Cross-platform iOS & Android |
| **Routing** | Custom Bounded-State FSM | Modular container rendering, zero layout shift |
| **Auth / Database** | Supabase (`src/lib/supabase.js`) | Authentication + real-time DB provider |

### UI & Animation

| Library | Usage |
|---|---|
| `react-native-svg` | Complex charting — Avatar rings, energy graphs |
| `expo-linear-gradient` | Glassmorphism effects, premium background shading |
| `react-native-reanimated` | Gesture-driven micro-interactions |
| Core `Animated` API | Lightweight declarative transitions |
| `@expo/vector-icons` | Ionicons · FontAwesome5 · MaterialCommunityIcons |

---

## 📁 Directory Structure

```
SOLIQ/
├── App.js                          # Root entry point & FSM state controller
├── assets/                         # Pre-compiled high-res images & icons
└── src/
    ├── components/                 # Reusable atomic UI widgets
    │   ├── BottomNavbar.js         # Custom tab navigator (Renter layout)
    │   ├── CarbonDashboard.js      # Analytics widgets
    │   ├── EnergyScore.js          # Live metrics display
    │   ├── KhataEnergyChart.js     # SVG-based energy charting
    │   └── ...
    ├── lib/                        # Third-party connection layers
    │   └── supabase.js             # Auth / DB provider initialisation
    └── screens/                    # Bounded-context master views
        ├── SplashScreen.js             # Initial loader + logo animations
        ├── JourneyScreen.js            # Dual-funnel selector (Owner vs Renter)
        ├── LoginScreen.js              # Auth — Login
        ├── SignUpScreen.js             # Auth — Registration
        ├── RenterMainLayout.js         # Hub container for Virtual Solar flow
        ├── VirtualSolarDashboardScreen.js  # SCADA-style telemetry view
        ├── VirtualSolarMarketScreen.js     # Digital subscription marketplace
        ├── VirtualHardwareMarketScreen.js  # Real-world eCommerce store
        ├── VirtualSolarKhataScreen.js      # Ledger & energy accounting
        └── ProfileScreen.js                # User management dashboard
```

> **Convention:** The project adheres strictly to **Atomic Design** principles under `src/`. Components are stateless widgets; Screens own their bounded state and business logic.

---

## 🔄 Core Application Flow

`App.js` operates as a **rigid Finite State Machine (FSM)** — not a standard unmounted navigation stack. It tracks foreground/background transitions via `AppState` to forcefully re-trigger authenticated lifecycles.

```
┌─────────────────────────────────────────────────────────────┐
│                      App.js — FSM States                    │
└─────────────────────────────────────────────────────────────┘

  [START]
     │
     ▼
 ┌─────────────────────┐
 │  isSplashVisible    │  → Mounts <SplashScreen />
 │                     │    On animation complete → advance
 └────────┬────────────┘
          │
          ▼
 ┌─────────────────────┐
 │  isJourneyCompleted │  → Mounts <JourneyScreen />
 │                     │    Sets userType: 'owner' | 'renter'
 └────────┬────────────┘
          │
          ▼
 ┌─────────────────────┐
 │  isLoggedIn         │  → Toggles <LoginScreen /> / <SignUpScreen />
 │                     │    On success → resolve userType
 └────────┬────────────┘
          │
     ┌────┴────┐
     │         │
  'renter'   'owner'
     │         │
     ▼         ▼
<RenterMain  <HomeScreen />
 Layout />
```

### Security Gate

> If the user **backgrounds the app**, `AppState` resets the FSM directly back to `isSplashVisible = true` and `isLoggedIn = false` — enforcing strict active session validation on every foreground resume. No stale authenticated state is ever preserved.

---

## 📱 Screen & Feature Architecture

### 5.1 — Renter Hub · `RenterMainLayout.js`

The central gateway for all Virtual Solar customers. Acts as a **local state manager** for nested tabs — owns the globally relevant `meters` array and `selectedMeterId`.

**Tab Routing Map:**

| `activeTab` Value | Renders | Description |
|---|---|---|
| `home` | `VirtualSolarDashboardScreen` | SCADA telemetry view |
| `add-meter` | `VirtualSolarAddMeterScreen` | Meter provisioning flow |
| `wallet` | `VirtualSolarMarketScreen` | Subscription marketplace |
| `khata` | `VirtualSolarKhataScreen` | Ledger & billing |
| `profile` | `ProfileScreen` | User management |

---

### 5.2 — Real-Time Dashboard · `VirtualSolarDashboardScreen.js`

A **SCADA-inspired digital twin** interface simulating live energy telemetry.

- Runs `useEffect` intervals at **2000ms ticks** to generate randomised telemetry data
- Tracks: `Voltage` · `Current` · `Power` · `Energy` · `Power Factor` · `Frequency`
- Completely **unmounts and regenerates** historical baselines dynamically on `selectedMeterId` change — inherited from `RenterMainLayout` parent

---

### 5.3 — E-Commerce Models

**Subscription Market · `VirtualSolarMarketScreen.js`**
- Implements dynamic rollover-credits injection
- Custom provider-mapping logic for digital energy subscriptions

**Hardware Market · `VirtualHardwareMarketScreen.js`**
- Real-world eCommerce store for physical solar components
- Dynamically categorised component listings with fallback rendering arrays
- Loads photorealistic 3D-generated assets from local URI — gracefully falls back to gradient placeholders

---

### 5.4 — Ledger & Tracking · `VirtualSolarKhataScreen.js`

The **billing source of truth**. Performs active calculations on:

- Rollover unit balances
- Total wallet expenditure vs. actual units consumed
- Dynamic layout rendering summarising user utilisation over time

---

## ⚙️ Architecture Constraints & Conventions

| # | Constraint | Detail |
|---|---|---|
| **01** | **Isolated Styling** | Every file owns its own `StyleSheet` object — no global style bleed. Deep reliance on absolute positioning for SVG layered backgrounds. |
| **02** | **Icon Strategy** | Mixed dependency on `@expo/vector-icons` (Ionicons, FontAwesome5, MaterialCommunityIcons). Prioritises cross-platform consistency over custom SVGs for micro-UI elements (chevrons, back handlers). |
| **03** | **Session Security** | `AppState` listener resets FSM to `isSplashVisible = true` + `isLoggedIn = false` on background — no persistent authenticated state survives app suspension. |
| **04** | **No React Navigation** | Custom bounded-state router eliminates the React Navigation dependency entirely. Improves modular container rendering and eliminates layout shifting on tab switches. |
| **05** | **Atomic Structure** | `src/components/` holds only stateless, reusable widgets. All state ownership and business logic lives exclusively inside `src/screens/`. |

---

## 🔮 Architectural Decision Records (ADRs)

### ADR-01 — Custom FSM over React Navigation
**Decision:** Replace React Navigation with a hand-rolled finite state machine in `App.js`.

**Rationale:** Standard stack/tab navigators introduce unmounting side effects and layout shifts that conflict with complex SVG backgrounds and continuous animation states. The FSM approach gives deterministic, auditable control over every screen transition and lifecycle.

**Trade-off:** Higher initial setup cost; no out-of-the-box deep linking.

---

### ADR-02 — Simulated Telemetry via `useEffect` Intervals
**Decision:** Dashboard uses client-side randomised intervals rather than a live WebSocket stream.

**Rationale:** Prototype stage — decouples UI validation from backend readiness. Designed as a drop-in replacement; swapping the interval generator for a Supabase Realtime subscription requires changes only within `VirtualSolarDashboardScreen.js`.

---

### ADR-03 — Supabase as Auth + DB Provider
**Decision:** Single `src/lib/supabase.js` initialisation shared across all screens.

**Rationale:** Reduces connection overhead. Centralised provider makes migration to a different backend (e.g., Firebase) a single-file change.

---

<div align="center">

**SOLIQ** — *Powering the future of distributed solar, one subscription at a time.*

<br/>

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)

</div>
