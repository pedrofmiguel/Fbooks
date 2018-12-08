/* Alteração de Estado , Pedido de Requisição , Alocação das requisições para a outra pessoa */
var sessionStorage = window.sessionStorage;
var id_log = JSON.parse(sessionStorage.getItem("id_active"));
var username_log = JSON.parse(sessionStorage.getItem('user_active'))


var requisicoes = [];
var lista = []
var cont = 0
$(document).ready(function() {
    /* 
    Gets da BD PRO ARRAY
    */
    getLivros()
    getReq()
})



/*
Ver as requisições Pedidas ao utilizador Logado

*/
function reqPedidas() {
    //debugging para ver se foi pedido com sucesso
    //criação de uma tabela para demonstração dos resultados recebidos
    var txt = "";
    txt += "<table id='tblreqPedidas' class='table table-sm'>";
    txt += "<thead color:blue' >";
    txt += "<tr><th>ID</th><th>ID Do Livro</th><th>ID DoUtilizador</th> <th>Username</th> <th>Livro</th></tr></thead><tbody>";
    //percorrer a variável data e por cada row cria a linha da tabela com os dados presentes
    for (var i = 0; i < requisicoes.length; i++) {
        if (requisicoes[i].id_prop == id_log && requisicoes[i].aprovado == "Em Espera") {

            console.log('Tabela Das Requisiçõea Pedidas vai ser executada')
            txt += "<tr><td class='id_row" + i + "'>" + requisicoes[i].id_req + "</td><td>" + requisicoes[i].id_livro +
                "</td><td>" + requisicoes[i].id_user + "</td><td>" + requisicoes[i].nome_user + "</td><td>" + requisicoes[i].titulo_livro + "</td><td>" + requisicoes[i].aprovado +
                "</td><td>" + "<input  value='Aprovar' type='button' class='aproveBtn' id='ma' rownr='" + i + "'>" + "</tr>"
        }

    }
    //envia a tabela construida para a view e mostra o resultado (txt) no object com ID result
    txt += "</tbody></table></div>";
    $("#tblReqs").html(txt);
}

/*
Vai buscar os Livros à BD

*/
function getLivros() {
    console.log("entrou no refresh catalogo")
    //chamada ajax
    $.ajax({
        type: 'GET',
        url: '/readLivro',
        success: function(data) {
            data.forEach(function(row) {
                /*Envia os Livros para um Array*/
                lista.push(row)
                // console.log(lista)
            });
            /*Após receber os dados gera a tabela */
        }
    });
}

/*
Vai buscar as requisições 

*/
function getReq() {
    var seereqs = true
    $.ajax({
        type: 'GET',
        url: '/readReq',
        contentType: 'application/json',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            data.forEach(function(row) {
                requisicoes.push(row)
                console.log(requisicoes)
            });
            reqPedidas()
            minhasReqs()

        }

    });
}



/*

Aprovação ou negação das Requisições

*/
$(document).on("click", ".aproveBtn", function(e) {
    var livro_click = $(this).closest('tr').find('td:nth-child(2)').text()
    var data3 = {}
    var data = {}
    var r = confirm('Quer Aprovar a seguinte Requisição ?')
    /* * * * * * * * * * * * * * * */
    /* for para ir buscar alguns atributos */
    for (var x = 0; x < lista.length; x++) {


        data3.id_req = $('.id_row' + $(this).attr('rownr') + '').text();
        data.id_livro = livro_click

        console.log(data3)
    }

    if (r == true) {
        //  colocar aqui o ajax
        //chamada AJAX para envio dos dados para o servidor via POST convertendo o array em JSON

        /* 
        Se a requisição for feita vai tornar o estado da requisição em Aprovado e torna o livro Indisponivel 
        Se for negada torna a requisição em indisponivel e o livro volta a estar disponivel.
        
        */
        $.ajax({
            type: 'PUT',
            url: '../aproveReq',
            data: data3,
            dataType: 'json',
            // contentType: 'application/json',
            success: function(result) {

                //Status 200 means succsess se der envia Alerta !
                if (result.status == 200) {
                    alert('Requisição Aprovada!')
                    window.location.reload()
                }
            },
            error: function(data3) { console.log(data3) }
        });
    }
    else {
        alert('Requisição Negada!');
        $.ajax({
            type: 'PUT',
            url: '../negarReq',
            data: data3,
            dataType: 'json',
            // contentType: 'application/json',
            success: function(result) {
                if (result.status == 200) {
                    alert('Requisição Negada!')
                    $.ajax({
                        type: 'PUT',
                        url: '../devolverLivro',
                        data: data,
                        dataType: 'json',
                        // contentType: 'application/json',
                        success: function(result) {
                            //Status 200 means succsess se der envia Alerta 
                            //console.log(`estou aki com o status ${result.status}`)
                            
                            if (result.success) {
                              
                                alert('Estado do Livro Nº' + " " + livro_click + " " + 'Retornado ao Normal!')
                                window.location.reload()
                            }
                        },
                        error: function(data) { console.log(data) } //ID DO LIVRO
                    });
                }
            },
            error: function(data3) { console.log(data3) } // ID DA REQUISIÇÃO
        });

    }
    //	id da row -> $('.id_row'+$(this).attr('rownr')+'').text()
});






