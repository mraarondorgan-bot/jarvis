function buildJobsheetData(estimateId, estimate, serverTimestamp) {
  return {
    estimateId,
    companyId: estimate.companyId || null,
    userId: estimate.userId || null,
    contactId: estimate.contactId || null,
    projectId: estimate.projectId || null,
    status: "pending",
    title: estimate.title || "",
    description: estimate.description || "",
    lineItems: Array.isArray(estimate.lineItems) ? estimate.lineItems : [],
    total: estimate.total || 0,
    createdAt: serverTimestamp,
    sourceUpdatedAt: estimate.updatedAt || null,
  };
}

function buildInvoiceData(jobsheetId, jobsheet, serverTimestamp) {
  return {
    jobsheetId,
    estimateId: jobsheet.estimateId || null,
    companyId: jobsheet.companyId || null,
    userId: jobsheet.userId || null,
    contactId: jobsheet.contactId || null,
    projectId: jobsheet.projectId || null,
    status: "draft",
    title: jobsheet.title || "",
    lineItems: Array.isArray(jobsheet.lineItems) ? jobsheet.lineItems : [],
    total: jobsheet.total || 0,
    createdAt: serverTimestamp,
    sourceUpdatedAt: jobsheet.updatedAt || null,
  };
}

module.exports = {
  buildJobsheetData,
  buildInvoiceData,
};
