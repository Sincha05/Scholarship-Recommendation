const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
const userRoutes = require('./routes/userRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

app.use(cors({
  origin: "http://localhost:5173", // Allow only your frontend's URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
}));

app.use('/api/users', userRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/recommendations', recommendationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
