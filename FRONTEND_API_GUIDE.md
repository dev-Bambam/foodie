# Foodify API – Frontend Integration Guide

**Base URL:** `https://foodify-wck7.onrender.com`

---

## Authentication
All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Data Types (TypeScript Definitions)

### User
```ts
export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
```

### Menu
```ts
export interface IMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
}
```

### Order
```ts
export type TOrder = {
  id: string;
  userId: string;
  items: {
    items: Array<{
      menuId: string;
      quantity: number;
      price: number;
    }>;
  };
  totalPrice: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
  };
  createdAt: Date;
};
```

### Payment
```ts
export type TPayment = {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  status: "pending" | "successful" | "failed";
  paymentMethod: "bank transfer" | "cash";
  paymentGatewayResponse?: {
    status: boolean;
    message: string;
    data: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
  };
  createdAt: Date;
};
```

---

## User Endpoints

### Register User
- **POST** `/api/user/register`
#### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "08012345678",
  "address": {
    "street": "123 Main St",
    "city": "Lagos",
    "state": "Lagos"
  }
}
```
#### Success Response
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "08012345678",
      "address": {
        "street": "123 Main St",
        "city": "Lagos",
        "state": "Lagos"
      },
      "role": "customer"
    },
    "token": "<jwt-token>"
  }
}
```
#### Error Response
```json
{
  "status": "error",
  "message": "Email already exists"
}
```

---

### Login User
- **POST** `/api/user/login`
#### Request Body
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
#### Success Response
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    },
    "token": "<jwt-token>"
  }
}
```
#### Error Response
```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

---

### Browse Menus
- **GET** `/api/user/menus`
#### Success Response
```json
{
  "status": "success",
  "data": {
    "menus": [
      { "id": "...", "name": "Pizza", "price": 2500, "category": "main", ... },
      ...
    ]
  }
}
```

### Get Menu Details
- **GET** `/api/user/menus/:menuId`
#### Success Response
```json
{
  "status": "success",
  "data": {
    "menu": {
      "id": "...",
      "name": "Pizza",
      "description": "Delicious cheese pizza",
      "price": 2500,
      "category": "main",
      "imageUrl": "https://...",
      "isAvailable": true
    }
  }
}
```

### Place Order
- **POST** `/api/user/orders`
#### Request Body
```json
{
  "userId": "...",
  "items": {
    "items": [
      { "menuId": "...", "quantity": 2, "price": 2500 },
      { "menuId": "...", "quantity": 1, "price": 1500 }
    ]
  },
  "totalPrice": 6500,
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "Lagos",
    "state": "Lagos"
  }
}
```
#### Success Response
```json
{
  "status": "success",
  "data": {
    "order": {
      "id": "...",
      "userId": "...",
      "items": {
        "items": [
          { "menuId": "...", "quantity": 2, "price": 2500 },
          { "menuId": "...", "quantity": 1, "price": 1500 }
        ]
      },
      "totalPrice": 6500,
      "status": "pending",
      "deliveryAddress": {
        "street": "123 Main St",
        "city": "Lagos",
        "state": "Lagos"
      },
      "createdAt": "2025-07-29T12:00:00.000Z"
    }
  }
}
```

### Make Payment
- **POST** `/api/user/payments`
#### Request Body
```json
{
  "orderId": "...",
  "userId": "...",
  "amount": 5000,
  "paymentMethod": "bank transfer"
}
```
#### Success Response
```json
{
  "status": "success",
  "data": {
    "authorization_url": "https://paystack.com/pay/xyz..."
  }
}
```

### Confirm Payment
- **GET** `/api/user/confirm-payment?reference=paystack_ref_123`
#### Success Response
```json
{
  "status": "success",
  "message": "Payment confirmed"
}
```

---

## Admin Endpoints

### Create Menu
- **POST** `/api/admin/create-menu`
#### Request Body
```json
{
  "name": "Pizza",
  "description": "Delicious cheese pizza",
  "price": 2500,
  "category": "main",
  "imageUrl": "https://...",
  "isAvailable": true
}
```
#### Success Response
```json
{
  "status": "success",
  "data": {
    "menu": {
      "id": "...",
      "name": "Pizza",
      "description": "Delicious cheese pizza",
      "price": 2500,
      "category": "main",
      "imageUrl": "https://...",
      "isAvailable": true
    }
  }
}
```

### Login Admin
- **POST** `/api/admin/login`
#### Request Body
```json
{
  "email": "admin@example.com",
  "password": "adminpass"
}
```
#### Success Response
```json
{
  "status": "success",
  "data": {
    "admin": {
      "_id": "...",
      "name": "Admin",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "<jwt-token>"
  }
}
```

### Fetch All Orders
- **GET** `/api/admin/fetch-all-order`
#### Success Response
```json
{
  "status": "success",
  "data": {
    "orders": [ ... ]
  }
}
```

### Update Order
- **PUT** `/api/admin/update-order/:orderId`
#### Request Body
```json
{
  "status": "confirmed"
}
```
#### Success Response
```json
{
  "status": "success",
  "data": {
    "order": {
      "id": "...",
      "status": "confirmed"
    }
  }
}
```

### Fetch All Customers
- **GET** `/api/admin/fetch-all-customer`
#### Success Response
```json
{
  "status": "success",
  "data": {
    "customers": [ ... ]
  }
}
```

### Create/Update/Delete Menu (Admin)
- **PUT** `/api/admin/update-menu/:menuId`
- **DELETE** `/api/admin/delete-menu?menuId=...`

### Confirm Payment (Admin)
- **GET** `/api/admin/confirm/payment?reference=paystack_ref_123`
#### Success Response
```json
{
  "status": "success",
  "message": "Payment confirmed"
}
```

### Fetch a Payment
- **GET** `/api/admin/fetch-a-payment/:paymentId`
#### Success Response
```json
{
  "status": "success",
  "data": {
    "payment": { ... }
  }
}
```

### Fetch All Payments
- **GET** `/api/admin/fetch-all-payment`
#### Success Response
```json
{
  "status": "success",
  "data": {
    "payments": [ ... ]
  }
}
```

---

## Error Response Format
All errors follow this format:
```json
{
  "status": "error",
  "message": "Error description",
  "type": "ERROR_TYPE",
  "details": {}
}
```

### Error Types & Example Messages

- **ValidationError**
  - `type`: "VALIDATION_ERR"
  - `statusCode`: 400
  - `message`: "Invalid request body"
  - `details`: `{ error: [ ...ajv error objects... ] }`

- **BadRequestError**
  - `type`: Custom (e.g., "BAD_REQUEST")
  - `statusCode`: 400
  - `message`: Custom message

- **NotFoundError**
  - `type`: "NOTFOUND_ERR"
  - `statusCode`: 404
  - `message`: "Resource not found"

- **BaseError (Server/Unknown)**
  - `type`: "SERVER_ERR"
  - `statusCode`: 500
  - `message`: "Error coming from server: <error message>"

---

## Notes for Frontend
- Always check for `status` in the response.
- Use the `token` from login/register for authenticated requests.
- Handle 401/403 errors by redirecting to login or showing an error message.
- For payments, redirect users to the `authorization_url` provided by Paystack.

---

For any questions, contact the backend team or open an issue in the repository.
