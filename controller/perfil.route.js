global.app.get('/', function(req, res) {
    console.log('GET /');
    //leitura do ficheiro estático - view do user
    var html = global.fs.readFileSync('.views/perfil.html'); //eu tinhamudado para ./template .> 
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html);   
});
   

 global.app.get('/perfil', function(req, res) {
    global.app.use(global.express.static('views')); 
    global.app.use(global.express.static('views/template'));   
    res.sendFile(global.root + '/views/template/' + 'perfil.html');
}); 

global.app.get('/selfInventario', function(req, res) {
    //chamada da função read que está no registodelivros.model 
    global.modelPerfil.selfInventario(function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
         ///   var username_sessao = req.session.username;
            res.send(data);
            console.log
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});


global.app.post('/deleteLivro', function(req, res) {
   console.log('body: ' + JSON.stringify(req.body));
    //chamada da função save que está no registo.model e envio dos parâmetros
  //save dos param dos livros
    global.modelPerfil.deleteLivro(req.body.id_livro);

    //envio da mensagem de sucesso
    res.send({success : true, status : 200});

});