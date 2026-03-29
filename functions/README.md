# Estimator Pro Firebase Functions

Simple, robust Firestore trigger flow in JavaScript (no TypeScript):

- `estimates/{estimateId}` with `status: "approved"` -> creates `jobsheets/{estimateId}` if missing.
- `jobsheets/{jobsheetId}` with `status: "completed"` -> creates `invoices/{jobsheetId}` if missing.

This keeps logic simple and prevents duplicates by using deterministic destination document IDs plus a Firestore transaction check-and-create.

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

## Run quick checks

```bash
cd functions
npm test
node --check index.js
```
