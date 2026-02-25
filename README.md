🏀 Nike Clone – MERN Stack

A full-stack e-commerce web application inspired by Nike, built using the MERN stack.
This project focuses on clean UI, responsive layouts, scalable backend architecture, and real-world full-stack development practices.

👩‍💻 Tech Stack
Frontend

React.js

Tailwind CSS

Redux Toolkit (State Management)

React Router

Fully Responsive (Mobile + Tablet + Desktop)

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

REST API Architecture

✨ Features
🎨 Frontend

Modern Nike-style product UI

Responsive Navbar with animated dropdowns

Mobile slide-in sidebar

Product listing, filters & categories

Product detail pages

Wishlist UI

Add-to-Cart UI

Global state management (Redux)

🧠 Backend

REST APIs

MongoDB product & category models

User authentication (Login / Register)

Protected routes with JWT

Async/await based controllers

Error handling middleware

📦 Full-Stack

Fetching products from MongoDB

Clean folder structure

Scalable code architecture

Ready for admin features (future updates)

📁 Project Structure
📦 root
├── 📦 back-end
│   ├── controllers/
│   ├── middlewares
│   ├── service/
│   ├── models/
│   ├── routes/
│   
│
├── 📦 front-end
│   ├── src/
|   |   ├──app/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   └── utils/
│
├── 📄 Products.json
├── 📄 Categories.json
├── 📄 Sizes.json
└── 📄 Colors.json

📌 JSON Files

These files store initial static product and attribute data.
In future updates, all products can be fully migrated to MongoDB.

🛠 Features (In Progress / Upcoming)

✔️ Product data modeling

✔️ Category & size data

✔️ product browsing UI

🔧 Cart management (in progress)

🔧 Authentication (signup/login)

🔧 Order & checkout flow

🔧 Payment Integration

🔧 Admin dashboard for adding new products

More features will be added continuously.

📌 How to Run Locally
🔹 Prerequisites

Make sure you have installed:

Node.js & npm

MongoDB (Atlas or Local)

🟢 Backend Setup

  cd back-end
  npm install
  npm run dev
Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

🟢 Frontend Setup
cd front-end
npm install
npm run dev

API Example (Backend)
// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

Fetch Example (Frontend) 
const fetchProducts = async () => {
  const res = await fetch("http://localhost:8000/api/products");
  const data = await res.json();
  setProducts(data);
};

📄 License

This project is for educational purposes only.
It does not include any official branding rights of Nike.

⭐ Acknowledgements

This README follows best practices from top MERN e-commerce open-source projects and clean documentation templates.
