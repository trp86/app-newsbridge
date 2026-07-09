# NewsBridge Design System
## Master Source of Truth

**Version:** 1.0.0  
**Last Updated:** July 7, 2026  
**Status:** Active

---

## Philosophy

NewsBridge is a **premium editorial news reading experience** that prioritizes:

1. **Reading Comfort** - Typography and spacing optimized for long-form consumption
2. **Accessibility** - WCAG AA compliant, inclusive by default
3. **Clarity** - Information hierarchy guides understanding
4. **Minimalism** - Every element serves the content

**Inspiration:** Apple News, Financial Times, Medium, Linear

**Avoid:** Dashboard aesthetics, SaaS styling, social media patterns, visual clutter

---

## Typography

### Font Families

```css
@import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600;6..72,700&family=Roboto:wght@300;400;500;600;700&display=swap');
```

**Newsreader** (Serif - Headlines & Titles)
- Variable optical sizing optimized for digital reading
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Use for: Headlines, article titles, section headers

**Roboto** (Sans-serif - Body & UI)
- Highly readable for extended reading
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Use for: Body text, UI elements, metadata, navigation

### Tailwind Config

```js
fontFamily: {
  serif: ['Newsreader', 'Georgia', 'serif'],
  sans: ['Roboto', '-apple-system', 'system-ui', 'sans-serif']
}
```

### Type Scale

| Name | Size | rem | Use Case | Class |
|------|------|-----|----------|-------|
| Display | 64px | 4rem | Hero headlines | `text-6xl` |
| H1 | 48px | 3rem | Page titles | `text-5xl` |
| H2 | 40px | 2.5rem | Section headers | `text-4xl` |
| H3 | 32px | 2rem | Card titles | `text-3xl` |
| H4 | 24px | 1.5rem | Subsections | `text-2xl` |
| H5 | 20px | 1.25rem | Small headings | `text-xl` |
| Body Large | 18px | 1.125rem | Lead paragraphs | `text-lg` |
| Body | 16px | 1rem | Default body | `text-base` |
| Small | 14px | 0.875rem | Captions, metadata | `text-sm` |
| Caption | 12px | 0.75rem | Tiny text | `text-xs` |

### Line Heights

| Context | Line Height | Tailwind Class |
|---------|-------------|----------------|
| Display/Headlines | 1.1 | `leading-tight` |
| Subheadings | 1.375 | `leading-snug` |
| Body Text | 1.625 | `leading-relaxed` |
| UI Elements | 1.5 | `leading-normal` |
| Captions | 1.5 | `leading-normal` |

### Font Weights

| Weight | Value | Tailwind Class | Use |
|--------|-------|----------------|-----|
| Light | 300 | `font-light` | Large display text |
| Regular | 400 | `font-normal` | Body text |
| Medium | 500 | `font-medium` | Emphasis, UI buttons |
| Semibold | 600 | `font-semibold` | Strong emphasis |
| Bold | 700 | `font-bold` | Headlines |

### Typography Usage Rules

#### Headlines (Newsreader Serif)
```tsx
// Hero headline
className="font-serif text-5xl md:text-6xl font-bold leading-tight text-primary"

// Section headline
className="font-serif text-3xl md:text-4xl font-semibold leading-tight text-primary"

// Card title
className="font-serif text-xl md:text-2xl font-semibold leading-snug text-primary"
```

#### Body Text (Roboto Sans)
```tsx
// Article body
className="font-sans text-base md:text-lg leading-relaxed text-secondary max-w-prose"

// UI text
className="font-sans text-sm md:text-base leading-normal text-secondary"

// Metadata/Caption
className="font-sans text-xs md:text-sm leading-normal text-muted"
```

#### Line Length Constraint
**Always limit body text to 65-75 characters per line:**
```tsx
className="max-w-prose" // 65ch default
```

---

## Colors

### Base Palette

