# Server README

## Technologies Used

### 1. Node.js
   - Node.js is utilized as the server-side runtime environment for this project.

### 2. MongoDB
   - MongoDB serves as the chosen database for data storage and retrieval.

### 3. Express
   - Express.js is employed as the server framework to facilitate the development of robust and scalable APIs.

### 4. Bcrypt - Password Hashing Function
   - Bcrypt is used as a password hashing function to securely store and manage user passwords.

### 5. JSON WebToken (JWT)
   - JSON WebToken is employed for securely transmitting information between parties as a JSON object, facilitating secure authentication and authorization.

### 6. Nodemailer
   - Nodemailer is integrated to simplify the process of sending emails from the server, providing easy and efficient communication capabilities.

### 7. Moment Package
   - The Moment package is included for effective date and time manipulation within the server, enhancing the handling of temporal data.

---

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Server**
   ```bash
   npm start
   ```

3. **Environment Configuration**
   - Ensure that you have the required environment variables set up for MongoDB connection, JWT secret, and any other relevant configurations.

4. **Documentation**
   - Refer to the documentation directory for detailed information on server functionalities, API endpoints, and configuration options.

---

## Adding new Routes:

- http://localhost:5000/api/users/requestResetPassword


{
"email":"weissenborn24seb@gmail.com"
}

- result:

{
  "link": "localhost:/8090/passwordReset?token=9431145a68d5f41628f00010b7ec2e2abdca43e2eadf83df7c730eec6e66020a&id=64d49a1b9b1d87292090cb2c"
} -->


- http://localhost:5000/api/users/resetPassword

{
  "userId": "64d49a1b9b1d87292090cb2c",
  "token":"9431145a68d5f41628f00010b7ec2e2abdca43e2eadf83df7c730eec6e66020a",
  "password": "law123"
} 

- result:

{
  "message": "Password reset was successful"
} 

For any issues or inquiries related to the server, please contact [server maintainer's email].

Happy coding! 🚀

https://www.youtube.com/watch?v=7kHqE2xh-xQ