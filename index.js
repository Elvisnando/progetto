const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
var cont =2;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var lista= [
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

//ecco il cam

app.post('/inserisci',function(req,res){
    
    var dip =  req.body.dips;
    var not = req.body.nota;
  var item = {ID:cont, Dipartimento: dip, nota : not };
  lista.push(item);
  cont++;
  res.send('Nota inserita con successo');
  

});

app.post('/stampa',function(req,res){

    var risultato ='';
    var c = 0;
    while(c<lista.length){
        risultato = risultato + ' ' + lista[c].Dipartimento + lista[c].nota  +  '<br></br>';
        c++;
    }
  res.send(risultato);

});




app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

