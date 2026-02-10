

## Add Photo to "How It Started" Section

### What We'll Do

Add the beautiful outdoor photo of Bruna and Fabi to the **StorySection** ("How It Started"), placed between the heading and the story text. The image will feel natural and warm, matching the section's personal tone.

### Layout

- Photo inserted after the "How It Started" heading, before the paragraphs
- Displayed with rounded corners (`rounded-2xl`) and a slight rotation for a casual, scrapbook-like feel
- Wrapped in a `motion.div` that animates in on scroll, consistent with the rest of the section
- Soft shadow to give it depth against the dark background

### Technical Steps

1. **Copy the image** from `user-uploads://DSC05802.jpeg` to `src/assets/hosts-outdoor.jpg`
2. **Update `StorySection.tsx`**:
   - Import the image
   - Add a `motion.div` container between the heading and the paragraphs
   - Style the image with `rounded-2xl`, a subtle `rotate-1` tilt, `shadow-2xl`, and `max-w-2xl mx-auto`
   - Add alt text: "Bruna and Fabi smiling outdoors by a lake"

### Result

The "How It Started" section will open with the heading, then show a warm, slightly tilted photo of Bruna and Fabi laughing together outdoors, followed by the origin story text -- giving the section an authentic, personal feel.

