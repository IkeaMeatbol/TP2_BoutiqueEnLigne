import {React, useState } from 'react';
import { Form, Button, Container, Alert, FloatingLabel, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

export const PageAjouter = () => {
    const [nomProduit, setNom] = useState("");
    const [descriptionProduit, setDescription] = useState("");
    const [categorieProduit, setCategorie] = useState("");
    const [prixProduit, setPrix] = useState("");
    const [rabaisProduit, setRabais] = useState("");
    const [quantiteProduit, setQuantite] = useState("");

    const navigate = useNavigate();

    const [erreurDonnees, setErreurDonnees] = useState(false);

    function toEntier(numberToEntier){
        if(Number.isInteger(numberToEntier)){            
            return numberToEntier;
            
        }else{
            const parsed = parseInt(numberToEntier, 10);
            if(isNaN(parsed)){return 0;}            
            return parsed;
        }
    }

    function verifierDonnees(){       
        if(nomProduit !== "" &&
        descriptionProduit !== "" &&
        categorieProduit !== "" &&
        prixProduit > 0 &&
        rabaisProduit >= 0 &&
        rabaisProduit < 100 &&
        quantiteProduit > 0
        )
        {
            setErreurDonnees(false);
            const envoyerDonnees = fetch(`/api/produits/ajouter`,
            {
                method: 'POST',
                body: JSON.stringify({nom: nomProduit, 
                                        description: descriptionProduit, 
                                        categorie: categorieProduit, 
                                        prix: prixProduit, 
                                        rabais: rabaisProduit, 
                                        quantite: quantiteProduit}),
                headers: {'Content-Type': 'application/json'}
            }).then(function(response){
                if(!response.ok){console.log("error intern")}
                else{navigate("/Admin");}
            });                      
        }
        else
        {
            setErreurDonnees(true);
        }        
    }

    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Alert variant='success'>
                            <h2>Nouveau produit</h2>
                    </Alert>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Form >
                        <FloatingLabel label='Nom' className='mb-3' id='nom'>                            
                            <Form.Control type='text' placeholder='Nom' value={nomProduit} onChange={(event) => setNom(event.target.value)} required />
                        </FloatingLabel>                        
                        <FloatingLabel label='Description' className='mb-3' id='description'>
                            <Form.Control as="textarea" style={{ height: '100px' }} placeholder='Description' value={descriptionProduit} onChange={(event) => setDescription(event.target.value)} required />
                        </FloatingLabel>
                        <FloatingLabel label='Categorie produit' className='mb-3' id='categorie'>
                            <Form.Control type='text' placeholder='Categorie' value={categorieProduit} onChange={(event) => setCategorie(event.target.value)} required />
                        </FloatingLabel>
                        <FloatingLabel label='Prix produit' className='mb-3' id='prix'>
                            <Form.Control type='number' placeholder='Prix' min='0.00' step='0.01' value={prixProduit} onChange={(event) => setPrix(event.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel label='Rabais produit' className='mb-3' id='rabais'>
                            <Form.Control type='number' placeholder='Rabais' min='0' value={rabaisProduit} onChange={(event) => setRabais(toEntier(event.target.value))} />
                        </FloatingLabel>
                        <FloatingLabel label='Quantite produit' className='mb-3' id='quantite'>
                            <Form.Control type='number' placeholder='Quantite' min='0' value={quantiteProduit} onChange={(event) => setQuantite(toEntier(event.target.value))} />
                        </FloatingLabel>
                        
                        {erreurDonnees && <span style={{color:'red'}}>*Les données saisies sont incorrectes, veuillez vérifier</span>}
                        <Button  className="me-4" variant='primary' type='button' onClick={verifierDonnees}>Créer nouveau produit</Button>
                        <Link to="/admin">
                            <Button  className="me-2" variant='danger'>Annuler</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}