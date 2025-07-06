const express = require('express');
const aiRoutes = require('./routes/ai.routes'); // Importing AI routes
const app = express();
const cors = require('cors'); 
app.use(cors()); 
app.use(express.json()); // Middleware to parse JSON bodies



app.use('/ai', aiRoutes); // Using the AI routes under the '/ai' path

module.exports = app;