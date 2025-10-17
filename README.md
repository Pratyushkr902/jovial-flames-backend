# 🔥 Jovial Flames - API Backend

This is the official backend server for the Jovial Flames e-commerce website. It handles user authentication, order processing, and payment integration.

---

## ✨ Features

-   **User Authentication:** Secure signup, login, and password management using JWT.
-   **OTP Verification:** Email-based OTP system for account creation and password resets.
-   **Order Management:** Create and view user orders.
-   **Payment Gateway:** Integrated with Razorpay for online payments.
-   **Secure Pricing:** All product prices and order totals are calculated on the server to prevent fraud.

---

## 🛠️ Technologies Used

-   **Node.js:** JavaScript runtime environment.
-   **Express.js:** Web framework for Node.js.
-   **MongoDB:** NoSQL database for storing user and product data.
-   **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
-   **JSON Web Tokens (JWT):** For securing API endpoints.
-   **Nodemailer:** For sending OTP emails via Gmail.
-   **Razorpay:** For payment processing.

---

## 🚀 Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/jovial-flames-api.git](https://github.com/YourUsername/jovial-flames-api.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd jovial-flames-api
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Create a `.env` file** in the root directory and add the necessary environment variables (see below).
5.  **Start the server:**
    ```bash
    npm start
    ```

---

## 🔑 Environment Variables

You will need to create a `.env` file in the root of the project with the following variables:
