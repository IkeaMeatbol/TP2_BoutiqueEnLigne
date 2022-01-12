import { React, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import Container from "react-bootstrap/Container";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { UtiliseAuth } from "../Context/Auth"

function BarreDeNavigation()
{
    return (
        <Navbar bg="light">
            <Container>
                <NavbarToggle aria-controls="basic-navbar-nav"/>
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav style={{ width: "100%" }}>
                        <Nav.Link href="/">Accueil</Nav.Link>
                        <Nav.Link href="/Produits">Produits</Nav.Link>
                        <Nav.Link href="/Admin">Page Admin</Nav.Link>
                    </Nav>
                    
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Nav.Link href="/LogIn">Connection</Nav.Link>
                        <Nav.Link href="/SignUp" className="border-left pl-2 ml-auto">Inscription</Nav.Link>
                    </Nav>
                </NavbarCollapse> 
            </Container>
        </Navbar>
    )
};

export default BarreDeNavigation;