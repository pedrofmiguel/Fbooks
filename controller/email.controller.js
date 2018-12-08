var email_active = JSON.parse(sessionStorage.getItem('email_active'))

$('#contact').validator().on('submit', function(e) {
    //se submeter com erros
    if (e.isDefaultPrevented()) {
        alert("bora") /**handle the invalid form...**/
    }
    //se estiver tudo bem
    else {
        console.log(email_active)
        e.preventDefault();
        //carregamento dos dados do form para variávels JS
        var data = {};
        data.assunto = email_active + " " + "Diz: " + " " + $('#assunto').val();
        data.mensag = $('#mensag').val();
        data.email = email_active

        //debugging para ver os dados que foram enviados
        console.log(data);
        //limpeza dos dados do form
        $('#contact')[0].reset();
        //chamada ajax para envio dos dados para o servior via POST
        $.ajax({
            type: 'POST',
            url: './sendEmail',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                alert('email enviado com sucesso!')
                //analisa res.end que está no result e se o status for 200 envia um alerta
                if (result.status == 200) { alert('Enviado com Sucesso'); }
            },
            error: function(data) { console.log(data) }
        });
    }
});
