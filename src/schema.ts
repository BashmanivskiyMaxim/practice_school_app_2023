import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    posts(paginate: PostsinputPaginate!): [Post!]!
    me: User!
    profile(userId: ID!): Profile!
    users: User!
    post: Post!
    getPosts: AggregationType!
    getPostsLikes(id: ID!): AggregationType!
    getUserLikes(userId: ID!, postId: ID!): BooleanType!
  }


  type Mutation {
    postCreate(post: Postinput!): PostPayload!
    postUpdate(postId: ID!, post: Postinput!): PostPayload!
    postDelete(postId: ID!): PostPayload!
    postPublish(postId: ID!): PostPayload!
    postUnPublish(postId: ID!): PostPayload!
    postLike(postId: ID!): LikesPayload!
    postDeleteLike(postId: ID!): LikesPayload!
    signup(
      credentials: CredentialsInput!
      name: String!
      bio: String!
    ): AuthPayload
    signin(credentials: CredentialsInput!): AuthPayload!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User!
    userlikes: [LikesOnPosts!]!
  }

  type LikesOnPosts {
    post: [Post!]!     
    user: [User!]!
    assignedAt: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    createdAt: String!
    postlikes: [LikesOnPosts!]!    
  }

  type AggregationType{
    value: Int!
  }

  type BooleanType{
    IsValue: Boolean!
  }


  type Profile {
    id: ID!
    bio: String!
    user: User!
    isMyProfile: Boolean!
  }

  type UserError {
    message: String!
  }

  type LikesPayload {
    userErrors: [UserError!]!
    likes: LikesOnPosts
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
    userId: Int
  }

  input Postinput {
    title: String
    content: String
  }

  input PostsinputPaginate {
    skip: Int!
    take: Int!
  }

  input CredentialsInput {
    email: String!
    password: String!
  }
`;
