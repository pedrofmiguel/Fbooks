//rota inicial
//global.app.get('/', function(req, res) {
 //   global.app.use(global.express.static('views'));
 //   global.app.use('/template', global.express.static('views/template'));
 //   res.sendFile(global.root + './views/template/' + 'index.html');
//});

//rota inicial
/*global.app.get('/', function(req, res) {
    console.log('GET /');
    //leitura do ficheiro estático - view do user
    var html = global.fs.readFileSync('.views/index.html'); //eu tinhamudado para ./template .> 
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html);   
}); */
   
//rota de leitura
global.app.get('/read', function(req, res) {
    //chamada da função read que está no user.model
    global.modelIndex.read(function(err, data) {
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

 global.app.get('/', function(req, res) {
    global.app.use(global.express.static('views')); 
    global.app.use(global.express.static('./views/template'));   
    res.sendFile(global.root + '/views/template/' + 'index.html'); 
}); 





