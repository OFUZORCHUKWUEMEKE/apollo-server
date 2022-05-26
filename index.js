const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB } = require('./config.js');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req})
  });
mongoose.connect(MONGODB).then(()=>{
    return server.listen({port:7000}).then(()=>console.log(`mongo db connected`))
}).then((res)=>{
    console.log(`server running on server`)
})



// mongoose
//   .connect(MONGODB, { useNewUrlParser: true })
//   .then(() => {
//     console.log('MongoDB Connected');
//     return server.listen({ port: 5000 });
//   })
//   .then((res) => {
//     console.log(`Server running at ${res.url}`);
//   });