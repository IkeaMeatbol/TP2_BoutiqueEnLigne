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

app.listen(8000, () => "En écoute sur le port 8000");

