const mongoose = require('mongoose');
const express = require('express');
const app = express();
    const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv/config');

// middleware 
app.use(cors())
app.use(bodyParser.json())

const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

const port = 8000;

// connect mongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModified: false
}).then(()=>{
    console.log("Database connection successfully");
}).catch(e=>{
    console.log("error in DB connection:-\n"+e);
})

// middleware on posts route
// app.use('/posts', ()=>{
//     console.log("This is a middleware for post.");
// })

// connect db




// listen to server
app.listen(port, ()=>console.log(`Server running at http://localhost:${port}`))