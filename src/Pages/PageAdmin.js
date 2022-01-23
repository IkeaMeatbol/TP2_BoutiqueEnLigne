import {React, useState, useEffect} from 'react';
import { Alert, Button, Container, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { BiTrash, BiEdit, BiSortAlt2 } from "react-icons/bi";

const Produit = (props) =>{
    return (        
        <tr>            
            <td>{props.nom}</td>
            <td>{props.descr}</td>
            <td>{props.cat}</td>
            <td>{props.prix}</td>
            <td>{props.rabais}</td>
            <td>{props.quant}</td>
            <td>
                <Link to={{ pathname: `/Admin/modifier/${props.id}`}}>
                    <Button variant='warning' size="sm" className="me-2"> <BiEdit /> </Button>
                </Link>
                <Link to={{ pathname: `/Admin/supprimer/${props.id}`}}>
                    <Button variant='danger' size="sm"> <BiTrash /> </Button>
                </Link>
            </td>
        </tr>        
    )
}

const Stockage = (props) => {
    const [champTrie, setChampTrie] = useState(null);
    const [sensDeTri, setSensDeTri] = useState(null);
    
    const demandeTri = champATrie => {
        setSensDeTri('ascend');
        setChampTrie(champATrie);
        if(champTrie === champATrie && sensDeTri === 'ascend'){
            setSensDeTri('descend');            
        }        
    }

    let produitsTriees = props.produits;
    if(champTrie !== null && sensDeTri === 'ascend'){
        produitsTriees.sort((produitPrecedent, produitSuivant) => {
        
            if(produitPrecedent[champTrie] < produitSuivant[champTrie]){
                return -1;
            }
            if(produitPrecedent[champTrie] > produitSuivant[champTrie]){
                return 1;
            }
            return 0;
        });
    }
    else if(champTrie !== null && sensDeTri === 'descend'){
        produitsTriees.sort((produitPrecedent, produitSuivant) => {
        
            if(produitPrecedent[champTrie] > produitSuivant[champTrie]){
                return -1;
            }
            if(produitPrecedent[champTrie] < produitSuivant[champTrie]){
                return 1;
            }
            return 0;
        });
    }

    return (
        <Table hover>
            <thead>
                <tr>
                    <th data-type="string">Nom
                        <button type='button' onClick={() => demandeTri('nom')} size="sm" style={{float: 'right', border: 'border-0'}}>
                            <BiSortAlt2 />
                        </button>
                    </th>
                    <th data-type="string">Description
                        <button type='button' onClick={() => demandeTri('description')} size="sm" style={{float: 'right'}}>
                            <BiSortAlt2 />
                        </button>
                    </th>
                    <th data-type="string">Categorie
                        <button type='button' onClick={() => demandeTri('categorie')} size="sm" style={{float: 'right'}}>
                            <BiSortAlt2 />
                        </button>
                    </th>
                    <th data-type="number">Prix $
                        <button type='button' onClick={() => demandeTri('prix')} size="sm" style={{float: 'right'}}>
                            <BiSortAlt2 />
                        </button>
                    </th>
                    <th data-type="number">Rabais %
                        <button type='button' onClick={() => demandeTri('rabais')} size="sm" style={{float: 'right'}}>
                            <BiSortAlt2 />
                        </button>
                    </th>
                    <th data-type="number">Quantite
                        <button type='button' onClick={() => demandeTri('quantite')} size="sm" style={{float: 'right'}}>
                            <BiSortAlt2 />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.produits.map(pr => {
                    return <Produit 
                            key={pr._id}
                            id={pr._id}
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
                <Link style={{textDecoration: 'none'}} to={{ pathname: `/Admin/ajouter`}} className="d-grid gap-2">
                    <Button variant='success'>Ajouter un nouveau produit</Button>
                </Link>
                <Stockage produits={produits} />
            </Container>            
        </>
    )
}