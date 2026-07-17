# API Documentation

# Base URL

```
http://localhost:8080
```

---

# Authentication APIs

## 1. Register User

### Endpoint

```
POST /api/register
```

### Description

Registers a new user with an initial wallet balance of **100 coins**.

### Request Body

```json
{
  "name": "Hariom Verma",
  "email": "hariom@gmail.com",
  "password": "123456"
}
```

### Success Response (200 OK)

```json
{
  "id": 1,
  "name": "Hariom Verma",
  "email": "hariom@gmail.com",
  "password": "123456",
  "walletBalance": 100
}
```

### Error Response

```text
Email already exists
```

---

## 2. Login User

### Endpoint

```
POST /api/login
```

### Description

Authenticates a registered user.

### Request Body

```json
{
    "email":"hariom@gmail.com",
    "password":"123456"
}
```

### Success Response

```json
{
  "id":1,
  "name":"Hariom Verma",
  "email":"hariom@gmail.com",
  "walletBalance":100
}
```

### Failure Response

```text
Invalid Email or Password
```

---

# Wallet API

## 3. Get Wallet Balance

### Endpoint

```
GET /api/wallet/{id}
```

### Example

```
GET /api/wallet/1
```

### Success Response

```json
100
```

---

# Media APIs

## 4. Get All Media

### Endpoint

```
GET /api/media
```

### Description

Returns all uploaded media.

### Success Response

```json
[
  {
    "id":1,
    "title":"Sunset",
    "imagePath":"uploads/image1.jpg",
    "unlockPrice":20
  }
]
```

---

## 5. Upload Media

### Endpoint

```
POST /api/media/upload
```

### Content Type

```
multipart/form-data
```

### Form Data

| Field | Type |
|--------|------|
| file | Image |
| title | String |
| unlockPrice | Integer |

### Success Response

```json
{
  "id":5,
  "title":"Nature",
  "imagePath":"uploads/nature.jpg",
  "unlockPrice":25
}
```

---

## 6. Unlock Media

### Endpoint

```
POST /api/media/unlock
```

### Request Body

```json
{
    "userId":1,
    "mediaId":5
}
```

### Success Response

```text
Media unlocked successfully.
```

### Possible Error Responses

```text
Insufficient wallet balance.
```

```text
Media already unlocked.
```

```text
User not found.
```

```text
Media not found.
```

---

## 7. Check Unlock Status

### Endpoint

```
GET /api/media/status
```

### Example

```
GET /api/media/status?userId=1&mediaId=5
```

### Success Response

```json
true
```

or

```json
false
```

---

# HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | Request Successful |
| 400 | Invalid Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

# API Flow

```
Register User
      │
      ▼
Login
      │
      ▼
Browse Media
      │
      ▼
View Wallet
      │
      ▼
Unlock Media
      │
      ▼
Wallet Balance Updated
      │
      ▼
Original Media Accessible
```

---

# Notes

- Every newly registered user receives **100 coins**.
- Wallet balance is automatically deducted when paid media is unlocked.
- Duplicate unlock attempts are prevented.
- Locked media cannot be accessed until successfully unlocked.
- Media status is checked using the `/api/media/status` endpoint.