# TUGrade

**TUGrade** is a web-based **grade announcement and notification platform** designed specifically for **Thammasat University students**. The system helps students stay informed about grade releases in a timely and organized manner, reducing the need to repeatedly check multiple platforms.

TUGrade is built as a modern full-stack web application using **Vue.js**, **Express.js**, and **MongoDB**.

---

## Project Goals

* Provide a **centralized platform** for grade announcements
* Notify students when new grades are released
* Improve accessibility and user experience compared to manual checking
* Practice building a **full-stack MERN-like architecture** with Vue

---

## Key Features

* 📢 **Grade Announcements** – View newly released grades in one place
* 👤 **Student-Oriented Interface** – Simple and clean UI
* 🔐 **Secure Backend API** – Managed through Express.js
* 🗂️ **Persistent Storage** – MongoDB for storing grade and user data

---

## Tech Stack

### Frontend

* **Vue.js**
* HTML, CSS, JavaScript
* Axios (API communication)

### Backend

* **Node.js**
* **Express.js**
* RESTful API design

### Database

* **MongoDB** (NoSQL)

---

## Project Structure (Simplified)

```
TUGrade/
│
├── frontend/        # Vue.js frontend
├── backend/         # Express.js backend
│   ├── routes/
│   ├── controllers/
│   └── models/
├── README.md
```

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/monkub003/TUGrade.git
cd TUGrade
```

---

### 2. Backend Setup

```bash
cd TUGrade1
cd TUGrade1
npm install
```


Start the backend server:

```bash
node server.cjs
```

---

### 3. Frontend Setup

```bash
npm run dev
```

---

## How It Works

1. Grades are added or updated via the backend API
2. Data is stored securely in MongoDB
3. Frontend fetches grade data using REST APIs
4. Students view announcements through a clean Vue interface

---

## Use Case

* Thammasat students checking grade announcements
* Academic or personal project demonstrating full-stack development
* Practice project for Vue + Express + MongoDB integration

---

## Disclaimer

TUGrade is an **unofficial project** and is **not affiliated with Thammasat University**. The platform is intended for educational and demonstration purposes only.

---

## Future Improvements

* Authentication with student accounts
* Role-based access (admin / student)
* Email or push notifications
* Mobile-friendly UI improvements
* Deployment with Docker

---

## Author

**KANRAT PEETIPHOP**
Project: *TUGrade – Grade Announcement Platform*

---

⭐ If this project helps or inspires you, feel free to star the repository!
