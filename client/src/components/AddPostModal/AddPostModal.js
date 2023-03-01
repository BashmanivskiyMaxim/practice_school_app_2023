import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router";
import { GET_PROFILE } from "../../Queries/Queries";
import { CREATE_POST } from "../../Mutations/Mutations";
import { gql } from "@apollo/client";
//import { UPDATE_POST } from "../../Mutations/Mutations";

const UPDATE_POST = gql`
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

export default function AddPostModal(create_update) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const { id } = useParams();

  // eslint-disable-next-line no-unused-vars
  const [addPost, { data, loading }] = useMutation(CREATE_POST, {
    refetchQueries:() => [{
        query: GET_PROFILE,
        variables: {
          userId: id 
        }
    }]
  });

  // eslint-disable-next-line no-unused-vars
  const [updatePost, { data: upData, loading: upLoading }] = useMutation(UPDATE_POST, {
    refetchQueries:() => [{
        query: GET_PROFILE,
        variables: {
          userId: id 
        }
    }]
  });


  console.log(create_update)
  const handleClick = () => {
    if(!content || !title) return
    if(create_update.create === true){
      addPost({
        variables: {
          title,
          content,
        },
      });
    } else {
      updatePost({
        variables: {
          title,
          content,
          postId: create_update.id
        }
      })
    }
    
    handleClose()
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {create_update.titleButt}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{create_update.titleUp}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="label-modal">Заголовок</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="label-modal">Вміст</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрити
          </Button>
          <Button variant="success" onClick={handleClick}>
            {create_update.agreeButt}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
