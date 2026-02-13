# Specification

## Summary
**Goal:** Create a single-page romantic Valentine surprise for Shivani with an interactive neon heart background, two choice buttons, an evasive “i dont like you” button, and a celebratory meme reveal on “yess”.

**Planned changes:**
- Build a single-screen UI that displays: “Shivani,” and “Will you be my Valentine?” with exactly two buttons: “yess” and “i dont like you”.
- Add a full-viewport animated background of many small neon pink/white hollow outlined hearts floating upward continuously with a visible glow.
- Make the hearts interactive to pointer movement (desktop) and touch/drag (iPad), affecting nearby hearts while preserving upward motion.
- Implement evasive behavior for the “i dont like you” button on hover (desktop) and attempted tap/press (touch) by relocating it within the viewport and away from the main “yess” area.
- On clicking “yess”, transition to a success/reveal state that shows the static meme image and the exact text: “Hehehe Good gurl 😚💗”, using the bundled asset at `/assets/generated/valentine-meme.dim_1200x800.png`.

**User-visible outcome:** The user sees an animated, interactive neon-heart Valentine prompt for Shivani with two choices; the “i dont like you” button dodges interaction, and choosing “yess” reveals a meme image plus the message “Hehehe Good gurl 😚💗”.
