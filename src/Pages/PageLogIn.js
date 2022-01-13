import React, { useState} from "react";
import { Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { UtiliseAuth } from "../Context/Auth"

function LogIn() {
    const { setAuthentification } = UtiliseAuth();
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const Connection = async () => 
    {
        let isComplete = (Username !== "" && Password !== "");

        if (isComplete) {
            const result = await fetch('/api/Connection',
            {
                method: 'POST',
                body: JSON.stringify({ Username, Password }),
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });   

            if (result.ok && isComplete) {
                setAuthentification(Username);
                navigate('/');
                return;
            } else {
                setError("");
                setError("Le nom d'utilisateur ou le mot de passe est incorrect");
            }
            
            setUsername("");
            setPassword("");
        }

        if (isComplete === false) {
            setError("");
            setError("Erreur, des champs sont vides");
        }
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', textAlign: "center"}}>                        
                <Form>
                    <h2 className="m-4">Connexion</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group id="Username">
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control type="text" value={Username} onChange={(event) => setUsername(event.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group id="Password">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" value={Password} onChange={(event) => setPassword(event.target.value)} required></Form.Control>
                    </Form.Group>
 
                    <Button className="mt-3 mb-3 w-100" onClick={() => Connection()}>Connexion</Button>
                    
                    <div>
                        Vous n'avez pas de compte ? <Link to="/SignUp">Créé en un !</Link>
                    </div>
                </Form>  
            </div>
        </>
    );
}

export default LogIn;