import { authResolvers } from "./auth";
import { postResolvers } from "./post";
import { likesresolvers } from "./LikesOnPosts";

export const Mutation = {
  ...postResolvers,
  ...authResolvers,
  ...likesresolvers
}