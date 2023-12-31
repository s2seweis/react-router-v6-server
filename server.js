const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require('./db')

app.use(express.json());
require('dotenv').config();

// Use cors middleware to enable CORS for all routes
app.use(cors());

// ### Route for JWT Authentication
app.use('/api/users/', require('./routes/usersRoute'));

app.use('/api/settings/', require('./routes/settingsRoute'));

app.get('/', (req, res) => res.send('Hello World'));

app.get('/greeting', (req, res) => {
    res.json({ greeting: 'Hello, you are sure?'})
})

app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));
