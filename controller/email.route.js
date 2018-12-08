global.app.post('/sendEmail', function(req, res) {
    console.log("email"+ " " + req.body.email);

    var transporter = global.nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fbookprojectt@gmail.com',
            pass: "66976877" // criar password propria , autorizar third party applications pedido nao seguro Oauth 2.0
        }
    });
    transporter.verify(function(error, success) {
        if (error) { console.log(error); }
        else { console.log('Server is ready to take our messages'); }
    })
    console.log("EMAIL SENDER" +"  "+  req.body.email)
    var mailOptions = {
        from: req.body.email,
        to: 'fbookprojectt@gmail.com',
        subject: req.body.assunto,
        html: req.body.mensag
    }
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) { console.log(error); }
        else {
            console.log('Email sent: ' + info.response);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });

});