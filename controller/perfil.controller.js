var existe = " ";
var users = [];
var livros = [];
var requisicoes = []
var sessionStorage = window.sessionStorage;
var id_log = JSON.parse(sessionStorage.getItem("id_active"));
var username_log = JSON.parse(sessionStorage.getItem('user_active'))
var telPerfil = $('telImp').html()
var selfinv = document.getElementById('self-inv')

var generoPerfil = $('sexoImp').html()
var emailPerfil = $('emailImp').html()


$(document).ready(function() {

    getReq()

    //GET DOS USERS 
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
            perf()
        }
    });


    //GET DOS livros
    $.ajax({
        type: 'GET',
        url: '/selfInventario',
        contentType: 'application/json',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            data.forEach(function(row) {
                livros.push(row)
                // console.log(livros)
            });
            InventarioPessoal()
        }
    });




    /* * * * * * * * * * * * * * * * * * * * * * * * */

    /* * * * * * * * * * * * * * * * * * * * * * * * */

}) // fim do document ready



function perf() {
    for (var j = 0; j < users.length; j++) {
        // console.log(id_log)
        // console.log('2121')
        if (id_log == users[j].id_user) {
            // console.log(users[j])
            $("#nomeImp").text(users[j].name)
            $("#dataImp").text(users[j].data_de_nascimento)
            $("#telImp").text(users[j].telemovel)
            $("#moradaImp").text(users[j].morada)
            $("#sexoImp").text(users[j].genero)
            $("#emailImp").text(users[j].email)

            /*
            script para mudar o formato da data de nascimento
            */
            

        }
    }
}



/*

Verifica se  :
-O livro estiver Indiponivel :
.Por opção do utilizador->pode tornar indisponivel
.ou por estar numa requiseição -> não pode fazer nada

-O livro estiver Disponivel: 
-Pode apagar o mesmo 

Conclusão: Não pode apagar um livro indisponivel , porque não vale a pena , ele apenas aparece no perfil e no catalogo sem qualquer ação
*/
function InventarioPessoal() {
    //debugging para ver se foi pedido com sucesso
    
    //criação de uma tabela para demonstração dos resultados recebidos
    var txt = "";
    txt += "<div class='table-responsive'>";
    txt += "<table id='tblLivrosPerfil' class='table table-sm'>";
    txt += "<thead color:white '>";
    txt += "<tr> <th>#ID</th><th>Titulo</th><th>Autor</th><th>Género</th><th>Ano De Lançamento</th><th>Disponibilidade</th></tr></thead><tbody>";
    //percorrer a variável data e por cada row cria a linha da tabela com os dados presentes
    for (var i = 0; i < livros.length; i++) {

        if (livros[i].id_prop == id_log) {

            if (livros[i].disp_req == "Indisponivel") {

                txt += "<tr><td class='id_row" + i + "'>" + livros[i].id_livro + "</td><td>" + livros[i].titulo +
                    "</td><td>" + livros[i].autor + "</td><td>" + livros[i].genero + "</td><td>" + livros[i].ano_lanc + "</td><td>" +
                    livros[i].disp_req + "</td></tr>"
            }


            else {
                // console.log(i)
                txt += "<tr><td class='id_row" + i + "'>" + livros[i].id_livro + "</td><td>" + livros[i].titulo +
                    "</td><td>" + livros[i].autor + "</td><td>" + livros[i].genero + "</td><td>" + livros[i].ano_lanc + "</td><td>" +
                    livros[i].disp_req + "</td><td>" + "<input  value='Apagar Livro' type='button' class='theButton' id='ma' rownr='" + i + "'>" + "</tr>"

            }

        }


    }
    txt += "</tbody></table></div>";
    //envia a tabela construida para a view e mostra o resultado (txt) no object com ID result
    $("#self-inv").html(txt);

}


//função para apagar os livros pelo inventário 
$(document).on("click", ".theButton", function() {
    var livro_click = $('.id_row' + $(this).attr('rownr') + '').text()

    var r = confirm('Tem a certeza que quer apagar o livro ?')
    var data3 = {}
    data3.id_livro = livro_click

    if (r == true) {
        //  colocar aqui o ajax
        //chamada AJAX para envio dos dados para o servidor via POST convertendo o array em JSON
        $.ajax({
            type: 'POST',
            url: '../deleteLivro',
            data: data3,
            dataType: 'json',
            // contentType: 'application/json',
            success: function(result) {
                //Status 200 means succsess se der envia Alerta 
                console.log(`estou aki com o status ${result.status}`)
                if (result.success) {
                    alert("Livro Nº:" + " " + livro_click + " " + "Apagado ! ");
                    window.location.reload()
                }
            },
            error: function(data_delete) { console.log(data_delete) }
        });
    }

    else {
        alert('Ação Cancelada !');
    }

});


function getReq() {

    $.ajax({
        type: 'GET',
        url: '/readReq',
        contentType: 'application/json',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            data.forEach(function(row) {
                requisicoes.push(row)
                // console.log(requisicoes)
            });
        }

    });
}
