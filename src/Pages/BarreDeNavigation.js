import { React, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import Container from "react-bootstrap/Container";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Link, useNavigate} from "react-router-dom";
import { UtiliseAuth } from "../Context/Auth";

function BarreDeNavigation()
{
    const navigate = useNavigate();
    const { authentification, setAuthentification } = UtiliseAuth()

    function ConnectionLink()
    {
        function LogOut(){
            setAuthentification();
            navigate('/');
        }

        if (authentification !== undefined) {
            return (
                <Nav className="justify-content-end" style={{ width: "100%" }}>
                    <button style={{ background: 0, border:0 }} onClick={() => LogOut()}>Deconnection</button>
                </Nav>
            );
        } else {
            return (
                <Nav className="justify-content-end" style={{ width: "100%" }}>
                    <button style={{ background: 0, border:0 }} onClick={() => navigate('/LogIn')}>Connection</button>
                    <button style={{ background: 0, border:0 }} onClick={() => navigate('/SignUp')}>Inscription</button>
                </Nav>
            );
        }
    }

    function PageAdmin() {
        if (authentification === "admin") {
            return (
                <button style={{ background: 0, border:0 }} onClick={() => navigate('/Admin')}>Page Admin</button>
            )
        } else {
            return (
                <>
                    
                </>
            )
        }
    }

    return (
        <Navbar bg="light">
            <Container>
                <NavbarToggle aria-controls="basic-navbar-nav"/>
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav style={{ width: "100%" }}>
                        <button style={{ background: 0, border:0 }} onClick={() => navigate('/')}>Accueil</button>
                        <button style={{ background: 0, border:0 }} onClick={() => navigate('/Produits')}>Produits</button>
                        <PageAdmin />
                    </Nav>
                    
                    <ConnectionLink />

                </NavbarCollapse> 
            </Container>
        </Navbar>
    )
};

export default BarreDeNavigation;