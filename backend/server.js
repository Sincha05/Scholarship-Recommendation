const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
const userRoutes = require('./routes/userRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const preferenceRoutes = require('./routes/preferenceRoutes');


app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // 👈 This is crucial
}));

app.use('/api/users', userRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/preferences', preferenceRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
