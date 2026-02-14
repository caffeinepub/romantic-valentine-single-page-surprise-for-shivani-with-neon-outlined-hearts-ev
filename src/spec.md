# Specification

## Summary
**Goal:** Build a single-page romantic Valentine surprise for Shivani with an interactive neon hearts background, two-choice prompt, an evasive “i dont like you” button, and a meme-based success reveal.

**Planned changes:**
- Create a responsive single-page UI that displays: “Shivani,\nWill you be my Valentine?” with exactly two options labeled “yess” and “i dont like you”.
- Implement a full-viewport animated background of many small neon (pink/white) hollow outlined hearts floating upward continuously on a dark romantic backdrop.
- Add interactivity so mouse movement and touch input visibly influence nearby hearts while they continue drifting upward.
- Make the “i dont like you” button evade hover and attempted tap/press by relocating within the viewport without overlapping the “yess” button area.
- On clicking “yess”, transition to a success state showing the provided meme image and the exact caption: “Hehehe Good gurl 😚💗”, keeping the neon romantic styling.
- Render the static meme image directly from `frontend/public/assets/generated/valentine-meme.dim_1200x800.png` (no backend fetch).

**User-visible outcome:** The user sees a romantic interactive page with floating neon hearts, can only practically select “yess” due to the evasive “i dont like you” button, and upon clicking “yess” sees a celebratory meme and the caption “Hehehe Good gurl 😚💗”.
