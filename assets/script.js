var apiKey = "298247b0e3697cf88be8ab01eb1fea69";
//to store search keywords
var keyCount = 0;


for (var i=0; i<localStorage.length; i++){
    var city =localStorage.getItem(i);
    var cityName = $(".searchedcitydisplayed").addClass("list-group-item");
    cityName.append("<ul>" + city + "</ul>");
}

//function start when user press "Search!"
function search4City (){
    var searchCity = $(".searchCity").val();
    //variable for current weather
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&Appid=" + apiKey + "&units=imperial";
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&Appid=" + apiKey + "&units=imperial";
    if (searchCity == "") {
        console.log("searchCity");
    } else {    
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            var cityName = $(".searchedcitydisplayed").addClass("btn-group-vertical");
            cityName.append("<button>" + response.name + "</button>");
            //local storage
            var local = localStorage.setItem(keyCount,response.name);
            keyCount = keyCount + 1;
            //start current weather
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>").addClass("card-title");
            currentCard.append(currentName);
            // append local Date 
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            // Add Temp 
            var currentTemp = currentName.append("<p>");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + " &degF" + "</p>");
            //add wind
            currentTemp.append("<p>" + "Wind: " + response.wind.speed + " MPH" + "</p>");
            //add humidity
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + " %" + "</p>");
            //add UV index
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=298247b0e3697cf88be8ab01eb1fea69&lat=${response.coord.lat}&lon=${response.coord.lon}`;
            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                var currentUV;
                console.log(response.value);
                //logic to compare UV index favorable/moderate/high
                if (response.value > 8){
                currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + " WARNING UV INDEX VALUE IS HIGH" + "</p>");
                currentTemp.append(currentUV).addClass("text-danger");
                }
                else if (response.value < 4){
                currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + " UV INDEX VALUE IS FAVORABLE" + "</p>");
                currentTemp.append(currentUV).addClass("text-success");
                }
                else{
                currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + " UV INDEX VALUE IS MODERATE" + "</p>");
                currentTemp.append(currentUV).addClass("text-warning");
                }
            });
            
        });
        //5day forecast
        $.ajax({
            url: urlFiveDay,
                method: "GET"
        }).then(function (response){
            // Array for 5-days 
            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDay").addClass("card-body");
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();
            // For each for 5 days
            day.forEach(function(i){
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + " &degF" + "</p>" + "Wind: " + response.list[i].wind.speed + " MPH" + "</p>"+"<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
            })
        });
    }
}