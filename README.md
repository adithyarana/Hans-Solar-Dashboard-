# ☀️ Hans Solar Dashboard – Data Management System (RBAC)

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&center=true&vCenter=true&width=650&lines=Secure+%26+Scalable+Data+Management;Role+Based+Access+Control+(RBAC);Admin+%F0%9F%9B%A0%EF%B8%8F+%7C+Employee+%F0%9F%91%A8%E2%80%8D%F0%9F%92%BC+Dashboards;Leads+Management+with+Full+Data+Access;Built+with+React%2C+Node.js%2C+MongoDB" alt="Typing Animation" />
</p>

---

## 📖 Overview  

The **Hans Solar Dashboard** is a secure and scalable **Data Management System** powered by **RBAC (Role-Based Access Control)**.  

- 🛠️ **Admins** have **full data access** – manage employees and view all leads.  
- 👨‍💼 **Employees** can create their own leads and manage their personal dashboard.  
- 🔄 Whenever an **Employee creates a lead**, it **automatically appears in the Admin Dashboard**.  

---

## ✨ Features  

- 🔐 **JWT Authentication & RBAC Authorization**  
- 🛠️ **Admin Dashboard**  
  - Full access to all data  
  - Manage employees  
  - View & track **all leads** (including those created by employees)  
- 👨‍💼 **Employee Dashboard**  
  - Create leads (**auto-forwarded to Admin Dashboard**)  
  - Manage their own profile  
  - View only their **personal leads**  
- 📡 **Secure REST APIs** with Express & MongoDB  
- 🚀 **Frontend in Progress** (React + TailwindCSS planned)  

---

## 🏗️ Project Structure  

```bash
📂 Hans-Solar-Dashboard
├── 📂 server/            # Backend (Node.js + Express + MongoDB)
│   ├── controllers/      # Business logic
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── middleware/       # RBAC + JWT authentication
├── 📂 client/            # Frontend (React - in progress)
│   ├── src/components/   # UI Components
│   ├── src/pages/        # Dashboards (Admin / Employee)
│   └── src/utils/        # Helper functions
└── README.md

```
📌 Roadmap

 Setup RBAC Backend with JWT

 Admin CRUD operations for Leads & Employees

 React Frontend for Dashboards

 UI with Tailwind CSS / Material UI

 Deployment



