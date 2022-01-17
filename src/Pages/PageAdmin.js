import {React, useState, useEffect} from 'react';
import { Alert, Button, Container, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Produit = (props) =>{
    return (        
        <tr>
            <td>{props.nom}</td>
            <td>{props.descr}</td>
            <td>{props.cat}</td>
            <td>{props.prix}</td>
            <td>{props.rabais}</td>
            <td>{props.quant}</td>
        </tr>        
    )
}

const Stockage = (props) => {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th data-type="string">Nom</th>
                    <th data-type="string">Description</th>
                    <th data-type="string">Categorie</th>
                    <th data-type="number">Prix</th>
                    <th data-type="number">Rabais</th>
                    <th data-type="number">Quantite</th>
                </tr>
            </thead>
            <tbody>
                {props.produits.map(pr => {
                    return <Produit 
                            key={pr._id} 
                            nom={pr.nom} 
                            descr={pr.description} 
                            cat={pr.categorie} 
                            prix={pr.prix} 
                            rabais={pr.rabais} 
                            quant={pr.quantite} 
                        />})}
            </tbody>
        </Table>
    )
}

export const PageAdmin = () => {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        fetch('/api/produits')
        .then((result) => {return result.json()})
        .then(donnees => {setProduits(donnees)})
        .catch(console.error)
    }, []);

    return(
        <>
            <Container>
                <Alert variant='primary'>
                    <h1>Page de gestion</h1>
                </Alert>
                <Link to="/" className="d-grid gap-2">
                    <Button variant='success'>Ajouter un nouveau produit</Button>
                </Link>
                <Stockage produits={produits} />
            </Container>            
        </>
    )
}