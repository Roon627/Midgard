Notes for Updating Midgard Live README
Below are the revised, professional contents to replace the existing README for Midgard Live. Copy and paste these sections into your current README file to ensure a polished and professional presentation.

Midgard Live – Professional Digital Interview & Recruitment Platform
Midgard Live is a robust, full-stack web application designed to streamline job interview processes, applicant submissions, and administrative oversight. It features a comprehensive admin dashboard for managing job postings, reviewing applications, exporting data, and configuring system _

Technology Stack



Component
Technology



Frontend
React.js (Vite)

Backend
Node.js with Express

Database
SQLite

Styling
CSS with Bootstrap

Hosting
Cloudflare Tunnel

Core Features
Job Management
Create, update, and delete job postings.
Configure expiration dates and customized question sets.
Monitor job status (active or expired) in real-time.

Applicant Submission System
Secure, user-friendly submission form capturing:
Personal details (name, email, phone).
National ID or passport for duplicate prevention.
Uploads for resume, certificates, ID card, and optional police report.


Randomized delivery of questions to ensure fairness.
Automated scoring and answer recording for efficient evaluation.

Notification System
Real-time event logging in a dedicated notifications table.
Notification categories: application, job, and system events.
Admin panel with a dropdown filter for viewing notifications.
Automatic refresh every 10 seconds for up-to-date information.

Admin Email Notifications
Automated email alerts sent via SMTP using Nodemailer.
Configurable admin notification email stored in the database (admin_notification_email).
Fallback email for development: runharun627@gmail.com.

Data Export Capabilities
Export application data in multiple formats:
Per job via the admin dashboard.
Per applicant through the application viewer.
Available as CSV or styled PDF, including scores and answer keys.

Project Structure
midgard-live/
├── backend/
│   ├── routes/             # API endpoints for application logic
│   ├── db.js               # SQLite database configuration
│   └── server.js           # Express server entry point
│
├── frontend/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page views (e.g., dashboard, submission forms)
│   ├── data/               # Static question sets
│   └── App.jsx             # Frontend entry point and routing
│
└── uploads/                # Storage for user-submitted documents


Setup Instructions
1. Clone the Repository
git clone https://github.com/your-org/midgard-live.git
cd midgard-live

2. Install Dependencies
cd frontend
npm install
cd ../backend
npm install

3. Configure Environment Variables
Create a .env file in the /backend directory with the following:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_RECEIVER=your-email@gmail.com
SESSION_SECRET=your-random-secret

4. Launch the Application
Start the frontend and backend servers:
cd frontend && npm run dev
cd ../backend && npm run dev

5. Database Configuration
Ensure the database schema includes the required field:
ALTER TABLE email_settings ADD COLUMN admin_notification_email TEXT DEFAULT 'hr@midgard.com';

Create the uploads directory if it does not exist:
mkdir backend/uploads


Admin Credentials
Username
admin
Password
admin

Note: Update the default credentials immediately upon deployment to ensure security.

Security and Validation
Authentication: Secured with Express-session for robust login management.
File Uploads: Managed by Multer with filtering to ensure safe uploads.
Data Validation: Server-side validation of answers and duplicate checks using National ID or passport.
Timestamps: Automatically recorded for all submissions to maintain audit trails.


Testing and Validation Checklist

 Job posting triggers a notification.
 Application submission triggers email and notification.
 Admin email fallback functionality verified.
 Notification filter dropdown operates correctly.
 Auto-refresh functionality confirmed at 10-second intervals.
 Data export functionality validated for CSV and PDF formats.


Deployment Guidelines
Frontend Deployment
Deploy the frontend to platforms such as GitHub Pages or Vercel:
cd frontend
npm run build

Upload the generated /dist directory to your chosen hosting platform.
Backend Deployment
Host the backend on Node.js-compatible platforms (e.g., Heroku, Railway, Render) or use Cloudflare Tunnel for local access:
cloudflared tunnel --url http://localhost:5000


Last Updated: May 3, 2025




