var apiKey = "298247b0e3697cf88be8ab01eb1fea69";
//to store search keywords
var keyCount = 0;


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
            console.log(response);
        });
    }
}
//append local date
//5day forecast
    //append to row
