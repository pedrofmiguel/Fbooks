global.app.get('/', function(req, res) {
    console.log('GET /');
    //leitura do ficheiro estático - view do user
    var html = global.fs.readFileSync('.views/requisicoes.html'); //eu tinhamudado para ./template .> 
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html);   
});
   

 global.app.get('/requisicoes', function(req, res) {
    global.app.use(global.express.static('views')); 
    global.app.use(global.express.static('views/template'));   
    res.sendFile(global.root + '/views/template/' + 'requisicoes.html');
}); 



/*rota para fazer Selects */
global.app.get('/readReq', function(req, res) {
    //chamada da função read que está no registodelivros.model 
    global.modelRequisicoes.read(function(err, data) {
        
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


//gravação dos dados do registo.
global.app.post('/saveRequisicao', function(req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    //chamada da função save que está no registo.model e envio dos parâmetros
  //save dos param dos livros
    global.modelRequisicoes.saveReq(req.body.id_livro,req.body.id_user,req.body.nome_user,req.body.titulo_livro,req.body.aprovado, req.body.id_prop);
    console.log("ID DO LIVRO: " + "  "+ req.body.id_livro + " $ " + " " + "ID DO USER:" + " "+ req.body.id_user)
    //envio da mensagem de sucesso
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});






//gravação dos dados do registo.
global.app.put('/updateLivro', function(req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    //chamada da função save que está no registo.model e envio dos parâmetros
  //save dos param dos livros
    global.modelRequisicoes.livroIndisponivel(req.body.id_livro);
    console.log("ESTADO DO LIVRO" + " " + req.body.id_livro)
    //envio da mensagem de sucesso
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});


/*ROUTE DE APROVAÇÃO DA REQ*/ 

//gravação dos dados do registo.
global.app.put('/aproveReq', function(req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    //chamada da função save que está no registo.model e envio dos parâmetros
  //save dos param dos livros
    global.modelRequisicoes.aproveReq(req.body.id_req);
   console.log("ESTADO Da REQUISIÇÃO" + " " + req.body.id_req)
    //envio da mensagem de sucesso
    res.end('{"success" : "Updated Successfully", "status" : 200}');
})



/*ROUTE DE NEGAÇÃO */ 
//gravação dos dados do registo.
global.app.put('/negarReq', function(req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    //chamada da função save que está no registo.model e envio dos parâmetros
  //save dos param dos livros
    global.modelRequisicoes.negarReq(req.body.id_req);
    console.log("ESTADO Da REQUISIÇÃO" + " " + req.body.id_req)
    //envio da mensagem de sucesso
    res.end('{"success" : "Updated Successfully", "status" : 200}');
})


global.app.post('/deleteReq', function(req, res) 
{
   console.log('body do delete: ' + JSON.stringify(req.body));
    //chamada da função save que está no registo.model e envio dos parâmetros
  //save dos param dos livros
    global.modelRequisicoes.deleteReq(req.body.id_req);
    //envio da mensagem de sucesso
    res.send({success : true, status : 200});

});



/*ROUTE DE Devolução */ 
//gravação dos dados do registo.
global.app.put('/devolverLivro', function(req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    //chamada da função save que está no registo.model e envio dos parâmetros
  //save dos param dos livros
    global.modelRequisicoes.devolverLivro(req.body.id_livro);
    console.log("Livro Tornado Disponivel" + " " + req.body.id_livro)
    //envio da mensagem de sucesso
   res.send({success : true, status : 200});
})