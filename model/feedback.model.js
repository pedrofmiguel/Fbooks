function saveFeed(titulo_livro, user_prop, desc_feedback, rating_livro) {

    //console.log(logi) 
    //receber os dados do formulário que são enviados por post e guarda em objeto JSON
    var post = {
        titulo_livro: titulo_livro,
        user_prop: user_prop,
       desc_feedback: desc_feedback,
        rating_livro: rating_livro
    }

    console.log("Feed back do Livro " + post.titulo_livro);
    
    var query = global.connect.con.query("INSERT INTO feedback (titulo_livro ,user_prop,desc_feedback,rating_livro) VALUES ('" + post.titulo_livro + "','" + post.user_prop + "', '" + post.desc_feedback + "', '" + post.rating_livro + "')", function(err, rows, fields) {
        console.log("Feed Registado " + query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            alert("já existente ! ")
            console.log('Error while performing Query.', err);
        }
    })

}; //fim da função de save .




function readFeed(callback) {
    //criar e executar a query de leitura na BD
    global.connect.con.query('SELECT id_feedback, titulo_livro, user_prop, desc_feedback, rating_livro from feedback order by id_feedback', function(err, rows, fields) {
        if (!err) {
            //gravar os resultados rows no callback
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};



module.exports = {
    readFeed: readFeed,
    saveFeed: saveFeed
};