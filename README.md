# Student Management System - Frontend

## Overview
This is the frontend application for a Student Management System built with Angular. The application provides a user interface for managing student records and sports information with features like listing, adding, updating, and deleting students. It includes authentication and authorization with role-based access control. The application is designed for French-speaking users, as indicated by the French error messages in the code.

## Features
- User authentication (login)
- Role-based access control (ADMIN privileges required for certain operations)
- Student management:
  - List all students
  - Add new students (ADMIN only)
  - Update existing students (ADMIN only)
  - Delete students (ADMIN only)
  - Filter students by search criteria
- Sports management:
  - List all sports
  - View sport details
  - Add new sports
  - Update existing sports
- Responsive UI using Angular Material

## Technologies Used
- Angular 19.2.x
- Angular Material
- Angular Router for navigation
- JWT for authentication
- RxJS for reactive programming
- TypeScript
- Express.js (for server-side rendering)

## Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

## Installation
1. Clone the repository
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory
   ```
   cd Fullstack-front
   ```

3. Install dependencies
   ```
   npm install
   ```

## Running the Application
- Development server:
  ```
  npm start
  ```
  Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

- Build for production:
  ```
  npm run build
  ```
  The build artifacts will be stored in the `dist/` directory.

- Server-side rendering:
  ```
  npm run serve:ssr:FS-APP-Front
  ```

## Project Structure
- `src/app/components/`: Contains all the UI components
- `src/app/services/`: Contains services for API communication
- `src/app/models/`: Contains data models
- `src/app/guards/`: Contains authentication and authorization guards
- `src/app/interceptors/`: Contains HTTP interceptors for handling API requests
- `src/app/admin/`: Contains admin-specific components

## Authentication and Authorization
The application uses JWT for authentication. Certain routes and features are protected by:
- `AuthenticationGuard`: Ensures the user is logged in
- `AuthorizationGuard`: Ensures the user has the required role (e.g., ADMIN)

## Backend API
The frontend communicates with a backend server running on `http://localhost:8095` with the following endpoints:
- Authentication: `http://localhost:8095/auth/login`
- Student management: `http://localhost:8095/api/etudiants`
- Sports management: `http://localhost:8095/api/sports`

Make sure the backend server is running and accessible at the specified URL before using the application.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

