const express = require('express')
const app = express()
const port = 3000
const bodyparser = require('body-parser')
const https = require('https')
const { url } = require('inspector')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/openweather",function(req, res){
    query = req.body.City;
    apikey = "77831e9edbd0fec632f73134ae519201"
    units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units;

    https.get(url,function(response){

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const humidity = weatherData.main.humidity;
            const feelslike = weatherData.main.feels_like;
            const wind = weatherData.wind.speed;
            const country = weatherData.sys.country;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            const pressure = weatherData.main.pressure;
            const rain = (weatherData.rain && weatherData.rain['3h']);
            const coordinates = weatherData.coord;
            const newcoord = JSON.stringify(coordinates);
            const lat = weatherData.coord.lat;
            const lon = weatherData.coord.lon;
            res.write("<h1> The temperature in " + query + " is " + temp + "C </h1>");
            res.write("<h2>The weather is " + description + " clouds </h2>");
            res.write("<img src=" + imageUrl + " style='width: 100px; height: 100px;'>");
            res.write("<h3>The temperature feels like " + feelslike + "C </h3>");
            res.write("<h3> Humidity: " + humidity + " / Wind speed: " + wind + " / Pressure: " + pressure + "</h3>");
            res.write("<h3> Rain for the last 3 hours is "+ rain + "</h3>");
            res.write("<h3> Country code is " + country + "</h3>");
            res.write("<h3> Coordinates is " + newcoord + "</h3>");
             

            res.write('<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcOkh-NEfp_SzQjPGmxB2f2IMzQkrdIYc&callback=console.debug&libraries=maps,marker&v=beta"></script>');
            res.write('<style>gmp-map {height: 500px; width:450px;}</style>');
            res.write('<gmp-map center=' + lat + ',' + lon + ' zoom ="8" map-id = "DEMO_MAP_ID"' );
            res.write('</gmp-map>')
            res.send();

        })
    })
})


app.post('/airpollution', function (req, res) {
    apikey1 ="8dd157d4-a565-4b87-8ebc-1146b76288f8"
    city = req.body.City;
    state = req.body.state
    country = req.body.country
    const url1 = "https://api.airvisual.com/v2/city?city="+city+"&state="+state+"&country="+country+"&key=8dd157d4-a565-4b87-8ebc-1146b76288f8";
    https.get(url1,function(response){
        let data = ''
        response.on("data",function(data1){
            data+=data1
        })
        response.on("end", function(){
            const airdata = JSON.parse(data)
            const aqius = airdata.data.current.pollution.aqius
            const aqicn = airdata.data.current.pollution.aqicn
            res.write("<h1> Air Quality Index by aqius : " + aqius + "</h1>");
            res.write("<h1> Air Quality Index by aqicn : " + aqicn + "</h1>");
            res.send();
        })
})
})

app.post('/football', function (req, res) {
    year = req.body.year
    const url = `https://api.squiggle.com.au/?q=games;year=${year};source=1`
    https.get(url,(response)=>{
        let data = ''
        response.on("data", (chunk)=>{
            data+=chunk
        })
        response.on('end',()=>{
            const fottdata = JSON.parse(data)
            
            let ateam = []
            let hteam = []
            let winner = []
            fottdata.games.forEach(element => {
                ateam.push(element.ateam)
                hteam.push(element.hteam)
                winner.push(element.winner)
            });
            for (let index = 0; index < ateam.length; index++) {
                const away = ateam[index];
                const home = hteam[index];
                let winner1 = winner[index]
                if (winner[index] === null) {
                    winner1 = 'draw'
                }
                res.write(`<h1>${home} - ${away}</h1>
                <h1>winner is: ${winner1}</h1><br>
                `)
            }
            res.send()
        })
    })
})

app.listen(3000, function () {
    console.log("Server is running on port 3000"); 
  });
