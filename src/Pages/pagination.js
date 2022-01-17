import React from "react";
import { useState } from "react";
import { Pagination,Card, Row, Button } from "react-bootstrap";
import "../index.css";


export const PaginationArticle = ({ produits, nombreProduit, categorieChoisi }) => {
  const [pageCourante, setPageCourante] = useState(1);
  const [nombrePages, setNombresPages] = useState(Math.ceil(produits.length/nombreProduit));

  console.log(categorieChoisi);

  function affichagePage(nombrePages) {
    let page = [];

    for (let index = 1; index < nombrePages + 1; index++) {
      page.push(
        <Pagination.Item
          key={index}
          active={index === pageCourante}
          onClick={() => clickChangementPage(index)}
        >
          {index}
        </Pagination.Item>
      );
    }
    return page;
  }

  function pageSuivante() {
    if (pageCourante < nombrePages) {
      setPageCourante(pageCourante + 1);
    }
  }

  function pagePrecedente() {
    if (pageCourante > 1) {
      setPageCourante(pageCourante - 1);
    }
  }
function premierePage(){
    setPageCourante(1);
}

  function dernierePage(){
      setPageCourante(nombrePages);
  }

  function clickChangementPage(index) {
    setPageCourante(index);
  }

  function disabledClickSuivant(pageCourante,nombrePages){
 return pageCourante === nombrePages ? "disabled" : "";
  }

  function disabledClickRetour(pageCourante,nombrePages){
    return pageCourante === 1 ? "disabled" : "";
     }

     function detailProduitRabais ({ produit })
     {
       return (
         <>
         <p className="texteRabais">{produit.prix}$</p>
          Nouveau prix : <b>{(produit.prix * (1-produit.rabais)).toFixed(2)}$ </b>
               Économisez : {(produit.rabais*produit.prix).toFixed(2)}$ ({produit.rabais*100}%)
               
         </>
       )
     }
  function DetailProduit({ produit }) {

    return (
      <>
        <Card style={{ width: "15rem" }} border="success">
          <Card.Body>
            <Card.Title>{produit.nom}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {produit.categorie}
            </Card.Subtitle>
            <Card.Text> {produit.description.substring(0, 50)} ...  <br />
            {produit.rabais >0 ? detailProduitRabais({produit}) : produit.prix+"$"} <br />
            Quantité : {produit.quantite}            
            </Card.Text>
            {produit.quantite === 0 ? <b>Produit non disponible</b> :  <Button variant="success"> Ajouter au panier</Button>}
        
          </Card.Body>
        </Card>
      </>
    );
  }


  function FiltrerProduit({produits, categorieChoisi})
  {
    const categorie= Object.keys(categorieChoisi).filter(k => categorieChoisi[k]);
    const produitsFiltres = produits.filter(produit=>
        categorie.length >0 ? categorie.includes(produit.categorie) : true
        );
       
    return produitsFiltres;
  }

  function ListeProduit({ produits, nombreProduit, pageCourante, categorieChoisi }) {
  
      const produitsFiltres = FiltrerProduit({produits,categorieChoisi});

    setNombresPages(Math.ceil(produitsFiltres.length/nombreProduit));

    const premierArticle = pageCourante * nombreProduit - nombreProduit;
    const dernierArticle  = premierArticle + Number(nombreProduit);
    const produitsPage =  produitsFiltres.slice(premierArticle,dernierArticle);

    return (
      <>
        <Row>
          {produitsPage.map((produit, idx) => {
            return  <DetailProduit produit={produit} key={idx} />;
          })}
        </Row>
      </>

    );
        }

  return (
    <>
      <Row><ListeProduit produits={produits} nombreProduit={nombreProduit} pageCourante={pageCourante} categorieChoisi={categorieChoisi}/></Row>
      <Pagination variant="success">
        <Pagination.First disabled={disabledClickRetour(pageCourante,nombrePages)} onClick={premierePage} />
        <Pagination.Prev disabled={disabledClickRetour(pageCourante,nombrePages)} onClick={pagePrecedente} />
        {affichagePage(nombrePages)}
        
        <Pagination.Next  disabled={disabledClickSuivant(pageCourante,nombrePages)} onClick={pageSuivante} />
        <Pagination.Last  disabled={disabledClickSuivant(pageCourante,nombrePages)} onClick={dernierePage} />
      </Pagination>
    </>
  );
};
