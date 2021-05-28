const express = require('express');
const graphql = require('graphql');
const {ApolloServer} = require('apollo-server-express');
const app = express();
const port = 3000;

const chatMessages = [];

const typeDefs = `
    type Query {
        messages: [chatMessages!]!
    }
    type Mutation {
        addMessage(message: messages!): chatMessages!
    }
    type chatMessages {
        text: String!
        myMessage: Boolean
    }
    input messages {
        text: String!
        myMessage: Boolean
    }
`;

const resolvers = {
    Query: {
        messages: () => chatMessages
    },
    Mutation: {
        addMessage: (_, {message}) => {
            console.log(message);
            message.myMessage = true;
            chatMessages.push(message);
            return message;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.applyMiddleware({app: app, path: '/graphql'});

app.use('/', express.static('public'));

app.listen(port, () => console.log(`Server has been starting with port ${port}`));