

## SEO Improvements Implementation Plan

Based on the audit, here are the improvements to implement:

### 1. Enhanced Meta Tags (index.html)

Add missing Open Graph image dimensions and Twitter creator handles:
- `og:image:width` (1200) and `og:image:height` (630)
- `twitter:creator` handle for the podcast

### 2. Performance: Preconnect Hints (index.html)

Add resource hints for faster loading of external resources:
- Preconnect to Spotify embed domain (`open.spotify.com`)
- DNS-prefetch as fallback for older browsers

### 3. Accessibility: Section Aria Labels

Add `aria-label` attributes to sections currently missing them:
- `SeriesSection.tsx` - "Podcast series overview"
- `FeaturedEpisodesSection.tsx` - "Featured episodes"
- `StorySection.tsx` - "Our story"
- `ListenSection.tsx` - "Where to listen"
- `BlogSection.tsx` - "Blog articles"

### 4. Episode Metadata for Accessibility (FeaturedEpisodesSection.tsx)

Replace empty episode titles with descriptive ones for screen readers:
- Add meaningful titles to each Spotify iframe `title` attribute
- Example: "Human Endurance Podcast — Episode with Reto Braendli"

### 5. 404 Page SEO (NotFound.tsx)

Add a document title update for the 404 page so search engines and users see a proper page title.

---

### Files to Edit

| File | Changes |
|------|---------|
| `index.html` | Add og:image dimensions, twitter:creator, preconnect hints |
| `src/components/SeriesSection.tsx` | Add aria-label to section |
| `src/components/FeaturedEpisodesSection.tsx` | Add aria-label, update episode titles |
| `src/components/StorySection.tsx` | Add aria-label to section |
| `src/components/ListenSection.tsx` | Add aria-label to section |
| `src/components/BlogSection.tsx` | Add aria-label to section |
| `src/pages/NotFound.tsx` | Add useEffect to set document.title |

