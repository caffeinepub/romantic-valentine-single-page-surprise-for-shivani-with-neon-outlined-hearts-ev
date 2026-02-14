# Specification

## Summary
**Goal:** Create a single-page romantic Valentine surprise for Hridya with an interactive neon-heart live background, two-choice prompt, and a meme-based success reveal.

**Planned changes:**
- Update the main prompt copy to show the heading text "Hridya," and the question "Will you be my Valentine? 💕" with exactly two buttons labeled "yess" and "i dont like you".
- Implement/keep a full-viewport animated live background of small neon hollow outlined hearts floating upward continuously in a pink/white neon scheme.
- Add interactivity to the heart background so cursor/touch input visibly affects nearby hearts (e.g., repulsion/drift and/or glow changes) while maintaining upward motion.
- Make the "i dont like you" button evade interaction on hover and on touch/press by relocating within the viewport without overlapping the "yess" button area.
- On clicking "yess", transition to a success view that displays the static meme image and the exact caption "Hehehe Good gurl 😚💗".
- Ensure the meme image is present at `frontend/public/assets/generated/valentine-meme.dim_1200x800.png` and is rendered via the static `/assets/generated/valentine-meme.dim_1200x800.png` path responsively.
- Update page metadata (e.g., document title) to reference "Hridya".

**User-visible outcome:** The page opens to a Valentine prompt addressed to Hridya over an interactive neon heart live wallpaper; the “i dont like you” option can’t be clicked, and clicking “yess” shows a meme image with the caption “Hehehe Good gurl 😚💗”.
