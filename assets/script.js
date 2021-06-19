var apiKey = "298247b0e3697cf88be8ab01eb1fea69";
//to store search keywords
var keyCount = 0;
//variable for current weather


function search4City (){
    var searchCity = $(".searchCity").val();
    var urlCurrent = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&Appid=" + apiKey;
    console.log(searchCity);
    $.ajax({
        url: urlCurrent,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    
    });
}
