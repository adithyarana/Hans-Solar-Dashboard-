<!-- Banner -->
<p align="center">
  <img src="https://img.shields.io/badge/Project-HANS%20SOLAR-ff4757?style=for-the-badge" alt="HANS SOLAR" />
  <img src="https://img.shields.io/badge/Stack-MERN-47a248?logo=mongodb&logoColor=white&style=for-the-badge" alt="MERN" />
  <img src="https://img.shields.io/badge/Charts-Chart.js-ff6384?logo=chartdotjs&logoColor=white&style=for-the-badge" alt="Chart.js" />
  <img src="https://img.shields.io/badge/Realtime-Socket.IO-000000?logo=socketdotio&logoColor=white&style=for-the-badge" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/Auth-RBAC-4cbb17?style=for-the-badge" alt="RBAC" />
</p>

<h1 align="center">HANS SOLAR</h1>
<p align="center">
  RBAC-based solar data management system with real-time dashboards, role-aware UI, and modern MERN architecture.
</p>

<!-- Animated Demo -->
<p align="center">
  <!-- Replace with your GIF path: /demo/hans-solar-demo.gif -->
  <img src="./demo/hans-solar-demo.gif" alt="HANS SOLAR Demo" width="900" />
</p>

<!-- Quick Links -->
<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#rbac-model">RBAC</a> •
  <a href="#realtime-charts">Realtime Charts</a> •
  <a href="#ai-enhancements">AI Enhancements</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## ✨ Overview

HANS SOLAR is a full data management system for solar operations. Admins control everything from a central dashboard, managers track KPIs and alerts, and field users see streamlined views — all **role-based** and **real-time**. The UI adapts to the user role, with live charts and activity feeds powered by Chart.js and a realtime transport.  

> Tip: Keep the demo GIF 8–15 seconds, showing login → role-based nav → live chart update → admin action → alert.

---

## 🚀 Features

- Role-Based Access Control (RBAC): Admin, Manager, Technician with route/middleware enforcement and role-aware UI components.  
- Admin Dashboard: user provisioning, device onboarding, alerting, audit logs, and plant overviews.  
- Realtime Charts: production, uptime, and anomalies streaming into Chart.js with smooth updates.  
- Multi-Tenant Ready: isolate plants/clients via org/plant scopes and query filters.  
- Responsive UI: optimized layouts for NOC screens and mobile field views.  

---

## 🧱 Tech Stack

- Frontend: React + Router + State (Context/Redux), Tailwind/Material UI, Chart.js.  
- Backend: Node.js + Express APIs, JWT auth, RBAC middleware, realtime event hub.  
- Database: MongoDB (Users, Roles) 
 


