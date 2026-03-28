# Estimator Pro Firebase Functions

Simple, robust Firestore trigger flow in JavaScript (no TypeScript):

- `estimates/{estimateId}` with `status: "approved"` -> creates `jobsheets/{estimateId}` if missing.
- `jobsheets/{jobsheetId}` with `status: "completed"` -> creates `invoices/{jobsheetId}` if missing.

This avoids complex before/after comparisons and prevents duplicates by using deterministic destination document IDs.

## Deploy

```bash
cd functions
npm install
npm run deploy
```

## Debugging

```bash
cd functions
npm run logs
```
