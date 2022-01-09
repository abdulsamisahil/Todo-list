const bodyParser = require('body-parser'); 

const mongoose = require('mongoose'); 

const dotenv = require('dotenv'); 

dotenv.config(); 

mongoose.connect(process.env.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); 

const todoSchema = new mongoose.Schema({
    item: String
}); 

const Todo = mongoose.model('Todo-list', todoSchema); 

const urlencodedParser = bodyParser.urlencoded({extended: false}); 

module.exports = app => {

    app.get('/todo', (req, res) => {

        Todo.find({}, (error, data) => {

            if(error) throw error; 
            
            res.render('todo', {todos: data});
        });
        
    });

    app.post('/todo', urlencodedParser, (req, res) => {

        Todo(req.body).save((error, data) => {

            if(error) throw error; 
            
            res.json(data); 

        });        

    });

    app.delete('/todo/:item', (req, res) => {

        Todo.find({item: req.params.item.replace(/\-/g, " " )}).remove((error, data) => {
            
            if(error) throw error; 

            res.json(data); 
        });
    });
}