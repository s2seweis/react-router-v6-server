const express = require('express')
const app = express()
const port = process.env.PORT || 5000
// const dbConnection = require('./db')
app.use(express.json());
require("dotenv").config();
const dotenv = require("dotenv").config();

// ### Route for JWT Authentication
app.use('/api/users/', require('./routes/usersRoute'))


app.use('/api/settings/', require('./routes/settingsRoute'))


app.get('/', (req, res) => res.send('Hello World'))
app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))
