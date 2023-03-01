import { gql } from "@apollo/client";

export const SIGNIN = gql`
mutation Signin($email: String!, $password: String!) {
  signin(credentials: { email: $email, password: $password }) {
    userErrors {
      message
    }
    token
    userId
  }
}
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($postId: ID!, $title: String!, $content: String!) {
    postUpdate(postId: $postId, post: { title: $title, content: $content }) {
      userErrors {
        message
      }
      post {
        title
        createdAt
        content
        user {
          name
        }
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $name: String!
    $bio: String!
  ) {
    signup(
      credentials: { email: $email, password: $password }
      name: $name
      bio: $bio
    ) {
      userErrors {
        message
      }
      token
      userId
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    postCreate(post: { title: $title, content: $content }) {
      userErrors {
        message
      }
      post {
        title
        createdAt
        content
        user {
          name
        }
      }
    }
  }
`;

export const PUBLISH_POST = gql`
  mutation postPublish($postId: ID!) {
    postPublish(postId: $postId) {
      post {
        title
      }
    }
  }
`;

export const UNPUBLISH_POST = gql`
  mutation postUnPublish($postId: ID!) {
    postUnPublish(postId: $postId) {
      post {
        title
      }
    }
  }
`;
