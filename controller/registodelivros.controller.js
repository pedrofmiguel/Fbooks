//copiar registo
var lista = [];
var feed = [];
var sessionStorage = window.sessionStorage;
var id_log = JSON.parse(sessionStorage.getItem("id_active"));
var username_log = JSON.parse(sessionStorage.getItem("user_active"));
$(document).ready(function() {
    console.log(lista)
    searchBar()
    refreshCatalogo();
    refreshLivro();
    refreshFeed()
    


})

/*Variaveis*/

//validação do formulário ao submeter – executa a função validator
$('#formLivros').validator().on('submit', function(event) {


    // console.log("Validate")
    //se submeter com erros
    if (event.isDefaultPrevented()) {
        alert("Por favor Preencha Corretamente o Formulário") // handle the invalid form...
    }
    //
    else {
        event.preventDefault();
        var data = {};
        data.titulo = $('#tituloLivro').val();
        data.autor = $("#autorLivro").val();
        data.editora = $("#editoraLivro").val();
        data.ano_lancamento = $("#anoLivro").val();
        data.genero = $("#generoLivro").val();
        data.descricao = $("#descLivro").val();
        data.capa = $("#imgLivro").val();
        data.disp_req = $("#disp_req").val();
        data.id_prop = id_log,
            data.user_prop = username_log

        console.log("Livro:" + data.titulo + " #" + data.user_prop);
        //limpeza dos dados 
        $('#formLivros')[0].reset();

        //chamada AJAX para envio dos dados para o servidor via POST convertendo o array em JSON
        $.ajax({
            type: 'POST',
            url: '../saveLivro',
            data: data,
            dataType: 'json',
            // contentType: 'application/json',
            success: function(result) {
                //Status 200 means succsess se der envia Alerta !
                if (result.status == 200) {

                    alert("Livro Registado!");
                }

                //faz refresh da tabela users através da função respetiva
                refreshCatalogo() /* not sure se o consigo usar assim  */
            },
            error: function(data) { console.log(data) }
        });
    }
});


//vai fazer refresh à table que tem os livros todos
function refreshCatalogo() {
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
            catalogo()
        }
    });
}

function catalogo() {
    //debugging para ver se foi pedido com sucesso
    console.log(' pedido get  entrou success');
    //criação de uma tabela para demonstração dos resultados recebidos
    var txt = "";
    txt += "<div class='table-responsive'>";
    txt += "<table id='tblLivrosCatalogo' class='table table-sm'>";
    txt += "<thead color:white '>";
    txt += "<tr> <th>#ID</th> <th>Titulo</th> <th>Autor</th> <th>Género</th><th>Ano De Lançamento</th><th>Proprietário</th><th>Disponibilidade</th></tr></thead><tbody>";
    //percorrer a variável data e por cada row cria a linha da tabela com os dados presentes
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].user_prop != username_log) {
            if (lista[i].disp_req == "Disponivel") {
                // console.log(i)
                //aqui os id's são os do mysql
                txt += "<tr><td class='id_row" + i + "'>" + lista[i].id_livro + "</td><td>" + lista[i].titulo +
                    "</td><td>" + lista[i].autor + "</td><td>" + lista[i].genero + "</td><td>" + lista[i].ano_lanc + "</td><td>" + lista[i].user_prop +
                    "</td><td>" + lista[i].disp_req + "</td><td>" + "<input  value='Requisitar' type='button' class='theButton' id='ma' rownr='" + i + "'>" + "</tr>"
            }
            else {  
                //aqui os id's são os do mysql
                txt += "<tr><td  id ='id_tr'>" + lista[i].id_livro + "</td><td>" + lista[i].titulo +
                    "</td><td>" + lista[i].autor + "</td><td>" + lista[i].genero + "</td><td>" + lista[i].ano_lanc + "</td><td>" + lista[i].user_prop + "</td><td>" + lista[i].disp_req + "</td></tr>"
            }
        }
    }
    txt += "</tbody></table></div>";
    //envia a tabela construida para a view e mostra o resultado (txt) no object com ID result
    $("#tablecatalogo").html(txt);
}


