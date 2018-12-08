var sessionStorage = window.sessionStorage;
var id_log = JSON.parse(sessionStorage.getItem("id_active"));
var username_log = JSON.parse(sessionStorage.getItem('user_active'))
var requisicoes = []
var cont = 0
var seereqs = false
$(document).ready(function() {
    getReq()



})



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


            checkreq()
        }

    });
}

function checkreq() {

    for (var i = 0; i < requisicoes.length; i++) {
        console.log("O utilizador"+ " " + username_log + "com o id :"+id_log)
      //  console.log(requisicoes[i].id_prop)
        if (requisicoes[i].id_prop == id_log && requisicoes[i].aprovado == "Em Espera") {
            seereqs = true
            cont++;
            $('#caixaAlerta').text('Tem' + " " + cont + " " + 'requisições para aceitar')
        }
        else {
            seereqs
        }
        console.log(seereqs)
    }
    console.log(seereqs)

    if (seereqs === false && sessionStorage.length != 0) {
         $('#caixaAlerta').text('Não tem Requisições para rever!')
        alert('não tem requisições para confirmar! ')
        cont = 0
    }

}
