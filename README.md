# Midgard Live – Professional Digital Interview & Recruitment Platform

Midgard Live is a robust, full-stack web application designed to streamline job interview processes, applicant submissions, and administrative oversight. It features a comprehensive admin dashboard for managing job postings, reviewing applications, exporting data, and configuring system settings.

---

## 📈 Technology Stack

| Component | Technology           |
| --------- | -------------------- |
| Frontend  | React.js (Vite)      |
| Backend   | Node.js with Express |
| Database  | SQLite               |
| Styling   | CSS with Bootstrap   |
| Hosting   | Cloudflare Tunnel    |

---

## 💼 Core Features

### ✅ Job Management

* Create, update, and delete job postings
* Configure expiration dates and question sets
* Monitor job status (active/expired) in real time

### 🙋 Applicant Submission System

* Secure, user-friendly multi-step interview form
* Personal info with national ID or passport verification
* Document uploads: resume, certificates, ID card, optional police report
* Randomized delivery of Islamic and personality questions
* Auto-timer and scoring system for answers

### 💬 Notification System

* Real-time event logging
* Categorized: application, job, system
* Admin panel dropdown filter with auto-refresh (10s)

### 🛎️ Admin Email Notifications

* Email alerts via SMTP using Nodemailer
* Configurable `admin_notification_email` stored in DB
* Fallback for development: `runharun627@gmail.com`

### 📄 Data Export Capabilities

* Export per-job or per-applicant
* Download as CSV or styled PDF
* Includes full answers, correct answers, and scores

---

## 📁 Project Structure

```
midgard-live/
├── backend/
│   ├── routes/             # API endpoints
│   ├── db.js               # SQLite config
│   └── server.js           # Express server
│
├── frontend/
│   ├── components/         # UI components
│   ├── pages/              # Views (dashboard, forms)
│   ├── data/               # Question sets
│   └── App.jsx             # Routing entry point
│
└── uploads/                # Document uploads
```

---

## ⚖️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/midgard-live.git
cd midgard-live
```

### 2. Install Dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

### 3. Configure Environment Variables

Create a `.env` file in `/backend` with:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_RECEIVER=your-email@gmail.com
SESSION_SECRET=your-random-secret
```

### 4. Launch the Application

```bash
cd frontend && npm run dev
cd ../backend && npm run dev
```

### 5. Database & Uploads

```bash
# Update DB
ALTER TABLE email_settings ADD COLUMN admin_notification_email TEXT DEFAULT 'hr@midgard.com';

# Ensure uploads directory exists
mkdir backend/uploads
```

---

## 👥 Admin Credentials

| Username | Password |
| -------- | -------- |
| admin    | admin    |

> ⚠️ Change default credentials immediately upon deployment.

---

## 🔒 Security & Validation

* **Authentication**: JWT-based login system
* **File Uploads**: Via Multer with 5MB per file limit
* **Validation**: Duplicate prevention using passport/national ID
* **Timestamps**: Auto-recorded for all submissions

---

## ✅ Testing & Validation Checklist

* [x] Job post triggers notification
* [x] Submission sends email & logs notification
* [x] Admin email fallback works
* [x] Notification filters operate
* [x] Auto-refresh every 10 seconds
* [x] Export to CSV & PDF functions as expected

---

## 🚀 Deployment Guidelines

### Frontend

```bash
cd frontend
npm run build
# Deploy /dist to Vercel, GitHub Pages, etc.
```

### Backend

Host on Node-compatible service or use Cloudflare Tunnel:

```bash
cloudflared tunnel --url http://localhost:5000
```

---

**Last Updated: May 3, 2025**
