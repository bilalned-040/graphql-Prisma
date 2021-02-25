const Post = {
    async author(parent,_,{prisma}) {
        return prisma.user.findUnique({
          where: {
            id: parent.authorId
          }
        });
      },
      async comments(parent,_,{prisma}) {
        return prisma.comment.findMany({
          where: {
            postId: parent.id
          }
        })
      }
}

module.exports = Post;
