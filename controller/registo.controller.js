var users = [];
var sessionStorage = window.sessionStorage;
console.log(sessionStorage)
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/getUsers',
        contentType: 'application/json',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            data.forEach(function(row) {
                users.push(row)
                //   console.log(users)
            });
        }
    });
})



/* FORMULÁRIO DO REGISO DE UTILIZADORES */

$('#formRegisto').validator().on('submit', function(event) {
    console.log("Validate")
    //se submeter com erros
    if (event.isDefaultPrevented()) {
        alert("Por favor Preencha Corretamente o Formulário") // handle the invalid form...
    }
    //
    else {

        event.preventDefault();

        //carregamento dos dados do form para variávels JS
        //Dados do lado do cliente
        var data = {};
        data.name = $('#name').val();
        data.password = $("#password").val();
        data.username = $("#username").val();
        data.data_de_nascimento = $("#data_de_nascimento").val();
        data.telemovel = $("#telemovel").val();
        data.morada = $("#morada").val();
        data.genero = $("#genero").val();
        data.email = $("#email").val();
        //debugging para ver os dados que foram enviados
        console.log("Utilizador:" + "" + data.username + "  " + "Registado");
        $('#formRegisto')[0].reset();
        //chamada AJAX para envio dos dados para o servidor via POST convertendo o array em JSON
        $.ajax({
            type: 'POST',
            url: '../save',
            data: data,
            dataType: 'json',
            // contentType: 'application/json',
            success: function(result) {
                // console.log("InEs ")

                if (result.status == 200) {
                    alert("Registo Guardado com Sucesso");
                }

                else {
                    alert("Algo correu mal ! ")
                }
                // refreshCatalogo()
            },
            error: function(data) { console.log("Erro" + ": " + (data)) }
        });
    }
});

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * */

$('#formLogin').validator().on('submit', function(e) {
    console.log("Form Submited")
    if (e.isDefaultPrevented()) {
        alert("form with errors") // handle the invalid form...
    }
    else {

        e.preventDefault();
        //carregamento dos dados do form para variável JS
        //como a chamada é feita do lado do cliente o carregamento é com jQuery
        var data = {}; /*  Recebe os dados do Formulário    */
        data.username = $("#usernameLogin").val();
        data.password = $("#passwordLogin").val();
        // data.id_user = req.body.id_user
        // data.id =  global.id_user //não vai funcionar mas testa-se 
        console.log(data)

        console.log("Dados Inseridos" + "  " + data.username);
        $.ajax({
            type: 'POST',
            url: '../doLogin',
            data: data,
            //primeira função ajax 
            success: function(result) {
                if (result == "denied") {
                    alert("Email ou palavra-pass incorretos");
                }
                else {
                    for (var i = 0; i < users.length; i++) {
                        if (data.username == users[i].username) {
                            sessionStorage.setItem("id_active", JSON.stringify(users[i].id_user));
                            sessionStorage.setItem("user_active", JSON.stringify(users[i].username));
                            sessionStorage.setItem("email_active", JSON.stringify(users[i].email));
                        }

                    }
                    alert("Sessão Iniciada")

                    window.location.replace("/");
                }
            },
            error: function(data) { console.log("Data Password : " + "   " + data.password) }

        });
    }
});

/* * * * * * * * * * * * * * * * */

/*  Por favor não apagar isto   */
