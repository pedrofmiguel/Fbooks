function selfInventario(callback) {
    //criar e executar a query de leitura na BD
    global.connect.con.query('SELECT id_livro, titulo, autor, genero,ano_lanc,editora,disp_req,id_prop from livro order by id_livro', function(err, rows, fields) {
        if (!err) {
            //gravar os resultados rows no callback
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function deleteLivro(id_livro) {
    //receber os dados do formuário que são enviados por post e guarda em objeto JSON
    var post = { id_livro: id_livro };
    var query = global.connect.con.query('DELETE FROM livro where ?', post, function(err, rows, fields) {
        
        // `update from livro set desp='d' where id_livro${post}`
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else{
               console.log('Error while performing Query.', err);
        }
    });
   
}

 /* Teste para ver se isto realmente funciona    */
 //exportar as funções
 module.exports = {
     selfInventario: selfInventario,
     deleteLivro: deleteLivro

 };
 