/*Função Para filtrar os dados da tabela*/
function searchBar() {
    $("#searchLivro").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#tblLivrosCatalogo tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}


//Exexutar a requisição
$(document).on("click", ".theButton", function(e) {


    /* * * * * * * * * * * * * * * */
    /* for para ir buscar alguns atributos */
    for (var x = 0; x < lista.length; x++) {
        if (lista[x].id_livro == $('.id_row' + $(this).attr('rownr') + '').text()) {
            var r = confirm('Tem a certeza que quer requisitar')
            var data2 = {}
            var data3 = {}


            data2.id_livro = $('.id_row' + $(this).attr('rownr') + '').text();
            data2.id_user = id_log
            data2.nome_user = username_log
            data2.titulo_livro = lista[x].titulo
            data2.aprovado = "Em Espera"
            data2.id_prop = lista[x].id_prop



            data3.id_livro = $('.id_row' + $(this).attr('rownr') + '').text();
        }

        console.log(data2)
        console.log(data3)
    }


    if (r == true) {
        //  colocar aqui o ajax
        //chamada AJAX para envio dos dados para o servidor via POST convertendo o array em JSON

        $.ajax({
            type: 'POST',
            url: '../saveRequisicao',
            data: data2,
            dataType: 'json',
            // contentType: 'application/json',
            success: function(result) {

                //Status 200 means succsess se der envia Alerta !
                if (result.status == 200) {
                    alert("Requisição Efetuada!");
                    /* ajax */
                    $.ajax({
                        type: 'PUT',
                        url: '../updateLivro',
                        data: data3,
                        success: function(result) {
                            if (result.status == 200) {
                                console.log(data3)
                                console.log('ESTADO DO LIVRO UPDATED!')

                            }
                            window.location.reload();

                        },
                        error: function(data3) { console.log(data3) }
                    });
                    /* ajax */
                }
            },
            error: function(data2) { console.log(data2) }
        });
    }
    else {
        alert('Requisição Cancelada !');
    }
    //	id da row -> $('.id_row'+$(this).attr('rownr')+'').text()
});


// combobox dos livros
function refreshLivro() {
    //chamada ajax
    $.ajax({
        type: 'GET',
        url: '../readLivro',
        //os dados recebidos do model estão na variável data
        success: function(data) {
            //debugging para ver se foi pedido com sucesso
            console.log('success');
            //criação de uma tabela para demonstração dos resultados recebidos
            var txt = "";
            txt += "<select id='comboLivros' onchange='getValue()' placeholder='Seleciona o Livro'>";
            //percorrer a variável data e por cada row cria a linha da tabela com os dados presentes
            data.forEach(function(row) {
                if(row.id_prop != id_log)
                {
                     txt += "<option class='option2' value='" + row.titulo + "'>" + row.titulo + "</option>";
                }

               
            });
            txt += "</select>";

            //envia a tabela construida para a view e mostra o resultado (txt) no object com ID result
            $("#combo").html(txt);
        }
    });


}

//combo proprietario
function getValue() {
    var x = document.getElementById("comboLivros").selectedIndex;
    var livro_sel = document.getElementsByTagName("option")[x].value
    var prop_desc = document.getElementById('prop_desc')
    // console.log(document.getElementsByTagName("option")[x].value);
    for (x = 0; x < lista.length; x++) {
        if (lista[x].titulo == livro_sel) {
            //  console.log(lista[x])
            // console.log(livro_sel)
            prop_desc.value = String(lista[x].user_prop)
        }
    }
}


//combo da pontuacao  
var select = document.getElementById("seleciona");
var options = ["1", "2", "3", "4", "5"];
for (var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}


// Feedback



// Feedback
/*

Preencher o formulário de feedback 

*/ 
$('#feedform').validator().on('submit', function(event) {

    // console.log("Validate")
    //se submeter com erros
    if (event.isDefaultPrevented()) {
        alert("Por favor Preencha Corretamente o Feed") // handle the invalid form...
    }
    //
    else {
        event.preventDefault();
        var data = {};
        data.titulo_livro = $('#comboLivros').val();
        data.user_prop = $("#prop_desc").val();
        data.desc_feedback =$("#mensagem").val();
        data.rating_livro = $("#seleciona").val();
 

       console.log(data)
        //limpeza dos dados 
        $('#feedform')[0].reset();

        //chamada AJAX para envio dos dados para o servidor via POST convertendo o array em JSON
        $.ajax({
            type: 'POST',
            url: '../saveFeed',
            data: data,
            dataType: 'json',
            // contentType: 'application/json',
            success: function(result) {
                //Status 200 means succsess se der envia Alerta !
                if (result.status == 200) {
                    alert("Feed Registado!");
                    window.location.reload()
                }
                //faz refresh da tabela users através da função respetiva
              
            },
            error: function(data) { console.log(data) }
        });
    }
});


function refreshFeed() {
    console.log("entrou no refresh feed")
    //chamada ajax
    $.ajax({
        type: 'GET',
        url: '/readFeed',
        success: function(data) {
            data.forEach(function(row) {
                /*Envia os Livros para um Array*/
                feed.push(row)
                // console.log(lista)
            });
            /*Após receber os dados gera a tabela */
            feedzinho()
        }
    });
}


function feedzinho() {
    //debugging para ver se foi pedido com sucesso
    
    //criação de uma tabela para demonstração dos resultados recebidos
    var txt = "";
    txt += "<div class='table-responsive'>";
    txt += "<table id='tblFeedCatalogo' >";
    txt += "<thead color:white '>";
    txt += "<tr> <th>#ID</th> <th>Titulo</th> <th>Proprietario</th><th>Mensagem</th><th>Rating</th>";
    //percorrer a variável data e por cada row cria a linha da tabela com os dados presentes
    for (var i = 0; i < feed.length; i++) {

        // console.log(i)
        //aqui os id's são os do mysql
        txt += "<tr><td class='id_row" + i + "'>" + feed[i].id_feedback + "</td><td>" + feed[i].titulo_livro +
            "</td><td>" + feed[i].user_prop + "</td><td>" + feed[i].desc_feedback + "</td><td>" + feed[i].rating_livro + "</td><td>"
    }
    txt += "</tbody></table></div>";
    //envia a tabela construida para a view e mostra o resultado (txt) no object com ID result
    $("#tableFeed").html(txt);
}











//função de requisição
//Clicar num botão 
//gerar requisição



//
