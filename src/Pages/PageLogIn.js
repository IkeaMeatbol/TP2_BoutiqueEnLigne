import React from "react";
import { Form , Button} from "react-bootstrap";

function LogIn() {
    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', textAlign: "center"}}>                        
                <Form>
                    <h2 className="m-4">Connection</h2>
                            
                    <Form.Group id="Username">
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control type="text" required></Form.Control>
                    </Form.Group>

                    <Form.Group id="Password">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" required></Form.Control>
                    </Form.Group>
 
                    <Button className="mt-3 mb-3 w-100" type="submit">Connection</Button>
                    
                    <div>
                        Vous n'avez pas de compte ? Créé en un !
                    </div>
                </Form>  
            </div>
        </>
    );
}

export default LogIn;