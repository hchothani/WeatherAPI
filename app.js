   const express = require("express");
const https = require("https")

const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  let cityName = req.body.cityName;

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=755da3e2091bef57d6ff20d8707a4465&units=metric"
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const descr = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp);
      console.log(descr);
      res.write('<head><meta charset="utf-8"></head>');
      res.write("<h3>The weather is currently " + descr + "</h3>");
      res.write("<h1>The temperature in London is " + temp + "</h1>");
      res.write("<img src=" + iconUrl + ">");
      res.send();
    })
  })

})

app.listen(3000, function(){
  console.log("Server started");
})
