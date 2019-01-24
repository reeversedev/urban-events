const express = require('express');
const bodyParser = require('body-parser');
const graphQLHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./graphql/schema/index');
const rootValue = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphQLHTTP({
    graphiql: true,
    schema: schema,
    rootValue: rootValue
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-2ajo4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() =>
    app.listen(3000, () => {
      console.log('Server is listening');
    })
  )
  .catch(err => console.log(err));
