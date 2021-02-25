const Mutation = {
    createUser: async (_, data, {prisma}) => {
        const user = await prisma.user.create({
          data
        })
        return user;
      },
      createPost: async (_, data, {prisma}) => {
        const post = await prisma.post.create({
          data
        })
        return post
      },
      createComment: async (_, data, {prisma}) => {
        const comment = await prisma.comment.create({
          data
        })
        return comment
      },
      deleteUser: async (_, {id}, {prisma}) => {
        const posts = await prisma.post.findMany({
          where: {
            authorId: id
          }
        });
        const deleteComments = posts.map(({
          id: abc
        }) => {
          return prisma.comment.deleteMany({
            where: {
              postId:abc
            }
          })
        })
        const deleteUserComments = prisma.comment.deleteMany({
          where: {
            userId: id
          }
        });
        const deletePosts = prisma.post.deleteMany({
          where: {
            authorId: id
          }
        });
        const deleteUser = prisma.user.delete({
          where: {
            id
          }
        });
        // console.log(...deleteComments, deletePosts, deleteUser)
        const transaction = await prisma.$transaction([...deleteComments, deleteUserComments, deletePosts, deleteUser]);
        // console.log(transaction);
        return "User deleted successfully..."
      },
      deletePost: async (_, {id}, {prisma}) => {
        const deleteComments = prisma.comment.deleteMany({
          where: {
            postId: id
          }
        });
        const deletePost = prisma.post.delete({
          where: {
            id
          }
        });
        const transaction = await prisma.$transaction([deleteComments, deletePost]);
        return "Post deleted successfully..."
      },
      deleteComment: async (_, {id}, {prisma}) => {
        const deleteComment = await prisma.comment.delete({
          where: {
            id
          }
        });
        return "Comment deleted successfully..."
      },
      updateUser: async (_,data, {prisma}) => {
        const updatedUser= await prisma.user.update({
          where:{
            id:data.id
          },
          data
          })
        return updatedUser
      },
      updatePost: async (_,data, {prisma}) => {
        const updatedPost= await prisma.post.update({
          where:{
            id:data.id
          },
          data
          })
        return updatedPost
      },
      updateComment: async (_,data, {prisma}) => {
        const updatedComment= await prisma.comment.update({
          where:{
            id:data.id
          },
          data
          })
        return updatedComment
      }
}

module.exports = Mutation;
