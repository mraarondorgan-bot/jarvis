const test = require("node:test");
const assert = require("node:assert/strict");

const { buildJobsheetData, buildInvoiceData } = require("./builders");

test("buildJobsheetData falls back to defaults", () => {
  const data = buildJobsheetData("est-1", {}, "ts");

  assert.equal(data.estimateId, "est-1");
  assert.equal(data.status, "pending");
  assert.equal(data.title, "");
  assert.equal(data.description, "");
  assert.deepEqual(data.lineItems, []);
  assert.equal(data.total, 0);
  assert.equal(data.companyId, null);
  assert.equal(data.sourceUpdatedAt, null);
  assert.equal(data.createdAt, "ts");
});

test("buildInvoiceData falls back to defaults", () => {
  const data = buildInvoiceData("job-1", {}, "ts");

  assert.equal(data.jobsheetId, "job-1");
  assert.equal(data.status, "draft");
  assert.equal(data.title, "");
  assert.deepEqual(data.lineItems, []);
  assert.equal(data.total, 0);
  assert.equal(data.companyId, null);
  assert.equal(data.sourceUpdatedAt, null);
  assert.equal(data.createdAt, "ts");
});
