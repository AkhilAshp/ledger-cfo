# Sidebar + Workspace Layout - Design Documentation

## Overview
Executive-grade financial calculators hub with professional sidebar navigation and dedicated workspace for each calculator.

## Layout Structure

### Sidebar (Left Panel)
- **Width**: 320px (80rem)
- **Position**: Fixed on desktop, drawer on mobile
- **Background**: White (#FFFFFF)
- **Border**: Right border, subtle (black/10)

#### Sidebar Sections:
1. **Header**
   - Title: "Calculators"
   - Subtitle: "Financial metrics toolkit"
   - Clean typography, serif for title

2. **Navigation**
   - Vertical list of all calculators
   - Each item shows:
     - Calculator name (medium weight)
     - Short descriptor (subtle, smaller text)
   - Active state: Dark background, white text
   - Hover state: Light gray background
   - Smooth transitions

3. **Footer CTA**
   - "Book a CFO Call" button
   - Fixed at bottom
   - Full-width, primary action style

### Workspace (Right Panel)
- **Width**: Flexible, fills remaining space
- **Background**: Light gray (#F9FAFB)
- **Scroll**: Independent vertical scroll

#### Workspace Sections:
1. **Header**
   - Calculator title (large serif)
   - Description paragraph (readable, not too wide)
   - Generous spacing

2. **Input Section**
   - White card with subtle border
   - "INPUT PARAMETERS" label (uppercase, small, muted)
   - Form fields with clear labels
   - Large, readable values
   - Thin sliders (1px height)

3. **Results Section**
   - White card with subtle border
   - "RESULTS" label (uppercase, small, muted)
   - Large numbers (6xl font size)
   - Grid layout for multiple metrics
   - Clear hierarchy

4. **CFO Insight**
   - Vertical accent bar (left side)
   - "CFO Insight" label
   - Contextual advice based on results
   - Muted text, readable line height

5. **Disclaimer**
   - Small italic text
   - Muted color
   - Bottom of calculator

## Design System

### Colors
```
Background: #F9FAFB (gray-50)
Cards: #FFFFFF (white)
Borders: rgba(0,0,0,0.1) (black/10)
Text Primary: #1F2937 (ink)
Text Muted: #6B7280 (muted)
Accent: #1F2937 (ink)
Success: #059669 (green-700)
```

### Typography
```
Headings: font-serif
Body: font-sans
Numbers: font-mono
Hierarchy: 6xl → 4xl → 3xl → 2xl → base → sm → xs
```

### Spacing
```
Section gaps: 8 (2rem)
Card padding: 8 (2rem)
Input spacing: 8 (2rem)
Label margin: 3 (0.75rem)
```

### Components
```
Sliders: 1px height, rounded, accent color
Buttons: Rounded-sm, medium weight
Cards: Rounded-sm, subtle border
Inputs: Clean, minimal styling
```

## Responsive Behavior

### Desktop (lg+)
- Sidebar: Fixed, always visible
- Workspace: Fills remaining space
- Side-by-side layout

### Mobile (<lg)
- Sidebar: Drawer (slides in from left)
- Workspace: Full width
- Mobile header with menu button
- Overlay when sidebar open

## Interaction Patterns

### Navigation
1. Click calculator in sidebar
2. URL updates: `/resources/calculators/:id`
3. Workspace content updates
4. Sidebar item highlights
5. Mobile: Drawer closes automatically

### Deep Linking
- Each calculator has unique URL
- Direct access via URL
- Shareable links
- Browser back/forward support

### State Management
- Active calculator ID in state
- Synced with URL params
- Sidebar open/close state (mobile)
- Calculator-specific state (inputs)

## Component Hierarchy

```
CalculatorsPage
├── CalculatorSidebar
│   ├── Header
│   ├── Navigation (list of calculators)
│   └── Footer CTA
└── CalculatorWorkspace
    ├── Header (title + description)
    └── Calculator Component
        ├── Input Section
        ├── Results Section
        ├── CFO Insight
        └── Disclaimer
```

## File Structure

```
components/
├── calculators/
│   ├── CalculatorSidebar.tsx       # Sidebar navigation
│   ├── CalculatorWorkspace.tsx     # Workspace wrapper
│   ├── RunwayCalculator.tsx        # Individual calculators
│   ├── BurnMultipleCalculator.tsx
│   ├── CACPaybackCalculator.tsx
│   ├── LTVCACCalculator.tsx
│   ├── RevenueGrowthCalculator.tsx
│   ├── OpExBreakdownCalculator.tsx
│   ├── BreakEvenCalculator.tsx
│   ├── CashConversionCalculator.tsx
│   ├── LedgersCFOSavingsCalculator.tsx
│   └── ValuationImpactCalculator.tsx
└── pages/
    └── CalculatorsPage.tsx          # Main page orchestrator
```

## Routes

```
/resources/calculators              → Default (runway)
/resources/calculators/runway       → Runway Calculator
/resources/calculators/burn-multiple → Burn Multiple
/resources/calculators/cac-payback  → CAC Payback
/resources/calculators/ltv-cac      → LTV:CAC
... (all calculators)
```

## UX Principles

### Credibility
- Clean, minimal design
- Professional typography
- Consistent spacing
- No flashy elements
- Data-driven presentation

### Clarity
- Clear labels and hierarchy
- Large, readable numbers
- Contextual insights
- Helpful disclaimers

### Trust
- Executive-grade feel
- CFO dashboard aesthetic
- Analytical tone
- Professional color palette

### Scalability
- Easy to add new calculators
- Modular component structure
- Consistent patterns
- Reusable components

## Adding New Calculators

1. Create calculator component in `components/calculators/`
2. Follow the structure:
   - Input Section (white card)
   - Results Section (white card)
   - CFO Insight (with accent bar)
   - Disclaimer (small italic)
3. Add to calculators array in `CalculatorsPage.tsx`
4. Include: id, name, descriptor, description, component
5. Done! Automatically appears in sidebar and routing

## Mobile Optimization

- Sidebar becomes drawer
- Menu button in header
- Touch-friendly targets
- Smooth animations
- Overlay backdrop
- Auto-close on selection

## Performance

- Lazy loading not needed (10 calculators)
- Local state management
- No external API calls
- Fast, responsive interactions
- Smooth transitions

## Accessibility

- Semantic HTML
- Clear labels
- Keyboard navigation
- Focus states
- ARIA labels where needed
- Readable contrast ratios

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- React Router v6
- No IE11 support needed
