import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());
if (app.get('env') === 'development') {
  app.use(morgan('combined'));
}

app.get('/test', (req, res) => {
  res.status(200).json({
    message: 'Success',
    mode: app.get('env'),
  });
});
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
  });
  next();
});

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  try {
    console.log('Database connected!');
    console.log('Redis connected!');
    console.log(`Server is listening on port ${port}!`);
  } catch (error) {
    console.log(error);
  }
});
