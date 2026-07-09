---
name: Premium Global News
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#444748'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#3a5f94'
  on-secondary: '#ffffff'
  secondary-container: '#9fc2fe'
  on-secondary-container: '#294f83'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#311300'
  on-tertiary-container: '#ce6700'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#a7c8ff'
  on-secondary-fixed: '#001b3c'
  on-secondary-fixed-variant: '#1f477b'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311300'
  on-tertiary-fixed-variant: '#723600'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
  surface-pure: '#FFFFFF'
  text-muted: '#666666'
  border-subtle: '#E5E1DA'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  caption:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  article-max: 720px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is centered on the concept of "The Informed Quiet"—a digital sanctuary for global news that prioritizes focus and deep comprehension. It targets a sophisticated audience seeking clarity over sensationalism.

The design style is a blend of **Minimalism** and **Premium Editorial**. It utilizes generous negative space to reduce cognitive load, combined with high-end typography that mimics the prestige of traditional broadsheet journalism. The aesthetic is "Apple-level" clean: every pixel serves a functional purpose, utilizing subtle micro-interactions rather than loud visual flourishes to guide the user.

## Colors
The palette is rooted in a soft, warm white background to reduce eye strain during long-form reading. 

- **Primary Charcoal (#1A1A1A):** Used for headlines and body text to ensure maximum contrast and authority.
- **Deep Blue Accent (#003366):** Reserved for category markers, verified badges, and primary call-to-actions, evoking a sense of global trust.
- **Saffron Accent (#F57C00):** Used sparingly for "Live" indicators, breaking news tags, or interactive highlights to draw attention without disrupting the calm.
- **Pure White (#FFFFFF):** Exclusively for card surfaces and floating containers to create a subtle lift from the warm background.

## Typography
The typography system creates a rigorous hierarchy. **Source Serif 4** provides an authoritative, literary feel for all editorial content, while **Inter** ensures functional clarity for navigation and UI elements.

For long-form articles, `body-lg` is the standard to mimic the readability of Medium. Headlines use negative letter-spacing at larger sizes to maintain a tight, professional appearance. `label-caps` is the primary style for metadata such as timestamps and categories.

## Layout & Spacing
This design system employs a **Fixed Grid** for content consumption. 

- **Desktop:** A 12-column grid with a max-width of 1200px for homepages. Article pages are restricted to a centered 720px column to optimize line length for readability.
- **Mobile:** A single-column layout with 16px side margins. 
- **Vertical Rhythm:** Built on an 8px base unit. Section headers should have at least 64px of top padding to signify a transition in topics.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Low-Contrast Outlines**. 

Shadows are almost entirely avoided to maintain the minimalist aesthetic. Instead, depth is created by placing `#FFFFFF` cards on the `#FDFBF7` background. A 1px border of `#E5E1DA` is used to define boundaries. For interactive elements like "Hover States" on news cards, a very soft, ambient shadow (10% opacity Deep Blue) can be applied to simulate a slight lift.

## Shapes
Shapes are disciplined and "Soft." A 4px radius (`roundedness: 1`) is applied to cards, buttons, and input fields. This subtle rounding removes the harshness of sharp corners while maintaining a serious, structured architectural feel. Square edges are permitted for full-bleed images to enhance the editorial "magazine" look.

## Components
- **Buttons:** Primary buttons use a solid `#1A1A1A` background with white text. Secondary buttons use a 1px border of `#1A1A1A` with no fill.
- **News Cards:** Minimalist containers with no visible borders by default; use a 1px `#E5E1DA` separator between list items. Images should have a consistent 16:9 aspect ratio.
- **Chips:** Used for "Topics." Background `#F3F0E9` with `#1A1A1A` text, using a pill shape for distinctness from other UI elements.
- **Progress Indicators:** A thin 2px saffron (`#F57C00`) line at the top of the viewport to indicate reading progress on articles.
- **Input Fields:** Bottom-border only for a "stationery" feel, or a light grey stroke that darkens to Deep Blue on focus.
- **Audio Bar:** A docked player for "Listen to Article" features, using a blurred background of the article's hero image (Glassmorphism).