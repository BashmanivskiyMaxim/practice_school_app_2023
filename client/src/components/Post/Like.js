import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button, Row, Col } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ReactComponent as Hand } from "./hand.svg";

const LIKE_POST = gql`
  mutation postlike($postId: ID!) {
    postLike(postId: $postId) {
      likes {
        post {
          title
        }
        user {
          name
        }
      }
    }
  }
`;

const LIKE_POST_DELETE = gql`
  mutation postDeleteLike($postId: ID!) {
    postDeleteLike(postId: $postId) {
      likes {
        post {
          content
        }
      }
    }
  }
`;

const GET_POSTS_LIKES = gql`
  query GetPostsLikes($id: ID!) {
    getPostsLikes(id: $id) {
      value
    }
  }
`;

const GET_USER_LIKES = gql`
  query GetUserLikes($userId: ID!, $postId: ID!) {
    getUserLikes(userId: $userId, postId: $postId) {
      IsValue
    }
  }
`;

export default function LikesButton(props) {
  const [clicked, setClicked] = useState(false);

  const {
    // eslint-disable-next-line no-unused-vars
    error: erruser,
    // eslint-disable-next-line no-unused-vars
    loading: loaduser,
    data: IsUserLike,
  } = useQuery(GET_USER_LIKES, {
    variables: {
      userId: Number(localStorage.getItem("UserId")),
      postId: props.postId,
    },
  });

  useEffect(() => {
    if (IsUserLike) {
      if (IsUserLike.getUserLikes.IsValue === true) {
        setClicked(true);
      } else setClicked(false);
    }
  }, [IsUserLike]);

  const {
    // eslint-disable-next-line no-unused-vars
    error: err,
    // eslint-disable-next-line no-unused-vars
    loading: load,
    data: CountofLikes,
  } = useQuery(GET_POSTS_LIKES, {
    variables: {
      id: props.postId,
    },
  });

  // eslint-disable-next-line no-unused-vars
  const [LikePost, { data: datalike, loading: likeloading }] = useMutation(
    LIKE_POST,
    {
      refetchQueries: () => [
        {
          query: GET_POSTS_LIKES,
          variables: {
            id: props.postId,
          },
        },
      ],
    }
  );

  // eslint-disable-next-line no-unused-vars
  const [LikePostDelete, { data: deletedata, loading: deleteloading }] =
    useMutation(LIKE_POST_DELETE, {
      refetchQueries: () => [
        {
          query: GET_POSTS_LIKES,
          variables: {
            id: props.postId,
          },
        },
      ],
    });

  function handleClick() {
    setClicked(!clicked);
    if (clicked === false) {
      LikePost({
        variables: {
          postId: Number(props.postId),
        },
      });
    } else if (clicked === true) {
      LikePostDelete({
        variables: {
          postId: Number(props.postId),
        },
      });
    }
  }

  return (
    <div>
      <Button
        variant={`${clicked ? "info" : "light"}`}
        onClick={() => {
          handleClick();
        }}
      >
        <div className="like-button">
          <Hand style={{marginBottom: "10px"}}/>
          {!CountofLikes && <b>load...</b>}
          {CountofLikes && (
        <b style={{ fontFamily: "Courier New", marginLeft: "10px", fontSize: "20px", marginTop: "20px"}}>
          {CountofLikes.getPostsLikes.value}
        </b>
      )}
        </div>
      </Button>
    </div>
  );
}
