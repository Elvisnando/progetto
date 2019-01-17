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
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

/*var trasporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'elvis.nazifi94@gmail.com',
            clientId: '388814949827-jk62mj3slrdnkl9oenjrapcagm4pjnnl.apps.googleusercontent.com',
            clientSecret: 'md2-J7V-Z7d3Il7HkvweG4bK',
            refreshToken: '1/PO7EF76AUVsWJ7r9bu4qo1Xry9rog4iEUMMMfVSTXcc'
        })
    }

});*/

/*var trasporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'elvis.nazifi94@gmail.com',
           pass: 'avrillavigne1'
       }
   });

var mailOption = {
    from: 'Elvis <elvis.nazifi94@gmail.com>',
    to: 'mirjeta.nazifi@gmail.com',
    subject: 'Nuova nota inserita',
    text: 'Controllare lista note'
}

trasporter.sendMail(mailOption, function(err,res) {
    if(err){
        console.log(err);
    } else {
        console.log('email mandata');
    }

});*/





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
        pasword: "elvis",
        email: "nazifi70@gmail.com"
        
    },
    
    {
		
        nomeutente: "endrit",
        pasword: "endritnazifi",
        email: "mirjeta.nazifi@gmail.com"
        
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
     var ca=0;
     while(ca<amministratori.length){


        var trasporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'elvis.nazifi94@gmail.com',
                   pass: ''
               }
           });
        
        var mailOption = {
            from: 'Elvis <elvis.nazifi94@gmail.com>',
            to: amministratori[ca].email,
            subject: 'Nuova nota inserita',
            text: 'Questa è la nuova nota inseira dal dipartimento di:'+item.Dipartimento+' '+item.nota
        };
        
        trasporter.sendMail(mailOption, function(err,res) {
            if(err){
                console.log(err);
            } else {
                console.log('email mandata');
            }
        
        });

        ca++;
     }

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
