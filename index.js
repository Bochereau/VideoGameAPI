// dependencies call
const express =require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();

// connection to db
const connectDB = require('./database/connection');
connectDB();


// ROUTES PATHS
const usersRoute = require('./route/userRoute');
const hardwareRoute = require('./route/hardwareRoute');
const videogameRoute = require('./route/videogameRoute');

// ROUTES
app.use("/user", usersRoute);
app.use("/hardware", hardwareRoute);
app.use("/videogame", videogameRoute);


// Listening to server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server start at http://localhost:${PORT}`));
