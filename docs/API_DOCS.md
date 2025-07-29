# Foodify API Documentation

## Overview

Foodify is a scalable, modular Node.js/TypeScript backend for a food ordering and delivery platform.
It follows best practices in layered architecture, dependency injection, type safety, and robust
error handling. The API supports user, admin, order, menu, and payment domains, with Paystack
payment gateway integration.

---

## Table of Contents

-  [Getting Started](#getting-started)
-  [Authentication](#authentication)
-  [API Endpoints](#api-endpoints)
   -  [User](#user)
   -  [Admin](#admin)
   -  [Menu](#menu)
   -  [Order](#order)
   -  [Payment](#payment)
-  [Error Handling](#error-handling)
-  [Validation](#validation)
-  [Webhooks](#webhooks)
-  [Deployment](#deployment)
-  [Contributing](#contributing)
-  [License](#license)

---

## Getting Started

### Prerequisites

-  Node.js >= 16.x
-  npm or yarn
-  PostgreSQL (or your configured DB)

### Installation

```bash
git clone <repo-url>
cd foodify
npm install
```

### Environment Variables

Create a `.env` file with the following:

```
DATABASE_URL=postgres://user:pass@localhost:5432/foodify
PAYSTACK_SECRET_KEY=sk_test_xxx
JWT_SECRET=your_jwt_secret
```

### Running the Server

```bash
npm run dev
```

---

## Authentication

-  JWT-based authentication for users and admins.
-  Use the `Authorization: Bearer <token>` header for protected endpoints.

---

## API Endpoints

### User

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | /api/user/register | Register a new user      |
| POST   | /api/user/login    | User login               |
| GET    | /api/user/profile  | Get current user profile |
| PUT    | /api/user/profile  | Update user profile      |

#### Example: Register

```json
POST /api/user/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Admin

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| POST   | /api/admin/register | Register a new admin |
| POST   | /api/admin/login    | Admin login          |
| GET    | /api/admin/users    | List all users       |
| DELETE | /api/admin/user/:id | Delete a user by ID  |

### Menu

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| POST   | /api/menu     | Create a menu item  |
| GET    | /api/menu     | List all menu items |
| PUT    | /api/menu/:id | Update a menu item  |
| DELETE | /api/menu/:id | Delete a menu item  |

### Order

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| POST   | /api/order     | Create a new order |
| GET    | /api/order     | List all orders    |
| PUT    | /api/order/:id | Update an order    |
| DELETE | /api/order/:id | Delete an order    |

### Payment

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| POST   | /api/payment/initiate | Initiate a payment        |
| GET    | /api/payment/:id      | Get payment by ID         |
| POST   | /api/payment/confirm  | Confirm payment by ref    |
| POST   | /api/payment/webhook  | Paystack webhook endpoint |

#### Example: Initiate Payment

```json
POST /api/payment/initiate
{
  "orderId": "order_123",
  "amount": 5000
}
```

---

## Error Handling

-  All errors are returned in the following format:

```json
{
   "status": "error",
   "message": "Error description",
   "details": {}
}
```

-  Validation errors return a 400 status code.
-  Authentication errors return a 401 status code.
-  Not found errors return a 404 status code.

---

## Validation

-  All input is validated using middleware.
-  Invalid requests are rejected with descriptive error messages.

---

## Webhooks

-  `/api/payment/webhook` handles Paystack payment notifications.
-  Ensure this endpoint is accessible by Paystack and properly secured.

---

## Deployment

-  Deployable to platforms like Render, Heroku, or DigitalOcean.
-  Set environment variables in your deployment dashboard.
-  Use `npm run build` for production builds.

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## License

MIT

---

## Contact

For questions or support, open an issue or contact the maintainer.
