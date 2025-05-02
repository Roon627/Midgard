 Midgard – Smart Digital Hiring Platform

Midgard is a full-stack recruitment and career portal designed to simplify the hiring process for businesses and provide a seamless application experience for candidates. It includes a dynamic **public job portal** and a **secure admin panel** for HR management.

---

 Features

 Public Site (Job Seekers)
- **Modern, responsive UI** with a tech-themed purple design.
- **Navigation**: Home, Careers, Contact Us, About Us.
- **Careers Page**: View active jobs, fill questionnaires, upload documents (CV, certificates, ID, optional police report).
- **Contact Form**: Sends real-time emails with built-in validation.
- **Animated Branding**: "Midgard" site name with white animated text effect.

 Admin Panel (HR/Recruiters)
-  **Login System**: Basic admin authentication with session support.
-  **Dashboard Overview**: Live stats on job posts and applications.
-  **Manage Jobs**: View, edit, extend expiration, toggle expired jobs.
-  **Submissions Viewer**: View applicant data and attachments.
-  **Export Data**: Download applications as CSV or PDF.
-  **Settings**: (Planned) Email server and config options.

---

 Tech Stack

### Frontend
- React (Vite)
- React Router
- Bootstrap 5 (Grid & Responsive Layout)
- Font Awesome
- Custom CSS (no Tailwind)

### Backend
- Node.js + Express
- SQLite (via `sqlite3`)
- Multer (file uploads)
- Nodemailer (SMTP integration)
- dotenv (secure env variables)

### Tools & DevOps
- Cloudflare Tunnel (for public URLs)
- GitHub (version control)
- Vite Dev Server + Express API

---

##  Project Structure

```
frontend/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── App.jsx
  │   └── main.jsx
  ├── index.css
  ├── App.css
  └── vite.config.js

backend/
  ├── routes/
  ├── uploads/
  ├── db.js
  ├── server.js
  └── .env
```

---

##  Setup Instructions

###  Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   SESSION_SECRET=your_session_secret
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   CONTACT_RECEIVER=receiver@yourdomain.com
   ```

4. Start the server:
   ```bash
   node server.js
   ```

---

###  Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

Temp local ports for public access: (For my reference)

```bash
cloudflared tunnel --url http://localhost:5000
cloudflared tunnel --url http://localhost:5173
```

---

##  Admin Credentials

- **Username**: `admin`
- **Password**: `admin`

