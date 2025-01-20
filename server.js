import express from 'express';
import { postsRoutes } from './routes/postsRoutes.js';
import { usersRoutes } from './routes/usersRoutes.js';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import specs from './swagger/swagger.js';


const app = express();
app.use(express.json());

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

mongoose.connect(process.env.MONGO_URL, { dbName: 'demo_db'})
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(process.env.PORT, 'localhost', () => console.log('Server is running on http://localhost:4000'));
    })
    .catch(err => console.log(err));

