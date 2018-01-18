const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
var cont =2;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const lista= [
    {
		ID: 1,
        Dipartimento: "Matematica",
		nota: "Nota inserita da fare "
        
	},
   
];





app.get('/',function(req,res){
//res.send('sono il servr');

res.sendFile(__dirname + '/index.html');
});

app.post('/login',function(req,res){
    var use = req.body.username;
    var dip =  req.body.dips;
    var not = req.body.nota;
  //  res.send('ciaoooooooooooooooooooooooo');
  var item = [{ID:cont, Dipartimento: dip, not }];
  lista.push(item);
  cont++;

  
  
  res.send(use);
  

});

app.post('/inserisci',function(req,res){
    
    var dip =  req.body.dips;
    var not = req.body.nota;
  var item = [{ID:cont, Dipartimento: dip, nota : not }];
  lista.push(item);
  cont++;
  res.send('Nota inserita con successo');
  

});




app.post('/stampa',function(req,res){
    var c =0;

    
    
  res.send(lista);

});




app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

