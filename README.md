# ⚛️ Warehouse App

A scalable React + Vite Warehouse App following **feature-based architecture**.

This app allows you to manage your products by adding them with details such as price, quantity, and unique ID. You can
also edit or delete products at any time. Security is enforced through JWT, ensuring that no changes or additions can be
made unless you're logged in.

<br>

<img src="client/public/App.png" alt="app-icon">

<br>

## 🚀 Features

- 🔑 Authentication & Authorization (JWT-based)
- 🔍 Debounced search by name
- 📄 Paginated product list
- ⏳ Loading bar for user actions
- 🌙 Light & Dark mode
- ✅ Reusable & scalable file structure

---

## 🧑🏻‍🔧 Tech Stack

- React 19
- Vite
- React Query (TanStack Query)
- React Paginate
- React Hook Form + Yup
- CSS Modules
- Feature-based architecture

---

## 🛠️ Setup

1. Copy `.env.example` contents & create a `.env` file in the `client` folder
2. Replace `VITE_API_BASE_URL` with your backend URL
3. Run `npm i` in `client` and `api`
4. Start backend: `npm start`
5. Start frontend: `npm run dev`

---

## 📬 Contact

Made with lots of ☕️️ by **Mohammad Fartoot**  
GitHub: [@MohammadFartoot](https://github.com/MohammadFartoot)
