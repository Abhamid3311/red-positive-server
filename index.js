const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.upsvh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const entryCollections = client.db("redpositive").collection("entry");

        //Post User Entry
        app.post('/users', async (req, res) => {
            const newEntry = req.body
            const addEntry = await entryCollections.insertOne(newEntry);
            res.send(addEntry);
        });

        //Get All Entry
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = entryCollections.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        //Delete Entry
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const deleteEntry = await entryCollections.deleteOne(query);
            res.send(deleteEntry);
        });
    }
    finally {

    }
};

run().catch(console.dir);









app.get('/', (req, res) => {
    res.send('Hello From red Positive!')
});

app.listen(port, () => {
    console.log(`Red Positive listening on port ${port}`)
});