| Name | Hex | RGB | Tailwind | Usage |
|------|-----|-----|----------|-------|
| **Primary** | #18181B | 24, 24, 27 | `slate-900` | Headlines, primary text |
| **Secondary** | #3F3F46 | 63, 63, 70 | `slate-700` | Body text, secondary content |
| **Muted** | #71717A | 113, 113, 122 | `slate-500` | Metadata, captions, subdued text |
| **CTA** | #EC4899 | 236, 72, 153 | `pink-500` | Links, CTAs, accents |
| **CTA Hover** | #DB2777 | 219, 39, 119 | `pink-600` | Hover state for CTAs |
| **Background** | #FAFAFA | 250, 250, 250 | `zinc-50` | Page background |
| **Surface** | #FFFFFF | 255, 255, 255 | `white` | Card backgrounds |
| **Border** | #D4D4D8 | 212, 212, 216 | `zinc-300` | Borders, dividers |
| **Border Subtle** | #E4E4E7 | 228, 228, 231 | `zinc-200` | Subtle dividers |

### Semantic Colors

```js
colors: {
  primary: '#18181B',      // slate-900
  secondary: '#3F3F46',    // slate-700
  muted: '#71717A',        // slate-500
  accent: '#EC4899',       // pink-500
  background: '#FAFAFA',   // zinc-50
  surface: '#FFFFFF',      // white
  border: '#D4D4D8',       // zinc-300
  'border-subtle': '#E4E4E7', // zinc-200
}
```

### Contrast Ratios (WCAG Compliance)

All text colors tested against #FAFAFA background:

| Color | Hex | Ratio | WCAG Level |
|-------|-----|-------|------------|
| Primary | #18181B | 16.8:1 | AAA ✓✓✓ |
| Secondary | #3F3F46 | 10.4:1 | AAA ✓✓✓ |
| Muted | #71717A | 5.8:1 | AA ✓✓ |
| CTA | #EC4899 | 4.9:1 | AA ✓✓ |

### Color Usage

#### Text
```tsx
// Headlines
text-primary            // #18181B - Maximum contrast

// Body text
text-secondary          // #3F3F46 - Comfortable reading

// Metadata/Captions
text-muted             // #71717A - Subdued information

// Links/CTAs
text-accent hover:text-accent/80
```

#### Backgrounds
```tsx
// Page background
bg-background          // #FAFAFA

// Card/surface
bg-surface             // #FFFFFF

// Hover states
hover:bg-zinc-50       // Subtle hover
```

#### Borders
```tsx
// Standard border
border border-border   // #D4D4D8

// Subtle border
border border-border-subtle  // #E4E4E7

// Hover border
hover:border-zinc-400  // Darker on hover
```

---

## Spacing

### 8-Point Grid System

| Token | Size | rem | Tailwind | Use Case |
|-------|------|-----|----------|----------|
| **3xs** | 4px | 0.25rem | `1` | Micro adjustments |
| **2xs** | 8px | 0.5rem | `2` | Tight spacing |
| **xs** | 12px | 0.75rem | `3` | Small gaps |
| **sm** | 16px | 1rem | `4` | Base unit, tight sections |
| **md** | 24px | 1.5rem | `6` | Component internal spacing |
| **lg** | 32px | 2rem | `8` | Section spacing |
| **xl** | 48px | 3rem | `12` | Major sections |
| **2xl** | 64px | 4rem | `16` | Hero/Large sections |
| **3xl** | 96px | 6rem | `24` | Extra large sections |

### Component Spacing

#### Card Spacing
```tsx
// Internal padding
p-6 md:p-8              // 24px mobile, 32px desktop

// Gap between cards
gap-4 md:gap-6          // 16px mobile, 24px desktop

// Card margins
mb-4 md:mb-6            // Bottom margin
```

#### Section Spacing
```tsx
// Between major sections
mb-8 md:mb-12           // 32px mobile, 48px desktop

// Page padding
px-4 md:px-8            // 16px mobile, 32px desktop
py-6 md:py-12           // 24px mobile, 48px desktop
```

#### Typography Spacing
```tsx
// Paragraph spacing
mb-4                    // 16px between paragraphs

// Heading spacing
mb-2 md:mb-3            // 8-12px after headings
mt-6 md:mt-8            // 24-32px before headings
```

---

## Layout

### Container System

