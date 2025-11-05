# Email Setup Guide - Contact Form

This guide explains how to set up email functionality for the contact form.

## Current Setup: FormSubmit (Free, No Backend Required)

✅ **Currently Active** - The form is configured to use FormSubmit, which is:
- **FREE** - 50 submissions/month on free tier
- **No setup required** - Works immediately
- **No backend needed** - Handles everything on their servers
- **Secure** - No credentials exposed

The form will automatically send emails to: `shibinmariyanstanley@gmail.com`

---

## Option 1: Keep FormSubmit (Recommended for Quick Setup)

**Status:** ✅ Already configured and working!

**Pros:**
- Works immediately
- No setup or deployment needed
- Free for 50 emails/month
- No backend server required

**Cons:**
- Limited to 50 emails/month on free tier
- Requires redirect after submission

---

## Option 2: Use MailerSend via Backend Server

To use your MailerSend SMTP credentials securely, you need to deploy a backend server.

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env` file (never commit this to git):

```env
MAILERSEND_USER=MS_V1EG9m@test-q3enl6kq1kr42vwr.mlsender.net
MAILERSEND_PASSWORD=mssp.0EX7Spx.neqvygm3j6jl0p7w.8G5QbXS
PORT=3000
```

### Step 3: Test Locally

```bash
node backend-email-server.js
```

Test with:
```bash
curl -X POST http://localhost:3000/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello"}'
```

### Step 4: Deploy Backend

Choose one of these free hosting options:

#### A. Railway (Easiest)
1. Go to https://railway.app
2. Create account and new project
3. Connect your GitHub repo
4. Add environment variables in Railway dashboard
5. Deploy - Railway auto-detects Node.js

#### B. Render
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Set build command: `npm install`
5. Set start command: `node backend-email-server.js`
6. Add environment variables
7. Deploy

#### C. Heroku
1. Install Heroku CLI
2. Run: `heroku create your-app-name`
3. Run: `heroku config:set MAILERSEND_USER=... MAILERSEND_PASSWORD=...`
4. Run: `git push heroku main`

### Step 5: Update Frontend

After deploying, update `assets/js/script.js`:
1. Uncomment the MailerSend backend code
2. Replace `backendUrl` with your deployed backend URL
3. Comment out the FormSubmit submission line

---

## Option 3: Use MailerSend REST API (Recommended for Production)

Instead of SMTP, use MailerSend's REST API which is more secure and designed for transactional emails.

### Steps:
1. Get API token from MailerSend dashboard
2. Use MailerSend JavaScript SDK or REST API
3. No backend needed (but API token should be in backend for security)

---

## Quick Comparison

| Service | Setup Time | Cost | Backend Needed | Monthly Limit |
|---------|-----------|------|----------------|---------------|
| **FormSubmit** | 0 minutes | Free | ❌ No | 50 emails |
| **MailerSend Backend** | 10-15 min | Free* | ✅ Yes | Based on plan |
| **MailerSend API** | 5-10 min | Free* | ✅ Yes | Based on plan |

*MailerSend has a free tier with limits

---

## Current Status

✅ **FormSubmit is active and working** - No changes needed!

If you want to switch to MailerSend, follow Option 2 above.

