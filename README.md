# wax-nft-backed-token-unlock-visualizer — NFT-Backed Token Unlock Visualizer

> **Status:** 🔒 Private (In Development) | Target Public Release: August 2026  
> **Category:** AtomicAssets & Marketplace Intelligence  
> **Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**A visual timeline grid charting the linear maturation of fungible tokens locked inside the underlying storage parameters of AtomicAssets configurations on WAX.**

---

## 1. Overview & Goal

This blueprint visualizes the unlock schedule and maturation progress of fungible tokens that are backed by or locked within NFT (AtomicAssets) configurations. It turns opaque vesting/unlock mechanics into beautiful, transparent timelines.

**Why it matters:**
Many projects lock tokens behind NFTs or use AtomicAssets for vesting. Users and investors need clear visibility into when and how tokens become liquid.

Uses only **public infrastructure** (AtomicAssets schemas + mutable data + Hyperion for history).

**Target users:** NFT holders with backed tokens, investors, project teams, analysts.

**Success metrics:**
- Clear, accurate unlock timelines
- Beautiful and intuitive visualization
- Real-time progress tracking

---

## 2. Concepts & Inspiration

**Core concepts:**
- AtomicAssets mutable data for unlock parameters
- Linear or cliff vesting schedules encoded on-chain
- Historical mint/lock events via Hyperion
- Schema-based configuration parsing

**User pain points:**
Unlock schedules are often buried in docs or opaque contract logic. Holders want visual confirmation of their position in the unlock curve.

**Inspirations:**
- Token unlock dashboards (e.g. Token Unlocks, Messari)
- Vesting schedule visualizations in traditional finance
- Progress trackers like Notion timelines

**Related blueprints:** Pairs well with `wax-atomicassets-bulk-transfer-optimizer`, `wax-collection-burn-rate-odometer`, and various RWA/phygital tools.

---

## 3. Design Specifications (Pixel Journey Standards)

### 3.1 Visual & Interaction Design
- Main view: Elegant vertical or horizontal timeline grid showing unlock stages
- Progress bars or milestone markers with percentage complete
- Color coding: Locked (gray), Unlocking (amber), Unlocked (emerald)
- Hover details for exact token amounts and dates
- Clean, modern Web3 aesthetic with pixel accents where appropriate

### 3.2 Key Views / Components
- `UnlockTimeline.tsx` — Main visual timeline component
- `AssetSelector.tsx` — Search or select backed NFT/asset
- `UnlockDetailsCard.tsx` — Breakdown of schedule, remaining, and history
- `ProgressSummary.tsx` — Overall portfolio unlock overview (if multi-asset)

### 3.3 Accessibility (A11y) & Inclusive Design
- WCAG 2.2 AA
- Screen reader friendly timelines and progress indicators
- Keyboard navigation
- High contrast support

### 3.4 Performance & Optimization Targets
- Efficient schema and mutable data parsing
- Smart caching of unlock calculations
- Smooth animations (respecting reduced motion)

---

## 4. Technical Architecture

### 4.1 Core Tech Stack (Standardized)
- **Framework:** Next.js 15 (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS + shadcn/ui + framer-motion
- **State & Data:** @tanstack/react-query + zod
- **Blockchain Data:**
  - AtomicAssets API for schemas and mutable data
  - Hyperion for historical lock/unlock events
- **Visualization:** Custom timeline components or Recharts
- **Utilities:** date-fns, lucide-react

### 4.2 Data Flow Diagram
```
AtomicAssets Schema + Mutable Data (unlock params)
    ↓
Hyperion Historical Events
    ↓
Client-side Unlock Schedule Calculator
    ↓
React Query Cache
    ↓
Beautiful Timeline Visualization + Progress Cards
```

### 4.3 Folder Structure
Standard blueprint structure with components/timeline, lib/wax/atomic-parser.ts, hooks/useUnlockSchedule.ts, etc.

### 4.4 Security & Privacy Notes
- Read-only public data
- Clear explanations of on-chain sources
- No private key handling

---

## 5. Implementation Examples & Code Snippets

**Core unlock schedule parser example** and timeline rendering logic included in the full repository.

---

## 6. Demo & Testing Strategy
- Mock data mode for common vesting patterns
- Mainnet live toggle
- Comprehensive tests for calculation accuracy
- Excellent empty/loading states

---

## 7. Roadmap & Development Phases
Follows the standard 4-phase template (Scaffold → Data Layer → Core UI → Polish & Release).

---

## 8. Visual References & Mockups
The timeline should feel premium and trustworthy — similar to high-end token unlock dashboards but tailored for WAX AtomicAssets. Clear visual progression from locked to unlocked.

---

## 9. Related Blueprints & Ecosystem Fit
- `wax-atomicassets-bulk-transfer-optimizer` — Manage assets with unlock schedules
- `wax-collection-burn-rate-odometer` — Complementary supply dynamics view
- Various RWA and phygital blueprints for real-world backed assets

---

## 10. License, Contributing & Credits
- MIT License
- Built on public AtomicAssets and Hyperion infrastructure
- Pixel Journey Design System

**Pixel Journey — Beautiful interfaces for public blockchain data.**
