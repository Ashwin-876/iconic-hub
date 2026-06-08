# Iconic Hub - AI-Powered Learning Management System (LMS)

Iconic Hub is a modern, real-time, AI-driven Learning Management System designed for developers, students, and instructors. It connects learning progress, courses, community events, and interactive AI tutor features directly to an administrative console.

---

## 🚀 Key Features

*   **Real-time Connected Dashboard**: Syncs stats, enrollments, payments, and events automatically.
*   **Interactive AI Tutor**: Generates recommendations, career paths, and live chat queries.
*   **Administrative Portal**: Secured access console to monitor platform activity, approve courses, and schedule hackathons/events.
*   **Developer Hub**: Coding challenges and workspaces built for practical learning.
*   **Dynamic UX/UI**: Sleek typography, curated transitions, and responsive layout.

---

## 🛠️ Technology Stack

*   **Frontend**: React, Next.js (with React Router client integration), Tailwind CSS
*   **Backend**: Standalone Express.js server (`server.js`)
*   **Database**: MongoDB (local or cloud Atlas)

---

## 🏃 Running the Application

### Prerequisites
1. Make sure Node.js (v20+) is installed.
2. Have MongoDB running locally on `mongodb://127.0.0.1:27017` or use a MongoDB Atlas Connection String.

### Step 1: Install Dependencies
Run this in the root project folder:
```bash
npm install
```

### Step 2: Start the Express Backend Server
In one terminal window, run the backend database connection server:
```bash
node server.js
```
*(By default, it runs on port `5002` and connects to `mongodb://127.0.0.1:27017/iconichub`)*

### Step 3: Start the Next.js Frontend Dev Server
In a separate terminal window, launch the client server:
```bash
npm run dev
```
*(By default, the client launches on `http://localhost:5000` or `http://localhost:5001`)*

---

## ⚙️ Environment Variables
To customize database connections or API services, you can configure these environment variables before running:

```bash
export MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/iconichub"
export NEXT_PUBLIC_OPENROUTER_API_KEY="your-openrouter-key"
```

---

## 🔐 Credentials

### Administrative Console (`/admin/login`)
*   **Email**: `admin@iconichub.io`
*   **Password**: `admin`

### Student Dashboard (`/login`)
*   **Email**: *Any valid email address (e.g., student@gmail.com)*
*   **Password**: *Any password*
