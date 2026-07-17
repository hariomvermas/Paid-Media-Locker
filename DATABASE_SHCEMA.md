# Database Schema

# Database Name
konvo-backend
```
konvo_paid_media_locker
```

---

# Overview

The application uses **MySQL** as its relational database management system.

The database stores information related to:

- Registered Users
- Uploaded Media
- Purchased (Unlocked) Media

The database consists of **three main tables**:

- User
- Media
- Unlock

---

# Entity Relationship

```
        User
         │
         │ 1
         │
         │
         ▼
      Unlock
         ▲
         │
         │
         │
         │ *
        Media
```

A user can unlock multiple media files.

A media file can be unlocked by multiple users.

The **Unlock** table acts as the bridge between **User** and **Media**.

---

# Table 1 : User

Stores registered user information.

| Column | Data Type | Constraints |
|---------|-----------|-------------|
| id | BIGINT | Primary Key, Auto Increment |
| name | VARCHAR(255) | NOT NULL |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| wallet_balance | INT | Default 100 |

### Primary Key

```
id
```

### Unique Key

```
email
```

---

# Table 2 : Media

Stores uploaded media details.

| Column | Data Type | Constraints |
|---------|-----------|-------------|
| id | BIGINT | Primary Key, Auto Increment |
| title | VARCHAR(255) | NOT NULL |
| image_path | VARCHAR(255) | NOT NULL |
| unlock_price | INT | NOT NULL |

### Primary Key

```
id
```

---

# Table 3 : Unlock

Stores information about purchased media.

| Column | Data Type | Constraints |
|---------|-----------|-------------|
| id | BIGINT | Primary Key, Auto Increment |
| user_id | BIGINT | Foreign Key |
| media_id | BIGINT | Foreign Key |

### Primary Key

```
id
```

### Foreign Keys

```
user_id → User(id)

media_id → Media(id)
```

---

# Relationships

## User → Unlock

Relationship

```
One User
      │
      │
      ▼
Many Unlock Records
```

A user can purchase multiple media files.

---

## Media → Unlock

Relationship

```
One Media
      │
      │
      ▼
Many Unlock Records
```

A single media file can be purchased by multiple users.

---

# Database Constraints

The following constraints are implemented:

- Primary Key on every table
- Auto Increment IDs
- Unique Email for users
- Foreign Key relationship between Unlock and User
- Foreign Key relationship between Unlock and Media
- Default wallet balance of **100 coins** for every new user

---

# Database Flow

```
User Registration
        │
        ▼
Insert into User
        │
        ▼
Upload Media
        │
        ▼
Insert into Media
        │
        ▼
Unlock Media
        │
        ▼
Insert into Unlock
        │
        ▼
Update User Wallet Balance
```

---

# Sample Records

## User

| id | name | email | wallet_balance |
|----|------|-------|----------------|
| 1 | Hariom Verma | hariom@gmail.com | 80 |

---

## Media

| id | title | unlock_price |
|----|-------|--------------|
| 1 | Nature | 20 |

---

## Unlock

| id | user_id | media_id |
|----|---------|----------|
| 1 | 1 | 1 |

---

# Summary

The database design is intentionally simple and normalized for the internship assignment.

The schema ensures:

- Efficient user management
- Secure paid media unlocking
- Wallet balance tracking
- Prevention of duplicate user accounts
- Clear relationships between users and purchased media