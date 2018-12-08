global.app.get('/', function(req, res) {
    console.log('GET /');
    //leitura do ficheiro estático - view do user
    var html = global.fs.readFileSync('.views/catologo.html'); //eu tinhamudado para ./template .> 
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html);   
});
   
//rota de leitura da BD
global.app.get('/readLivro', function(req, res) {
    //chamada da função read que está no registodelivros.model 
    global.modelLivros.readLivro(function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            console.log("resultou***")
            //envio para o cliente dos dados retornados pelo model
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});



global.app.get('/readFeed', function(req, res) {
    //chamada da função read que está no feedback.model 
    global.modelFeedback.readFeed(function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            console.log("Feed Read")
            //envio para o cliente dos dados retornados pelo model
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});


//gravação dos dados do registo.
global.app.post('/saveFeed', function(req, res) {
    console.log('body do feedback: ' + JSON.stringify(req.body));
    //chamada da função save que está no registo.model e envio dos parâmetros
  //save dos param dos livros
    global.modelFeedback.saveFeed(req.body.titulo_livro, req.body.user_prop,req.body.desc_feedback,req.body.rating_livro);
    console.log("Feedou")
    //envio da mensagem de sucesso
     res.send({success : true, status : 200});
});






/*  Rota Do catalogo  */
 global.app.get('/catalogo', function(req, res) {
    global.app.use(global.express.static('views')); 
    global.app.use(global.express.static('views/template'));   
    res.sendFile(global.root + '/views/template/' + 'catalogo.html');
}); 




