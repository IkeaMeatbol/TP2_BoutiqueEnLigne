import {React, useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, FloatingLabel, Row, Col } from 'react-bootstrap';

export const PageModifier = () => {
    const [nomProduit, setNom] = useState("");
    const [descriptionProduit, setDescription] = useState("");
    const [categorieProduit, setCategorie] = useState("");
    const [prixProduit, setPrix] = useState("");
    const [rabaisProduit, setRabais] = useState("");
    const [quantiteProduit, setQuantite] = useState("");

    const navigate = useNavigate();

    const [erreurDonnees, setErreurDonnees] = useState(false);

    async function getProduit(id)
    {
        const result = await fetch(`/api/produits/${id}`);
        const produit = await result.json();        
        setProduit(produit);
        setNom(produit.nom);
        setDescription(produit.description);
        setCategorie(produit.categorie);
        setPrix(produit.prix);
        setRabais(produit.rabais);
        setQuantite(produit.quantite);
    }
    
    const [produit, setProduit] = useState({});
    const {id} = useParams();
    
    useEffect(() => {
        getProduit(id);
    }, [produit.id]);

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
        quantiteProduit >= 0
        )
        {
            setErreurDonnees(false);
            fetch(`/api/produits/modifier`,
            {
                method: 'PUT',
                body: JSON.stringify({_id: produit._id,
                                        nom: nomProduit,
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
                    <Alert variant='warning'>
                            <h2>Modification des données produit</h2>
                    </Alert>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Form >
                        <FloatingLabel label='Nom' className='mb-3' id='nom'>
                            <Form.Control type='text' placeholder='Nom' onChange={(event) => setNom(event.target.value)} defaultValue={nomProduit} required />
                        </FloatingLabel>
                        <FloatingLabel label='Description' className='mb-3' id='description'>
                            <Form.Control as="textarea" style={{ height: '100px' }} placeholder='Description' onChange={(event) => setDescription(event.target.value)} defaultValue={descriptionProduit} required />
                        </FloatingLabel>
                        <FloatingLabel label='Categorie produit' className='mb-3' id='categorie'>
                            <Form.Control type='text' placeholder='Categorie' onChange={(event) => setCategorie(event.target.value)} defaultValue={categorieProduit} required />
                        </FloatingLabel>
                        <FloatingLabel label='Prix produit $' className='mb-3' id='prix'>
                            <Form.Control type='number' placeholder='Prix' min='0.00' step='0.01' onChange={(event) => setPrix(event.target.value)} defaultValue={prixProduit} />
                        </FloatingLabel>
                        <FloatingLabel label='Rabais produit %' className='mb-3' id='rabais'>
                            <Form.Control type='number' placeholder='Rabais' min='0' onChange={(event) => setRabais(toEntier(event.target.value))} defaultValue={rabaisProduit} />
                        </FloatingLabel>
                        <FloatingLabel label='Quantite produit' className='mb-3' id='quantite'>
                            <Form.Control type='number' placeholder='Quantite' min='0' onChange={(event) => setQuantite(toEntier(event.target.value))} defaultValue={quantiteProduit} />
                        </FloatingLabel>
                        <div class='col-12'>
                            {erreurDonnees && <span style={{color:'red'}}>*Les données saisies sont incorrectes, veuillez vérifier</span>}
                        </div>
                        <Button  className="me-4" variant='primary' type='button' onClick={verifierDonnees}>Changer ce produit</Button>
                        <Link to="/admin">
                            <Button  className="me-2" variant='danger'>Annuler</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}