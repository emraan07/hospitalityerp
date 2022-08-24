const express = require("express")
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname +"/index.html")
})

// First page contact page for registered clients
app.post("/query", function (req, res) {
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPhone = req.body.phone;
    const userQuery = req.body.query;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
	        // type: 'OAuth2',
	        user: "imkhang196@gmail.com",
	        pass: "muppgkkqxehzvbuf",
	        // clientId: "584068991410-ib11kv72js10pvlq9nrr2spakei7q4v5.apps.googleusercontent.com",
	        // clientSecret: "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",
	        // refreshToken: "1//04RgYDmXMb275CgYIARAAGAQSNwF-L9IrT21-VnpGAWaSAadfA0AoAeBl-HfLjtLrSeSQysMzWZFTWon05K7t1BJQbF_Lwc_vzy"
        },
        port: 465,
        host: 'smtp.gmail.com'
    });

    const mailConfigurations = {
        from : userEmail,
        to : 'imkhang196@gmail.com, support@hospitality-erp.com',
        subject : 'Message from' + " " +userName,
        html: "<p>Name : </p> " +userName
              +"<br><p>Email : </p> " + userEmail 
              +"<br><p>Phone Number : </p> " + userPhone 
              +"<br><p>Message : </p> " + userQuery
             
    }

    transporter.sendMail(mailConfigurations, function(error, info){
        if (error){
            console.log(error);
            res.sendFile(__dirname +"/failure.html")
        }
        else{
            console.log(info.response);
            res.sendFile(__dirname +"/success.html")
        }   
        
    });
    

    
})
// Contact page for new clients
app.post("/contact", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
	        // type: 'OAuth2',
	        user: "imkhang196@gmail.com",
	        pass: "muppgkkqxehzvbuf",
	        // clientId: "584068991410-ib11kv72js10pvlq9nrr2spakei7q4v5.apps.googleusercontent.com",
	        // clientSecret: "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",
	        // refreshToken: "1//04RgYDmXMb275CgYIARAAGAQSNwF-L9IrT21-VnpGAWaSAadfA0AoAeBl-HfLjtLrSeSQysMzWZFTWon05K7t1BJQbF_Lwc_vzy"
        },
        port: 465,
        host: 'smtp.gmail.com'
    });

    const mailConfigurations = {
        from : email,
        to : 'imkhang196@gmail.com, support@hospitality-erp.com',
        subject : subject,
        html: "<p>Name : </p> " +name
              +"<br><p>Email : </p> " + email
              +"<br><p>Message : </p> " +message
             
    }

    transporter.sendMail(mailConfigurations, function(error, info){
        if (error){
            console.log(error);
            res.sendFile(__dirname +"/failure.html")
        }
        else{
            res.sendFile(__dirname +"/success.html")
            console.log(info.response);
        }   
        
    });
    

    
})
// redirecting to homepage
app.post("/home", function(req, res) {
    res.sendFile(__dirname +"/home.html")
    
})
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
})