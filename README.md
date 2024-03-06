```markdown
# Blog Backend

This is a backend application for a blog with authentication, authorization, email verification, and CRUD operations for posts built using Node.js and PostgreSQL.

## Features

- User Authentication: Allows users to sign up, log in, and log out securely using JWT tokens and bcrypt for password hashing.
- Authorization: Implements role-based access control (RBAC) to restrict certain actions to authorized users only.
- Email Verification: Sends verification emails to newly registered users to verify their email addresses.
- CRUD Operations: Enables users to create, read, update, and delete blog posts.

## Technologies Used

- Node.js, Express.js, PostgreSQL, Sequelize, JWT, Bcrypt, Nodemailer, and more.


## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install`
5. Run the application: `npm start`

## Database Setup

Ensure you have PostgreSQL installed and running on your machine. Create a new database for the application and update the `.env` file with the appropriate database connection details.

Run the following command to run the migrations and seeders:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
