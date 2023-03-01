import { userLoader } from "../loaders/userLoader"

interface PostParentType{
   authorId: number
}

export const Post = {
   user: (parent: PostParentType, __: any) => {
      return userLoader.load(parent.authorId)
      
      /*return prisma.user.findUnique({
         where: {
            id: parent.authorId
         }
      })*/
   },

}