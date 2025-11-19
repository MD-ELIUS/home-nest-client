# 🏡 HomeNest – A Real Estate Listing Portal

### 📁 Assignment Category: 0013  

🌐 Live Site URL: [https://home-nest-5d146.web.app/]
💻 Client Repository: [https://github.com/MD-ELIUS/home-nest-client]
🖥️ Server Repository: [https://github.com/MD-ELIUS/home-nest-server] 

---

## 🏠 Project Overview

**HomeNest** is a modern and responsive **real estate listing platform** where users can explore, search, and manage property listings for rent, sale, or commercial purposes.  
Property owners can post, update, and delete their listings, while users can rate and review properties after exploring detailed information.  

Built using the **MERN stack (MongoDB, Express, React, Node.js)** and **Firebase Authentication**, this project ensures a secure, fast, and user-friendly experience for all real estate enthusiasts.  

---

## ✨ Key Features

- 🔐 **Secure Authentication**  
  Implemented Firebase Authentication with email/password and Google login.  
  Firebase token used for protected API access (instead of JWT).

- 🏘️ **Dynamic Property Management (CRUD)**  
  Authenticated users can **add, edit, and delete** their own properties.  
  All updates instantly reflect in the UI with SweetAlert confirmations.

- 🌆 **All Properties Page**  
  Displays all available listings with **sorting** (by price/date) and **search functionality** (by property name).  

- 💬 **Ratings & Reviews**  
  Authenticated users can rate and review properties with a star rating and short feedback text.  

- 🎨 **Responsive Modern UI**  
  Built using **Tailwind CSS**, maintaining consistent typography, button styles, and grid layouts.  
  Includes **Dark/Light Mode** toggle.

- 🏗️ **Extra Home Sections**  
  - Why Choose Us  
  - Featured Real Estates (dynamic)  
  - Two additional custom sections enhancing user engagement  

- 💡 **User Dashboard**  
  - My Properties (private)  
  - My Ratings (private)  
  - Add Property (private)  

---

## 🧩 Implemented Pages

| Page Name | Description |
|-----------|-------------|
| **Home** | Includes slider, featured properties, and other static sections. |
| **All Properties** | Lists all properties with sort and search functionality. |
| **Add Property** | Private route for users to add new listings. |
| **My Properties** | Shows logged-in user's properties with edit/delete options. |
| **Update Property** | Edit property info in a form pre-filled with existing data. |
| **Property Details** | Shows full property info and reviews section (private). |
| **My Ratings** | Displays user-submitted reviews. |
| **Login / Register** | Email/password & Google authentication using Firebase. |
| **404 Not Found** | Custom-designed page for invalid routes. |

---

## ⚙️ Technology Stack

**Frontend:**  
- React.js  
- React Router  
- Firebase Authentication  
- Tailwind CSS  
- SweetAlert2 / React Hot Toast  
- Context API (for Auth Management)

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (Atlas)  
- Firebase Token Verification for API protection

**Hosting:**  
- Client: Firebase Hosting  
- Server: Vercel  

---

## 🔧 Notable Functionalities

- ✅ Password validation (uppercase, lowercase, min length 6)  
- ✅ Conditional navbar based on user login state  
- ✅ Protected routes for Add, My Properties, My Ratings, and Details pages  
- ✅ SweetAlert used for all success, error, and confirmation messages  
- ✅ Loading spinner for data fetching  
- ✅ Responsive design for mobile, tablet, and desktop  
- ✅ Sorting implemented on backend (price/date based)  

---

## ⚡ Implementation Notes

- Instead of **JWT Authorization**, Firebase token verification was used to secure private routes and API endpoints.  
- Did **not use optional libraries**:
  - ❌ Tanstack Query (data fetched via Axios + useEffect)
  - ❌ Shadcn
  - ❌ Date-fns  
- All other mandatory and challenge tasks were fully implemented.

---

## 📦 Project Dependencies

Here are the main dependencies used in this project:

- **@smastrom/react-rating** — Rating component for user reviews  
- **@tailwindcss/vite** — Tailwind integration with Vite  
- **animate.css** — Prebuilt CSS animations  
- **axios** — HTTP client for API requests  
- **firebase** — Authentication & hosting services  
- **lucide-react** — Icon library  
- **motion** — Animation library  
- **react** — Core React library  
- **react-dom** — DOM renderer for React  
- **react-helmet** — Manage document head / titles  
- **react-icons** — Popular icon pack  
- **react-router** — Routing system  
- **react-toastify** — Toast notifications  
- **shadcn-ui** — UI component library  
- **styled-components** — CSS-in-JS styling  
- **sweetalert2** — Beautiful alert dialogs  
- **sweetalert2-react-content** — React wrapper for SweetAlert2  
- **swiper** — Modern slider/carousel library  
- **tailwindcss** — Utility-first CSS framework


```json
{
  "dependencies": {
    "@smastrom/react-rating": "^1.5.0",
    "@tailwindcss/vite": "^4.1.17",
    "animate.css": "^4.1.1",
    "axios": "^1.13.2",
    "firebase": "^12.5.0",
    "lucide-react": "^0.553.0",
    "motion": "^12.23.24",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-helmet": "^6.1.0",
    "react-icons": "^5.5.0",
    "react-router": "^7.9.5",
    "react-toastify": "^11.0.5",
    "shadcn-ui": "^0.9.5",
    "styled-components": "^6.1.19",
    "sweetalert2": "^11.26.3",
    "sweetalert2-react-content": "^5.1.0",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.17"
  }
}
```
---

## 🚀 How to Run Locally

### 🧱 Client Setup
```bash
git clone https://github.com/MD-ELIUS/home-nest-client.git
cd homenest-client
npm install
npm run dev
```

### 🔐 Configure Environment Variables

Create a `.env.local` file in the root folder of the project.  
Add your Firebase configuration as environment variables.  

**Example structure:**

```env
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID

