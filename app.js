const { response } = require("express");
const express = require("express");
const app = express();
const https = require("node:https");

app.get("/", function (req, res) {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=46ea98a5684d2fa1cc9b785e4a32ff4f&units=metric"
    https.get( url , function (response){
        console.log(response);
    }); 
    
  response.send("success");
});

app.listen(3000, () => {
  console.log("server up at port 3000");
});