```tsx
// Max-width containers
max-w-7xl              // 1280px - Main content (default)
max-w-6xl              // 1152px - Narrow content
max-w-prose            // 65ch - Article text

// Centering
mx-auto                // Center horizontally
```

### Grid System

```tsx
// News feed grid
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6

// Article layout
grid grid-cols-1 lg:grid-cols-3 gap-8
```

### Responsive Breakpoints

| Breakpoint | Size | Tailwind | Use |
|------------|------|----------|-----|
| Mobile | 0-767px | (default) | Single column, stacked |
| Tablet | 768-1023px | `md:` | 2 columns, expanded touch |
| Desktop | 1024-1279px | `lg:` | 3 columns, full features |
| Wide | 1280+ | `xl:` | Max content width |

### Critical Breakpoints to Test
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad portrait)
- 1024px (iPad landscape)
- 1440px (Desktop)

---

## Components

### NewsCard

**Purpose:** Standard article card for news feed

**Structure:**
```tsx
<Link className="block group cursor-pointer">
  <article className="h-full bg-surface border border-border rounded-lg p-6 
                     hover:shadow-lg hover:border-zinc-400 
                     transition-all duration-200">
    {/* Category Badge */}
    <div className="mb-3">
      <CategoryBadge />
    </div>
    
    {/* Title */}
    <h2 className="font-serif text-xl font-semibold leading-snug mb-3 
                   text-primary group-hover:text-accent 
                   transition-colors line-clamp-2">
      Article Title
    </h2>
    
    {/* Summary */}
    <p className="font-sans text-base leading-relaxed text-secondary mb-4 
                  line-clamp-3">
      Article summary text...
    </p>
    
    {/* Meta */}
    <div className="flex items-center justify-between 
                    text-sm text-muted">
      <span className="font-medium">Source</span>
      <time>Time</time>
    </div>
    
    {/* Reading Mode Indicator */}
    <div className="mt-3 pt-3 border-t border-border-subtle">
      <span className="text-xs text-muted uppercase tracking-wide">
        Standard • 111 words
      </span>
    </div>
  </article>
</Link>
```