/* Minhas Requisições */
function minhasReqs() {
    console.log('My Reqs vai ser executada')
    //debugging para ver se foi pedido com sucesso
    //criação de uma tabela para demonstração dos resultados recebidos
    var txt = "";
    txt += "<table id='tblMinhasReqs' class='table table-sm'>";
    txt += "<thead color:blue' >";
    txt += "<tr> <th>ID</th> <th>Id Do Livro</th> <th>ID Do Utilizador</th> <th>Livro</th> <th id='estadotd'>Estado</th> </tr></thead><tbody>";
    //percorrer a variável data e por cada row cria a linha da tabela com os dados presentes
    for (var i = 0; i < requisicoes.length; i++) {
        /*se a requisição for aprovada*/
        if (requisicoes[i].id_user == id_log && requisicoes[i].aprovado == "Aprovada") {
            console.log('REQS APROV')
            txt += "<tr><td class='id_row" + i + "'>" + requisicoes[i].id_req + "</td><td>" + requisicoes[i].id_livro +
                "</td><td>" + requisicoes[i].id_prop + "</td><td>" + requisicoes[i].titulo_livro + "</td><td bgcolor='#32CD32'>" + requisicoes[i].aprovado +
                "</td><td>" + "<input  value='Devolver' type='button' class='devolverBtn' id='ma' rownr='" + i + "'>" + "</tr>"


        }


        /*se a requisição estiver em espera*/
        else if (requisicoes[i].id_user == id_log && requisicoes[i].aprovado == "Em Espera") {
            console.log('REQS ESPERA')
            txt += "<tr><td class='id_row" + i + "'>" + requisicoes[i].id_req + "</td><td>" + requisicoes[i].id_livro + "</td><td>" + requisicoes[i].id_prop + "</td><td>" + requisicoes[i].titulo_livro + "</td><td bgcolor='#FFFF66'>" + requisicoes[i].aprovado +
                "</td><td>" + "<input  value='Cancelar Requisição' type='button' class='deleterBtn' id='ma' rownr='" + i + "'>" + "</tr>"
        }

        /*se a requisição estiver negada*/
        else if (requisicoes[i].id_user == id_log && requisicoes[i].aprovado == "Negada") {
            txt += "<tr><td class='id_row" + i + "'>" + requisicoes[i].id_req + "</td><td>" + requisicoes[i].id_livro +
                "</td><td>" + requisicoes[i].id_prop + "</td><td>" + requisicoes[i].titulo_livro + "</td><td bgcolor='#FF0000'>" + requisicoes[i].aprovado +
                "</td><td>" + "<input  value='Apagar a Requisição' type='button' class='deleterBtn' id='ma' rownr='" + i + "'>" + "</tr>"
        }
    }
    //envia a tabela construida para a view e mostra o resultado (txt) no object com ID result
    txt += "</tbody></table></div>";
    $("#minhasReqs").html(txt);

}




/*

Apagar as Requisições , ou seja cancelar 

 */
$(document).on("click", ".deleterBtn", function() {
    /*
    este click vai buscar o primeiro TD da TR ATUAL
    */
    var req_click = $('.id_row' + $(this).attr('rownr') + '').text() 

    var a = confirm('Tem a certeza que quer apagar a sua requisição ?')
    var data3 = {}
    data3.id_req = req_click

    if (a == true) {
        //  colocar aqui o ajax
        //chamada AJAX para envio dos dados para o servidor via POST convertendo o array em JSON
        $.ajax({
            type: 'POST',
            url: '../deleteReq',
            data: data3,
            dataType: 'json',
            // contentType: 'application/json',
            success: function(result) {
                //Status 200 means succsess se der envia Alerta 
                //console.log(`estou aki com o status ${result.status}`)
                if (result.success) {
                    alert("Requisição nº" + " " + req_click + " " + "Apagada ! ");
                    window.location.reload()
                }
            },
            error: function(data3) { console.log(data3) }
        });
    }
    else {
        alert('Ação Cancelada !');
    }
});


/*

DEVOLVER O LIVRO 
TORNAR DISPONIVEL + DELETE 

*/

$(document).on("click", ".devolverBtn", function() {
    var livro_click = $(this).closest('tr').find('td:nth-child(2)').text()
    var req_click = $('.id_row' + $(this).attr('rownr') + '').text()
    var a = confirm('Tem a certeza que quer devolver o Livro ?')

    var data2 = {}
    var data3 = {}
    data3.id_livro = livro_click
    data2.id_req = req_click

    if (a == true) {
        //  colocar aqui o ajax
        //chamada AJAX para envio dos dados para o servidor via POST convertendo o array em JSON
        $.ajax({
            type: 'PUT',
            url: '../devolverLivro',
            data: data3,
            dataType: 'json',
            // contentType: 'application/json',
            success: function(result) {
                //Status 200 means succsess se der envia Alerta 
                //console.log(`estou aki com o status ${result.status}`)
                if (result.status == 200) {
                    alert("Livro da Requisição" + " " + req_click + " " + "Devolvido ! ");
                    $.ajax({
                        type: 'POST',
                        url: '../deleteReq',
                        data: data2,
                        success: function(result) {
                            if (result.status == 200) {
                                alert('Requisição' + " " + req_click + " " + 'Apagada!')
                                window.location.reload();
                            }
                        },
                        error: function(data2) { console.log(data2) }
                    });
                }
            },
            error: function(data3) { console.log(data3) }
        });
    }

    else {
        alert('Ação Cancelada !');
    }

});
