//rota inicial
global.app.get('/registo', function(req, res) {
    global.app.use(global.express.static('views'));
    global.app.use('/template', global.express.static('views/template'));
    res.sendFile(global.root + '/views/template/' + 'registo.html');
});


//gravação dos dados do registo.
global.app.post('/save', function(req, res) {
    console.log('body: ' + JSON.stringify(req.body));

    global.modelUser.save(req.body.name, req.body.password, req.body.username, req.body.data_de_nascimento, req.body.telemovel, req.body.morada, req.body.genero, req.body.email);

    console.log("route - " + req.body.name + " " + req.body.telemovel);

    /* Mensagem de Sucesso*/
  //  res.end({ "success": true, "status": 200 }); --> ERA ESTE O ERRO CHICO !
    res.end('{"success": "Update Successfully", "status" : 200}');

});


//rota de leitura
global.app.get('/read', function(req, res) {
    //chamada da função read que está no user.model
    global.modelUser.read(function(err, data) {
        if (err) {
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








/*      GETS AND POSTS PARA O LOGIN        */


global.app.post('/postLogin', function(req, res) {
    //  console.log("Logged")
    console.log("Logged:" + req.body.username + "#");
    global.modelUser.getUsers( req.body.username,  req.body.id_user,req.body.email,  function(err, data) {
        if (err) {
            res.send({ success: false });
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
           //Model data receive
            console.log("route - " + req.body.email);
            data.forEach(function(row) {
                console.log("Account Id:" + row.id_user)
                req.session.id_user = row.id_user;
                console.log("Account Username: " + row.username);
                req.session.username = row.username;
            })
            global.id_user = req.session.id_user;
            console.log("Session name:" + req.session.nome)
            console.log("Session ID:  " + req.session.id_user);
            var log = [req.session.username, req.body.id_user ,req.body.email]; //stores data into an array 
            res.send(log);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
})

global.app.post('/doLogin', function(req, res) {
    //chamada da função que está no registo.model e envio dos parâmetros
    global.modelUser.doLogin(req.body.username, req.body.password, function(err, data) {
        if (err) {
            // error handling code goes here
               console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            console.log("Sessão Iniciada")
            console.log("Dados:" + " "+ req.body.username +"#"+ req.body.password)
            res.send(data);
            //console.log("route - " + data);
            res.end({ "success": true, "status": 200 });
        }
    });
    //envio da mensagem de sucesso
    //res.end('{"success": "Update Successfully", "status" : 200}');
});


//teste 
global.app.get('/getUsers', function(req, res) {
    //chamada da função read que está no user.model
    global.modelUser.getUsers(function(err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            res.json(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});




