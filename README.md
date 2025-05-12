# Midgard Live – Professional Digital Interview & Recruitment Platform

Midgard Live is a modern full-stack web application designed to streamline the hiring process with a secure and interactive digital interview platform. It enables HR teams to create job posts, conduct timed assessments, review applications, and manage admin workflows—all in one place.

---

## 🚀 Technology Stack

| Component   | Technology       |
|-------------|------------------|
| Frontend    | React.js (Vite)  |
| Backend     | Node.js + Express |
| Database    | SQLite           |
| Styling     | CSS + Bootstrap  |
| Hosting     | Cloudflare Tunnel |
| PDF Export  | jsPDF + AutoTable |

---

## ✅ Core Features

### 🎯 Job Management
- Create, edit, and expire job listings
- Assign custom question sets per job
- Control visibility of expired jobs

### 📝 Digital Interview Flow
- 5-step candidate experience:
  1. Personal information
  2. Document upload
  3. Islamic Knowledge Assessment (10 questions)
  4. Personality Assessment Part 1 (10 questions)
  5. Personality Assessment Part 2 (10 questions)

- Anti-cheating measures:
  - Tab monitoring & limit
  - Offline detection
  - Developer tools blocking

- Assessment includes:
  - Timer with auto-submit
  - MBTI-style trait scoring
  - Real-time validation
  - Upload validation (CV, ID, certificates)

### 📤 Application Submission
- Data stored securely with timestamp
- File uploads with progress indicator
- Post-submission summary shown with animation
- Auto PDF export with full question/answer log and scores

### 📊 Admin Panel
- Dashboard with stats (job count, applicants, expiring jobs)
- CSV/PDF exports of applicant data
- Add/reset admin users (JWT-secured)
- Manage notifications and email settings

### 📧 Contact Form
- Secure Nodemailer integration with SMTP
- Branded auto-replies to candidate inquiries

---

## ✨ Recent Enhancements

- ✅ Sequential submit animations (`Uploading → Uploaded → Thank You`)
- ✅ Animated fade-in and bounce UI feedback
- ✅ Live document upload progress
- ✅ Slide-out effect on final submit
- ✅ Email/phone/ID validation based on nationality
- ✅ Full mobile responsiveness and cleanup

---

## 🛡️ Security Highlights

- JWT authentication for admin routes
- Cheating prevention logic (visibility/tab change monitoring)
- Safe file upload with size/type limits
- Sanitized form input & validation

---

## 📂 Folder Structure (Simplified)

```
frontend/
├── components/
│   ├── interview/
│   ├── admin/
│   ├── common/
├── data/
├── styles/
└── pages/
```

```
backend/
├── routes/
├── uploads/
├── db/
└── server.js
```

---

## 📬 SMTP (Configured for Gmail)

- Host: `smtp.gmail.com`
- Port: `587`
- Authentication: app-specific password
- Sender: `hr@midgard.com`

---

## 📄 License

This project is proprietary and maintained by the Midgard development team.
All rights reserved ©️ 2024.