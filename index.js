const express = require('express'),
    bodyParser = require('body-parser');
    


var path = require('path');

const app = express();
var cont =2;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//sett
app.set(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs');


var lista= [
    {
		ID: 1,
        Dipartimento: "Matematica",
		nota: "Nota inserita da fare "
        
	},
   
];
var amministratori= [
    {
		
        nomeutente: "elvis",
		pasword: "elvis"
        
    },
    
    {
		
        nomeutente: "endrit",
		pasword: "endritnazifi"
        
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
  res.sendFile(__dirname + '/notainserita.html');
  
  

});

/*app.post('/stampa',function(req,res){

    var risultato ='';
    var c = 0;
    while(c<lista.length){
        risultato = risultato + ' ' + lista[c].Dipartimento + lista[c].nota  +  '<br></br>';
        c++;
    }
  res.send(risultato);

});*/


app.post('/logadmin',function(req,res){
    var c=0;
    var  s=0;
    var nome = req.body.fname;
    var pasword = req.body.pass;
    console.log(nome +" "+ pasword);
    var risultato ='';
    var t = 0;
    while(t<lista.length){
        risultato = risultato + ' ' + lista[t].Dipartimento + lista[t].nota  +  '\n ';
        t++;
    }





    while(c<amministratori.length){

        if(nome == amministratori[c].nomeutente && pasword == amministratori[c].pasword){

            res.render('lista', {lista : lista});
            console.log("ci siamo");
            s=1;
            break;
        }
        c++;
    }
    //window.alert("nome o pass errate");
    if(s==0){
    res.sendFile(__dirname + '/utenten.html');
    }

  
  
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});




