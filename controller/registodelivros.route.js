//rota inicial
global.app.get('/registolivros', function(req, res) {
   global.app.use(global.express.static('views'));
global.app.use('/template', global.express.static('views/template'));
res.sendFile(global.root + '/views/template/' + 'registodelivros.html');
});


//gravação dos dados do registo.
global.app.post('/saveLivro', function(req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    //chamada da função save que está no registo.model e envio dos parâmetros
  //save dos param dos livros
    global.modelLivros.saveLivro(req.body.titulo, req.body.autor, req.body.genero, req.body.ano_lancamento, req.body.editora, req.body.descricao, req.body.capa, req.body.disp_req,req.body.id_prop,req.body.user_prop);
    console.log("route - " + req.body.titulo + " " + "by:" + req.body.autor)
    //envio da mensagem de sucesso
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});


//rota de leitura
global.app.get('/readLivro', function(req, res) {
    //chamada da função read que está no registodelivros.model 
    global.modelLivros.readLivro(function(err, data) {
        
        if (err){
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});



