// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://test:jk984319@ds127655.mlab.com:27655/my-todo');

//Create a schema - this is blueprint
var todoSchema =  new mongoose.Schema({
  item: String
});
// create a model of the schema
var Todo = mongoose.model("Todo", todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){

   app.get('/todo', function(req,res){
     // get data from mongodb and pass it to view
     Todo.find({}, function(err, data){
       if(err) throw err;
       res.render('todo', {todos: data});
     });

   });

   app.post('/todo',urlencodedParser, function(req,res){
     // get data from view and add it to mongodb
     var newTodo = Todo(req.body).save(function(err, data){
       if(err) throw err;
       res.json(data);
     });

   });

   app.delete('/todo/:item', function(req,res){
     // delete the requested item from mongodb
     Todo.find({item: req.params.item.replace(/\-/g, "")}).remove(function(err, data){
       if(err) throw  err;
       res.json(data);
     });

   });


};
