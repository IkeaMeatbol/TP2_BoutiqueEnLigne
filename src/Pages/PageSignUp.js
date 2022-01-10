import React from "react";
import { Form , Button} from "react-bootstrap";

function SignUp() {
    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', textAlign: "center"}}>                        
                <Form>
                    <h2 className="m-4">Inscription</h2>
                            
                    <Form.Group id="Username">
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control type="text" required></Form.Control>
                    </Form.Group>

                    <Form.Group id="Password">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" required></Form.Control>
                    </Form.Group>

                    <Form.Group id="PasswordConfirmation">
                        <Form.Label>Confirmation</Form.Label>
                        <Form.Control type="password" required></Form.Control>
                    </Form.Group>
 
                    <Button className="mt-3 mb-3 w-100" type="submit">Inscription</Button>
                    
                    <div>
                        Vous avez deja un compte ? Connectez-vous !
                    </div>
                </Form>  
            </div>
        </>
    );
}

export default SignUp;