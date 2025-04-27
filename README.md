# Digital Interview Portal - README

## Introduction

Digital Interview Portal is a full-stack web application designed to manage career postings, handle candidate applications, and provide a complete administrative CMS interface for managing users, jobs, and submissions.

## Stack

- **Frontend**: React.js (Vite.js), Bootstrap 5, Custom CSS
- **Backend**: Node.js, Express.js, SQLite3
- **Database**: SQLite3

## Features (Currently Available)

- Public career portal with job listings and application form
- Admin CMS for job management (Add, Update, Extend, Delete jobs)
- Document upload functionality for applicants (Resume, Certificates, ID Card, Optional Police Report)
- View and download applicant submissions from admin panel
- Dashboard displaying:
  - Total jobs online
  - Jobs about to expire
  - Number of applicants
- Responsive design for desktop and mobile devices

## Prerequisites

- Node.js (v18+)
- npm (v9+)
- Git
- SQLite3

## Installation

### Clone the Repository
```bash
git clone https://your-repo-url.git
cd root
```

### Backend Setup
```bash
cd backend
npm install
```

Ensure the database file exists:
```bash
mkdir ../database
sqlite3 ../database/database.sqlite ".databases"
```

Start the backend server:
```bash
npm start
```
Backend runs at `http://localhost:5000`

### Frontend Setup
```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
Frontend runs at `http://localhost:5173` (default Vite port)

If you want to change the port to `3000`, you can configure it inside `vite.config.js`.

## Configuration

- Backend server defaults to port `5000`.
- Frontend proxies API requests to `http://localhost:5000` using `vite.config.js` or `proxy` settings.

## Admin Credentials (Default)

- Username: `admin`
- Password: `admin`

*(Modify in the backend authentication logic or database if needed.)*

## Project Structure

```
root/
|-- backend/          # Node.js server files
|   |-- controllers/  # Backend controllers
|   |-- models/       # Database models
|   |-- routes/       # API routes
|   |-- server.js     # Entry point for backend
|
|-- frontend/         # React application (Vite.js)
|   |-- public/       # Static assets
|   |-- src/
|       |-- components/  # Reusable components
|       |-- pages/       # Page components
|       |-- App.js       # Main App component
|       |-- App.css      # Styling
|   |-- vite.config.js   # Vite configuration
|
|-- database/         # SQLite database file
|   |-- database.sqlite
|
|-- README.md         # Documentation
```

## Usage

### Public Users
- View available job postings
- Apply through the form and upload required documents

### Admin Users
- Login to Admin Dashboard
- Manage job postings (Add, Update, Extend, Delete)
- Review and download applicant submissions
- View dashboard statistics

## Troubleshooting

| Problem                      | Solution                                                   |
|-------------------------------|------------------------------------------------------------|
| Port 5173 or 5000 in use      | Change ports manually in server.js or vite.config.js        |
| Database errors               | Ensure `database.sqlite` exists and has proper permissions |
| API errors                    | Confirm backend is running before accessing frontend       |
| Frontend not connecting to backend | Check proxy settings and backend URL in frontend         |

## License

MIT License

## Contact

For support or contributions, please contact the project maintainer or open an issue on the GitHub repository.

---

*Document Version: 3.2 | Last Updated: April 27, 2025*

