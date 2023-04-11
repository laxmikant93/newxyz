import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import nconf from 'nconf';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import setEnvironment from './env';
setEnvironment();
const PORT = 6379;

require('./services/cache');

const app: Application = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: nconf.get("cookieKey")
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/////////////// IMPORTED ROUTES
require('./routes/blogRoutes')(app);

mongoose.connect(nconf.get('db'),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    // useMongoClient: true
  } as ConnectOptions,
  () => {
    console.log(console.log("Connected to database"));
  }
);
// mongoose.set('strictQuery', false);

const server = app.listen(PORT, () => {
  console.log(`Auth service started on port ${PORT}`);
});
server.timeout = 1000000;
