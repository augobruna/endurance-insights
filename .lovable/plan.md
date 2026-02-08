

## Add Featured Episodes Section with Spotify Embeds

Create a new "Featured Episodes" section displaying 3 curated Spotify episode embeds, placed between the Series and Hosts sections.

### New File: `src/components/FeaturedEpisodesSection.tsx`

A new section component containing:
- Section header with "Featured Episodes" title, a subtitle tag, and descriptive text (matching the style of SeriesSection)
- 3 Spotify episode embeds using iframes with the dark theme (`?theme=0`)
- Each embed uses the compact player (152px height) which fits the site aesthetic
- Framer Motion fade-in animations consistent with other sections
- Responsive layout: stacked vertically on mobile, side by side on larger screens (grid with 1 column on mobile, 3 on desktop)
- Episode data stored as a simple array of objects with `title`, `episodeId`, and `description`

The Spotify embed URL format: `https://open.spotify.com/embed/episode/{EPISODE_ID}?utm_source=generator&theme=0`

We'll use 3 episode IDs pulled from the show's Spotify page (show ID: `4JR5cvFpYmuvaQxbx2D9nb`). The episodes will be hardcoded -- no API key or backend needed, just simple iframes.

### Updated File: `src/pages/Index.tsx`

- Import the new `FeaturedEpisodesSection` component
- Place it between `SeriesSection` and `HostsSection`, with `SectionDivider` components on either side

The updated section order will be:
1. Hero
2. Our Story
3. Series (Science and Stories)
4. **Featured Episodes (new)**
5. Meet Your Hosts
6. Where to Listen
7. Footer

