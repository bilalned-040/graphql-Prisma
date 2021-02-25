const User = {
    async posts(parent,_,{prisma}) {
        return prisma.post.findMany({
          where: {
            authorId: parent.id
          }
        })
      },
    async comments(parent,_,{prisma}) {
        return prisma.comment.findMany({
            where: {
                userId: parent.id
            }
        })
    } 
}

module.exports = User;
