var apiKey = "298247b0e3697cf88be8ab01eb1fea69";
//to store search keywords
var keyCount = 0;

var url = "http://api.openweathermap.org/data/2.5/weather?q=London&Appid=" + apiKey;

$.ajax({
    url: url,
    method: "GET"
}).then(function (response) {
    console.log(response);

});