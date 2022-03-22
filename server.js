const express = require('express');
const app = express();
const path = require('path');
const VIEWS = path.join(__dirname, './');
const router = express.Router();

app.use(express.static(__dirname + '/public'));

app.use(express.json());

app.get('/', (req, res) => res.sendFile('/public/puzzle.html', { root : VIEWS }));
app.get('/app.js', (req, res) => res.sendFile('/app.js', { root : VIEWS }));
app.get('/jquery.js', (req, res) => res.sendFile('/jquery.js', { root : VIEWS }));

// app.get('/', (req, res) => {
//   res.send('Slider Puzzle');
// })

app.listen(8080, () => console.log('listening on port 8080', __dirname));