import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import quizRoutes from './routes/quizRoutes.js';
import scoreRoutes from './routes/scoreRoutes.js';

dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', quizRoutes);
app.use('/api', scoreRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5001, () => console.log("Quiz Service running on port 5001"));
    })
    .catch(err => console.error("MongoDB connection error:", err));
