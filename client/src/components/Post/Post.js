import React from "react";
import "./Post.css";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { PUBLISH_POST } from "../../Mutations/Mutations";
import { UNPUBLISH_POST } from "../../Mutations/Mutations";
import { GET_PROFILE } from "../../Queries/Queries";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import AddPostModal from "../../components/AddPostModal/AddPostModal";

const DELETE_POST = gql`
  mutation postdelete($postId: ID!) {
    postDelete(postId: $postId) {
      post {
        title
      }
    }
  }
`;


export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
  likebutton,
}) {
  // eslint-disable-next-line no-unused-vars
  const [deletePost, { data: deletedata, loading: deleteloading }] =
    useMutation(DELETE_POST, {
      refetchQueries: () => [
        {
          query: GET_PROFILE,
          variables: {
            userId: user.id,
          },
        },
      ],
    });

  // eslint-disable-next-line no-unused-vars
  const [postPublish, { data, loading }] = useMutation(PUBLISH_POST, {
    refetchQueries: () => [
      {
        query: GET_PROFILE,
        variables: {
          userId: user.id,
        },
      },
    ],
  });
  // eslint-disable-next-line no-unused-vars
  const [postUnPublish, { data: unpublishData, loading: unpublishLoading }] =
    useMutation(UNPUBLISH_POST, {
      refetchQueries: () => [
        {
          query: GET_PROFILE,
          variables: {
            userId: user.id,
          },
        },
      ],
    });

  let postid = {
    id,
    titleButt: <b>&#11118;</b>,
    titleUp: "Редагувати пост",
    agreeButt: "Оновити",
    create: false,
  };
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timezone: "UTC",
  };
  

  const history = useNavigate();
  const formatedDate = new Date(Number(date)).toLocaleString("ru", options);


  return (
    <Col style={{ paddingBottom: "20px" }}>
      <Card style={published === false ? { backgroundColor: "burlywood" } : {}}>
        <Card.Header>
          {`${formatedDate}`.split(" ").splice(0, 3).join(" ")}{" "}
          <a onClick={() => history("/profile" + "/" + user.id)}>{user.name}</a>
          {isMyProfile === true && published === false && (
            <ul className="wrapper">
              <li className="icon success">
                <span className="tooltip">Опублікувати</span>
                <span>
                  <i
                    onClick={() => {
                      postPublish({
                        variables: {
                          postId: id,
                        },
                      });
                    }}
                    className="fa-thin fa-arrow-up"
                  >
                    &#10003;
                  </i>
                </span>
              </li>
            </ul>
          )}
          {isMyProfile === true && published === true && (
            <ul className="wrapper">
              <li className="icon danger">
                <span className="tooltip">Приховати</span>
                <span>
                  <i
                    onClick={() => {
                      postUnPublish({
                        variables: {
                          postId: id,
                        },
                      });
                    }}
                    className="fa-thin fa-arrow-up"
                  >
                    &#10007;
                  </i>
                </span>
              </li>
            </ul>
          )}
        </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {likebutton}
          {isMyProfile === true && (
            <div>
              <Button
                style={{ marginRight: "10px" }}
                variant="danger"
                onClick={() => {
                  deletePost({
                    variables: {
                      postId: id,
                    },
                  });
                }}
              >
                &#10006;
              </Button>
              <AddPostModal {...postid} />
            </div>
          )}
        </Card.Footer>
      </Card>
    </Col>
  );
}
