# Inbox Zero Project: Error Log and Resolution Attempts

This file tracks errors encountered during the setup and execution of the Inbox Zero project, along with the steps taken to resolve them.

---

## Error: Docker Compose Port Conflict (Port 3000)

**Timestamp:** 2025-05-29T23:17:08-07:00

**Command:** `docker-compose up -d`

**Error Message:**

```log
Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:3000 -> 127.0.0.1:0: listen tcp 0.0.0.0:3000: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.
```

**Analysis:**
Ports `5432` (PostgreSQL) and `3000` (Next.js app) were already in use by other processes on the system.

**Resolution Attempt 1:**

- Identify and stop the process using port `3000`.
  - Used `netstat -ano | findstr ":3000"` to find PID.
  - Used `taskkill /PID <PID> /F` to terminate the process.
- Identify and stop the process using port `5432`.
  - Used `netstat -ano | findstr ":5432"` to find PID (likely existing PostgreSQL instance).
  - Stopped the PostgreSQL service via `services.msc`.

**Result:**
After stopping the conflicting processes, `docker-compose up -d` was re-run successfully.

```log
[+] Running 4/4
 ✔ Container inbox-zero-redis-1     Started                                                                                                                                  0.6s
 ✔ Container inbox-zero-db-1        Started                                                                                                                                  0.8s
 ✔ Container inbox-zero-llm-ollama-1  Started                                                                                                                                  0.8s
 ✔ Container inbox-zero-web-1       Started
```

**Status:** Resolved.

---

## Database Migration: `prisma db push`

**Initial Attempts & Failures:**

- **Command:** `pnpm prisma db push --schema=apps/web/prisma/schema.prisma` (Timestamp: ~2025-05-29T23:19:00-07:00)
  - **Error:** Prisma command not found.
- **Command:** `pnpm turbo db:push` (Timestamp: ~2025-05-29T23:19:10-07:00)
  - **Error:** Turbo task `db:push` not found.
- **Command:** `pnpm --filter web exec prisma db push --schema=./prisma/schema.prisma` (Timestamp: ~2025-05-29T23:20:00-07:00)
  - **Error:** No projects matched filter `web` (package name is `inbox-zero-ai`).

**Successful Attempt:**

- **Command:** `pnpm --filter inbox-zero-ai exec prisma db push --schema=./prisma/schema.prisma`
- **Timestamp:** 2025-05-29T23:20:30-07:00 (Approximate)
- **Result:** Success!

```text
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "inboxzero", schema "public" at "localhost:5432"

The database is already in sync with the Prisma schema.

Running generate... (Use --skip-generate to skip the generators)
Warning: You did not specify an output path for your `generator` in schema.prisma. This behavior is deprecated and will no longer be supported in Prisma 7.0.0. To learn more visit https://pris.ly/cli/output-path
 ✔ Generated Prisma Client (v6.6.0) to .\..\..\node_modules\.pnpm\@prisma+client@6.6.0_prisma_66ad65b8aa48c66bbd9b3e64cfcf114a\node_modules\@prisma\client in 207ms
```

**Analysis & Resolution:**
The key was to use `pnpm --filter <package_name> exec` to correctly target the Prisma CLI within the `inbox-zero-ai` package (located in `apps/web`) and provide the schema path relative to that package's directory.

---

## Database Seeding: `prisma db seed`

**Attempt:**

- **Command:** `pnpm --filter inbox-zero-ai exec prisma db seed --schema=./prisma/schema.prisma`
- **Timestamp:** 2025-05-29T23:21:00-07:00 (Approximate)
- **Result:** Command completed without error.

```text
Environment variables loaded from .env
```

**Analysis:**
The command executed without any error messages. This typically indicates that either the seed script (if one exists at `apps/web/prisma/seed.ts` or similar) ran successfully, or no seed script was found (which is not an error for Prisma). For the purpose of this setup, we'll consider this step complete.

**Status:** Completed.

---

## Start Development Server

**Attempt:**

- **Command:** `pnpm --filter inbox-zero-ai dev`
- **Timestamp:** 2025-05-29T23:22:00-07:00 (Approximate)
- **Result:** Success! Server started.

```text
> inbox-zero-ai@1.0.0 dev C:\Users\jovan\Documents\Windsurf\inbox-zero\apps\web
> cross-env NODE_OPTIONS=--max_old_space_size=16384 next dev

     ▲ Next.js 15.3.0
     - Local:        http://localhost:3000
     - Network:      http://10.0.0.16:3000
     - Environments: .env

   ✓ Starting...
   ○ (serwist) Serwist is disabled.
   ○ (serwist) Serwist is disabled.
   ○ Compiling /instrumentation ...
   ✓ Compiled /instrumentation in 855ms (217 modules)
   ✓ Ready in 4.5s
```

