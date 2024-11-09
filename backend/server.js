const express = require('express');
const cors = require('cors'); // Add this line

const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');  // Import user routes

const app = express();
app.use(cors()); // Allow all origins for now

app.use(bodyParser.json());
app.use('/api', userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

