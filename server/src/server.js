import express from 'express';
import cors from 'cors';

import config from './config/config.js';
import globalErrorHandler from './middleware/errors/globalErrorHandler.js';
import rootRouter from './api/routes/index.js';
import ConnectDB from './db/dbConnect.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());


ConnectDB();

app.use('/api', rootRouter);

app.use(globalErrorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
