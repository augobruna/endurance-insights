

## Rebrand: Pink/Blue Accent Colors with Gradient Button

Update the entire color palette from the current yellow/golden-orange theme to the official brand colors: pink (#f53861), blue (#0060a6), orange (#ff9c00), cream (#f8e6d6), and black (#000000). The "Listen Now" button gets a standout pink-to-blue gradient.

### What changes

**1. CSS Variables (src/index.css)**
- `--primary`: change from golden yellow to pink (#f53861 -> approx HSL 348 91% 59%)
- `--secondary`: change from golden-orange to blue (#0060a6 -> approx HSL 207 100% 33%)
- `--accent`: change from bright yellow to orange (#ff9c00 -> approx HSL 37 100% 50%)
- `--ring`: update to match new primary (pink)
- `--sidebar-primary` and `--sidebar-ring`: update to match
- Update `.gradient-text`, `.gradient-border`, `.gradient-bg` utility classes to use pink-to-blue gradient instead of yellow-to-orange

**2. Floating Particles (src/components/FloatingParticles.tsx)**
- Update the `colors` array to use the new brand palette (pink, blue, orange, cream)
- Update the two gradient orbs from golden hues to pink and blue

**3. Hero "Listen Now" button (src/components/HeroSection.tsx)**
- Replace `gradient-bg` class with an inline or custom gradient style going from pink (#f53861) through blue (#0060a6) for a standout effect

**4. Section Divider (src/components/SectionDivider.tsx)**
- Automatically picks up new `primary` color, no code changes needed

**5. All other components** (HostsSection, SeriesSection, StorySection, ListenSection, FeaturedEpisodesSection, Footer, Navbar)
- These use `text-primary`, `hover:text-primary`, `border-primary` etc. which automatically update via the CSS variable change -- no code edits needed

### Files to edit
- `src/index.css` -- CSS variables and gradient utilities
- `src/components/FloatingParticles.tsx` -- particle and orb colors
- `src/components/HeroSection.tsx` -- Listen Now button gradient

