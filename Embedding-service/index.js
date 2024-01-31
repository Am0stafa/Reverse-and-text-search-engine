import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
// import Images from './routes/images';
import SearchRoute from './routes/search.js';
import UploadRoute from './routes/upload.js';
import weaviate from 'weaviate-ts-client';
import bodyParser from 'body-parser';

const app = express();

// Increase the payload limit for JSON data
app.use(bodyParser.json({ limit: '50mb' }));

// Increase the payload limit for URL-encoded data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));

// Routes
// app.use('/api', Images);
app.use('/api', SearchRoute);
app.use('/api', UploadRoute);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
