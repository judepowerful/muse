const express = require('express');
const cors = require('cors');
const youtubeRoutes = require('./routes/youtube');
const app = express();
const port = 3001;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api', youtubeRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
