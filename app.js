const express = require('express');
const bodyParser = require('body-parser');
const graphQLHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

const app = express();

const events = [];

app.use(bodyParser.json());
app.use(
  '/graphql',
  graphQLHTTP({
    graphiql: true,
    schema: buildSchema(`

        type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        type RootQuery { 
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput) : Event
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then(result => {
            return result.map(event => {
              return { ...event._doc, _id: event.id };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date)
        });

        return event
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc, _id: event.id };
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
        return event;
      }
    }
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
