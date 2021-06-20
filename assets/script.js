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
    var urlCurrent = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&Appid=" + apiKey;
    
    if (searchCity == "") {
        console.log("searchCity");
    } else {    
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            var cityName = $(".searchedcitydisplayed").addClass("list-group-item");
            cityName.append("<ul>" + response.name + "</ul>" );
            //local storage
            var local = localStorage.setItem(keyCount,response.name);
            keyCount = keyCount + 1;
            //start current weather
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            // Appends card to first div
            currentCard.append(currentName);
            //append temperature
            // Add Temp 
            var currentTemp = currentName.append("<p>");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
        });
    }
}
//append local date
//5day forecast
    //append to row
