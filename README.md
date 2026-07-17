# Konvo Paid Media Locker

## Overview

Konvo Paid Media Locker is a full-stack application that allows users to upload images and monetize their content by assigning an unlock price. Other users can browse uploaded media, view previews, and unlock premium content using coins from their wallet.

The project is developed as part of the **Konvo Backend/Full Stack Internship Assignment** using **Spring Boot**, **MySQL**, and **React Native (Expo)**.

---

# Features

## User Management

- User Registration
- User Login
- Wallet Balance
- Default Wallet Balance (100 Coins)

## Paid Media

- Upload Image
- Set Unlock Price
- Publish Media
- View Image Preview
- Unlock Original Image

## Wallet

- Default Balance
- Coin Deduction on Purchase
- Prevent Unlock if Balance is Insufficient

## Unlock System

- Prevent Duplicate Unlocks
- Track Purchased Media
- Show Locked/Unlocked Status

## Media Feed

- Browse Uploaded Images
- View Unlock Price
- Locked/Unlocked Badge
- Original Image After Unlock

---

# Tech Stack

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL

## Frontend

- React Native
- Expo Router
- TypeScript

## Database

- MySQL

---

# Project Structure

```
Konvo-Paid-Media-Locker
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── config/
│   └── uploads/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── assets/
│   └── services/
│
├── README.md
├── API_DOCUMENTATION.md
├── DATABASE_SCHEMA.md
└── SETUP_GUIDE.md
```

---

# Backend Technologies

- Spring Boot
- Spring MVC
- Spring Data JPA
- Spring Security
- MySQL

---

# Frontend Technologies

- React Native
- Expo
- Expo Router
- TypeScript
- Fetch API

---

# Database

The project uses MySQL with the following tables:

- User
- Media
- Unlock

---

# API Endpoints

| Method | Endpoint |
|---------|----------|
| POST | /api/register |
| POST | /api/login |
| GET | /api/media |
| POST | /api/media/upload |
| POST | /api/media/unlock |
| GET | /api/wallet/{id} |
| GET | /api/media/status |

Detailed API documentation is available in **API_DOCUMENTATION.md**.

---

# Security Decisions

The following security measures have been implemented:

- Duplicate user registration is prevented using unique email validation.
- Wallet balance is verified before unlocking paid content.
- Duplicate purchases are prevented.
- Locked content cannot be accessed without unlocking.
- Uploaded media is served through backend endpoints instead of exposing database records directly.
- Spring Security is configured to control API access.

---

# Future Improvements

- JWT Authentication
- Password Encryption using BCrypt
- Amazon S3 Storage
- Transaction History
- Secure Media Streaming
- Temporary Signed URLs
- Admin Dashboard

---

# Author

Hariom Verma

B.Tech Computer Science Engineering

Konvo Full Stack Internship Assignment