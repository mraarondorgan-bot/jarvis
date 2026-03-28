const admin = require("firebase-admin");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

admin.initializeApp();
const db = admin.firestore();

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
  const jobsheetSnap = await jobsheetRef.get();

  if (jobsheetSnap.exists) {
    logger.info("Jobsheet already exists, skipping", { estimateId, jobsheetId: estimateId });
    return;
  }

  const jobsheetData = {
    estimateId,
    companyId: afterData.companyId || null,
    userId: afterData.userId || null,
    contactId: afterData.contactId || null,
    projectId: afterData.projectId || null,
    status: "pending",
    title: afterData.title || "",
    description: afterData.description || "",
    lineItems: Array.isArray(afterData.lineItems) ? afterData.lineItems : [],
    total: afterData.total || 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    sourceUpdatedAt: afterData.updatedAt || null,
  };

  await jobsheetRef.set(jobsheetData, { merge: false });

  logger.info("Jobsheet created from approved estimate", {
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
  const invoiceSnap = await invoiceRef.get();

  if (invoiceSnap.exists) {
    logger.info("Invoice already exists, skipping", { jobsheetId, invoiceId: jobsheetId });
    return;
  }

  const invoiceData = {
    jobsheetId,
    estimateId: afterData.estimateId || null,
    companyId: afterData.companyId || null,
    userId: afterData.userId || null,
    contactId: afterData.contactId || null,
    projectId: afterData.projectId || null,
    status: "draft",
    title: afterData.title || "",
    lineItems: Array.isArray(afterData.lineItems) ? afterData.lineItems : [],
    total: afterData.total || 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    sourceUpdatedAt: afterData.updatedAt || null,
  };

  await invoiceRef.set(invoiceData, { merge: false });

  logger.info("Invoice created from completed jobsheet", {
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
