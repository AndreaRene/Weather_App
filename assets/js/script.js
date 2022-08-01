var key1 = "3d1d22fa9f3fdc267f07adb7bc963172";
var date = moment().format("MM/DD/YYYY");

var searchHandler = function (event) {
    event.preventDefault();

    var city = $("#citySearch").val();

    if (city) {
        search(city);
        storeCity();

    } else {
        alert('Please enter a city');
    }
};

function search(city) {
    var latLon = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=&appid=" + key1;
    fetch(latLon)
        .then((response) => {
            return response.json();
        }).then((data) => {
            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=hourly,minutely&units=imperial&appid=" + key1)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    $("#currentCity").text(city + " " + "(" + date + ")");
                    $("#currentIcon").attr("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png")
                    $("#currentTemp").text(" " + Math.floor(data.current.temp) + "\u00B0 F");
                    $("#currentWind").text(" " + data.current.wind_speed + " MPH");
                    $("#currentHumidity").text(" " + data.current.humidity + "\%");
                    $("#currentUV").text(" " + data.current.uvi)

                    console.log(data);

                    let i = 0;

                    $(".future").each(function () {
                        $(".futureTemp").text(" " + data.daily[i].temp.day);
                        i++;
                    });
                });
        });
}

function storeCity() {
    localStorage.setItem("city", $("#citySearch").val());
}


$("#fetchBtn").click(searchHandler);
// function getWeather(data) {
//     fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=hourly&appid=" + key2)
//         .then((response) => {
//             return response.json();
//         }).then((data) => {
//             console.log(data);
//         });
// }

