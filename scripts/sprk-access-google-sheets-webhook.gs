const SHEET_NAME = 'SPRK Prototype Access';
const EXPECTED_SHARED_SECRET = ''; // Optional: set a secret here and include sharedSecret in the frontend payload if desired.

function doPost(e) {
  try {
    const payload = parsePayload_(e);

    if (EXPECTED_SHARED_SECRET && payload.sharedSecret !== EXPECTED_SHARED_SECRET) {
      return jsonResponse_({ ok: false, error: 'Unauthorized' }, 401);
    }

    const sheet = getOrCreateSheet_();
    ensureHeaderRow_(sheet);

    sheet.appendRow([
      new Date(),
      payload.submittedAt || '',
      payload.firstName || '',
      payload.lastName || '',
      payload.email || '',
      payload.visitId || '',
      payload.entryPath || '',
      payload.referrer || '',
      payload.timezone || '',
      payload.source || '',
      payload.userAgent || '',
      payload.attemptStatus || '',
      normalizeBoolean_(payload.accessGranted),
      normalizeBoolean_(payload.passwordValid),
      payload.validationErrors || '',
    ]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: String(error) }, 500);
  }
}

function doGet() {
  return jsonResponse_({ ok: true, message: 'SPRK Prototype Access webhook is live.' });
}

function parsePayload_(e) {
  const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
  try {
    return JSON.parse(raw);
  } catch (jsonError) {
    const parsed = {};
    raw.split('&').forEach(function (pair) {
      const parts = pair.split('=');
      if (!parts[0]) return;
      const key = decodeURIComponent(parts[0].replace(/\+/g, ' '));
      const value = decodeURIComponent((parts[1] || '').replace(/\+/g, ' '));
      parsed[key] = value;
    });
    return parsed;
  }
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaderRow_(sheet) {
  const headers = [
    'receivedAt',
    'submittedAt',
    'firstName',
    'lastName',
    'email',
    'visitId',
    'entryPath',
    'referrer',
    'timezone',
    'source',
    'userAgent',
    'attemptStatus',
    'accessGranted',
    'passwordValid',
    'validationErrors',
  ];

  const existingHeader = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeader = existingHeader.some(function (value) { return String(value || '').trim() !== ''; });

  if (!hasHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function normalizeBoolean_(value) {
  if (value === true || value === 'true') return 'TRUE';
  if (value === false || value === 'false') return 'FALSE';
  return value || '';
}

function jsonResponse_(body, statusCode) {
  const output = ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);

  // Apps Script ContentService does not allow custom HTTP status codes for web app responses.
  // The statusCode argument is retained for readability and future migration compatibility.
  return output;
}
