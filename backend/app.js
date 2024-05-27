const express = require('express');
const cors = require('cors');
const youtubeRoutes = require('./routes/youtube');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api', youtubeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});