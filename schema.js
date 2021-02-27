const {
  gql
} = require("apollo-server-express")

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
  signup(email:String!,password:String!,name:String!,age:Int): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  createPost(title:String!,body:String!,published:Boolean!): Post!
  # signIn(email: String!, password: String!): AuthPayload!
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
type AuthPayload {
  token: String!
  user: User!
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

// return the payload inside of signIn Mutation
// return {
//   token: jwt.sign({ userId }, secretOrPrivateKey || 'secret', { expiresIn: '1h' }),
//   user: await prisma.user.findUnique({ where: { id: userId }})
// }