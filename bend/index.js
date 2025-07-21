let express = require("express")
const rt = require("./routes/rt")
let cors=require('cors')
require('dotenv').config();

const port = process.env.PORT || 5000;

let app=express()

app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>{
    res.send("Yup, it's working")
})

app.use('/',rt)

app.listen(port)