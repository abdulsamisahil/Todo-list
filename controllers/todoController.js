const bodyParser = require('body-parser'); 

const mongoose = require('mongoose'); 

const dotenv = require('dotenv'); 

dotenv.config(); 
// Should change the uri to todo from .env if testing todo app
mongoose.connect(process.env.uri_easy_korkort, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); 

const todoSchema = new mongoose.Schema({
    item: String
}); 

const questionSchema = mongoose.Schema({
    Question: String, 
    Correct: String, 
    Incorrect: [String], 
    Image: String, 
    Explanation: String,
    Category: String, 
}, {collection: 'Questions'}); 

const Questions = mongoose.model('Questions', questionSchema); 

const Todo = mongoose.model('Todo-list', todoSchema); 

const urlencodedParser = bodyParser.urlencoded({extended: false}); 

module.exports = app => {

    app.get('/getallquestions', (req, res) => {
       
      //  res.send({message: 'req recieved...'}); 
            
            Questions.find({}, (error, data) => {
               
                if(error) throw error; 
    
                res.json(data); 
            }); 
    }); 

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