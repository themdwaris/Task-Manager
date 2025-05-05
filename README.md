# Task Management System

A full-featured Task Management Web Application built with **Next.js**, **MongoDB**, and **Tailwind CSS**. It includes user authentication, task assignment, filters, real-time notifications, and a responsive UI.

## 🌟 Features

* User Authentication (Login/Register)
* Create, Read, Update, and Delete (CRUD) tasks
* Assign tasks to other users
* Task search filter by **title** and **description**
* Filter tasks by status and priority
* Real-time task notifications for assigned users
* Responsive and intuitive UI

## 🛠 Tech Stack

* **Frontend:** Next.js (App Router), Tailwind CSS
* **Backend:** Next.js API routes
* **Database:** MongoDB with Mongoose
* **State Management:** React Context API
* **HTTP Requests:** Axios
* **Notifications:** Real-time updates using polling (custom logic)

## 🔍 Task Filters

* **Search Filter:**

  * Search tasks by `title` or `description` (case-insensitive)
* **Dropdown Filters:**

  * Filter by `status`: Pending, In Progress, Completed
  * Filter by `priority`: Low, Medium, High
  * Filter by Due Date

## 🔔 Notifications

* When a task is **created** or **updated** with an assignee, that user receives a notification
* Notifications show in real-time (polling every few seconds)
* Automatically disappear after 3 seconds
* No page refresh needed to view them

## 📦 API Endpoints

### Tasks

* `GET /api/tasks` – Get all tasks (optionally filtered)
* `POST /api/tasks` – Create a new task
* `PUT /api/tasks/:taskId` – Update task by ID
* `DELETE /api/tasks/:taskId` – Delete task

### Notifications

* `POST /api/notification` – Create a notification (on assign)
* `GET /api/notification?userId=...` – Get latest unread notification for user
* `PUT /api/notification/:id` – Mark a notification as read

### Users

* `GET /api/currentUser` – Get currently logged in user
* `GET /api/users` – Get list of all users

## ▶️ How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env.local` File

```env
MONGODB_URI=mongodb+srv://your-mongodb-url
JWT_SECRET=your-secret-key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

✅ Built with ❤️ using Next.js App Router, Tailwind CSS, MongoDB, and a clean developer-friendly architecture.
