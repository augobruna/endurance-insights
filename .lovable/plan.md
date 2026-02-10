
## Switch to Light Pastel Cream Background

### What Changes

Transform the site from its current dark theme to a warm, light pastel cream background (#f8e6d6) while keeping all animations, layout, and content intact.

### Visual Changes

- **Background**: Dark near-black becomes warm cream (#f8e6d6)
- **Text**: Light text becomes dark text for readability
- **Cards** (Series section): Dark cards become slightly lighter cream/white cards with soft borders
- **Hero overlay**: Adjusted so the background photo still shows through but blends into cream instead of black
- **Navbar**: Scrolled state uses cream with blur instead of dark
- **Floating particles**: Reduced opacity and adjusted orb colors to work on a light background
- **Section dividers**: Adjusted gradient direction for light background
- **Buttons**: Outline buttons switch to dark borders/text; gradient CTA stays the same
- **Footer**: Border and text adjusted for light background

### Technical Details

**1. Update CSS variables in `src/index.css`**
- `--background` from dark (240 10% 4%) to cream (~24 76% 91%, which is #f8e6d6)
- `--foreground` from white (0 0% 95%) to dark (240 10% 10%)
- `--card` to a slightly lighter cream or white
- `--card-foreground` to dark
- `--muted` and `--muted-foreground` adjusted for light background contrast
- `--border` to a soft warm gray
- `--input` to match

**2. Update `src/components/HeroSection.tsx`**
- Change overlay gradient from `from-background/60 via-background/70 to-background/90` to blend into cream instead of dark

**3. Update `src/components/Navbar.tsx`**
- Scrolled state already uses `bg-background/80` which will automatically pick up the new cream color

**4. Update `src/components/FloatingParticles.tsx`**
- Lower opacity of gradient orbs so they're subtle on light background

**5. Update `src/components/SectionDivider.tsx`**
- Adjust gradient to be visible on light background (e.g., primary to cream instead of primary to transparent)

**6. Update `src/components/ListenSection.tsx`**
- Change outline button borders from `border-foreground/40` to work with dark foreground on cream

**7. Update `src/components/SeriesSection.tsx`**
- Card `bg-card` and `border-border` will automatically update via CSS variables

No animations are touched -- all `motion` components, transitions, and hover effects remain exactly as they are.
