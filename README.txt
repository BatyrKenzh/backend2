# Football Blog Platform

This project is a football-focused blogging platform built with Node.js and Express, featuring EJS for server-side templating. It is designed to cater to football enthusiasts who want to read and write about the game. With user authentication, blog management, and real-time league information, it's a one-stop platform for sharing and engaging with football content.

## Project Structure

- `locales`: Internationalization files supporting English (`en.json`) and Russian (`ru.json`).
- `middlewares`: Express middleware for handling requests, authentication, and more.
- `models`: Mongoose schemas/models for `User` and `Blog` entities.
- `node_modules`: Directory for NPM dependencies.
- `public`: Static assets including CSS, JS, fonts, and images.
- `routes`: Express routes for handling all web requests to `admin`, `api`, `auth`, `blog`, `league`, and more.
- `views`: EJS templates for rendering dynamic HTML content.
- `.env`: A file containing environment variables for database configuration and API keys (not included in the repository for security).
- `database.js`: Configuration file for connecting to the MongoDB database.
- `index.js`: The main entry point for the Node.js application.
- `package.json` & `package-lock.json`: NPM configuration files specifying project dependencies and lock versions.

## Features

- **User Authentication**: Secure signup and login functionality.
- **Blog Management**: Create, edit, and delete football-related blog posts.
- **Comments**: Interactive commenting system for community engagement.
- **Internationalization**: Support for English and Russian languages.
- **Admin Dashboard**: Administer blog posts and user accounts.
- **Football League Information**: Live football league standings and statistics.
- **Extended Read**: Feature to read more of longer blog posts.

## Dependencies

- `axios`: For making HTTP requests to external football data APIs.
- `bcryptjs`: For hashing and checking user passwords.
- `dotenv`: To load environment variables from the `.env` file.
- `ejs`: For templating and rendering views.
- `express`: The web application framework.
- `express-session`: For managing user sessions.
- `mongoose`: For modeling and mapping MongoDB data to javascript.
- `multer`: For handling multipart/form-data, primarily used for uploading files.
- `node-fetch`: A light-weight module that brings `window.fetch` to Node.js.
- `nodemon`: For automatically restarting the node application when file changes are detected.
- `path`: For working with file and directory paths.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- NPM
- MongoDB

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies:
npm install

DATABASE_URL=mongodb://localhost:27017/your-db
SESSION_SECRET=your-secret
API_KEY=your-api-key-for-football-data

4. Run the server using:
5. Open `http://localhost:3000` in your web browser to access the application.

## Configuration

The application requires the following environment variables in your `.env` file:

- `DATABASE_URL`: Connection string for the MongoDB database.
- `SESSION_SECRET`: A secret key for session hashing to enhance security.
- `API_KEY`: An API key for accessing football data (you can specify the provider and how to obtain this key).

Make sure to replace the placeholders with your actual data without quotes.

## API Endpoints

The application provides several API endpoints for interacting with the football data:

- `/api/leagues`: Retrieves current league standings and statistics.
- `/api/blogs`: API for blog post creation and management.
- (List other available endpoints and their functions here)

## Contributing

If you're interested in contributing to the Football Blog Platform, please fork the repository and submit a pull request with your proposed changes. For more information, please read the [CONTRIBUTING.md](CONTRIBUTING.md) document.
