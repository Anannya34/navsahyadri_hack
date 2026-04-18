<div align="center">

# ⚡ SOLIQ — Prototype Documentation
### *High-Fidelity Interaction Prototype · Energy-as-a-Service Mobile App*

<br/>

[![Prototype](https://img.shields.io/badge/Stage-High--Fidelity_Prototype-f0c040?style=flat-square)](.)
[![Routing](https://img.shields.io/badge/Router-Custom_FSM-764abc?style=flat-square)](.)
[![Data](https://img.shields.io/badge/Data-Simulated_Telemetry-3dd6c8?style=flat-square)](.)
[![Auth](https://img.shields.io/badge/Auth-Session_Gated-ff5f5f?style=flat-square)](.)
[![Framework](https://img.shields.io/badge/React_Native-Expo_Managed-000000?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![Backend](https://img.shields.io/badge/Backend-Supabase_Ready-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)

<br/>

> This prototype is **visually complete and fully navigable**. It uses local ephemeral state and mathematical simulation loops in place of live hardware connections — purpose-built to validate the dual-funnel EaaS user journey, premium UI aesthetics, and core product flows **without requiring physical SCADA equipment or a provisioned backend.**

<br/>

[Overview](#-overview) · [Navigation Mocking](#-ui--navigation-mocking) · [Data Simulation](#-data-simulation-mechanisms) · [Production Roadmap](#-production-conversion-roadmap) · [Security Model](#-security--session-model)

</div>

---

## 📋 Overview

The current SOLIQ build is a **High-Fidelity Interaction Prototype** — not a production shell. The distinction matters:

| Attribute | This Prototype | Production Target |
|---|---|---|
| **UI & Animations** | ✅ Fully implemented | ✅ Same |
| **Navigation** | ✅ Custom FSM router | ✅ Same |
| **Telemetry Data** | 🔁 Simulated via `setInterval` | 🔌 Live WebSocket / MQTT |
| **Financial Data** | 🔁 Hardcoded mock arrays | 🔌 Backend relational DB |
| **Authentication** | ⚠️ Superficial session gate | 🔐 JWT via Supabase / Firebase |
| **Payments** | ⚠️ Immediate state bump | 💳 Razorpay checkout integration |
| **State Management** | 📦 Local `useState` hooks | 📦 Redux / Zustand / Supabase sync |

**Primary prototype goals:**
- Validate the **dual-funnel user journey** (Owner vs. Renter/Digital Resident)
- Demonstrate **premium EaaS UI aesthetics** to stakeholders
- Prove core product flows without physical hardware or database provisioning

---

## 🧭 UI & Navigation Mocking

SOLIQ deliberately avoids third-party navigation engines (e.g. React Navigation) in favour of a tightly controlled **Finite State Machine router** spanning `App.js` and `RenterMainLayout.js`.

### How It Works

Navigation is driven entirely by **string-based state triggers** that mount and unmount React components absolutely:

```js
// Example tab switch — no navigator, no stack, no history
setActiveTab('khata')   // unmounts current view → mounts <VirtualSolarKhataScreen />
setActiveTab('home')    // unmounts → mounts <VirtualSolarDashboardScreen />
```

### Why This Approach

| Benefit | Detail |
|---|---|
| **Zero layout shift** | Absolute mounting eliminates the positional reflow that native navigators introduce during tab switches |
| **Full animation control** | Every transition is hand-authored — no navigator-imposed gesture interceptors |
| **Stakeholder-ready** | Instant, jank-free transitions make sandbox demos and investor walkthroughs significantly more polished |
| **Modular containers** | Each screen is a fully self-contained bounded context — no shared layout state leakage |

---

## 🔁 Data Simulation Mechanisms

All real-time data in this prototype is **mathematically generated client-side**. No IoT meters, no API calls, no database reads. Each module is designed as a clean drop-in — replacing the simulation with a live data source requires changes only within the relevant screen file.

---

### 3.1 — Live Dashboard Telemetry · `VirtualSolarDashboardScreen.js`

Simulates a realistic SCADA energy meter feed using procedurally bounded `setInterval` loops.

**Simulation Pipeline:**

```
Step 1 — INITIALISATION (on selectedMeterId change)
         Procedurally generate baseline variables per meter:
         baseVoltage  →  225–240V
         baseCurrent  →  within safe residential range
         basePower    →  derived from V × I
         baseFreq     →  49.8–50.2 Hz

Step 2 — TICKER LOOP  (fires every 2000ms)
         Apply mathematically bounded random offsets per variable:
         Voltage  →  baseVoltage  + (Math.random() * 3 - 1.5)
         Others   →  similar ± bounded drift
         Push updated values to component state → triggers re-render

Step 3 — DISPLAY
         SVG graphs and metric cards consume the state values directly
         Produces realistic hardware-grade fluctuation appearance
```

**Tracked Telemetry Variables:**

| Metric | Simulation Baseline | Drift Range |
|---|---|---|
| Voltage | 225 – 240 V | ± 1.5 V per tick |
| Current | Residential range | Bounded offset |
| Power | Derived (V × I) | Cascades from V/I drift |
| Energy | Cumulative sum | Incremental per tick |
| Power Factor | 0.85 – 1.0 | Minor drift |
| Frequency | 49.8 – 50.2 Hz | ± 0.1 Hz per tick |

> **Production swap:** Replace the `setInterval` block entirely with a **WebSocket / MQTT handler** consuming live stringified JSON from physical smart meters. All downstream SVG components and state bindings remain unchanged.

---

### 3.2 — Mocked Financial Modules

#### Virtual Khata / Ledger · `VirtualSolarKhataScreen.js`

Proves the "Digital Energy Ledger" concept using hardcoded aggregated figures:

- Fixed base purchase statistics (units bought, amount spent)
- Unused unit rollover calculation — e.g., `53.5 kWh` carry-forward
- Dynamic layout rendering driven entirely by these seed values

> **Production swap:** Replace seed constants with `fetch` calls to a billing/ledger API. Layout and calculation logic remains intact.

---

#### Subscription Market · `VirtualSolarMarketScreen.js`

Emulates an API-backed plan catalogue using pre-configured local arrays:

- Pre-loaded **Standard** and **Family** subscription pack definitions
- Frontend-only **Solar Coins** deduction logic applied on pack selection
- Fake invoice generation rendered visually (no payment gateway triggered)

> **Production swap:** Replace local plan arrays with a `fetch` to the subscriptions endpoint. Wire "Pay Now" actions to **Razorpay checkout** instead of immediate state updates.

---

### 3.3 — Hardware Store Array Mocking · `VirtualHardwareMarketScreen.js`

The physical eCommerce module is constructed from a single hardcoded product manifest:

```js
const PRODUCTS = [
  // 15 entries — premium EV & energy hardware
  {
    id: 'prod_001',
    name: '...',
    category: 'EV Charger',
    imageUri: require('../assets/products/ev_charger_01.png'),
    // fallback: gradient rendered if URI fails to load
  },
  // ...
]
```

**Category filtering** is pure client-side array filtering — no network parameters involved:

```js
const filtered = PRODUCTS.filter(p => p.category === activeCategory)
```

> **Production swap:** Replace `PRODUCTS` constant with a `fetch` to the products API. Swap client-side filter with query parameters. Image URIs become remote CDN URLs with the same local fallback gradient logic.

---

## 🚀 Production Conversion Roadmap

A prioritised migration path from prototype to production-ready deployment:

```
PHASE 1 — STATE MANAGEMENT
─────────────────────────────────────────────────────────
  Current   →  meters[] and cross-component variables
                live in useState inside RenterMainLayout
  
  Target    →  Migrate to persistent remote sync store
                Options: Redux · Zustand · Supabase Realtime listeners
  
  Scope     →  RenterMainLayout.js + all child screens
                that consume meters[] or selectedMeterId

PHASE 2 — API INTEGRATION
─────────────────────────────────────────────────────────
  Dashboard  →  setInterval  ──►  WebSocket / MQTT handler
                                   (live smart meter JSON feed)
  
  Market     →  Local arrays  ──►  fetch() → subscriptions API
  Pay Now    →  State bump    ──►  Razorpay checkout flow
  
  Products   →  PRODUCTS[]   ──►  fetch() → products API
  Khata      →  Seed consts  ──►  fetch() → billing/ledger API

PHASE 3 — AUTHENTICATION
─────────────────────────────────────────────────────────
  Current   →  Superficial Login / Signup boundaries
                in App.js (no real token validation)
  
  Target    →  JWT authentication via Supabase / Firebase
                • Gated route resolution on verified token
                • Refresh token lifecycle management
                • Un-gated spoofing fully patched
```

---

## 🔐 Security & Session Model

Despite being a prototype, SOLIQ implements a **production-grade session termination pattern** via React Native's `AppState` API.

### Behaviour

```
App moves to background (any duration)
         │
         ▼
  AppState listener fires
         │
         ▼
  FSM resets:
    isSplashVisible  = true
    isLoggedIn       = false
         │
         ▼
  Device returns to Splash → Login requirement
  No stale authenticated state survives suspension
```

### Why This Matters for a Prototype

This mirrors **strict fintech-tier session security** — ensuring the prototype behaves identically to a production financial application during stakeholder demos, security reviews, and investor walkthroughs. It also means the session gate requires zero refactoring when moving to production JWT flows.

---

## 📌 Quick Reference — Simulation → Production Swap Map

| Module | File | Current (Prototype) | Replace With |
|---|---|---|---|
| Telemetry feed | `VirtualSolarDashboardScreen.js` | `setInterval` + random offsets | WebSocket / MQTT handler |
| Subscription plans | `VirtualSolarMarketScreen.js` | Hardcoded local arrays | `fetch` → subscriptions API |
| Payment action | `VirtualSolarMarketScreen.js` | Immediate state bump | Razorpay checkout |
| Product catalogue | `VirtualHardwareMarketScreen.js` | `PRODUCTS[]` const block | `fetch` → products API |
| Ledger data | `VirtualSolarKhataScreen.js` | Hardcoded seed constants | `fetch` → billing API |
| Auth boundary | `App.js` | Superficial state gate | JWT via Supabase / Firebase |
| Global state | `RenterMainLayout.js` | `useState` hooks | Redux / Zustand / Supabase sync |

---

<div align="center">

**SOLIQ Prototype** — *Validating the EaaS experience before the infrastructure exists.*

<br/>

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay_Ready-02042B?style=flat-square&logo=razorpay&logoColor=white)

</div>
