# Backend Setup Guide

## Requirements
- XAMPP with PHP 8.0.x and MariaDB
- Composer installed globally

---

## Steps

### 1. Install dependencies
```bash
cd backend
composer install --ignore-platform-reqs
```

### 2. Check your MySQL port
Open XAMPP Control Panel and look at the port number next to MySQL. It is usually **3306** but may be **3308** on some machines.

### 3. Configure `.env`
Open the `.env` file in the `backend` folder and set the following:
```
CI_ENVIRONMENT = development
app.baseURL = 'http://localhost:8080/'
database.default.hostname = 127.0.0.1
database.default.database = wedding_db
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
database.default.port = 3306
```
> Change `database.default.port` to match your XAMPP MySQL port (3306 or 3308).

### 4. Create the database
- Make sure XAMPP Apache and MySQL are running
- Open phpMyAdmin at `http://localhost/phpmyadmin`
- Create a new database named `wedding_db`
- Click on `wedding_db`, go to the **Import** tab
- Select the `database.sql` file from the project root
- Click **Go**

### 5. Run the backend server
```bash
php spark serve --port 8080
```

### 6. Verify it's working
Open your browser and go to:
```
http://localhost:8080
```
You should see: `Wedding API is running!`

To verify the database is connected, open:
```
http://localhost:8080/api/guests/list
```
You should see a JSON response with guest data.

---

## Running the Full App

You need **both** servers running at the same time:

| Server   | Command                        | URL                    |
|----------|--------------------------------|------------------------|
| Backend  | `php spark serve --port 8080`  | http://localhost:8080  |
| Frontend | `npm start` (in frontend folder) | http://localhost:3000 |

---

## Troubleshooting

**Access denied for database**
- Make sure MySQL is running in XAMPP
- Double-check the port number (3306 vs 3308)
- Try changing `hostname` from `localhost` to `127.0.0.1` in `.env`

**CORS errors in browser console**
- Make sure the backend server is running on port 8080
- Make sure the frontend is running on port 3000

**`php spark` not found**
- Make sure you are inside the `backend` folder
- Make sure PHP is in your system PATH (XAMPP users: add `D:\xampp\php` to PATH)
