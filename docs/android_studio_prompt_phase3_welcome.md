# Android Studio AI Prompt — Phase 3 (Welcome Screen UI)

Paste this directly into Android Studio AI Assistant:

---

You are an expert Android engineer.

Build a production-quality **Welcome screen** in **Kotlin + Jetpack Compose** for app name **Estimator Pro**.

## Goal
Create a screen that visually matches this style:
- dark cosmic/space gradient background with stars
- centered logo area near top-middle
- title text:
  - "WELCOME TO"
  - "ESTIMATOR PRO" (gradient text from blue -> pink/orange)
- glowing pill button at bottom area:
  - text: "GET STARTED"
  - gradient border glow blue -> orange

## Project constraints
- Kotlin
- MVVM architecture
- Jetpack Compose Material 3
- Keep code simple and runnable
- No XML layouts
- No over-engineering

## Deliverables
Return **complete Kotlin files with imports** (no pseudocode):

1. `ui/welcome/WelcomeScreen.kt`
   - `@Composable fun WelcomeScreen(onGetStarted: () -> Unit)`
   - Full-screen layout with:
     - gradient/dark space background
     - optional star field effect (draw circles with Canvas)
     - centered logo placeholder if no asset exists
     - two-line title text
     - gradient text for "ESTIMATOR PRO"
     - glowing rounded "GET STARTED" button
   - Add `@Preview`.

2. `ui/theme/GradientBrushes.kt` (or equivalent)
   - Reusable brushes for:
     - background gradient
     - brand text gradient
     - button glow/border gradient

3. Navigation integration
   - Update existing navigation graph (or create minimal one) with route `"welcome"`.
   - Hook `onGetStarted()` to navigate to `"login"` (or placeholder route if login not built yet).

## UI details to enforce
- Use `Box` root with gradient background.
- Place subtle stars (small circles with random alpha/size).
- Vertical content alignment similar to mockup:
  - logo around upper-middle
  - title below logo
  - button near lower-middle with horizontal padding
- Button style:
  - pill shape (`RoundedCornerShape(50)`)
  - inner dark fill
  - outer gradient border/glow
  - white bold text
- Ensure good readability on dark background.

## Quality bar
- Code compiles without placeholders that break build.
- Functions are small and clear.
- Keep constants (colors, sizes, route names) in sensible places.
- Use Material 3 typography where possible.

After generating files, include a short note explaining where to place logo image assets (`res/drawable`) if I want to replace the placeholder with my real logo.

---

## Optional follow-up prompt (if result is close but needs tuning)

Refine `WelcomeScreen` to more closely match a neon cyber look:
- increase blue/purple/orange glow intensity
- slightly larger logo area
- stronger contrast for "ESTIMATOR PRO" gradient text
- add subtle animated twinkle to stars (low CPU impact)
- keep existing structure and route names unchanged
