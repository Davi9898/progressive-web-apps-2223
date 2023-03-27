import express from 'express';
import { engine } from 'express-handlebars';
import { fetchRijksApiList } from './functions/fetchRijksApiList.js';
import { fetchRijksApiObject } from './functions/fetchRijksApiObject.js';
import compression from 'compression';
import https from "https";
import fs from "fs";
import mime from 'mime-types';


const app = express();
const port = 3000;

const options = {
    key: fs.readFileSync("./config/localhost.key"),
    cert: fs.readFileSync("./config/localhost.crt"),
    passphrase: "test"
  };

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Compression
app.use(compression())


// Serving files
app.use(express.static('dist'));

app.get('/service-worker.js', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'service-worker.js');
    const contentType = mime.contentType(path.extname(filePath));
    res.setHeader('Content-Type', contentType);
    res.sendFile(filePath);
  });

// Detail route 
app.get('/kunstobject/:objectId', (req, res) => {

    // Geven object ID mee en die returned data. Dan renderen we de view
    fetchRijksApiObject(req.params.objectId)
    .then((data) => {
        res.render('detail', { kunstObject: data});
    })
    
})

// Results route

app.get('/search', (req, res) => {
    
    // Geven object ID mee en die returned data. Dan renderen we de view
    fetchRijksApiList(req.query.search)
    .then((data) => {
        res.render('results', { kunstObjectenLijst: data});
    })
    
})

// Home route
app.get('/', (req, res) => {

    fetchRijksApiList()
    .then((data) => {
        // console.log(data)
        res.render('home', { kunstObjectenLijst: data});
    })
});


app.listen(port);

https.createServer(options, app).listen(8080, () => {
    console.log(`HTTPS server started on port 8080`);
  });