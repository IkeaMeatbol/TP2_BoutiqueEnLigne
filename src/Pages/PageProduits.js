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
 
  const handleChangeNombreElement = (val) => setBoutonClique(val);
  const [boutonClique , setBoutonClique] = useState(1);
  console.log(boutonClique);
  
  function ChoixNombreProduitsParPage()
  {
    return (
      <>
      <ButtonGroup type="radio"  size="sm" value={boutonClique} onClick={ (e) => setNombreProduit(e.target.value)} >
        {choixNombreElement.map((element, idx) => {
          return <Button variant="success" key={idx} id={idx}  onClick={ (e) => handleChangeNombreElement(e.target.id)}
          //Comme que le dernier bouton est un string 'TOUS' je le convert au nombre max de produits
          value={idx === 3 ? nombreProduitTotal : element} active={idx === boutonClique ?  "active" : ""}>{element}</Button>          
        }) }   

    </ButtonGroup>
      </>)
  }
  
  const categories = [...new Set(produits.map(produit => produit.categorie))]
  //Ici j'ai mis 40 comme nombre fictif car je ne suis pas capable de mettre categories.length à l'intérieur du array
  //Je me suis qu'il serait presque improbable d'avoir plus que 40 catégories 
  const [choixCategorie, setChoixCategorie] = useState(new Array(40).fill(false));


  function ajoutCategorie(index)
  {
    const nouvelleSelectionCategorie = choixCategorie.map((categorie, idx) =>
    index === idx ? !categorie : categorie);
    setChoixCategorie(nouvelleSelectionCategorie);
  }

  function setCategorieChoisis()
  {
    const categorieChoisi = Object.fromEntries(categories.map((_, i) => [categories[i], choixCategorie[i]]));
    return categorieChoisi;
  }
//Le handle change est pour le active state des catégories
  const handleChangeCategorie = (val) => setcategorieBouton(val);
  const [categorieBouton, setcategorieBouton] = useState([]);

  function FiltrerCategorie()
  {     
      return (
        <>
        <h6>Catégories</h6>
        
        <ToggleButtonGroup vertical name="Categorie" type="checkbox" value={categorieBouton} onChange={handleChangeCategorie}  >
          {categories.map((categorie,idx) => {
            return   <ToggleButton key={idx} id={"a"+idx} value={categorie} variant="success" 
          onChange={()=>ajoutCategorie(idx)}>
            {categorie}
            </ToggleButton>
          })}
        </ToggleButtonGroup>
        </>
      )
    } 
  
  return (
    <>
    {authentification.authentification === undefined ? <h1>Vous devez être connecté pour voir les produits</h1> : 
      <Container >
        <Row>      
        <Col lg ={10} sm={5}> <h3>Sélection de produits</h3> </Col>
        <Col lg={2} sm={1}><ChoixNombreProduitsParPage /></Col>
        </Row>
        <Row>
        <Col lg={1}><FiltrerCategorie/></Col>
        <Col className={"containerProduit"}>  <PaginationArticle produits={produits}  nombreProduit={nombreProduit} categorieChoisi={setCategorieChoisis()} authentification={authentification}/> </Col>
        </Row>
      </Container>}     
    </>
  );
};
       