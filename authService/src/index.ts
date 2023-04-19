import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import nconf from 'nconf';

import setEnvironment from './env';
setEnvironment();

//////////// IMPORTED MODELS
// require('./models/User');

const app: Application = express();

app.use(express.json());
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
require('./routes/authRoutes')(app);
require('./routes/tokenRoutes')(app);

mongoose.connect(nconf.get('db'),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    // useMongoClient: true
  } as ConnectOptions,
  () => {
    console.log("Connected to database");
  }
);
mongoose.set('strictQuery', false);

const server = app.listen(nconf.get('PORT'), () => {
  console.log(`Auth service started on port ${nconf.get('PORT')}`);
});
server.timeout = 1000000;
