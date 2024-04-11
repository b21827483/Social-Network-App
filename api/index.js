import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from "./routes/users.js";
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import likeRoutes from './routes/likes.js';
import imageUploadRoutes from './routes/image-uploads.js';

const app = express();

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'public/assets')));

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173"}));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/image-uploads', imageUploadRoutes);

app.listen(8800, () => {
    console.log('working')
})