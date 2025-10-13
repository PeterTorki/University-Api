# Universe API

A Node.js REST API for university management system with authentication, user management, departments, and courses.

## Documentations

- [University Api](https://documenter.getpostman.com/view/44599683/2sB3QDwD31)

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Redis** - Caching
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **AJV** - JSON Schema validation
- **Nodemailer** - Email verification
- **Nodemon** - Development tool

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in `src/utils/` directory:

```env
PORT=3000
mongo_uri=your_mongodb_connection_string
```

4. Start the server:

```bash
npm start
```

## API Routes

### Authentication Routes

```
POST   /auth/signup          - Register new user
POST   /auth/login           - User login
GET    /auth/verify/:token   - Email verification
```

### User Routes (Admin Only)

```
GET    /users               - Get all users
GET    /users/:id           - Get specific user
PUT    /users/:id           - Update user
DELETE /users/:id           - Delete user
```

### Department Routes (Admin Only)

```
GET    /departments         - Get all departments
GET    /departments/:id     - Get specific department
POST   /departments         - Create department
PUT    /departments/:id     - Update department
DELETE /departments/:id     - Delete department
```

### Course Routes (Admin Only)

```
GET    /courses             - Get all courses
GET    /courses/:id         - Get specific course
POST   /courses             - Create course
PUT    /courses/:id         - Update course
DELETE /courses/:id         - Delete course
```

## Authentication

Include JWT token in requests:

```
Authorization: Bearer <your-jwt-token>
```

## User Roles

- **student** - Default role
- **admin** - Full access to all routes

## Request Examples

### Sign Up

```json
POST /auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

### Create Department

```json
POST /departments
{
  "name": "Computer Science",
  "description": "CS Department"
}
```

### Create Course

```json
POST /courses
{
  "title": "Web Development",
  "description": "Learn web development",
  "department": "department_id_here"
}
```

## Notes

- Redis is optional - API works without it but without caching
- Email verification required for new users
- Most routes require admin authentication
- MongoDB connection required to run
