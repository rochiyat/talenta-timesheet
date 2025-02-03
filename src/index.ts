import express from 'express';
import config from './configs/env.config';
import router from './routes/index';

const app = express();
const port = config.port || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Service talenta timesheet is running successfully');
});

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
