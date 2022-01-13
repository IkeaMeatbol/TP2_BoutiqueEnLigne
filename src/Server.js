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


app.post('/api/Connection', (requete, reponse) => {
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
        reponse.status(500).send("certain parametres ne sont pas definis")
    }
})

app.put('/api/Inscription', (requete, reponse) => {
    const {Username,Password} = requete.body;
    if (Username !== undefined && Password !== undefined ) {
        utiliserBD(async (db) => {
            const User = await db.collection("Utilisateurs").findOne({Username: Username});
            if (user === null) {
                await db.collection('Utilisateurs').insertOne({Username: Username.toLowerCase(), Password: Password});
                reponse.status(202).send(true)
            } else{
                reponse.status(400).send(false);
            }
        }, reponse); 
    } else {
        reponse.status(500).send("certain parametres ne sont pas definis")
    }
})

app.listen(8000, () => "En écoute sur le port 8000");