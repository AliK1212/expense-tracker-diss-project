# Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js) that helps users manage and track their expenses efficiently.

## Features

- 💰 Track income and expenses
- 📊 Categorize transactions
- 🔐 User authentication and authorization
- 📱 Responsive design
- 📈 Visual expense analytics
- 🔄 Real-time updates

## Tech Stack

### Frontend
- React 17
- Material-UI for styling
- React Router for navigation
- Axios for API requests
- Responsive design principles

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing
- CORS enabled
- Environment variables support

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Configure Environment Variables
Create a `.env` file in the backend directory and add:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

5. Start the Application
Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
expense-tracker/
├── backend/
│   ├── controllers/    # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   └── server.js      # Entry point
├── frontend/
│   ├── public/        # Static files
│   └── src/          # React source files
└── README.md
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

## API Documentation

### Authentication Endpoints

#### Register New User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response**: 
  - **Code**: 201
  - **Content**: 
    ```json
    {
      "message": "User created successfully",
      "userId": "string",
      "token": "JWT_TOKEN"
    }
    ```
- **Error Response**:
  - **Code**: 400
  - **Content**: 
    ```json
    {
      "error": "Email already exists"
    }
    ```

#### User Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "token": "JWT_TOKEN",
      "userId": "string"
    }
    ```
- **Error Response**:
  - **Code**: 401
  - **Content**: 
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

### Expense Endpoints

#### Get All Expenses
- **URL**: `/api/expenses`
- **Method**: `GET`
- **Headers Required**: 
  - `Authorization: Bearer JWT_TOKEN`
- **Query Parameters**:
  - `startDate` (optional): Filter expenses after this date
  - `endDate` (optional): Filter expenses before this date
  - `category` (optional): Filter by category
  - `limit` (optional): Number of records to return (default: 10)
  - `page` (optional): Page number for pagination (default: 1)
- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "expenses": [
        {
          "id": "string",
          "amount": "number",
          "category": "string",
          "description": "string",
          "date": "date",
          "type": "income|expense"
        }
      ],
      "totalCount": "number",
      "currentPage": "number",
      "totalPages": "number"
    }
    ```

#### Create New Expense
- **URL**: `/api/expenses`
- **Method**: `POST`
- **Headers Required**: 
  - `Authorization: Bearer JWT_TOKEN`
- **Request Body**:
  ```json
  {
    "amount": "number",
    "category": "string",
    "description": "string",
    "date": "date",
    "type": "income|expense"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**: 
    ```json
    {
      "id": "string",
      "amount": "number",
      "category": "string",
      "description": "string",
      "date": "date",
      "type": "income|expense"
    }
    ```

#### Update Expense
- **URL**: `/api/expenses/:id`
- **Method**: `PUT`
- **Headers Required**: 
  - `Authorization: Bearer JWT_TOKEN`
- **URL Parameters**:
  - `id`: Expense ID
- **Request Body**:
  ```json
  {
    "amount": "number",
    "category": "string",
    "description": "string",
    "date": "date",
    "type": "income|expense"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "id": "string",
      "amount": "number",
      "category": "string",
      "description": "string",
      "date": "date",
      "type": "income|expense"
    }
    ```

#### Delete Expense
- **URL**: `/api/expenses/:id`
- **Method**: `DELETE`
- **Headers Required**: 
  - `Authorization: Bearer JWT_TOKEN`
- **URL Parameters**:
  - `id`: Expense ID
- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "message": "Expense deleted successfully"
    }
    ```

### Analytics Endpoints

#### Get Expense Summary
- **URL**: `/api/analytics/summary`
- **Method**: `GET`
- **Headers Required**: 
  - `Authorization: Bearer JWT_TOKEN`
- **Query Parameters**:
  - `startDate` (optional): Start date for summary
  - `endDate` (optional): End date for summary
- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "totalIncome": "number",
      "totalExpenses": "number",
      "netBalance": "number",
      "categoryBreakdown": [
        {
          "category": "string",
          "amount": "number",
          "percentage": "number"
        }
      ]
    }
    ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Material-UI for the beautiful components
- MongoDB Atlas for database hosting
- The MERN stack community for excellent documentation and resources
