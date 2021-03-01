const {
  gql
} = require("apollo-server-express")

const typeDefs = gql `
  directive @auth on FIELD_DEFINITION

  type Query {
    users:[User!]! @auth
    posts:[Post!]!
    comments:[Comment!]!
    findPost:[Post!] @auth
    findUser(email:String!):User
    findComments(postId:Int!):[Comment!]
  }
  type Mutation {
  signup(email:String!,password:String!,name:String!,age:Int): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  createPost(title:String!,body:String!,published:Boolean!): Post! @auth
  # signIn(email: String!, password: String!): AuthPayload!
  createComment(text:String!,postId:Int!):Comment! @auth
  deleteUser(id:Int!): String! @auth
  deletePost(id:Int!): String! @auth
  deleteComment(id:Int!): String! @auth
  updateUser(id:Int!,name:String,email:String,age:Int): User! @auth
  updatePost(id:Int!,title:String,body:String,published:Boolean): Post! @auth
  updateComment(id:Int!,text:String): Comment! @auth
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