const express = require('express')
const PORT = 8080
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

//Import route
const authRoute = require('./routes/users.routes')
const postRoute = require('./routes/posts.routes')
const courseRoute = require('./routes/course.routes')

// Serve Static Assets(build folder) if in production:
if(process.env.NODE_ENV == "production") {
  // Set Static Folder:
  app.use(express.static("client/build"));
  // Get anything "*"
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Middlewares
app.use(cors())
app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/course', courseRoute)

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, () => console.log('DB connected!'))
//Listen to port
app.listen(`${PORT}`, () => console.log('It is working!'))

// const getUsers = require('./routes/getUser')
// const deleteUser = require('./routes/deleteUser')
// const updateUser = require('./routes/updateUser')
// app.use('/api/user', getUsers)
// app.use('/api/user', deleteUser)
// app.use('/api/user', updateUser)
