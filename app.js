const express = require('express'); 

const todoController = require('./controllers/todoController'); 

const app = express(); 

const port = 3000; 

app.set('view engine', 'ejs'); 

app.use(express.static('./public')); 

todoController(app); 

app.listen(port, () => {
    console.log('Server is listening on port no. ', port); 
});