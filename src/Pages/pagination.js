import React from "react";
import { useState } from "react";
import { Pagination,Card, Row, Button } from "react-bootstrap";


export const PaginationArticle = ({ produits, nombrePages, nombreProduit }) => {
  const [pageCourante, setPageCourante] = useState(1);

  

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

  function DetailProduit({ produits }) {

    return (
      <>
        <Card style={{ width: "15rem" }}>
          <Card.Body>
            <Card.Title>{produits.nom}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {produits.categorie}
            </Card.Subtitle>
            <Card.Text>{produits.prix}</Card.Text>
         <Button variant="success">Ajouter au panier</Button>
          </Card.Body>
        </Card>
      </>
    );
  }

  function ListeProduit({ produits, nombreProduit, pageCourante }) {
    const premierArticle = pageCourante * nombreProduit - nombreProduit;
    const dernierArticle  = premierArticle + Number(nombreProduit);
    const produitsPage = produits.slice(premierArticle,dernierArticle);

    return (
      <>
        <Row>
          {produitsPage.map((produit, idx) => {
            return  <DetailProduit produits={produit} key={idx} />;
          })}
        </Row>
      </>

    );
        }

  return (
    <>
      <Row><ListeProduit produits={produits} nombreProduit={nombreProduit} pageCourante={pageCourante}/></Row>
      <Pagination>
        <Pagination.First disabled={disabledClickRetour(pageCourante,nombrePages)} onClick={premierePage} />
        <Pagination.Prev disabled={disabledClickRetour(pageCourante,nombrePages)} onClick={pagePrecedente} />
        {affichagePage(nombrePages)}
        
        <Pagination.Next  disabled={disabledClickSuivant(pageCourante,nombrePages)} onClick={pageSuivante} />
        <Pagination.Last  disabled={disabledClickSuivant(pageCourante,nombrePages)} onClick={dernierePage} />
      </Pagination>
    </>
  );
};
