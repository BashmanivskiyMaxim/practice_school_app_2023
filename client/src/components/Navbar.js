import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ReactComponent as User } from "./user.svg";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const history = useNavigate();
  const authToken = localStorage.getItem("token");

  const logOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <Navbar bg="light" variant="light" className={"py-4"} expand="lg">
      <Container>
        <NavLink
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "28px",
            fontFamily: "Courier New",
          }}
          to={""}
        >
          SCHOOL_SHELTER
        </NavLink>

        {authToken ? (

         <div>
            <NavLink
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "28px",
            fontFamily: "Courier New",
            marginRight: "5px"
          }}
          to={""}
        ><User/></NavLink>
            <NavLink
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "28px",
            fontFamily: "Courier New",
          }}
          to={""}
        >Вийти</NavLink>
         </div>
      
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => history("/signin")}
            >
              Увійти
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
