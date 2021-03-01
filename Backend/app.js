const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose');



require('dotenv').config();

const cors = require('cors');

const schema = require('./schema/schema')

const app = express()

app.use(cors());


// connect to db
 mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true} ,()=>{
        console.log("connected");
})


app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(5000,()=>console.log("working on 5000"))