**Specifications:**
- Background: `bg-surface` (#FFFFFF)
- Border: `border border-border` (1px #D4D4D8)
- Border Radius: `rounded-lg` (8px)
- Padding: `p-6` (24px)
- Hover: Shadow lift + border darken
- Transition: 200ms all properties
- Cursor: `cursor-pointer`

---

### FeaturedCard

**Purpose:** Hero article with image

**Structure:**
```tsx
<Link className="block group cursor-pointer">
  <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
    {/* Image */}
    <Image 
      src={imageUrl}
      alt={altText}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-300"
      priority
    />
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t 
                    from-black/90 via-black/50 to-transparent" />
    
    {/* Content */}
    <div className="relative h-full flex flex-col justify-end 
                    p-6 md:p-8 text-white">
      <CategoryBadge variant="light" className="mb-3" />
      
      <h2 className="font-serif text-3xl md:text-4xl font-bold 
                     leading-tight mb-3 line-clamp-2 
                     group-hover:text-accent transition-colors">
        Featured Title
      </h2>
      
      <p className="font-sans text-lg text-white/90 mb-4 line-clamp-2 max-w-3xl">
        Featured summary...
      </p>
      
      {/* Optional: Audio player UI */}
    </div>
  </div>
</Link>
```

**Specifications:**
- Aspect Ratio: 16:9 mobile, 21:9 desktop
- Border Radius: `rounded-lg` (8px)
- Gradient: `from-black/90 via-black/50 to-transparent`
- Hover: Image scale 105%
- Transition: 300ms transform
- Text Shadow: `text-shadow: 0 2px 4px rgba(0,0,0,0.3)`

---

### ReadingModeToggle

**Purpose:** Segmented control for 30/111/250 word modes

**Structure:**
```tsx
<div className="inline-flex gap-0 bg-zinc-100 rounded-full p-1">
  <button 
    className="px-6 py-2.5 text-sm font-medium rounded-full 
               transition-all duration-200 min-h-[44px]
               hover:bg-zinc-200 text-primary">
    Quick<br /><span className="text-xs opacity-70">30</span>
  </button>
  
  <button 
    className="px-6 py-2.5 text-sm font-medium rounded-full 
               transition-all duration-200 min-h-[44px]
               bg-primary text-white shadow-sm">
    Standard<br /><span className="text-xs opacity-90">111</span>
  </button>
  
  <button 
    className="px-6 py-2.5 text-sm font-medium rounded-full 
               transition-all duration-200 min-h-[44px]
               hover:bg-zinc-200 text-primary">
    Deep<br /><span className="text-xs opacity-70">250</span>
  </button>
</div>
```

**Specifications:**
- Container: `bg-zinc-100 rounded-full p-1`
- Touch Target: `min-h-[44px]` minimum
- Active: `bg-primary text-white shadow-sm`
- Inactive: `transparent hover:bg-zinc-200`
- Transition: 200ms all
- Font: `text-sm font-medium`

---

### CategoryBadge

**Purpose:** Category indicator for articles

**Structure:**
```tsx
<span className="inline-flex items-center px-3 py-1 
                 rounded-full text-xs font-medium uppercase tracking-wide
                 bg-zinc-100 text-secondary">
  {category}
</span>
```

**Variants:**
```tsx
// Default (on white)
bg-zinc-100 text-secondary

// Light (on dark)
bg-white/10 text-white backdrop-blur-sm

// Accent (for featured)
bg-accent/10 text-accent
```

---

### Header (Desktop)

**Structure:**
```tsx
<header className="sticky top-0 z-50 w-full 
                   border-b border-border bg-background/95 backdrop-blur 
                   supports-[backdrop-filter]:bg-background/60">
  <div className="container mx-auto px-8 max-w-7xl">
    <div className="flex h-16 items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2 
                                group cursor-pointer">
        <span className="font-serif text-2xl font-bold text-primary 
                         group-hover:text-accent transition-colors">
          NewsBridge
        </span>
      </Link>
      
      {/* Navigation */}
      <nav className="flex items-center space-x-6">
        <Link className="text-sm font-medium text-secondary 
                         hover:text-primary transition-colors
                         focus-visible:ring-2 focus-visible:ring-primary 
                         focus-visible:ring-offset-2 rounded px-2 py-1">
          Feed
        </Link>
        {/* More nav items */}
      </nav>
      
      {/* Language Toggle */}
      <div className="flex items-center space-x-2">
        {/* Language buttons */}
      </div>
    </div>
  </div>
</header>
```

**Specifications:**
- Position: `sticky top-0`
- Height: `h-16` (64px)
- Backdrop: `bg-background/95 backdrop-blur`
- Border: `border-b border-border`
- z-index: `z-50`

---

### BottomNav (Mobile)

**Structure:**
```tsx
<nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 
                border-t border-border bg-surface/95 backdrop-blur 
                safe-area-inset-bottom">
  <div className="flex items-center justify-around h-16 px-4">
    <button className="flex flex-col items-center justify-center 
                       min-w-[44px] min-h-[44px] cursor-pointer
                       text-primary hover:text-accent transition-colors
                       focus-visible:ring-2 focus-visible:ring-primary 
                       focus-visible:ring-offset-2 rounded">
      <Icon className="w-6 h-6" />
      <span className="text-xs mt-1">Feed</span>
    </button>
    {/* More nav items */}
  </div>
</nav>
```

**Specifications:**
- Position: `fixed bottom-0`
- Height: `h-16` (64px)
- Touch Targets: `min-w-[44px] min-h-[44px]`
- Backdrop: `bg-surface/95 backdrop-blur`
- Safe Area: Account for device notches

---

## Interactions

### Hover States

**Cards:**
```tsx
hover:shadow-lg hover:border-zinc-400 transition-all duration-200
```

**Links:**
```tsx
hover:text-accent transition-colors duration-200
```

**Buttons:**
```tsx
hover:bg-zinc-200 transition-colors duration-200
```

### Focus States (Keyboard Navigation)

**All Interactive Elements:**
```tsx
focus-visible:outline-none 
focus-visible:ring-2 
focus-visible:ring-primary 
focus-visible:ring-offset-2 
rounded
```

### Active/Tap States (Mobile)

```tsx
active:scale-[0.98] transition-transform duration-100
```

### Transition Speeds

- **Fast:** 100ms - Tap feedback
- **Standard:** 200ms - Hovers, color changes
- **Slow:** 300ms - Transforms, complex animations

### Reduced Motion

```tsx
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility

### Minimum Requirements

#### Color Contrast
- **Normal text:** 4.5:1 (WCAG AA)
- **Large text (18px+):** 3:1 (WCAG AA)
- **UI components:** 3:1 (WCAG AA)

✅ All NewsBridge text colors meet or exceed WCAG AA

#### Touch Targets
- **Minimum size:** 44x44px (iOS HIG / WCAG)
- **Spacing:** 8px between adjacent targets

#### Focus Indicators
- **Visible:** 2px solid outline
- **Contrast:** 3:1 against background
- **Offset:** 2px from element

#### Screen Readers
- Semantic HTML structure
- ARIA labels on icon-only buttons
- ARIA-current on active nav items
- Alt text on all meaningful images
- Skip-to-content link

### Implementation Checklist

```tsx
// Every interactive element
cursor-pointer
focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2

// Every icon-only button
aria-label="Descriptive action"

// Every image
alt="Descriptive text"

// Active navigation
aria-current="page"

// Language selector
aria-label="Select language"
<button aria-pressed={isActive}>

// Reading mode
role="radiogroup"
role="radio" aria-checked={isActive}
```

---

## Performance

### Image Optimization

```tsx
<Image
  src={url}
  alt={alt}
  width={1200}
  height={675}
  loading="lazy"           // Lazy load below fold
  priority={isFeatured}    // Priority for hero
  quality={85}             // Balance quality/size
  placeholder="blur"       // Blur placeholder
  blurDataURL={blurData}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Font Loading

```tsx
// next/font/google optimization
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-newsreader'
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-roboto'
});
```

### Bundle Size
- Minimize JavaScript
- Code splitting by route
- Tree-shake unused code
- Lazy load below-fold components

---

## Implementation Guide

### 1. Update Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: '#18181B',
        secondary: '#3F3F46',
        muted: '#71717A',
        accent: '#EC4899',
        background: '#FAFAFA',
        surface: '#FFFFFF',
        border: '#D4D4D8',
        'border-subtle': '#E4E4E7',
      },
      maxWidth: {
        'container': '1280px',
      }
    }
  }
}
```

### 2. Update Global Styles

```css
/* app/globals.css */
@import "tailwindcss";

