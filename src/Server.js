import express from "express";
import {MongoClient} from 'mongodb';

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

app.listen(8000, () => "En écoute sur le port 8000");