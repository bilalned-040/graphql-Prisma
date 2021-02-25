
const Query = {
    users: (parent,args,{prisma}) => prisma.user.findMany(),
    posts: (parent,args,{prisma}) => prisma.post.findMany(),
    comments: (parent,args,{prisma}) => prisma.comment.findMany(),
    findPost: async (_, {authorId}, {prisma}) => {
      return prisma.post.findMany({
        where: {
          authorId,
        },
      });
    },
    findUser: async (_, data, {prisma}) => {
        return prisma.user.findUnique({
          where: {
            email: data.email,
          },
        })
      },
      findComments: async (_, data, {prisma}) => {
        return prisma.comment.findMany({
          where: {
            postId: data.postId
          },
        })
      }
}

module.exports = Query;
