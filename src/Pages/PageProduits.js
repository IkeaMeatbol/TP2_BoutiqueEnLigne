import React from "react";
import { useState, useEffect } from "react";
import { PaginationArticle } from "./pagination";
import { Container, Row, Button, ButtonGroup,ToggleButtonGroup, ToggleButton, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UtiliseAuth } from "../Context/Auth";


export const PageProduits = () => {
  const [produits, setProduits] = useState([]);
  const [nombreProduit, setNombreProduit] = useState(24);
  const choixNombreElement = [12,24,48,"Tous"];
  const authentification = UtiliseAuth();


  async function GetTousLesProduits() {
    const result = await fetch("/api/produits");
    const produits = await result.json();

    setProduits(produits);
  }
  
  useEffect(() => {
    GetTousLesProduits();
  }, []);
  
  const nombreProduitTotal = Object.keys(produits).length


 
  function ChoixNombreElementParPage()
  {
    return (
      <>
      <ButtonGroup type="radio"  size="sm" onClick={ (e) => setNombreProduit(e.target.value)}>
        {choixNombreElement.map((element, idx) => {
          return <Button variant="success" key={idx} id={idx} 
          value={idx === 3 ? nombreProduitTotal : element} >{element}</Button>          
        }) }   
    
    </ButtonGroup>
      </>)
  }

function ajoutCategorie(index)
{
  const nouvelleSelectionCategorie = choixCategorie.map((categorie, idx) =>
  index === idx ? !categorie : categorie);
  setChoixCategorie(nouvelleSelectionCategorie);
}

const categories = [...new Set(produits.map(produit => produit.categorie))]
const [choixCategorie, setChoixCategorie] = useState(new Array(4).fill(false));

function envoiCategorieChoisis()
{
  const categorieChoisi = Object.fromEntries(categories.map((_, i) => [categories[i], choixCategorie[i]]));

  return categorieChoisi;
}



function FiltrerCategorie()
{    
 
    return (
      <>
      <h6>Catégories</h6>
      
      <ToggleButtonGroup vertical name="Categorie" type="checkbox"  >
        {categories.map((categorie,idx) => {
          return   <ToggleButton key={idx} id={"a"+idx} value={categorie} variant="success" 
          checked={choixCategorie[idx]} onChange={()=>ajoutCategorie(idx)}
          >
            {categorie}
          </ToggleButton>
        })}
      </ToggleButtonGroup>
      </>
    )
  } 
  
  return (
    <>
    {authentification.authentification !== undefined ? <h1>Vous devez être connecté pour voir les produits</h1> : 
      <Container >
        <Row>      
        <Col lg ={10} sm={5}> <h3>Sélection de produit</h3> </Col>
        <Col lg={2} sm={1}><ChoixNombreElementParPage /></Col>
        </Row>
        <Row>
        <Col lg={1}><FiltrerCategorie/></Col>
        <Col className={"containerProduit"}>  <PaginationArticle produits={produits}  nombreProduit={nombreProduit} categorieChoisi={envoiCategorieChoisis()} authentification={authentification}/> </Col>
        </Row>
      </Container>}
     
    </>
  );
};
       