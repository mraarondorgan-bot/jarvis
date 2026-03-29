# Android Studio Prompt — Estimator Pro (Phase 2)

Paste this into Android Studio AI Assistant right after completing phase 1 scaffolding.

## Prompt

Continue from the existing Estimator Pro Android codebase.

You already generated:
- Gradle dependencies
- package structure
- Firebase initialization
- Hilt modules

Now implement **Phase 2** only:

1. Build full **Authentication flow** with Firebase Auth:
   - login (email/password)
   - signup (email/password)
   - logout

2. Create these files with complete Kotlin code + imports:
   - `data/auth/AuthRepository.kt`
   - `data/auth/FirebaseAuthRepository.kt`
   - `ui/auth/AuthViewModel.kt`
   - `ui/auth/LoginScreen.kt`
   - `ui/auth/SignupScreen.kt`
   - navigation updates for auth-gated routes

3. Requirements:
   - Use MVVM + StateFlow
   - UI states: loading, success, error
   - Input validation (email format, min password length)
   - Error messages surfaced in Compose UI
   - Keep code concise and production-practical

4. Navigation behavior:
   - If user is authenticated -> go to Dashboard
   - If not authenticated -> go to Login
   - Signup navigates back to Login after success

5. Output format:
   - Show code file-by-file
   - Do not skip imports
   - Do not include pseudocode

After phase 2 completes, ask me if I want phase 3 (Contacts + Projects CRUD with realtime Firestore flows).
