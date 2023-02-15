
const express = require("express");
const app = express();
const https = require("node:https");
const bodyParser = require("body-parser");

const api_key = "46ea98a5684d2fa1cc9b785e4a32ff4f";

app.use( bodyParser.urlencoded({extended : true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
    
});

app.post( "/" , function (req , res){
    var city = req.body.cityName ;
    console.log(city);

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid="+ api_key + "&units=metric";
    https.get( url ,  (response) =>{
        //console.log(response);

        response.on("data" , function(data){
            //console.log(data);
            const weatherData = JSON.parse( data);
            //console.log(weatherData);
            const description =  weatherData.weather[0].description;
            const temp = weatherData.main.temp ;
            const code =  weatherData.weather[0].icon ;
            const id = weatherData.weather[0].id ;


            // console.log(description);
            // console.log(temp);
            // console.log(code);
            // console.log(id);
            
            res.write("<p>the weather is currently " + description + "</p>");
            res.write("<h2>the temprature in "+  city +" is currenly " + temp +" degrees celcius</h2>");
            res.write( "<img src='http://openweathermap.org/img/wn/" +code+ "@2x.png' >");

            res.send();


        });
    }).on('error', (e) => {
        console.error(e);
    });


} );


    

app.listen(3000, () => {
  console.log("server up at port 3000");
});
