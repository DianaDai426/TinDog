//mailchimp.com/developer

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();


app.use(express.static("public"));//serve css files and images in the public folder
app.use(bodyParser.urlencoded({
  extended: true
}));


app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.Email;
    const data = {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us2.api.mailchimp.com/3.0/lists/d64d1f760d";

    const options = {
      method: "POST",
      auth: "dianadai:c75587961384df5110cd028e4493168e-us2" //authentication
    }

//make https request
    const request = https.request(url, options, function(response) {
      if(response.statusCode ===200){
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendFile(__dirname+"/failure.html");
      }
      response.on("data", function(data){ //what do you want to do with the data its send back
        //console.log(JSON.parse(data));
      })
    })

     request.write(jsonData);
     request.end();
  });

app.post("/failure", function(req,res){
  res.redirect("/")
})


// API key
// c75587961384df5110cd028e4493168e-us2

// List id
// d64d1f760d
