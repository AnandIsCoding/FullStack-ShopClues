<small>





## 🛒 Simple E-Commerce Database Schema (MongoDB)

This document outlines the MongoDB collections used in the Simple E-Commerce application. It includes all core entities, their fields, data types, and relationships.

![Screenshot](Diagram.png)

---

## 👤 USERS & 🛒 CART

<table>
<tr>
<td>

### USERS

| Field           | Type        | Description           |
| --------------- | ----------- | --------------------- |
| `_id`           | ObjectId    | Unique user ID        |
| `name`          | String      | Full name of the user |
| `email`         | String      | Email address         |
| `contactNumber` | String      | Mobile number         |
| `password`      | String      | Hashed password       |
| `accountType`   | String      | 'Admin' or 'User' |
| `active`        | Boolean     | User account status   |
| `cart`          | ObjectId    | Linked shopping cart  |
| `orders`        | ObjectId\[] | List of orders placed |

</td>
<td>

### CART

| Field               | Type     | Description                  |
| ------------------- | -------- | ---------------------------- |
| `_id`               | ObjectId | Cart ID                      |
| `userId`            | ObjectId | Linked user ID               |
| `items`             | Array    | List of products in the cart |
| `items[].productId` | ObjectId | Product ID                   |
| `items[].quantity`  | Number   | Quantity of the product      |

</td>
</tr>
</table>

---

## 📦 PRODUCTS & 📂 CATEGORIES

<table>
<tr>
<td>

### PRODUCTS

| Field              | Type        | Description           |
| ------------------ | ----------- | --------------------- |
| `_id`              | ObjectId    | Product ID            |
| `title`            | String      | Product name          |
| `description`      | String      | Product description   |
| `price`            | Number      | Product price         |
| `category`         | ObjectId    | Linked category ID    |
| `stock`            | Number      | Available stock count |
| `ratingAndReviews` | ObjectId\[] | Linked reviews        |
| `thumbnail`        | String      | Product image URL     |

</td>
<td>

### CATEGORIES

| Field         | Type     | Description       |
| ------------- | -------- | ----------------- |
| `_id`         | ObjectId | Category ID       |
| `name`        | String   | Category name     |
| `description` | String   | Brief description |

</td>
</tr>
</table>

---

## 🧾 ORDERS & ⭐ REVIEWS

<table>
<tr>
<td>

### ORDERS

| Field                  | Type     | Description                |
| ---------------------- | -------- | -------------------------- |
| `_id`                  | ObjectId | Order ID                   |
| `userId`               | ObjectId | Linked user ID             |
| `products`             | Array    | Purchased products         |
| `products[].productId` | ObjectId | Product ID                 |
| `products[].quantity`  | Number   | Quantity purchased         |
| `totalAmount`          | Number   | Total payment amount       |
| `address`              | String   | Shipping address           |
| `pincode`              | String   | Postal code                |
| `orderDate`            | Date     | Date of order              |
| `status`               | String   | 'Pending', 'Shipped', etc. |

</td>
<td>

### RATING AND REVIEWS

| Field       | Type     | Description            |
| ----------- | -------- | ---------------------- |
| `_id`       | ObjectId | Review ID              |
| `userId`    | ObjectId | Reviewer ID            |
| `productId` | ObjectId | Product being reviewed |
| `rating`    | Number   | Rating (1 to 5)        |
| `review`    | String   | Review comment         |
| `date`      | Date     | Review date            |

</td>
</tr>
</table>

---

## 🔗 RELATIONSHIPS SUMMARY

| Relationship          | Type         | Description                          |
| --------------------- | ------------ | ------------------------------------ |
| Users ↔ Cart          | One-to-One   | Each user has one cart               |
| Users ↔ Orders        | One-to-Many  | User can place multiple orders       |
| Orders ↔ Products     | Many-to-Many | Each order can include many products |
| Products ↔ Categories | Many-to-One  | Products belong to one category      |
| Products ↔ Reviews    | One-to-Many  | Products can have multiple reviews   |

---

> ✅ Designed for simplicity, scalability, and clean data management using MongoDB & Mongoose.







</small>