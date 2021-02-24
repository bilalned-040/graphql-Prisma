const {
  PrismaClient
} = require('@prisma/client')
const prisma = new PrismaClient();

const express = require('express');
const {
  ApolloServer,
  gql
} = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql `
  type Query {
    users:[User!]!
    posts:[Post!]!
    comments:[Comment!]!
    findPost(authorId:Int!):[Post!]
    findUser(email:String!):User
    findComments(postId:Int!):[Comment!]
  }
  type Mutation {
  createUser(name:String!,email:String!,age:Int): User!
  createPost(title:String!,body:String!,published:Boolean!,authorId:Int!): Post!
  createComment(text:String!,userId:Int!,postId:Int!):Comment!
  deleteUser(id:Int!): String!
  }
  type User{
    id:ID!
    name:String!
    email:String!
    age:Int
    posts:[Post!]!
    comments:[Comment!]!
}
type Post{
    id:ID!
    title:String!
    body:String!
    published:Boolean!
    authorId:Int!
    author: User!
    comments: [Comment!]!
}
type Comment {
    id: ID!
    text: String!
    userId:Int!
    postId: Int!
    user:User!
    post:Post!
}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    posts: () => prisma.post.findMany(),
    comments: () => prisma.comment.findMany(),
    findPost: async (_, {
      authorId
    }, context) => {
      return prisma.post.findMany({
        where: {
          authorId,
        },
      });
    },
    findUser: async (_, data, context) => {
      return prisma.user.findUnique({
        where: {
          email: data.email,
        },
      })
    },
    findComments: async (_, data, context) => {
      return prisma.comment.findMany({
        where: {
          postId: data.postId
        },
      })
    },
  },
  Mutation: {
    createUser: async (_, data, context) => {
      const user = await prisma.user.create({
        data
      })
      return user;
    },
    createPost: async (_, data, context) => {
      const post = await prisma.post.create({
        data
      })
      return post
    },
    createComment: async (_, data, context) => {
      const comment = await prisma.comment.create({
        data
      })
      return comment
    },
    deleteUser: async (_, {
      id
    }, context) => {
      await prisma.comment.deleteMany({
        where: { userId: id }
      })
      await prisma.user.update({
        where: {
          id
        },
        data: {
          posts: {
            deleteMany: {
              authorId: id,
            },
          },
        }
      });
      await prisma.user.delete({
        where: {
          id
        }
      })
      return "User deleted successfully..."
    }
  },
  Post: {
    async author(parent) {
      return prisma.user.findUnique({
        where: {
          id: parent.authorId
        }
      });
    },
    async comments(parent) {
      return prisma.comment.findMany({
        where: {
          postId: parent.id
        }
      })
    }
  },
  User: {
    async posts(parent) {
      return prisma.post.findMany({
        where: {
          authorId: parent.id
        }
      })
    },
    async comments(parent) {
      return prisma.comment.findMany({
        where: {
          userId: parent.id
        }
      })
    }
  },
  Comment: {
    async user(parent) {
      return prisma.user.findUnique({
        where: {
          id: parent.userId
        }
      });
    },
    async post(parent) {
      return prisma.post.findUnique({
        where: {
          id: parent.postId
        }
      });
    }
  }

};

const server = new ApolloServer({
  typeDefs,
  resolvers
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