import React from "react";
import { useState, useEffect } from "react";
import { PaginationArticle } from "./pagination";
import { Container, Row,ProgressBar, Button, ButtonGroup,ToggleButtonGroup, ToggleButton, Col } from "react-bootstrap";


export const PageProduits = () => {
  const [produits, setProduits] = useState([]);
  const [nombreProduit, setNombreProduit] = useState(12);
  const choixNombreElement = [12,24,48,"Tous"];

  async function GetTousLesProduits() {
    const result = await fetch("/api/produits");
    const produits = await result.json();

    setProduits(produits);
  }
  
  useEffect(() => {
    GetTousLesProduits();
  }, []);
  
  const nombreProduitTotal = Object.keys(produits).length
  const nombresPage = Math.ceil(nombreProduitTotal/nombreProduit);

 
  function ChoixNombreElementParPage()
  {
    return (
      <>
      <ButtonGroup type="checkbox"  size="sm" onClick={ (e) => setNombreProduit(e.target.value)} >
        {choixNombreElement.map((element, idx) => {
          return <Button variant="success" key={idx} id={idx} 
          value={idx === 3 ? nombreProduitTotal : element} checked={element === nombreProduit}>{element}</Button>          
        })      }   
    
    {console.log(nombreProduit)}
    </ButtonGroup>
      </>)
  }

  function FiltrerCategorie()
  {    const categories = [...new Set(produits.map(produit => produit.categorie))]
    return (
      <>
      <h6>Catégorie</h6>
      <ToggleButtonGroup vertical name="Categorie">
        {categories.map((categorie,idx) => {
          return   <ToggleButton key={idx} id={idx} variant="success">{categorie}</ToggleButton>
        })}

      </ToggleButtonGroup>
      </>
    )
  }
  
  return (
    <>
      <Container>
        <Row>
        <Col lg={1}></Col>
        <Col ><ProgressBar striped variant="success" min={0} now={23} label={`Article`} max={Object.keys(produits).length} /> </Col>
        <Col lg={1} ><ChoixNombreElementParPage /></Col>
        </Row>
        <Row>
        <Col lg={1}><FiltrerCategorie/></Col>
        <Col>  <PaginationArticle produits={produits} nombrePages={nombresPage} nombreProduit={nombreProduit}/> </Col>
        </Row>
      </Container>
     
    </>
  );
};
