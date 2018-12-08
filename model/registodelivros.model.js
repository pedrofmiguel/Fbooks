function saveLivro(titulo, autor, genero, ano_lancamento, editora, descricao, capa, disp_req, id_prop, user_prop) {

    //console.log(logi) 
    //receber os dados do formulário que são enviados por post e guarda em objeto JSON
    var post = {
        titulo: titulo,
        autor: autor,
        genero: genero,
        ano_lancamento: ano_lancamento,
        editora: editora,
        descricao: descricao,
        capa: capa,
        disp_req: disp_req,
        id_prop: id_prop,
        user_prop: user_prop
    }

    console.log("O post é " + post.name);
    var query = global.connect.con.query("INSERT INTO livro (titulo,autor,genero,ano_lanc,editora,descricao,capa,disp_req,id_prop,user_prop) VALUES ('" + post.titulo + "', '" + post.autor + "', '" + post.genero + "', '" + post.ano_lancamento + "', '" + post.editora + "', '" + post.descricao + "','" + post.capa + "','" + post.disp_req + "', '" + post.id_prop + "', '" + post.user_prop + "')", function(err, rows, fields) {
        console.log("Livro Registado " + query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            alert("livro já existente ! ")
            console.log('Error while performing Query.', err);
        }
    })

}; //fim da função de save .


//função que vai ler os livros da BD 
//função de leitura que retorna o resultado no callback
function readLivro(callback) {
    //criar e executar a query de leitura na BD
    global.connect.con.query('SELECT id_livro, titulo, autor, genero,ano_lanc,editora,disp_req,user_prop,id_prop from livro order by id_livro', function(err, rows, fields) {
        if (!err) {
            //gravar os resultados rows no callback
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};




//exportar as funções
module.exports = {
    readLivro: readLivro,
    saveLivro: saveLivro
};