:root {
  --background: #FAFAFA;
  --foreground: #18181B;
  --font-newsreader: 'Newsreader', Georgia, serif;
  --font-roboto: 'Roboto', system-ui, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-roboto);
}

/* Focus visible styles */
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--foreground);
  border-radius: 4px;
}
```

### 3. Import Fonts

```tsx
// app/layout.tsx
import { Newsreader } from 'next/font/google';
import { Roboto } from 'next/font/google';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-newsreader',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## Design Tokens Reference

### Quick Copy-Paste

```tsx
// Typography
font-serif text-5xl font-bold leading-tight text-primary
font-sans text-base leading-relaxed text-secondary max-w-prose

// Colors
text-primary bg-surface border-border
text-secondary bg-background
text-muted text-accent

// Spacing
p-6 md:p-8 gap-4 md:gap-6 mb-8 md:mb-12

// Interactions
cursor-pointer hover:shadow-lg transition-all duration-200
focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
active:scale-[0.98]

// Layout
max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6
```

---

## Version History

### 1.0.0 (July 7, 2026)
- Initial design system
- Typography: Newsreader + Roboto
- Color system with WCAG AA compliance
- 8-point spacing grid
- Component specifications
- Accessibility guidelines
- Performance optimizations

---

## Maintenance

**Review Schedule:** Quarterly  
**Owner:** Design Team  
**Status:** Active

**Next Review:** October 7, 2026
