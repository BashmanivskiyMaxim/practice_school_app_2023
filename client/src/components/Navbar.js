import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { ReactComponent as User } from "./user.svg";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { client } from "..";

const NavBar = () => {
  const history = useNavigate();
  const authToken = localStorage.getItem("token");
  

  const logOut = () => {
    localStorage.removeItem("token");
    client.refetchQueries()
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
          to={"/"}
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
                marginRight: "5px",
              }}
              to={"/profile" + "/" + localStorage.getItem("UserId")}
            >
              <User />
            </NavLink>
            <NavLink
              onClick={() => logOut()}
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "28px",
                fontFamily: "Courier New",
              }}
              to={"/"}
            >
              Вийти
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "28px",
                fontFamily: "Courier New",
              }}
              to={"/signin"}
            >
              Увійти
            </NavLink>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
