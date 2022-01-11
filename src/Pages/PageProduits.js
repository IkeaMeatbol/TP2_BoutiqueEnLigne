import React from "react";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
export const PageProduits = () => {
  const [produits, setProduits] = useState([]);

  async function GetTousLesProduits() {
    const result = await fetch("/api/produits");
    const produits = await result.json();

    setProduits(produits);
  }

  function DetailProduit(produit) {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{produit.nom}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {produit.categorie}
            </Card.Subtitle>
            <Card.Text>
            {produit.prix}
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </>
    );
  }

    function ListeProduit(produits)
    {
        return (
            <>
            <h1>Page produit</h1>
            {produits.map(produit => {
                return <DetailProduit produit = {produit}/>
            })}
            </>
        )
    }
  
  return <>
    <ListeProduit produits={produits}/>
  </>;
}
