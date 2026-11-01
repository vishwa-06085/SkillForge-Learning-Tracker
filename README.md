# SkillForge - Learning Module Tracker

A full-stack MERN web application for tracking and managing skill development modules with role-based access for Mentors and Learners.

## About

SkillForge is an academic project developed as part of my MERN Stack learning journey. It provides a platform where Mentors can create and manage learning modules, while Learners can browse available modules, explore learning resources and manage their learning journey.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: React.js, React Router
- **Database**: MongoDB, Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Security**: bcrypt
- **API Communication**: REST APIs

## Features
- User registration and JWT-based authentication
- Role-based access for Mentors and Learners
- Secure password hashing using bcrypt
- Learning module CRUD operations
- Category-based filtering and sorting
- Responsive user interface
- Form validation and error handling
- RESTful API integration

## Quick Start

### Prerequisites
- Node.js and npm
- MongoDB Atlas account or local MongoDB instance
- Git

### Clone Repository
```bash
git clone https://github.com/vishwa-06085/SkillForge-Learning-Tracker.git
cd SkillForge-Learning-Tracker
```

### Backend Setup
```bash
cd nodeapp
npm install
```

Create a `.env` file inside the `nodeapp` folder and configure:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
PORT=8080
```

Start the backend:

```bash
npm start
```

Backend runs on http://localhost:8080

### Frontend Setup

Open another terminal:

```bash
cd reactapp
npm install
npm start
```

Frontend runs on http://localhost:8081

**Note:** A valid MongoDB connection is required for database-dependent features. The project source code is available on GitHub but is not currently hosted.

## Usage

### For Mentors:
- Create, edit and delete learning modules
- Filter modules by category
- Manage module details such as title, difficulty, duration and resources

### For Learners:
- Browse available learning modules
- Sort modules by estimated completion time
- View detailed module information
- Access mentor contact details

## API Endpoints

### User Authentication
- `POST /user/signup` - User registration
- `POST /user/login` - User authentication
- `GET /user/getAllUsers` - Retrieve users

### Learning Module Management
- `POST /modules/addModule` - Create a learning module
- `POST /modules/getAllModules` - Get all learning modules
- `GET /modules/getModuleById/:id` - Get module by ID
- `POST /modules/getModulesByUserId` - Get modules by user ID
- `PUT /modules/updateModule/:id` - Update a learning module
- `DELETE /modules/deleteModule/:id` - Delete a learning module

## Development
- **Database**: MongoDB (skillforgeDb)
- **Authentication**: JWT with Authorization header
- **Password Security**: bcrypt password hashing
- **Validation**: Mongoose schemas and application-level validation
- **Error Handling**: Try-catch blocks and HTTP error responses
- **Version Control**: Git and GitHub

## Learning Outcomes
- Practical experience with full-stack MERN development
- Building REST APIs using Express.js
- Integrating MongoDB using Mongoose
- Implementing JWT authentication and role-based access
- Developing CRUD operations
- Connecting React frontend with backend services

## Project Information
- **Project Type**: Academic / Learning Project
- **Domain**: Full-Stack Web Development
- **Repository**: [SkillForge - GitHub](https://github.com/vishwa-06085/SkillForge-Learning-Tracker)
- **Hosting Status**: Not currently hosted

## License
MIT License
