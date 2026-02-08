

## Three Changes to the Landing Page

### 1. Uniform background for Hosts section
The "Meet Your Hosts" section has `bg-card/50` making it lighter than the rest. Remove this so all sections share the same dark background.

**File:** `src/components/HostsSection.tsx`
- Change `className="py-28 px-6 bg-card/50"` to `className="py-28 px-6"`

### 2. Add gradient divider lines between all sections
The thin gradient line at the bottom of the Hero section (a 1px-wide, 16px-tall gradient from pink to transparent) is a nice visual separator. Add the same divider between every section by creating a small reusable `SectionDivider` component and placing it between each section in `Index.tsx`.

**New file:** `src/components/SectionDivider.tsx`
- A centered vertical gradient line (same style as the Hero one: `w-px h-16 bg-gradient-to-b from-primary/60 to-transparent`)

**File:** `src/pages/Index.tsx`
- Insert `<SectionDivider />` between each section pair: Story/Series, Series/Hosts, Hosts/Listen

The existing line at the bottom of HeroSection stays as-is (it has its own fade-in animation tied to the hero).

### 3. Make particles visible in the Hero section
The particles render behind the hero but the hero has an opaque gradient overlay (`bg-gradient-to-b from-card via-background to-background`) that covers them completely. Fix by making the hero background semi-transparent so particles show through.

**File:** `src/components/HeroSection.tsx`
- Change the overlay from `from-card via-background to-background` to `from-card/80 via-background/90 to-background` so the particles are subtly visible behind the hero text

