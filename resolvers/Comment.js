const Comment = {
    async user(parent,_,{prisma}) {
        return prisma.user.findUnique({
          where: {
            id: parent.userId
          }
        });
      },
    async post(parent,_,{prisma}) {
        return prisma.post.findUnique({
            where: {
            id: parent.postId
            }
        });
    }
}

module.exports = Comment;
