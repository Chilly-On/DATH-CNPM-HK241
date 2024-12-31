const express = require('express')
const Route = require('./src/main/routes')

const app = express();
const port = 3000;

app.use(express.json())

app.get("/", (req, res)=>{ //<<----test 
    res.send("this is RESTAPI")
})

app.use('/api/main', Route)

app.listen(port, () => console.log(`app listening on port ${port}`))
