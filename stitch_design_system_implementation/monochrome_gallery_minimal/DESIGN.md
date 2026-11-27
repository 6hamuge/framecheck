---
name: Monochrome Gallery Minimal
colors:
  surface: '#FFFFFF'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e3e2e2'
  on-secondary-container: '#646464'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c1c'
  on-tertiary-container: '#858383'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  border-hairline: '#DBDBDB'
  border-subtle: '#EFEFEF'
  text-muted: '#8E8E8E'
  link-action: '#0095F6'
typography:
  display:
    fontFamily: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  caption:
    fontFamily: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.25rem
  margin: 1rem
  margin-mobile: 0.75rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system embraces an ultra-minimalist, gallery-forward editorial philosophy modeled after modern content-first visual platforms. Content itself is the hero; the interface operates as pure architectural framing—unobtrusive, disciplined, and frictionless. 

Targeted at creators, digital curators, and design-literate audiences, the visual language rejects decorative clutter, gratuitous gradients, and high-saturation badge fills. The aesthetic relies strictly on pristine whitespace, hairline divider precision, deep black typography, and lightweight line work. The emotional tone is deliberate, quiet, sophisticated, and focused.

## Colors

The palette is rigorously monochrome with strict neutral hierarchy:
- **Primary Canvas & Surfaces (`#FFFFFF`)**: Pure, crisp background surfaces ensuring maximum contrast and pristine image display.
- **Deep Black Elements (`#000000` / `#111111`)**: Primary headlines, primary buttons, active icon states, and key navigational nodes.
- **Secondary & Tertiary Text (`#737373` / `#8E8E8E`)**: Timestamps, metadata, captions, secondary tabs, and inactive controls.
- **Dividers & Structural Rules (`#DBDBDB` / `#EFEFEF`)**: 1px crisp hairline borders that establish structural grid partitions without drawing attention.
- **Interactive Blue (`#0095F6`)**: Reserved strictly for high-priority interactive verbs (e.g., "Follow", inline link taps). All non-critical actions default to solid black or neutral wireframe styling.

## Typography

The type system prioritizes Apple platform nativity and high-density legibility through the native system stack (`-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif`). 

Key rules:
- **Tight Vertical Rhythm**: Line heights stay strictly between 1.2× and 1.35× to facilitate dense, compact feed readability without text sprawling.
- **Micro-Weighting**: Semibold (`600`) handles usernames, active tab triggers, and primary actions. Regular (`400`) handles caption text, secondary counts, and timestamps.
- **Negative Tracking**: Headlines use slight negative letter-spacing (`-0.01em` to `-0.02em`) to maintain structural compactness alongside media assets.

## Layout & Spacing

The layout structure mirrors a disciplined 1-column feed on mobile expanding into a side-navigation desktop architecture with a centered 630px content channel or a dense 3-column media grid (1px to 4px gap).

- **Mobile (< 768px)**: Edge-to-edge media feed. 12px outer padding for card headers and interaction rows. 0px margin for raw media posts.
- **Tablet (768px - 1024px)**: Collapsed icon rail on the left (72px width), main feed centered with responsive margins.
- **Desktop (> 1024px)**: Fixed 244px structural left navigation pane separated by a 1px `#DBDBDB` vertical border. Feed content is pinned to a maximum width of 630px (or 935px for profile grids).
- **Rhythm**: All paddings adhere strictly to 4px/8px intervals (`0.25rem`, `0.5rem`, `0.75rem`, `1rem`).

## Elevation & Depth

Visual hierarchy is communicated strictly through surface isolation and hairline borders rather than volumetric drop shadows.

- **Hairline Boundaries**: Surfaces are separated by 1px solid borders using `#DBDBDB` for key content structural dividers and `#EFEFEF` for subtle inner subdivisions.
- **Zero Drop Shadows**: Elevation levels 1 through 3 are completely devoid of blur-radius drop shadows.
- **Modals & Overlays**: Modals sit on a pure `#000000` scrim at 65% opacity. Dialogs utilize a crisp `#FFFFFF` container with a 1px `#DBDBDB` boundary and an ultra-subtle, ambient shadow (`0 4px 12px rgba(0, 0, 0, 0.15)`) only when layering over complex visual feeds.
- **Layering**: Header and bottom navigation bars pin to viewport edges with `#FFFFFF` solid or `rgba(255, 255, 255, 0.95)` with backdrop-filter blur (20px), bounded by a 1px bottom or top hairline stroke.

## Shapes

The system relies on subtle, soft geometric contours:
- **Containers & Feed Cards**: Completely sharp (`0px`) on mobile edge-to-edge layouts; subtle `rounded-sm` (4px to 8px) on floating desktop viewports.
- **Buttons & Interactive Pills**: Subtle `rounded-md` (8px) for buttons, search fields, and contextual cards.
- **Story & Profile Avatars**: Perfect circles (`rounded-full` / `50%`) with an optional 2px white gap separating the media border.
- **Iconography**: Rendered strictly with 1.5px to 2px stroke weight, sharp terminal corners, and unshaded internal geometry.

## Components

### Buttons
- **Primary Action**: Solid `#000000` background, `#FFFFFF` text, `border-radius: 8px`, `font-size: 14px`, `font-weight: 600`, height: 32px. No shadow.
- **Secondary Action**: Solid `#EFEFEF` background, `#000000` text, `border-radius: 8px`, hover background `#DBDBDB`.
- **Text / Inline Action**: Pure `#0095F6` or `#000000` text, no background or border, `font-weight: 600`.
- **Destructive**: Bare text or subtle light gray background with `#ED4956` label.

### Form Inputs & Search
- **Search Bars**: Height 36px, `border-radius: 8px`, `#EFEFEF` surface fill, no border. Leading search icon in `#8E8E8E`. Placeholder text `#8E8E8E`.
- **Form Fields**: Clean `#FAFAFA` container with 1px `#DBDBDB` border, active/focus state switches border to `#737373` without outer glow rings.

### Feed Cards
- **Card Header**: 44px to 56px height, 32px circular avatar, 14px semibold username, overflow menu icon (dots) flush right.
- **Media Container**: 1:1, 4:5, or 16:9 ratio, full container width, zero border radius on mobile.
- **Action Strip**: Standardized 40px height row with heart, comment, and share icons aligned left (24px bounding box, 1.75px stroke), bookmark icon pinned right.
- **Metrics & Captions**: Likes formatted as bold 14px text; captions display username in semibold followed by regular body text with inline `#737373` "more" truncators.

### Chips & Tabs
- **Profile / Content Tabs**: Borderless text or icon links with an active 1px solid `#000000` top marker on desktop, or pure black active icon vs `#8E8E8E` inactive icon on mobile.
- **Filter Chips**: 32px height, 8px border radius, `#EFEFEF` fill for inactive, solid `#000000` with white text for active.

### Checkboxes & Radios
- **Checkbox**: 18px square with 3px border radius, 1.5px `#DBDBDB` border, `#0095F6` fill with white checkmark when selected.
- **Radio**: 18px circle, `#0095F6` outer ring with 8px solid center dot.