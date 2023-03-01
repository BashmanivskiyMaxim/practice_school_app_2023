import { Post, Prisma, User, LikesOnPosts} from "@prisma/client";
import { Context } from "../../index";
import { canUserMutatePost } from "../../utils/canUserMutatePost";


interface LikesOnPostsType {
   userErrors: {
     message: string;
   }[];
   likes: LikesOnPosts | Prisma.Prisma__LikesOnPostsClient<LikesOnPosts, never> | null;
 }

 export const likesresolvers = {
   postLike: async (
      _: any,
      { postId }: { postId: string;},
      { prisma, userInfo }: Context
    ): Promise<LikesOnPostsType> => {
      
      if (!userInfo) {
        return {
          userErrors: [
            {
              message: "Forbidden access(unauthenticate)!",
            },
          ],
          likes: null
        };
      }

      const existingPost = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });
  
      if (!existingPost) {
        return {
          userErrors: [
            {
              message: "Post does not exist!",
            },
          ],
          likes: null
        };
      }

      await prisma.likesOnPosts.create({
        data: {
          postId: Number(postId),
          userId: userInfo.userId,
        }
      })
  
      return {
        userErrors: [],
        likes: null
      };
    },
    postDeleteLike: async (
      _: any,
      { postId }: { postId: string;},
      { prisma, userInfo }: Context
    ): Promise<LikesOnPostsType> => {
      
      if (!userInfo) {
        return {
          userErrors: [
            {
              message: "Forbidden access(unauthenticate)!",
            },
          ],
          likes: null
        };
      }

      const existingPost = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });
  
      if (!existingPost) {
        return {
          userErrors: [
            {
              message: "Post does not exist!",
            },
          ],
          likes: null
        };
      }

      const existingLike = await prisma.likesOnPosts.findMany({
        where: {
          postId: Number(postId),
          userId: userInfo.userId,
        }
      })

      if (!existingLike) {
        return {
          userErrors: [
            {
              message: "Like on post does not exist!",
            },
          ],
          likes: null
        };
      }

      await prisma.likesOnPosts.deleteMany({
        where: {
          postId: Number(postId),
          userId: userInfo.userId,
        }
      })
  
      return {
        userErrors: [],
        likes: null
      };
    },
 }