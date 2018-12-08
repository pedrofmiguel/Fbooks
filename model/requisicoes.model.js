/*Vai analisar as requisições todas */
function read(callback) {
    //criar e executar a query de leitura na BD
    global.connect.con.query('SELECT id_req, id_livro,id_user,nome_user,titulo_livro,aprovado,id_prop from requisicao order by id_req', function(err, rows, fields) {
        if (!err) {
            console.log('Requisições Carregadas')
            //gravar os resultados rows no callback
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}


function saveReq(id_livro, id_user, nome_user, titulo_livro, aprovado, id_prop) {
    //console.log(logi) 
    //receber os dados do formulário que são enviados por post e guarda em objeto JSON
    var post = {
        id_livro: id_livro,
        id_user: id_user,
        nome_user: nome_user,
        titulo_livro: titulo_livro,
        aprovado: aprovado,
        id_prop: id_prop
    }
    var query = global.connect.con.query("INSERT INTO requisicao (id_livro,id_user,nome_user,titulo_livro,aprovado,id_prop) VALUES ('" + post.id_livro + "', '" + post.id_user + "', '" + post.nome_user + "', '" + post.titulo_livro + "', '" + post.aprovado + "', '" + post.id_prop + "')", function(err, rows, fields) {
        console.log("Requisição Efetuada " + query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            alert("Erro na Requisição!")
            console.log('Error while performing Query.', err);
        }
    })
}; //fim da função de save .

function livroIndisponivel(id_livro) {
    var put = { id_livro }
    //console.log(logi) 
    //receber os dados do formulário que são enviados por post e guarda em objeto JSON

    var query = global.connect.con.query("UPDATE livro SET disp_req = 'Indisponivel' WHERE ?", put, function(err, rows, fields) {
        console.log("Alterado o Estado do Livro " + query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            alert("Erro no UPDATE!")
            console.log('Error while performing Query.', err);
        }
    })
}


/*Negar A Requisição*/
function negarReq(id_req) {
    var put = { id_req }
    //console.log(logi) 
    //receber os dados do formulário que são enviados por post e guarda em objeto JSON

    var query = global.connect.con.query("UPDATE requisicao SET aprovado = 'Negada' WHERE ?", put, function(err, rows, fields) {
        console.log("Alterado o Estado da Requisição " + query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            alert("Erro no UPDATE!")
            console.log('Error while performing Query.', err);
        }
    })

}




/*Aprovar a Requisição*/
function aproveReq(id_req) {
    var put = { id_req }
    //console.log(logi) 
    //receber os dados do formulário que são enviados por post e guarda em objeto JSON

    var query = global.connect.con.query("UPDATE requisicao SET aprovado = 'Aprovada' WHERE ?", put, function(err, rows, fields) {
        console.log("Alterado o Estado da Requisição " + query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            alert("Erro no UPDATE!")
            console.log('Error while performing Query.', err);
        }
    })

}


/*Aprovar a Requisição*/
function deleteReq(id_req) {
    var put = { id_req }
    //console.log(logi) 
    //receber os dados do formulário que são enviados por post e guarda em objeto JSON

    var query = global.connect.con.query(" DELETE FROM requisicao WHERE ?", put, function(err, rows, fields) {
        console.log("Apagada a Requisição " + query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            alert("Erro no UPDATE!")
            console.log('Error while performing Query.', err);
        }
    })
}


function devolverLivro(id_livro) {
    var put = { id_livro }
    //console.log(logi) 
    //receber os dados do formulário que são enviados por post e guarda em objeto JSON
    var query = global.connect.con.query("UPDATE livro SET disp_req = 'Disponivel' WHERE ?", put, function(err, rows, fields) {
        console.log("Alterado o Estado do Livro " + query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            alert("Erro no UPDATE!")
            console.log('Error while performing Query.', err);
        }
    })
}







//exportar as funções
module.exports = {
    read: read,
    saveReq: saveReq,
    livroIndisponivel: livroIndisponivel,
    aproveReq: aproveReq,
    negarReq: negarReq,
    deleteReq:deleteReq,
    devolverLivro:devolverLivro
};
