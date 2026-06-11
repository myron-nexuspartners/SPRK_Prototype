# SPRK Prototype Google Sheets Logging Setup

This guide uses your provided Google Sheet as the logging destination:

https://docs.google.com/spreadsheets/d/1dTzL1Sv6FLJ-t2FuDqHZjlykiTQdJa7NM06O3ZGow0w/edit?gid=0#gid=0

The SPRK Prototype app has already been updated to send access-gate attempts to a webhook when a `VITE_ACCESS_WEBHOOK_ENDPOINT` environment variable is configured. The webhook should be a Google Apps Script web app attached to the Google Sheet above. The app logs successful and unsuccessful attempts, but it does **not** send or store the raw password.

## What the logging will capture

| Field | Meaning |
|---|---|
| `receivedAt` | Server-side timestamp from Google Apps Script. |
| `submittedAt` | Browser timestamp when the visitor submitted the access gate. |
| `firstName` | First name entered in the form. |
| `lastName` | Last name entered in the form. |
| `email` | Email address entered in the form, normalized to lowercase. |
| `visitId` | Unique browser-generated attempt ID. |
| `entryPath` | Page URL where the visitor submitted the gate. |
| `referrer` | Browser referrer or `direct`. |
| `timezone` | Visitor browser timezone. |
| `source` | Current source label: `SPRK Prototype Netlify Gate`. |
| `userAgent` | Visitor browser user-agent string. |
| `attemptStatus` | `granted` if the form passed validation; otherwise `denied`. |
| `accessGranted` | `TRUE` when the session was unlocked; otherwise `FALSE`. |
| `passwordValid` | `TRUE` when the password matched; otherwise `FALSE`. |
| `validationErrors` | Validation notes for denied attempts. |

## Step-by-step setup

### 1. Open the provided Google Sheet

Open the Sheet URL above while signed into the Google account that should own the log. This matters because the Apps Script deployment will run under the script owner’s permissions.

### 2. Open Apps Script from the Sheet

In the Google Sheet menu, select **Extensions → Apps Script**. This creates a script project that is bound to this Sheet, which allows the script to call `SpreadsheetApp.getActiveSpreadsheet()` and write rows directly to the workbook.

### 3. Replace the starter code

In the Apps Script editor, delete any starter code and paste the full contents of this repository file:

```text
scripts/sprk-access-google-sheets-webhook.gs
```

For convenience, the current script file is attached separately when I send this guide. The first line should be:

```javascript
const SHEET_NAME = 'SPRK Prototype Access';
```

You can leave `EXPECTED_SHARED_SECRET` blank for the first pass.

### 4. Save and test the script project

Click **Save** and name the script something clear, such as `SPRK Prototype Access Logger`. You do not need to manually create the `SPRK Prototype Access` tab; the script creates it automatically the first time a submission is received.

### 5. Deploy as a web app

In Apps Script, select **Deploy → New deployment**. Choose **Web app** as the deployment type. Use these settings:

| Setting | Recommended value |
|---|---|
| Description | `SPRK Prototype Access Logger` |
| Execute as | `Me` |
| Who has access | `Anyone` or `Anyone with the link` |

For a public Netlify prototype, the endpoint needs to accept submissions from visitors who are not signed into your Google account. That is why the access setting should not be limited to only you.

### 6. Authorize the script

During deployment, Google will ask you to authorize the script. Approve the requested Sheet access for the Google account that owns the Sheet. This permits the script to append rows to the workbook.

### 7. Copy the web app URL

After deployment, copy the **Web app URL**. It should look similar to this:

```text
https://script.google.com/macros/s/AKfycb.../exec
```

The URL must end with `/exec`. Do not use the Apps Script editor URL.

### 8. Give Manus the `/exec` URL or add it to Netlify

There are two options:

| Option | What to do |
|---|---|
| Easiest | Reply with the copied `/exec` web app URL. I can add it to the deployment environment during the final Netlify refresh step after you approve the preview. |
| Manual | In Netlify, add `VITE_ACCESS_WEBHOOK_ENDPOINT` with the copied `/exec` URL, then redeploy the site. |

The environment variable should look like this:

```text
VITE_ACCESS_WEBHOOK_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### 9. Test with one denied attempt and one granted attempt

After the endpoint is connected and the production site is redeployed, submit the access gate twice:

| Test | Expected result |
|---|---|
| Wrong password | A row appears with `attemptStatus=denied`, `accessGranted=FALSE`, and `passwordValid=FALSE`. |
| Correct password `Lg3Nd.1234!` | A row appears with `attemptStatus=granted`, `accessGranted=TRUE`, and `passwordValid=TRUE`. |

The raw password should not appear in the sheet.

## Notes

The preview link I provided earlier is using the updated frontend behavior, but it will not write to your Google Sheet until the Apps Script web app is deployed and its `/exec` URL is added as `VITE_ACCESS_WEBHOOK_ENDPOINT` for the build that is deployed to Netlify.

## References

[1]: https://developers.google.com/apps-script/guides/web "Google Apps Script Web Apps"
[2]: https://developers.google.com/apps-script/guides/services/authorization "Google Apps Script Authorization"
[3]: https://docs.netlify.com/environment-variables/overview/ "Netlify Environment Variables"
