import {React, useState, useEffect} from 'react';
import { useParams, Link } from "react-router-dom";
import { Alert, Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const PageSupprimer = () => {

    async function getProduit(id)
    {
        const result = await fetch(`/api/produits/${id}`);
        const produit = await result.json();        
        setProduit(produit);
    }
    
    const [produit, setProduit] = useState({});
    const {id} = useParams();
    
    useEffect(() => {
        getProduit(id);
    }, [produit.id]);

    return (
        <>            
            <Container>
                <Alert variant='danger'>
                    <h2>Suppression de contenu de la liste</h2>
                </Alert>
                <Row>
                    <Col sm={2}>Nom:</Col>
                    <Col>{produit.nom}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Description:</Col>
                    <Col>{produit.description}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Categorie:</Col>
                    <Col>{produit.categorie}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Prix:</Col>
                    <Col>{produit.prix}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Rabais:</Col>
                    <Col>{produit.rabais}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Quantite:</Col>
                    <Col>{produit.quantite}</Col>
                </Row>                
                
                <h2 style={{ color: 'red' }}>Etes-vous sûr que vous voulez supprimer?</h2>
                
               <ButtonGroup>
                   <Button className="me-2" variant="primary">
                       <Link style={{textDecoration: 'none', color: 'white'}} to="/admin">Non, laissez le produit</Link>
                    </Button>
                    
                    <Button className="me-2" variant="danger"
                        onClick={() => fetch(`/api/produits/supprimer/${id}`, {method: "DELETE"})}
                    ><Link style={{textDecoration: 'none', color: 'white'}} to="/admin">Oui, supprimer le produit</Link></Button>
               </ButtonGroup>
            </Container>
        </>
    )
}