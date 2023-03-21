import express from 'express';
import { engine } from 'express-handlebars';
import { fetchRijksApiList } from './functions/fetchRijksApiList.js';
import { fetchRijksApiObject } from './functions/fetchRijksApiObject.js';

const compression = require('compression')
const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// app.get('/kunstobject', (req, res) => {
//     res.render('detail');
// })
app.use(compression())
app.use(express.static('public'));
app.get('/kunstobject/:objectId', (req, res) => {

    fetchRijksApiObject(req.params.objectId).then((data) => {
        res.render('detail', { kunstObject: data});
    })
    
    // res.send(req.params)
    //{ suggestedChamps: fakeApi() }

})

app.get('/', async (req, res) => {
    
    fetchRijksApiList().then((data) => {
        console.log(data)
        res.render('home', { kunstObjectenLijst: data});
    })
});



app.listen(port);