import { gql } from "@apollo/client";


export const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        name
        createdAt
        email
        id
        posts {
          id
          title
          content
          createdAt
          published
        }
      }
    }
  }
`;