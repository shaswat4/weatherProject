
const express = require("express");
const app = express();
const https = require("node:https");

app.get("/", function (req, res) {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=46ea98a5684d2fa1cc9b785e4a32ff4f&units=metric";
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


            console.log(description);
            console.log(temp);
            console.log(code);
            console.log(id);
            
            res.write("<p>the weather is currently " + description + "</p>");
            res.write("<h2>the temprature in Delhi is currenly " + temp +" degrees celcius</h2>");
            res.write( "<img src='http://openweathermap.org/img/wn/" +code+ "@2x.png' >");

            res.send();


        });
    }); 
    
  //res.send("success");
});

app.listen(3000, () => {
  console.log("server up at port 3000");
});
