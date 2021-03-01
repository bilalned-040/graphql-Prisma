const {
  PrismaClient
} = require('@prisma/client')
const prisma = new PrismaClient();

const express = require('express');
const {
  ApolloServer,
  gql
} = require('apollo-server-express');

const typeDefs = require("./schema");
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Post = require('./resolvers/Post')
const Comment = require('./resolvers/Comment')
const schemaDirectives = require('./directives');




const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment
  },
  schemaDirectives,
  context: ({
    req,
    res
  }) => ({
    req,
    res,
    prisma
  })
});

const app = express();
server.applyMiddleware({
  app,
  path: '/graphql'
});

app.listen({
    port: 4000
  }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);















// #     createUser(name: String, email: String!): User!
// #     createPost(title:String!,body:String,published:Boolean!):Post
// #     deleteUser(id:Int!):String!
// #     updateUser(id:Int!,name:String,email:String):User!

//   async createUser(_, data, context) {
//     return prisma.user.create({
//       data
//     })
//   },
//   async createPost(_, data, context) {
//     return prisma.post.create({
//       data
//     })
//   },
//  deleteUser:async (_,{id,...args},context)=>{
//    const user = await prisma.user.delete({where:{id}})
//     return "deleted"
//  },
//  updateUser:async (_, {id,...data}, context)=>{
//   const user= await prisma.user.update({where:{id},data})
//   return user
//  }