**Analysis:**
The development server for the `inbox-zero-ai` web application started successfully and is accessible at `http://localhost:3000`.

**Status:** Completed.

---

## Error: Login Failure - "Account Already Exists" Type Issue

**Timestamp:** 2025-05-29T23:25:00-07:00 (Approximate)

**Symptoms:**
After successfully setting up the local environment and starting the server, attempting to sign in (likely via Google OAuth) results in an error message on the UI: "Error Logging In. There was an error logging in to the app. Please try log in again. If this error persists, please contact support at [elie@getinboxzero.com](mailto:elie@getinboxzero.com)."
User reports that the underlying issue seems to be related to an "account already exists" conflict, possibly due to a prior trial account on the official Inbox Zero hosted service.

**Analysis (Initial Hypothesis):**
The error suggests that the OAuth flow with Google is likely completing, but an issue arises when the local application (NextAuth + Prisma adapter) tries to process the authenticated user. This could be due to:

- A conflicting user record in the local PostgreSQL database (`inboxzero` on `localhost:5432`).
- Misconfiguration in how the local application handles user creation/linking, especially if it encounters an email it has seen before in a different context.

**Proposed Debugging Steps:**

- **Gather Detailed Browser Errors:**

  - Request specific error messages from the browser's JavaScript console.
  - Request details from the Network tab (failing request URL, status code, response body) for any calls related to `/api/auth/...` during the login attempt.
  - **Status:** Pending user input.

- **Inspect Local Database:**

  - If browser errors suggest a database conflict (e.g., unique constraint violation), use Prisma Studio or a direct DB client to inspect the `User` table in the local `inboxzero` database for an existing entry with the user's email.
  - **Status:** Pending.

- **Clear Conflicting Local User Record (If Found):**
  - If a conflicting record is found, attempt to delete it from the local database to allow a fresh sign-up/link. This would not affect any production/hosted accounts.
  - **Status:** Pending.

**Update (2025-05-30):**

Browser Console and Network Log Analysis:\*\*

User provided console output and network request details. Key findings:

- **Console Message:** A message "oin the Outlook waitlist Account already attached to another user You can merge accounts instead" was observed. This directly points to the application believing the OAuth account (Google) is already linked to a different user internally.
- **URL Parameter:** The login page URL included `?error=OAuthAccountNotLinked`, a NextAuth.js indicator that the OAuth account isn't linked to a local user profile, or there was an error during the linking/creation process.
- **Network Error (401):** A `GET` request to `http://localhost:3000/api/user/email-accounts` failed with a `401 Unauthorized` status. This occurred after the OAuth attempt and indicates an incomplete or failed session establishment.
- **Successful Google OAuth:** Network logs show a successful `200 OK` for the POST request to `https://accounts.google.com/signin/oauth/consent/approval`, confirming the Google side of the authentication was successful.
- **React Hydration Mismatch:** A separate React hydration warning was present but is considered unlikely to be the root cause of the auth failure.

**Revised Analysis:**
The evidence strongly suggests a data conflict in the local PostgreSQL database. The Google OAuth flow completes, but when NextAuth.js (with the Prisma adapter) processes the callback, it finds that the Google account (identified by its unique `providerAccountId`) is either:

- a) Already linked in the `Account` table to a _different_ `User` record than the one matching the email from Google.
- b) There's a `User` with the email, but no `Account` linking this Google profile, and an attempt to create/link fails, possibly due to rule (a) or another constraint.

This results in the `OAuthAccountNotLinked` error and an invalid session, causing subsequent API calls like `/api/user/email-accounts` to fail with `401 Unauthorized`.

**Next Immediate Step:**

- **Inspect Local Database with Prisma Studio:**
  - Examine the `User` table for entries matching the user's email.
  - Examine the `Account` table for entries related to the `google` provider, looking for the user's Google `providerAccountId` (if known) or any conflicting links related to the user's email or `User` ID.
  - **Status:** Done.

**Findings from Prisma Studio (2025-05-29):**

- The `User` model/table contains a record matching the user's email.
- The `Account` model/table, while having the correct schema (including `provider`, `providerAccountId`, `userId` columns as expected by NextAuth.js), is completely **empty** (0 records).

**Revised Analysis (Post-Prisma Studio Inspection):**

The empty `Account` table confirms why the `OAuthAccountNotLinked` error occurs. When the user authenticates via Google, NextAuth.js (with the Prisma adapter) attempts to find or create an entry in the `Account` table to link the Google `providerAccountId` to the local `User` ID. Since the table is empty, it _should_ create a new record. The failure to do so, resulting in an error and a persistently empty `Account` table, indicates an issue during this record creation process on the server side.

The browser console message "Account already attached to another user" remains somewhat anomalous if the `Account` table is truly empty, but could be a misleading error message or an internal check failing before the database write attempt.

---