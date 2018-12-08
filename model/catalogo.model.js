//função que vai ler os livros da BD 
//função de leitura que retorna o resultado no callback
function readLivro(callback) {
    //criar e executar a query de leitura na BD
    global.connect.con.query('SELECT titulo, autor, genero,ano_lanc,editora,disp_req from livro order by ano_lanc', function(err, rows, fields) {
        if (!err) {
            //gravar os resultados rows no callback
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};


 /* Teste para ver se isto realmente funciona    */
//exportar as funções
module.exports = {
    readLivro: readLivro,
   // saveLivro: saveLivro
};
