const admin = require("firebase-admin");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { buildJobsheetData, buildInvoiceData } = require("./builders");

admin.initializeApp();
const db = admin.firestore();

async function createIfMissing(docRef, data, logContext) {
  const result = await db.runTransaction(async (tx) => {
    const snap = await tx.get(docRef);

    if (snap.exists) {
      return { created: false };
    }

    tx.set(docRef, data, { merge: false });
    return { created: true };
  });

  if (result.created) {
    logger.info("Document created", logContext);
    return true;
  }

  logger.info("Document already exists, skipping", logContext);
  return false;
}

/**
 * Estimate -> Jobsheet trigger
 * Rule: if estimate.status === "approved", create jobsheet if it does not exist.
 */
exports.onEstimateWritten = onDocumentWritten("estimates/{estimateId}", async (event) => {
  const estimateId = event.params.estimateId;
  const afterData = event.data.after.exists ? event.data.after.data() : null;

  if (!afterData) {
    logger.info("Estimate deleted, skipping", { estimateId });
    return;
  }

  logger.info("Estimate write received", {
    estimateId,
    status: afterData.status || null,
  });

  if (afterData.status !== "approved") {
    logger.info("Estimate not approved, skipping jobsheet creation", { estimateId });
    return;
  }

  const jobsheetRef = db.collection("jobsheets").doc(estimateId);
  const jobsheetData = buildJobsheetData(
    estimateId,
    afterData,
    admin.firestore.FieldValue.serverTimestamp(),
  );

  await createIfMissing(jobsheetRef, jobsheetData, {
    estimateId,
    jobsheetId: estimateId,
  });
});

/**
 * Jobsheet -> Invoice trigger
 * Rule: if jobsheet.status === "completed", create invoice if it does not exist.
 */
exports.onJobsheetWritten = onDocumentWritten("jobsheets/{jobsheetId}", async (event) => {
  const jobsheetId = event.params.jobsheetId;
  const afterData = event.data.after.exists ? event.data.after.data() : null;

  if (!afterData) {
    logger.info("Jobsheet deleted, skipping", { jobsheetId });
    return;
  }

  logger.info("Jobsheet write received", {
    jobsheetId,
    status: afterData.status || null,
  });

  if (afterData.status !== "completed") {
    logger.info("Jobsheet not completed, skipping invoice creation", { jobsheetId });
    return;
  }

  const invoiceRef = db.collection("invoices").doc(jobsheetId);
  const invoiceData = buildInvoiceData(
    jobsheetId,
    afterData,
    admin.firestore.FieldValue.serverTimestamp(),
  );

  await createIfMissing(invoiceRef, invoiceData, {
    jobsheetId,
    invoiceId: jobsheetId,
  });
});

/**
 * Placeholder callable: PDF generation.
 */
exports.generatePDF = onCall(async (request) => {
  logger.info("generatePDF called", {
    uid: request.auth ? request.auth.uid : null,
    payloadKeys: request.data ? Object.keys(request.data) : [],
  });

  return {
    ok: true,
    message: "PDF generation placeholder. Wire in PDF logic later.",
  };
});

/**
 * Placeholder callable: send to FreeAgent.
 */
exports.sendToFreeAgent = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Authentication is required.");
  }

  logger.info("sendToFreeAgent called", {
    uid: request.auth.uid,
    payloadKeys: request.data ? Object.keys(request.data) : [],
  });

  return {
    ok: true,
    message: "FreeAgent sync placeholder. Wire in API integration later.",
  };
});
