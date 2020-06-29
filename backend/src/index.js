import dotenv from 'dotenv';
require('dotenv').config();


import express, { response } from 'express';
import cors from 'cors';
import connect from './db.js';
import mongo from 'mongodb';
import auth from './auth.js'

const app = express()   //instanciranje aplikacije 
const port = 3000  // port na kojem će web server slušati

app.use(cors()) // omogući CORS na svim rutama
app.use(express.json())

let checkAttributesJobs = (data) =>{
    if( !data.naziv_posla || !data.kategorija_posla || !data.opis_posla || !data.potrebne_vjestine || !data.zarada){ 
        return false;
    }
    return true
}
//unos jednog posta
app.post('/jobs', async (req, res) => {
    let data = req.body;
    //postovi datum i vrijeme posta
    data.posted_at = new Date().getTime();


    delete data._id;
    let check = checkAttributesJobs(data)
    if(!check){
            res.json({
            status: 'fail',
           reason: 'incomplete post',
        });
        return;
    }

    let db = await connect();
    let result = await db.collection("jobs").insertOne(data);

    if(result && result.insertedCount ==1){
       res.json({
           status: 'success'
       });
    }
    else{
        res.json({
            status: 'fail',
        });
    }
});

//dohvaćanje svih postova
app.get ('/jobs', async (req , res) => {
    let db = await connect();
    

    let selekcija = {};


    let cursor = await db.collection('jobs').find(selekcija).sort( { posted_at: -1 });
    let results = await cursor.toArray();

    res.json(results);
});

app.get('/jobs/:jobId', async (req, res)=>{ //dinamicka ruta
    let jobId = req.params.jobId //dohvat jednog dokumenta sa tocnim id-em
    let db = await connect();

    let doc = await db.collection("jobs").findOne({_id: mongo.ObjectId(jobId)});
    console.log(doc)
    res.json(doc)
});

app.post('/jobs/:jobId/comments', async (req, res) => {        
    let doc = req.body;    
    let jobId = req.params.jobId;
    let db = await connect();
    // datume je ispravnije definirati na backendu    
    doc.posted_at = Date.now();
    let result = await db.collection('comments').insertOne(doc);    
    if (result.insertedCount == 1) {
        res.json({
            status: 'success',
        });
    } else {
        res.json({
            status: 'fail',
        });
    } 
});

app.get('/jobs/:jobId/comments', async (req, res) => {
    let jobId = req.params.jobId;
    let db = await connect();


    let cursor = await db.collection('comments').find({Idjoba : jobId}); //jobId : Idjoba
    let results = await cursor.toArray();
    cursor.close()

    res.json(results);
    
});

app.delete('/jobs/:jobId' ,  async (req, res) => {    
    let db = await connect();
    let jobId = req.params.jobId;    
    let result = await db.collection('jobs').deleteOne({ _id: mongo.ObjectId(jobId) }) 
    if (result.deletedCount == 1) {
        res.json({
            status: 'success'
        });
    } else {
        res.json({
            status: 'fail',
        });
    }
});

//unos jednog usera
app.post('/user', async (req , res) =>{
    let user = req.body;
    
    try{
        let id = await auth.registerUser(user);
    }
    catch(e){
        res.status(500).json({error: e.message});
    }

    res.json({
        status:  "Success"
    })
   
});

//autentifikacija

app.get("/tajna", (req, res) =>{
    res.json({message: "Ovo je tajna " + req.jwt.email})
})

app.post('/auth', async (req, res) =>{
    let user = req.body;
    let email = user.email;
    let password = user.password;
    try{
       let result = await auth.authenticateuser(email, password);
       res.status(201).json(result);
    }
    catch (e){
        res.status(500).json({error: e.message})
        console.log(error)
    }
})

//izmjena posla PATCH metoda
app.patch('/jobs/:jobId/EditJob', async (req, res) =>{
    let db = await connect();
    let doc = req.body;
    let jobId = req.params.jobId; 

    let result = await db.collection('jobs').updateOne(
        {_id: mongo.ObjectId(jobId)},
        {
            $set: doc,
        }
    );
    if(result.modifiedCount == 1){
        res.json({
            status: 'success',
        });
    } else{
        res.json({
            status:'fail',
        });
    }
});

//izmjena profila PATCH metoda
app.patch('/editprofil/:email', async (req, res) =>{
    let db = await connect();
    let doc = req.body;
    let email = req.params.email; 

    let result = await db.collection('user').updateOne(
        {email: email},
        {
            $set: doc,
        }
    );
    if(result.modifiedCount == 1){
        res.json({
            status: 'success',
        });
    } else{
        res.json({
            status:'fail',
        });
    }
});

app.patch("/user" , [auth.verify], async (req, res) =>{
    let changes = req.body;

    let email = req.jwt.email;

    if(changes.new_password && changes.old_password){
        let result = await auth.changeUserPassword(email, changes.old_password, changes.new_password)
        if(result){
            res.status(201).send()
        }
        else{
            res.status(500).json({error: "cannot change password"});          //greška na serveru status 500
        }
    }
    else{
        res.status(400).json({error: "krivi upit"});     //korinik je poslao loše definiran upitnik 
    }

})


app.listen(port, () => console.log(`Slušam na portu ${port}!`))