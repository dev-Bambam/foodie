# Foodify API – Frontend Integration Guide

**Base URL:** `https://foodify-wck7.onrender.com`

---

## Table of Contents

-  [Authentication](#authentication)
-  [User APIs](#user-apis)
   -  [User Management](#user-management)
   -  [Menu (User)](#menu-user)
   -  [Order (User)](#order-user)
   -  [Payment (User)](#payment-user)
-  [Admin APIs](#admin-apis)
   -  [Admin Management](#admin-management)
   -  [Menu (Admin)](#menu-admin)
   -  [Order (Admin)](#order-admin)
   -  [Payment (Admin)](#payment-admin)
   -  [Customer Management (Admin)](#customer-management-admin)
-  [Data Types](#data-types)
-  [Error Response Format](#error-response-format)
-  [Notes for AI Consumers](#notes-for-ai-consumers)

---

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## User APIs

### User Management

#### Register User

-  **POST** `/api/user/register`

##### Request Body

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

##### Success Response

```json
{
   "status": "success",
   "data": {
      "user": {
         "id": "...",
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

#### Login User

-  **POST** `/api/user/login`

##### Request Body

```json
{
   "email": "john@example.com",
   "password": "password123"
}
```

##### Success Response

```json
{
   "status": "success",
   "data": {
      "user": {
         "id": "...",
         "name": "John Doe",
         "email": "john@example.com",
         "role": "customer"
      },
      "token": "<jwt-token>"
   }
}
```

---

### Menu (User)

#### Browse Menus

-  **GET** `/api/user/menus`

##### Query (optional): `?category=Snacks`

##### Success Response

```json
{
   "status": "success",
   "data": {
      "menus": [
         {
            "_id": "...",
            "name": "Pizza",
            "description": "Delicious cheese pizza",
            "price": 2500,
            "category": "main",
            "isAvailable": true,
            "createdAt": "...",
            "updatedAt": "...",
            "__v": 0
         }
         // ...more menu items
      ]
   }
}
```

##### Error Response (category not found)

```json
{
   "status": "error",
   "message": "Food Category not Found",
   "type": "NOTFOUND_ERR"
}
```

#### Get Menu Details

-  **GET** `/api/user/menus/:menuId`

##### Success Response

```json
{
   "status": "success",
   "data": {
      "menu": {
         "_id": "...",
         "name": "Pizza",
         "description": "Delicious cheese pizza",
         "price": 2500,
         "category": "main",
         "isAvailable": true,
         "createdAt": "...",
         "updatedAt": "...",
         "__v": 0
      }
   }
}
```

---

### Order (User)

#### Place Order

-  **POST** `/api/user/orders`

##### Request Body

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

##### Success Response

```json
{
   "status": "success",
   "data": {
      "order": {
         "_id": "...",
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
         "createdAt": "..."
      }
   }
}
```

---

### Payment (User)

#### Make Payment

-  **POST** `/api/user/payments`

##### Request Body

```json
{
   "orderId": "...",
   "userId": "...",
   "amount": 5000,
   "paymentMethod": "bank transfer"
}
```

##### Success Response

```json
{
   "status": "success",
   "data": {
      "payment_url": "https://paystack.com/pay/xyz..."
   }
}
```

#### Confirm Payment

-  **GET** `/api/user/confirm-payment?reference=paystack_ref_123`

##### Success Response

```json
{
   "status": "success",
   "message": "Payment confirmed"
}
```

---

## Admin APIs

### Admin Management

#### Login Admin

-  **POST** `/api/admin/login`

##### Request Body

```json
{
   "email": "admin@example.com",
   "password": "adminpass"
}
```

##### Success Response

```json
{
   "status": "success",
   "data": {
      "user": {
         "id": "...",
         "name": "Admin",
         "email": "admin@example.com",
         "role": "admin"
      },
      "token": "<jwt-token>"
   }
}
```

---

### Menu (Admin)

#### Create Menu

-  **POST** `/api/admin/create-menu`

##### Request Body

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

##### Success Response

```json
{
   "status": "success",
   "data": {
      "menu": {
         "_id": "...",
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

#### Update Menu

-  **PUT** `/api/admin/update-menu/:menuId`

##### Request Body

```json
{
   "name": "Veg Pizza",
   "description": "Vegetarian pizza with fresh veggies",
   "price": 2700,
   "category": "vegetarian",
   "imageUrl": "https://...",
   "isAvailable": false
}
```

##### Success Response

```json
{
   "status": "success",
   "data": {
      "menu": {
         "_id": "...",
         "name": "Veg Pizza",
         "description": "Vegetarian pizza with fresh veggies",
         "price": 2700,
         "category": "vegetarian",
         "imageUrl": "https://...",
         "isAvailable": false
      }
   }
}
```

#### Delete Menu

-  **DELETE** `/api/admin/delete-menu/:menuId`

##### Success Response

```json
{
   "status": "success",
   "message": "Menu item deleted"
}
```

#### Browse Menus

-  **GET** `/api/admin/browse-menus`
-  Optional query: `?category=Snacks`

##### Success Response (with category query)

```json
{
   "status": "success",
   "data": {
      "menus": [
         {
            "_id": "687f6ed4b5b74db99530b531",
            "name": "Egg Rolls",
            "description": "Juicy grilled chicken burger with lettuce and tomato",
            "price": 400,
            "category": "Snacks",
            "isAvailable": true,
            "createdAt": "2025-07-22T10:58:28.190Z",
            "updatedAt": "2025-07-30T02:43:45.628Z",
            "__v": 0
         }
         // ...more menu items
      ]
   }
}
```

##### Error Response (category not found)

```json
{
   "status": "error",
   "message": "Food Category not Found",
   "type": "NOTFOUND_ERR"
}
```

#### Get Menu Details

-  **GET** `/api/admin/fetch-a-menu/:menuId`

##### Success Response

```json
{
   "status": "success",
   "data": {
      "menu": {
         "_id": "687f6ed4b5b74db99530b531",
         "name": "Egg Rolls",
         "description": "Juicy grilled chicken burger with lettuce and tomato",
         "price": 400,
         "category": "Snacks",
         "isAvailable": true,
         "createdAt": "2025-07-22T10:58:28.190Z",
         "updatedAt": "2025-07-30T02:43:45.628Z",
         "__v": 0
      }
   }
}
```

---

### Order (Admin)

#### Fetch All Orders

-  **GET** `/api/admin/fetch-all-order`

##### Success Response

```json
{
   "status": "success",
   "data": {
      "orders": [
         {
            "deliveryAddress": {
               "street": "123 Main St",
               "city": "Lagos",
               "state": "Lagos"
            },
            "_id": "687f8c4b055ca0134f317bcd",
            "userId": "USER_ID_HERE",
            "items": [
               {
                  "menuId": "MENU_ID_1",
                  "quantity": 2,
                  "price": 1500,
                  "_id": "687f8c4b055ca0134f317bce"
               },
               {
                  "menuId": "MENU_ID_2",
                  "quantity": 1,
                  "price": 2000,
                  "_id": "687f8c4b055ca0134f317bcf"
               }
            ],
            "totalPrice": 5000,
            "status": "pending",
            "createdAt": "2025-07-22T13:04:11.486Z",
            "updatedAt": "2025-07-22T13:04:11.486Z",
            "__v": 0
         }
      ]
   }
}
```

#### Update Order

-  **PUT** `/api/admin/update-order/:orderId`

##### Request Body

```json
{
   "status": "confirmed"
}
```

##### Success Response

```json
{
   "status": "success",
   "data": {
      "order": {
         "deliveryAddress": {
            "street": "123 Main St",
            "city": "Lagos",
            "state": "Lagos"
         },
         "_id": "687f8c4b055ca0134f317bcd",
         "userId": "USER_ID_HERE",
         "items": [
            {
               "menuId": "MENU_ID_1",
               "quantity": 2,
               "price": 1500,
               "_id": "687f8c4b055ca0134f317bce"
            },
            {
               "menuId": "MENU_ID_2",
               "quantity": 1,
               "price": 2000,
               "_id": "687f8c4b055ca0134f317bcf"
            }
         ],
         "totalPrice": 5000,
         "status": "confirmed",
         "createdAt": "2025-07-22T13:04:11.486Z",
         "updatedAt": "2025-07-22T13:04:11.486Z",
         "__v": 0
      }
   }
}
```

---

### Payment (Admin)

#### Confirm Payment

-  **GET** `/api/admin/confirm/payment?paymentId=...`

##### Success Response

```json
{
  "status": "success",
  "data": {
    "payment": { ... }
  }
}
```

#### Fetch a Payment

-  **GET** `/api/admin/fetch-a-payment/:paymentId`

##### Success Response

```json
{
  "status": "success",
  "data": {
    "payment": { ... }
  }
}
```

#### Fetch All Payments

-  **GET** `/api/admin/fetch-all-payment`

##### Success Response

```json
{
  "status": "success",
  "data": {
    "payments": [ ... ]
  }
}
```

---

### Customer Management (Admin)

#### Fetch All Customers

-  **GET** `/api/admin/fetch-all-customer`

##### Success Response

```json
{
  "status": "success",
  "data": {
    "user": [ ... ]
  }
}
```

---

## Data Types

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

-  **ValidationError**

   -  `type`: "VALIDATION_ERR"
   -  `statusCode`: 400
   -  `message`: "Invalid request body"
   -  `details`: `{ error: [ ...ajv error objects... ] }`

-  **BadRequestError**

   -  `type`: Custom (e.g., "BAD_REQUEST")
   -  `statusCode`: 400
   -  `message`: Custom message

-  **NotFoundError**

   -  `type`: "NOTFOUND_ERR"
   -  `statusCode`: 404
   -  `message`: "Resource not found"

-  **BaseError (Server/Unknown)**
   -  `type`: "SERVER_ERR"
   -  `statusCode`: 500
   -  `message`: "Error coming from server: <error message>"

---

## Notes for AI Consumers

-  All endpoints are grouped for clarity and easy navigation.
-  Pay close attention to the difference between `_id` and `id` in responses.
-  Use the provided data types for strict typing in your AI models.
-  All error responses are standardized for easy handling.
-  If you need more details on any endpoint, consult the backend team.

---

For any questions, contact the backend team or open an issue in the repository.
