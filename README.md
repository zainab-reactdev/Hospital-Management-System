# Hospital Management System

## Project Overview
This is a **Hybrid Hospital Management System** built using **React** and **Firebase**.  
The system is designed for **both Patients and Doctors**, with separate dashboards and functionalities depending on the user type.  
All dashboards are **restricted to pre-registered emails only** to ensure data privacy.

## 🔗 Live Demo
👉 https://curo-hospital-system.netlify.app/


---
## Features

### 1️⃣ User Types
- **Patient:**  
  - Can register/login using Firebase Authentication (pre-registered email only).  
  - Fills **appointment form**.  
  - Accesses **Patient Dashboard** showing their personal info, appointments, and doctor details.  

- **Doctor:**  
  - Can register/login using Firebase Authentication (pre-registered email only).  
  - Accesses **Doctor Dashboard** showing patient info, appointments, and relevant medical details.  

---

### 2️⃣ Pages (Total: 8)
- **Web Pages (4):**  
  1. Home Page  
  2. About Us Page  
  3. Services Page  
  4. Appointment Form  

- **Dashboard Pages (4):**  
  1. Home Dashboard  
  2. Appointment Details
  3. Notification Page   
  4. Profile  Page  

---

### 3️⃣ Key Functionalities
- **Firebase Integration:**  
  - Authentication for login/signup  
  - Real-time database for storing appointments and user info  

- **Role-Based Dashboard:**  
  - Redirects users based on role (Patient / Doctor)  
  - Displays relevant info dynamically depending on the logged-in user  

- **Responsive Design:**  
  - Fully mobile-responsive  
  - Toggle menus, clean navigation  
  - Works seamlessly on desktop and mobile devices  

- **Appointment Form:**  
  - User enters personal info  
  - Data stored in Firebase under the **registered email/name**  
  - Displayed on respective dashboards  

---

## 4️⃣ Demo Login Credentials

> Dashboards are **restricted to pre-registered emails only**. Random users cannot access them.

- **Patient Account:**  
  - Name: Ryan Davis  
  - Email: `RyanDavis12345@gmail.com`  
  - Password: `DavisRy1468`  
  - Only this combination opens **Patient Dashboard**  

- **Doctor Account:**  
  - Name: Emily Carter  
  - Email: `EmilyCarter12@gmail.com`  
  - Password: `EmilyCr1468`  
  - Only this combination opens **Doctor Dashboard**  

> Appointment form info is automatically linked to the **patient's registered email/name**.

---

## 5️⃣ Technologies Used
- **React (Vite)** — Frontend  
- **Firebase** — Authentication & Database  
- **CSS / Tailwind** — Styling & Responsive Design  

---

## How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/zainab-reactdev/Hospital-Management-System.git
