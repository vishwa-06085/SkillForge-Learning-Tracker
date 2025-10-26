# SkillForge - Learning Module Tracker

A full-stack web application for tracking and managing skill development modules with role-based access for Mentors and Learners.

## About
SkillForge streamlines the tracking and management of learning modules. Mentors can create and manage modules while learners can browse and track their progress through personalized learning paths.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js, React Router
- **Authentication**: JWT tokens
- **Database**: MongoDB with Mongoose ODM

## Features
- User registration and JWT-based authentication
- Role-based access (Mentor/Learner)
- Learning module CRUD operations
- Category filtering and sorting
- Responsive UI design
- Form validation and error handling

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB running on localhost:27017

### Backend Setup
```bash
cd nodeapp
npm install
npm start
```
Backend runs on http://localhost:8080

### Frontend Setup
```bash
cd reactapp
npm install
npm start
```
Frontend runs on http://localhost:8081

## Usage

### For Mentors:
- Create, edit, and delete learning modules
- Filter modules by category
- Manage module details (title, difficulty, duration, resources)

### For Learners:
- Browse all available learning modules
- Sort modules by estimated completion time
- View detailed module information
- Access mentor contact details

## API Endpoints
- `POST /user/signup` - User registration
- `POST /user/login` - User authentication
- `GET /user/getAllUsers` - Get all users
- `POST /modules/addModule` - Create module
- `POST /modules/getAllModules` - Get all modules
- `GET /modules/getModuleById/:id` - Get module by ID
- `POST /modules/getModulesByUserId` - Get user's modules
- `PUT /modules/updateModule/:id` - Update module
- `DELETE /modules/deleteModule/:id` - Delete module

## Development
- Database: MongoDB (skillforgeDb)
- Authentication: JWT with Authorization header
- Validation: Mongoose schemas with custom validators
- Error handling: Try-catch blocks with 500 status responses

## License
MIT License