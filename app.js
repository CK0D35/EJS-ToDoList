const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

let items = [];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Server has started on port 3000.");
})

app.get('/', (req, res) => {
    let day = date.getDate();
    // let day = date.getDay();
    res.render('list', { listTitle: day, newListItems: items });

});

app.get('/work', (req, res) => {
    res.render('list', { listTitle: "Work List", newListItems: workItems });
});

app.get('/about', (req, res) => {
    res.render('about');
})

app.post('/', (req, res) => {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
});

