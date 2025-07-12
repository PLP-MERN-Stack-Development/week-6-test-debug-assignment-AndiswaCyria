# 🐞 MERN Bug Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to report, view, update, delete, search, and filter software bugs. This project also demonstrates effective testing and debugging strategies for both backend and frontend.

---

## 🚀 Features

- Report new bugs with a title and description
- View a list of all reported bugs
- Update bug status (Open, In Progress, Resolved)
- Delete bugs with confirmation
- Filter bugs by status
- Search bugs by title or description
- Responsive and styled user interface

---

## 🛠 Tech Stack

- **Frontend:** React, React Testing Library, CSS Modules
- **Backend:** Node.js, Express.js, MongoDB (with Mongoose)
- **Testing:** Jest, Supertest
- **Other Tools:** Postman, Chrome DevTools

---

## 📁 Folder Structure

```
mern-bug-tracker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── tests/
│   └── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-6-test-debug-assignment-AndiswaCyria.git
cd mern-bug-tracker
```

### 2. Backend Setup

```bash
cd backend
pnpm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start backend server:

```bash
pnpm start
```

### 3. Frontend Setup

```bash
cd frontend
pnpm install
pnpm dev
```

The frontend will run on `http://localhost:5173`.

---

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
pnpm test
```

Tests:
- API route integration tests with Supertest
- DB mocks with `jest.mock`
- Validation and error handling tests

Mongo DB Compass

![MongoDB Compass linked](/mern-bug-tracker/frontend/public/mongo.png)

### Frontend Tests

```bash
cd frontend
pnpm test
```

Tests:
- Form submission with valid/invalid input
- Search and filter UI tests
- Simulated API interaction and error responses

---

## 🐛 Debugging Techniques Used

- Console logs and `console.error` for runtime insights
- Chrome DevTools (Network & Console tabs)
- Node.js `--inspect` debugging
- Express error handling middleware
- JSDOM alerts and mocked fetch in frontend tests

---

## 🛡 Error Handling

### Backend:
- Centralized Express error middleware
- Validates request input and handles missing fields

### Frontend:
- Alerts for failed form submissions or network errors
- Graceful fallbacks for empty state and load errors

---

## 📷 Screenshots 

Add screenshots or GIFs of:
- Reporting a bug
![reporting a bug](/mern-bug-tracker/frontend/public/reportingbug.png)

- Updating status
![updates status](/mern-bug-tracker/frontend/public/filterByStatus.png)

- Filtering/search
![search](/mern-bug-tracker/frontend/public/search.png)

- Test results
![test results](/mern-bug-tracker/frontend/public/test.png)
---

## 📌 Future Improvements

- Authentication for bug submitters
- Assign bugs to users
- Admin dashboard view
- Use a toast notification system instead of `alert()`

---

## 📄 License

MIT License — free to use and modify.

---

## 🙌 Acknowledgements

This project is part of a MERN full-stack training program (Week 6 Assignment: Testing & Debugging).


