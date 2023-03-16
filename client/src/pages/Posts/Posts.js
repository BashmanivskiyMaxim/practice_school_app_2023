import React, { useState, useEffect, useContext } from "react";
import Post from "../../components/Post/Post";
import { useQuery, gql } from "@apollo/client";
import { Button } from "react-bootstrap";
import LikesButton from "../../components/Post/Like.js";
import { client } from "../..";

const GET_POSTS = gql`
  query GetPostsPag($skip: Int!, $take: Int!) {
    posts(paginate: { skip: $skip, take: $take }) {
      id
      title
      content
      createdAt
      user {
        id
        name
      }
    }
  }
`;

const GET_POSTS_COUNT = gql`
  query GetPostsCount {
    getPosts {
      value
    }
  }
`;

export default function Posts() {
  const [skip, setSkip] = useState(1);
  let authToken = localStorage.getItem("token");




  const {
    // eslint-disable-next-line no-unused-vars
    error: err,
    // eslint-disable-next-line no-unused-vars
    loading: load,
    data: CountofPosts,
  } = useQuery(GET_POSTS_COUNT);
  const { error, loading, data } = useQuery(GET_POSTS, {
    variables: {
      skip: 8 * (skip - 1),
      take: 8,
    },
  });


  if (error) return <div>Error Page</div>;

  if (loading) return <div>Spinner...</div>;

  const { posts } = data;

  const disNext = Math.round(CountofPosts.getPosts.value / 8);
  return (
    <div style={{ paddingTop: "100px" }}>
      <div style={{ width: "100px" }}></div>

      <h3 style={{ color: "white" }}>
        Постів на сайті: {CountofPosts.getPosts.value}
      </h3>
      {posts.map((post) => {
        const props = {
          postId: post.id,
          skip: skip,
        };
        return (
          <Post
            key={post.id}
            title={post.title}
            content={post.content}
            date={post.createdAt}
            id={post.id}
            user={post.user}
            likebutton={authToken && <LikesButton {...props} />}
          />
        );
      })}
      <Button
        style={{ "border-radius": "100%", marginRight: "10px" }}
        disabled={skip === 1}
        onClick={() => setSkip((prev) => prev - 1)}
      >
        &#129044;
      </Button>
      <Button
        style={{ "border-radius": "100%", marginRight: "10px" }}
        disabled={skip === disNext + 1}
        onClick={() => setSkip((prev) => prev + 1)}
      >
        &#129046;
      </Button>
    </div>
  );
}
