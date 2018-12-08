var sessionStorage = window.sessionStorage;
var id_log = JSON.parse(sessionStorage.getItem("id_active"));
var username_log = JSON.parse(sessionStorage.getItem('user_active'))
var requisicoes = []
var cont = 0
var seereqs =true
$(document).ready(function() {


    if (sessionStorage.length == 0) {
        $("#navRegistoLivros").hide()
        $("#navCatalogo").hide()
        $("#navRequisicoes").hide()
        $("#navPerfil").hide()
        $("#navLogout").hide()
        $("#alerta1").hide()
    }
    else {

        $("#navLogin").hide()
        
    }


});


$("#navLogout").click(function() {
    sessionStorage.clear();
    window.location.replace("/")

});



