# Dry Cleaning CRM

### 🧾 Test access
**Login:** `admin`  
**Password:** `m1gKC71SjL4S`

---

## 🧩 Project Overview

CleanTrack is a web-based system developed to automate the reception process at a dry-cleaning service. The application helps manage client information, orders, and services efficiently while offering discounts to loyal customers and tracking performance per branch.

This project was created as part of the selection for internship programs to model a real business automation solution using the MEAN stack (MongoDB, Express.js, Angular, Node.js)

---

## Domain Description

Dry-cleaning facilities receive items from clients for washing and stain removal. To improve workflow and organization, a management system is needed.

### Key Functions:
- Keep a database of clients (surname, first name, patronymic).
- Mark clients as regulars starting from the 3rd visit (receive a 3% discount for each subsequent item).
- Classify services by name, type, and cost (depending on work complexity).
- Register service orders (client + item + service type + intake date).
- Track item return date after cleaning.
- Add surcharges for urgency and complex tasks.
- View statistics per branch.

---

## 📦 System Entities

### 🧍 Clients
- Surname
- First Name
- Patronymic
- IsRegular (from 3rd visit)

### 🧰 Services
- Name
- Type
- Cost (can include surcharges for complexity/urgency)

### 📄 Orders
- Selected Service
- Client
- Date of Intake
- Date of Return

---

## 📊 Special Features
- Discount logic for loyal clients
- Branch-specific statistics
- Adjustable pricing with surcharges

---

## 🚀 Technologies Used
- **Frontend**: Angular, Angular Material
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT Authentication
- **Other**: GitHub for version control,Swagger for API documentation, Netlify/Render for deployment

---

## 📌 Notes
- This project is for educational/testing purposes only.
- Default credentials are intentionally exposed for demo access.

---

## 🙌 Author
Ільєнко Дмитро  
Full Stack Developer (MEAN stack)
