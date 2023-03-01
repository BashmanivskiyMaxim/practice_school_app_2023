import { Context } from "..";

interface PaginationType {
  paginate: {
    take: number;
    skip: number;
  };
}

export const Query = {
  me: (_: any, __: any, { userInfo, prisma }: Context) => {
    if (!userInfo) return null;
    return prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  profile: async (
    _: any,
    { userId }: { userId: string },
    { prisma, userInfo }: Context
  ) => {
    const isMyProfile = Number(userId) === userInfo?.userId;

    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(userId),
      },
    });

    if (!profile) return null;

    return {
      ...profile,
      isMyProfile,
    };
  },
  posts: (_: any, { paginate }: PaginationType, { prisma }: Context) => {
    return prisma.post.findMany({
      take: paginate.take,
      skip: paginate.skip,
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
  post: (_: any, __: any, { prisma }: Context) => {
    return prisma.post.aggregate({
      _count: {
        published: true,
      },
    });
  },
  getPosts: async (_: any, __: any, { prisma }: Context) => {
    const count = await prisma.post.findMany({
      where: {
        published: true,
      },
    });
    return {
      value: count.length,
    };
  },
  getPostsLikes: async (_: any, {id}: {id: string}, {prisma}: Context) => {
    const count = await prisma.likesOnPosts.findMany({
      where: {
        postId: Number(id)
      }
    })
    return {
      value: count.length
    }
  },
  getUserLikes: async (_: any, {postId, userId}: {userId: string, postId: string}, {prisma}: Context) => {
    const count = await prisma.likesOnPosts.findMany({
      where: {
        postId: Number(postId),
        userId: Number(userId)
      }
    })
    if(count.length){
      return {
        IsValue: true
      }
    } else return {
      IsValue: false
    }
  },
  /* checkIsAuth: async (_: any, {JWT}: {JWT: string}, {prisma}: Context) => {
    
  }, */
};
