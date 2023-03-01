import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";
import Card from "react-bootstrap/Card";
import profileImg from "../../img/profile1.png";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { GET_PROFILE } from "../../Queries/Queries";


export default function Profile() {
  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: {
      userId: id,
    },
  });

  if (error) return <div>error page</div>;

  if (loading) return <div>Spinner...</div>;

  const { profile } = data;
  
  let postid = {
    titleButt: "Додати пост",
    titleUp: "Додати пост",
    agreeButt: "Додати",
    create: true
  }

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timezone: "UTC",
  };
  const formatedDate = new Date(Number(profile.user.createdAt)).toLocaleString("ru", options);

  return (
    <div>
      <div
        style={{
          left: "0px",
          paddingTop: "100px",
          marginBottom: "2rem",
          display: "block",
          justifyContent: "space-between",
        }}
      >
        <Container>
          <Row md={2}>
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src={profileImg} />
                <Card.Body>
                  <Card.Title>{profile.user.name}</Card.Title>
                  <Card.Text>{profile.bio}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Реєстрація:{" "}
                    {`${formatedDate}`.split(" ").splice(0, 3).join(" ")}
                  </small>
                  <div>{profile.isMyProfile ? <AddPostModal {...postid}/> : null}</div>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={8}>
              <Row xs={2} md={2} className="g-4">
                {
                !profile.user.posts.length ? (<h4 className="text-left" style={{"color": "white"}}>Користувач не має постів &#129296;</h4>): (profile.user.posts.map((post) => {

                  return (
                    <Post
                      key={post.id}
                      title={post.title}
                      content={post.content}
                      date={post.createdAt}
                      user={profile.user}
                      published={post.published}
                      isMyProfile={profile.isMyProfile}
                      id={post.id}
                    />
                  );
                }))
                
                
                
              }
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
