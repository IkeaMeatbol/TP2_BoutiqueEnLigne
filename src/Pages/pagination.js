import React from "react";
import { useState, useEffect} from "react";
import { Pagination,Card, Row, Button} from "react-bootstrap";
import "../index.css";

export const PaginationArticle = ({ produits, nombreProduit, categorieChoisi, authentification}) => {
  const [pageCourante, setPageCourante] = useState(1);
  const [nombrePages, setNombresPages] = useState();


  const [utilisateur, setUtilisateur] = useState({
    nomClient : authentification.authentification,
    produits : []
  })

  console.log(utilisateur);

  function affichagePage(nombrePages) {
    //Tableau vide qui va se remplir selon le nombre de page qui est déterminé par les catégories choisient et le nombre
    //éléments par page
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
      Ancien prix :  <div className="texteRabais">{produit.prix}$ </div>
       <div>Nouveau prix : <div className="texteNouveauPrix">{((produit.prix * (100-produit.rabais))/100).toFixed(2)}$ </div></div>
       <div> Rabais : {((produit.rabais*produit.prix)/100).toFixed(2)}$ ({produit.rabais}%)</div>              
         </>
       )
     }
     
  function DetailProduit({ produit }) {
//Les cards des produits avec leur détail 
    return (
            <>
        <Card style={{ width: "15rem" }} className="hover-shadow" border="success">
          <Card.Body>
            <Card.Title>{produit.nom}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {produit.categorie}
            </Card.Subtitle>
            <Card.Text as='div'> {produit.description.substring(0, 50)} ...  <br />
            {/* Ici je regarde s'il y a un rabais sur l'article  */}
            {produit.rabais >0 ? detailProduitRabais({produit}) : produit.prix+"$"} <br />        
            </Card.Text>
           
            {produit.quantite === 0 ? <b>Produit non disponible</b> :  <Button variant="success" onClick={()=> alert('Section panier à venir')}> Ajouter au panier</Button>}       
          </Card.Body>
        </Card>        
      </>
    );
  }

  function FiltrerProduit({produits, categorieChoisi})
  {
    //Le code filtre tout les articles selon les catégories choisient
    const categorie= Object.keys(categorieChoisi).filter(k => categorieChoisi[k]);
    const produitsFiltres = produits.filter(produit=>
        categorie.length >0 ? categorie.includes(produit.categorie) : true
        );       
    return produitsFiltres;
  }

  function ListeProduit({ produits, nombreProduit, pageCourante, categorieChoisi }) {
  
      const produitsFiltres = FiltrerProduit({produits,categorieChoisi});

      //UseEffect car sinon j'obtiens une erreur dans la console
  useEffect(()=> {
    setNombresPages(Math.ceil(produitsFiltres.length/nombreProduit));
  });

    const premierArticle = pageCourante * nombreProduit - nombreProduit;
    const dernierArticle  = premierArticle + Number(nombreProduit);
    const produitsPage =  produitsFiltres.slice(premierArticle,dernierArticle);
//Map les articles selon la page et le nombre élément à afficher
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
      <Row>
        <Pagination variant="success">
        <Pagination.First disabled={disabledClickRetour(pageCourante,nombrePages)} onClick={premierePage} />
        <Pagination.Prev disabled={disabledClickRetour(pageCourante,nombrePages)} onClick={pagePrecedente} />
        {affichagePage(nombrePages)}
        
        <Pagination.Next  disabled={disabledClickSuivant(pageCourante,nombrePages)} onClick={pageSuivante} />
        <Pagination.Last  disabled={disabledClickSuivant(pageCourante,nombrePages)} onClick={dernierePage} />
      </Pagination>
      </Row>
    </>
  );
};
