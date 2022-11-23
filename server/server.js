// Packages
const express = require('express');
const cors = require('cors');

// Express
const app = express();
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// API routes
const searchRoute = require('./routes/search');
app.use('/search', searchRoute);


// Run server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))