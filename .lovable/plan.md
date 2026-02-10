

## Add Behind-the-Scenes Photo to Hero Section

### What We'll Do

Place the uploaded recording photo as a background/hero image in the **HeroSection**, giving the landing page an immediate human, authentic feel instead of the current gradient-only background.

### Layout

The image will sit behind the existing hero content as a full-bleed background with a dark overlay to maintain text readability. The gradient overlay will blend the photo into the dark theme.

### Technical Steps

1. **Copy the image** from `user-uploads://IMG_1029.jpeg` to `src/assets/behind-the-scenes.jpg`
2. **Update `HeroSection.tsx`**:
   - Import the image
   - Add an `<img>` element with `object-cover` filling the hero area, positioned absolutely behind the content
   - Keep the existing gradient overlay on top of the image (adjusting opacity so the photo is visible but text remains legible)
   - Add descriptive `alt` text for accessibility

### Result

Visitors will land on a hero with a real photo of Bruna and Fabi recording, overlaid with the dark gradient and the existing headline/CTA -- immediately setting a warm, human tone.

