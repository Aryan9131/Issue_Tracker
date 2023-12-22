# Issue Tracker Project
   # Overview
The Issue Tracker project is a user-friendly solution for efficient software issue management. This project enhances team communication, transparency, and productivity, making it an essential tool for software development, IT, and collaborative projects.
This Issue Tracker project is designed to facilitate efficient project management and issue tracking within a collaborative environment. Users can register, sign in, create projects, manage issues, and track their progress. The system allows users to seamlessly organize their tasks, enhancing productivity and collaboration among team members.

   # Features
User Authentication:
Sign Up: Users can create accounts with a secure authentication process.
Sign In/Out: Registered users can log in and log out securely.

Project Management:
Create Project: Users can create new projects, providing essential details.
Edit Project: Project details can be updated, such as project name and description.
Delete Project: Users have the ability to remove unwanted projects.

Issue Tracking:
Create Issue: Users can create issues within their projects, specifying details.
Edit Issue: Modify existing issue details for accurate tracking.
Delete Issue: Remove unnecessary issues to maintain project clarity.

Dashboard:
Home Page: Displays user-created projects and their top issues.
Project View: Provides a detailed view of individual projects and their associated issues.

   # Technologies Used
Backend:
Express.js
MongoDB with Mongoose
Passport for authentication

Frontend:
EJS (Embedded JavaScript) for dynamic views

Middleware:
Morgan for logging
Node-sass-middleware for SCSS to CSS compilation

Session Management:
Express-session with MongoDB store for session management
Dependency Management:

NPM for package management
Getting Started
Clone the repository: git clone <repository_url>
Install dependencies: npm install
Set up your MongoDB database and update the connection details in ./config/environment.js
Run the application: npm start for development or npm run prod_start for production
Visit http://localhost:8000 in your browser to explore the application.

Contributing
Feel free to contribute by reporting issues, suggesting improvements, or creating pull requests. Let's make this Issue Tracker project even better together!

License
This project is licensed under the MIT License.







