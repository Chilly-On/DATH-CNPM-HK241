const express = require('express')
const path = require('path')
const Route = require('./src/main/routes')

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// only the basic; both route, controller, and models in same file
//app.get("/", (req, res)=>{
//    res.sendFile(path.join(__dirname, '..', 'frontend', 'home.html'));
//})
app.use(Route)

app.listen(port, () => console.log(`app listening on port ${port}`))
