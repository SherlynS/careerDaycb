import React from "react";
import "./Navigation.css"
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


function Navigation(props) {

    return (
    
      <Navbar className="color-nav" expand="md">
        
        <Container>
       
          <Navbar.Brand href="/" className="navbarcolor">CareerDay</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" ms-auto ">
  
            <NavLink className="nav-link navbarcolor" to="/careers">
             Occupation
              </NavLink>
              
              <NavLink className="nav-link navbarcolor" to="/Quiz">
             Quiz
              </NavLink>
  
               <NavLink className="nav-link navbarcolor" to="/Roadmap">
             Roadmap
              </NavLink>
  
            {/*
              <NavLink className="nav-link navbarcolor" to="/">
               Resources
              </NavLink>
              <NavLink className="nav-link navbarcolor" to="/log-in">
                Login
              </NavLink>
              <NavLink className="nav-link navbarcolorlast" to="/sign-up">
                Signup
              </NavLink> */}
            </Nav>
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
  
     
      
    );
  }

export default Navigation;