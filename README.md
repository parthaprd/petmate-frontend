# Petmate Frontend

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blueviols?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.6.11-green?style=for-the-badge&logo=auth0)](https://better-auth.com/)

Petmate is a premium, modern pet adoption platform designed to connect hopeful pet adopters with animals in need of loving homes. The client application is built with state-of-the-art web technology focusing on visual excellence, smooth responsiveness, and secure credentials management.

## 🔗 Live Application URL
Access the live deployed client application here:
👉 **[https://petmate-frontend.vercel.app](https://petmate-frontend.vercel.app)** *(Update this link with your actual Vercel deployment URL if different)*

---

## 🎯 Purpose
The purpose of the Petmate client application is to provide a seamless, beautiful, and intuitive interface for animal lovers to:
- Discover, search, and filter adoptable pets based on species, breed, and fee structures.
- Securely listing new pets for adoption, providing health, vaccination, and location information.
- Submit adoption requests and track their status in real-time.
- Protect private routes and actions using custom guards coupled with robust **HTTPOnly JWT cookie-based session verification** to guarantee total API request security.

---

## ✨ Features
- **🔑 Secure Authentication & Session Layer**: Integrates client-side **Better Auth** with backend-issued **HTTPOnly JWT cookies** to ensure that session identifiers are stored safely by the browser, protected against XSS attacks, and automatically sent with every API call.
- **🛡️ Custom Navigation Guarding**: Utilizes a dynamic `<PrivateRoute>` route wrapper that guards sensitive pages, temporarily caches the attempted destination in `localStorage`, and restores the user's path smoothly after a successful login.
- **🐶 Comprehensive Listing & Filtration System**: Interactive search and sorting filters on the browse page allowing users to lookup pets by name, isolate species (e.g. dogs, cats, rabbits), and sort adoption fees in ascending/descending order.
- **📋 Full Dashboard Capabilities**: Dedicated space for logged-in users to manage their listing catalog, add new adoptable pets via a highly validated form, view submitted adoption requests, and approve/reject prospective adoptions.
- **💫 Vibrant Premium User Experience**: Premium modern typography, sleek gradients, glassmorphism card layouts, fluid loading states, and custom micro-animations powered by **Framer Motion** for a smooth user journey.

---

## 📦 NPM Packages Used
This project leverages standard-setting libraries for web development:

| Package | Version | Description |
| :--- | :--- | :--- |
| **`next`** | `^16.2.6` | React framework with App Router for server-rendered page loading and routing. |
| **`better-auth`** | `^1.6.11` | Client-side credentials and social authentication provider. |
| **`axios`** | `^1.16.1` | Promise-based HTTP client equipped with interceptors to handle automatic token refresh/expiration redirects. |
| **`framer-motion`** | `^12.39.0` | Production-ready motion library for fluid React micro-animations. |
| **`react-icons`** | `^5.6.0` | Comprehensive collection of high-quality vector icons (Fa, Io, Md, etc.). |
| **`react-hot-toast`** | `^2.6.0` | Elegant, lightweight notifications for form feedback and auth updates. |
| **`tailwindcss`** | `^4.3.0` | Utility-first CSS framework for custom premium designs and responsive structures. |
| **`mongodb`** | `^7.2.0` | Client database driver. |

---

## 🛠️ Local Development & Scripts

To run the frontend client locally, follow these commands:

1. **Clone the repository and install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in your root directory and add the following keys:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   ```

3. **Start the local server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` on your browser to view the application.

4. **Verify / Build for Production**:
   ```bash
   npm run build
   ```
