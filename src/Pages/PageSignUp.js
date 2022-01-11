import React, { useState} from "react";
import { Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";


function SignUp() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Confirmation, setConfirmation] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const Inscription = async () => 
    {
        let isComplete = (Username !== "" && Password !== "" && Confirmation !== "");
        let PasswordIsConfirmed = (Password === Confirmation);

        if (isComplete && PasswordIsConfirmed) {
            const result = await fetch('/api/Inscription',
            {
                method: 'PUT',
                body: JSON.stringify({ Username, Password }),
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });   

            if (result.ok && isComplete) {
                setError("");
                navigate('/LogIn');
                return;
            } else {
                setError("");
                setError("Le nom d'utilisateur est deja utiliser");
            }
            
            setUsername("");
            setPassword("");
            setConfirmation("");
        }

        if (isComplete === false) {
            setError("");
            setError("Erreur, des champs sont vides");
        }

        if (PasswordIsConfirmed === false) {
            setError("");
            setError("Erreur, Les mots de passes doivent etre identiques");
        }
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', textAlign: "center"}}>                        
                <Form>
                    <h2 className="m-4">Inscription</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group id="Username">
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control type="text" value={Username} onChange={(event) => setUsername(event.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group id="Password">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" value={Password} onChange={(event) => setPassword(event.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group id="PasswordConfirmation">
                        <Form.Label>Confirmation</Form.Label>
                        <Form.Control type="password" value={Confirmation} onChange={(event) => setConfirmation(event.target.value)} required></Form.Control>
                    </Form.Group>
 
                    <Button className="mt-3 mb-3 w-100" onClick={() => Inscription()}>Inscription</Button>
                    
                    <div>
                        Vous avez deja un compte ? <Link to="/LogIn">Connectez-vous !</Link>
                    </div>
                </Form>  
            </div>
        </>
    );
}

export default SignUp;