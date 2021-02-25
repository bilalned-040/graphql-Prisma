const {gql} = require("apollo-server-express")

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
  deletePost(id:Int!): String!
  deleteComment(id:Int!): String!
  updateUser(id:Int!,name:String,email:String,age:Int): User!
  updatePost(id:Int!,title:String,body:String,published:Boolean): Post!
  updateComment(id:Int!,text:String): Comment!
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

module.exports = typeDefs;
