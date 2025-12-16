# Role
Act as a Senior Frontend Engineer and UI/UX Designer specializing in "Future OS" concepts and Progressive Web Apps (PWA).

# Goal
Create a futuristic React PWA application using Tailwind CSS that emulates a hypothetical "iOS 26" design language. The app must feel indistinguishable from a native high-end iOS application.

# Tech Stack
- Framework: React (Vite)
- Language: TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion (Crucial for native feel)
- Icons: Lucide React or Heroicons
- PWA: Vite PWA Plugin

# Design Language: "iOS 26 Concept" (Futuristic & Spatial)
1. **Hyper-Glassmorphism:** Use advanced background blurs (`backdrop-filter: blur(40px)`), multi-layered translucency, and subtle white/gradient borders to create depth.
2. **Spatial UI:** Elements should feel like they are floating. Use deep shadows and parallax effects.
3. **Typography:** San Francisco style, large headings, thin weights, high contrast.
4. **Color Palette:** Adaptive dark/light mode. Use neo-gradients (aurora borealis styles) for backgrounds.
5. **Shapes:** Hyper-rounded corners (Squircle shapes).

# "Native App" Characteristics Requirements (Strict)
1. **Viewport & Layout:**
   - Configure `viewport` meta tag specifically for iOS (`viewport-fit=cover`, `user-scalable=no`).
   - Handle "Safe Area Insets" (Dynamic Island top padding, Home Indicator bottom padding) using Tailwind classes (e.g., `pt-[env(safe-area-inset-top)]`).
   - Prevent "rubber-banding" scroll on the body.
2. **Interactions:**
   - Implement "Spring Physics" animations for all interactions (modals, buttons, page transitions) using Framer Motion.
   - Buttons must scale down slightly (`scale: 0.95`) on tap to simulate touch pressure.
3. **Navigation:**
   - A floating, glass-morphic bottom tab bar that sits *above* the content.
   - Smooth page transitions (slide-over or spatial zoom).

# PWA Configuration
1. Create a `manifest.json` configuration for a standalone experience (hide browser UI).
2. Set `display: standalone` and `theme_color` to match the background.
3. Include instructions for high-res icons (Apple Touch Icon).

# Task
Generate the foundational code structure:
1. `index.html` (Meta tags for iOS native feel).
2. `tailwind.config.js` (Custom colors, blurs, and animation utilities).
3. `App.tsx` (Layout with Safe Area handling).
4. A sample component: `GlassCard.tsx` showing the "iOS 26" style.
5. A sample navigation: `FloatingTabBar.tsx`.

Make it look expensive, futuristic, and extremely smooth.