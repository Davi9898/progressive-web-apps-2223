import express from 'express';
import { engine } from 'express-handlebars';
import { fetchRijksApiList } from './functions/fetchRijksApiList.js';
import { fetchRijksApiObject } from './functions/fetchRijksApiObject.js';
import compression from 'compression';

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Compression
app.use(compression())

// Serving files
app.use(express.static('public'));

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
        console.log(data)
        res.render('home', { kunstObjectenLijst: data});
    })
});


app.listen(port);