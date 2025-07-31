import express from 'express';
import config from './configs/env.config';
import router from './routes/index';
import { setupSwagger } from './swagger';
import cors from 'cors';

const app = express();
const port = config.port || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello, Service talenta timesheet is running successfully');
});

app.use('/api/v1', router);
setupSwagger(app);

app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
  console.info(`Swagger is running on http://localhost:${port}/swagger`);
});
