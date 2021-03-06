import express from "express";
import {MongoClient, ObjectId} from 'mongodb';

const app = express();
app.use(express.json());

const utiliserBD = async (operation,reponse) => 
{
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('Web');

        await operation(db);

        client.close();
    }
    catch(erreur)
    {
        reponse.status(500).json({ message: 'Erreur de connexion à la bd', erreur});
    }
};

app.get("/api/produits", async (requete,reponse) => {
    utiliserBD(async (db) => {
        const produits = await db
        .collection("Produits")
        .find({}).toArray();

        reponse.status(200).json(produits)
    }, reponse);
});


app.post('/api/Connexion', (requete, reponse) => {
    const {Username,Password} = requete.body;
    if (Username !== undefined && Password !== undefined ) {
        if (Username === "admin" && Password === "admin" ) {
            reponse.status(200).send(true);
        } else {
            utiliserBD(async (db) => {
            const User = await db.collection("Utilisateurs").findOne({Username: Username, Password: Password});
            
                if (User !== null) {
                    reponse.status(200).send(true);
                } else{
                    reponse.status(404).send(false);
                }            
            }, reponse); 
        }
    } else {
        reponse.status(500).send("Certains paramètres ne sont pas définis")
    }
})

app.put('/api/Inscription', (requete, reponse) => {
    const {Username,Password} = requete.body;
    if (Username !== undefined && Password !== undefined ) {
        utiliserBD(async (db) => {
            const User = await db.collection("Utilisateurs").findOne({Username: Username});
            if (User === null) {
                await db.collection('Utilisateurs').insertOne({Username: Username.toLowerCase(), Password: Password});
                reponse.status(202).send(true)
            } else{
                reponse.status(400).send(false);
            }
        }, reponse); 
    } else {
        reponse.status(500).send("Certains paramètres ne sont pas définis")
    }
})

app.get("/api/produits/:id", async (requete, reponse) => {
    const idProduit = requete.params.id;
    utiliserBD(async (db) => {
        const unProduit = await db.collection("Produits").findOne({_id: ObjectId(idProduit)});

        reponse.status(200).json(unProduit)
    }, reponse);    
    
});

app.delete('/api/produits/supprimer/:id', (requete, reponse) => {
    const idProduit = requete.params.id;
    utiliserBD(async(db) => {
        const result = await db.collection('Produits').deleteOne({_id: ObjectId(idProduit)});

        if(result.deletedCount === 1)
        {
            reponse.status(200).send(`${result.deletedCount} produit a été supprimé`);
        }
        else
        {
            reponse.status(500).send("Le produit n'a pas été retiré");
        }
    }, reponse).catch( () => reponse.status(500).send("Erreur: Le produit n'a pas été retiré")
    );
});

app.post('/api/produits/ajouter', (requete, reponse) => {
    const {nom, description, categorie, prix, rabais, quantite} = requete.body;

    if(nom !== undefined && 
        description !== undefined && 
        categorie !== undefined && 
        prix !== undefined && 
        rabais !== undefined && 
        quantite !== undefined)
    {
        utiliserBD(async(db) => 
        {
            await db.collection('Produits').insertOne({
                nom: nom,
                description: description,
                categorie: categorie,
                prix: prix,
                rabais: rabais,
                quantite: quantite
            });            
            reponse.status(200).send("produit ajouté avec succès");
        }, reponse).catch(() => reponse.status(500).send("Erreur"));
    }
    else
    {
        reponse.status(400).send('Certains parametres sont indefinis');
    }
});

app.put('/api/produits/modifier', (requete, reponse) => {
    const {_id, nom, description, categorie, prix, rabais, quantite} = requete.body;
    
    if(_id !== undefined &&
        nom !== undefined &&
        description !== undefined &&
        categorie !== undefined &&
        prix !== undefined &&
        rabais !== undefined &&
        quantite !== undefined)
        {            
            utiliserBD(async(db) => 
            {
                await db.collection('Produits').updateOne(
                    {
                        _id: ObjectId(_id)
                    },
                    {$set:
                        {
                            nom: nom,
                            categorie: categorie,
                            description: description,
                            prix: prix,
                            rabais: rabais,
                            quantite: quantite
                        }
                    }
                );
                reponse.status(200).send('Produit a été modifiée');
            }, reponse).catch(() => reponse.status(500).send('Erreur'));            
        }
        else
        {
            reponse.status(500).send('Certains parametres sont indefinis');
        }
});


app.post("/api/produits/:utilisateur/panier", async (requete, reponse) => {
    const utilisateur = requete.params.utilisateur;
    const {id, nom, prix, rabais, quantite} = requete.body;
    await utiliserBD(async (db) => {
      const infoUtilisateur = await db
        .collection("Utilisateurs")
        .findOne({ Username: utilisateur });

        const produitExistant =  await db
        .collection("Produits")
        .findOne({id : id, 
        nom : nom });

        if(infoUtilisateur != null && produitExistant != null)
        {
            await db.collection("panier").updateOne(
              { Username: utilisateur },
              {
                $push: {
                  Panier : {
                    produit : nom,
                    prixApresRabais : (prix*(100-rabais)),
                    quantite : quantite,
                  }
                },
              }, 
              );
             
        }
      const infoPanierAjour = await db
        .collection("panier")
        .findOne({ Username: utilisateur });
  
      reponse.status(200).json(infoPanierAjour);
    });
  });

app.listen(8000, () => "En écoute sur le port 8000");