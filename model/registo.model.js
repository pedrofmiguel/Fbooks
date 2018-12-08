var existe = "";
/*      Função Save         */
function save(name, password, username, data_de_nascimento, telemovel, morada, genero, email) {
    //receber os dados do formulário que são enviados por post e guarda em objeto JSON
    var post = {
        name: name,
        password: password,
        username: username,
        data_de_nascimento: data_de_nascimento,
        telemovel: telemovel,
        morada: morada,
        genero: genero,
        email: email
    };
    console.log("O post é " + post.name);

    var query = global.connect.con.query("INSERT INTO users (name, password, username, data_de_nascimento, telemovel, morada,genero,email) VALUES ('" + post.name + "', '" + post.password + "', '" + post.username + "', '" + post.data_de_nascimento + "', '" + post.telemovel + "', '" + post.morada + "','" + post.genero + "','" + post.email + "')", function(err, rows, fields) {
        console.log("Utilizador Registado " + query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            console.log('Error while performing Query.', err);
        }
    })

}; //fim da função de save . //fim da função de save 

/* * * * * * * * * * * *  * * *  * * *  */ 


/* Unica Função que funciona */
function doLogin(username, password, callback) {
    var post = {
        username: username,
        password: password
    }
    console.log("item : " + post.username + ' ' + post.password);
    var sql;
    //vai buscar o username e a pass ao sql .
    sql = 'SELECT username, password from users where username = "' + post.username + '" and password = "' + post.password + '"';

    // verifica se existe na base de dados ou nao
    global.connect.con.query(sql, function(err, rows, fields) {
        console.log("nice")
        if (!err) {
            console.log("rows - " + rows.length)
            if (rows.length == 0) { // é 0 entao nao existe da BD
                existe = "denied";
                console.log("mode - nao existe");
            }

            else {
                existe = "aproved";
                console.log("mode - existe")
                console.log(rows)
            }
        }
        else {
            console.log('Error while performing Query.', err);
        }
        callback(null, existe);
    });
}


function getUsers(callback) {
    global.connect.con.query('SELECT id_user, username, email,name,data_de_nascimento,telemovel,morada,genero,email FROM users', function(err, rows, fields) {
        if (!err) {
            //gravar os resultados rows no callback
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

/* fim */

//exportar as funções
module.exports = {
    // read: read,
    save: save,
    doLogin: doLogin,
    getUsers: getUsers

};
