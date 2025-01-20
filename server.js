import express from 'express';
import { postsRoutes } from './routes/postsRoutes.js';
import { usersRoutes } from './routes/usersRoutes.js';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import specs from './swagger/swagger.js';

const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

// mongoose.connect("mongodb://localhost:27017", { dbName: 'demo_db'})

mongoose.connect(process.env.MONGO_URL, { dbName: 'demo_db'})
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(port, 'localhost', () => console.log(`Server is running on http://localhost:${port}`));
    })
    .catch(err => console.log(err));

