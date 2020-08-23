import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../styles/NavBar.css";

export class NavBar extends Component {
  render() {
    return (
      <Container className="navigation">
        <div>
          <p>LOGO</p>
          <div id="items">
            <p>Destinations</p>
            <p>About</p>
            <p>Blog</p>
            <p>Contact</p>
          </div>
        </div>
      </Container>
    );
  }
}

export default NavBar;
