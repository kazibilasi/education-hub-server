const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
// const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY)
// const jwt = require('jsonwebtoken');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;




const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xemmjwp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const studentInfo = client.db('Education-Hub').collection('student-info')




        app.post("/student-info", async (req, res) => {
            const info = req.body;
            const result = await studentInfo.insertOne(info);
            res.send(result);
        })

        app.get('/student-info', async (req, res) => {
            const result = await studentInfo.find().toArray();
            res.send(result);
        })



        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Education hub!');
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})