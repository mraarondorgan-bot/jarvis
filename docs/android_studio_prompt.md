# Android Studio Prompt — Estimator Pro (Kotlin + MVVM + Compose + Firebase)

Use the following prompt in Android Studio AI Assistant (or Gemini in Android Studio) to generate production-focused scaffolding for **Estimator Pro**.

---

## Prompt

You are a senior Android engineer.

I am building an Android app called **Estimator Pro** using:
- Kotlin
- MVVM
- Jetpack Compose
- Firebase (Auth, Firestore, Storage, Functions)

My backend already has Firebase Functions that:
- Create `jobsheets/{estimateId}` when `estimates/{estimateId}.status == "approved"`
- Create `invoices/{jobsheetId}` when `jobsheets/{jobsheetId}.status == "completed"`

I need a practical, production-ready Android foundation with **simple, reliable architecture** (no over-engineering).

### Requirements

1. **Project Setup**
   - Use a single-activity Compose app.
   - MVVM with clear package structure:
     - `data/` (models, repositories, firebase sources)
     - `domain/` (optional simple use cases only where useful)
     - `ui/` (screens, components, navigation)
     - `di/` (Hilt modules)
   - Use Hilt for DI.
   - Use Firebase BoM.

2. **Authentication**
   - Email/password sign in + sign up + sign out.
   - Expose auth state as `StateFlow`.
   - Add guarded navigation: unauthenticated users go to Auth flow; authenticated users go to Main flow.

3. **Firestore Data Model Support**
   Create Kotlin data classes and repository APIs for collections:
   - `companies`
   - `users`
   - `contacts`
   - `projects`
   - `estimates`
   - `jobsheets`
   - `invoices`

   Include common fields:
   - `id: String`
   - `companyId: String?`
   - `createdAt: Timestamp?`
   - `updatedAt: Timestamp?`
   - `status: String?` where relevant

4. **Core CRUD Flows (first priority)**
   Implement Compose screens + ViewModels for:
   - Contacts list + add/edit
   - Projects list + add/edit
   - Estimates list + create + set status to `approved`
   - Jobsheets list + set status to `completed`
   - Invoices list (read-only for now)

   Requirements:
   - Real-time updates using Firestore snapshot listeners + Flow.
   - Loading / empty / error states for each screen.
   - Basic form validation.

5. **Realtime + Reliability**
   - Use repository methods returning `Flow<List<T>>` for list screens.
   - Use suspend methods for create/update/delete actions.
   - Add logging with `Log.d/e` in repositories and ViewModels.
   - Keep failure handling explicit with `Result` wrappers.

6. **Storage Upload (Images)**
   - Add image picker integration for estimate/job photos.
   - Upload to Firebase Storage path pattern:
     - `companies/{companyId}/estimates/{estimateId}/{filename}`
   - Save uploaded URL/path into Firestore document.

7. **Cloud Functions Calls (placeholders now)**
   - Add a `FunctionsRepository` with callable methods:
     - `generatePdf(estimateId: String)`
     - `sendToFreeAgent(invoiceId: String)`
   - Show success/error toast/snackbar from UI.

8. **Navigation**
   - Compose Navigation routes:
     - Auth
     - Dashboard
     - Contacts
     - Projects
     - Estimates
     - Jobsheets
     - Invoices

9. **Deliverables format**
   - Generate complete Kotlin files with imports.
   - Provide file-by-file output.
   - Start with:
     1) Gradle dependencies
     2) package structure
     3) Firebase init and DI modules
     4) Auth flow
     5) Contacts/Projects CRUD
     6) Estimates -> Jobsheets -> Invoices screens
     7) Storage upload utility
     8) FunctionsRepository

10. **Constraints**
   - Keep code concise and readable.
   - Do not add unnecessary layers.
   - No TypeScript/Node instructions (Android only).
   - Prefer practical defaults over theoretical abstractions.

Now generate the implementation in phases, starting with **Gradle + project structure + Firebase/Hilt initialization**.

---

## Optional follow-up prompt

After the first output, use this follow-up:

> Continue with phase 2: implement Auth repository, AuthViewModel, and Compose Auth screens (login/signup), then wire guarded navigation based on auth state.
