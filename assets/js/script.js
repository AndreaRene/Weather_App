var key1 = "3d1d22fa9f3fdc267f07adb7bc963172";
var date = moment().format("MM/DD/YYYY");
var cityArray = JSON.parse(localStorage.getItem("city")) || [];

var searchHandler = function (event) {
    event.preventDefault();
    if ($(this).attr("id") === "fetchBtn") {
        var city = $("#citySearch").val();

        if (city) {
            search(city);
            storeCity();

        } else {
            alert('Please enter a city');
        }
    } else {
        var city = $(this).text();
        search(city);
    };
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
                    $("#currentCity").text(city + " " + "(" + moment.unix(data.current.dt).format("MM/DD/YYYY") + ")");
                    $("#currentIcon").attr("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png")
                    $("#currentTemp").text(" " + Math.floor(data.current.temp) + "\u00B0 F");
                    $("#currentWind").text(" " + data.current.wind_speed + " MPH");
                    $("#currentHumidity").text(" " + data.current.humidity + "\%");
                    $("#currentUV").text(" " + data.current.uvi)

                    console.log(data);

                    let i = 0;
                    let j = 0;
                    let k = 0;
                    let l = 0;
                    let m = 0;

                    $(".futureTemp").each(function () {
                        $(this).text(" " + Math.floor(data.daily[i].temp.day));
                        i++;
                    });
                    $(".futureWind").each(function () {
                        $(this).text(" " + data.daily[j].wind_speed);
                        j++;
                    });
                    $(".futureHumidity").each(function () {
                        $(this).text(" " + data.daily[k].humidity);
                        k++;
                    });
                    $(".futureDate").each(function () {
                        $(this).text(moment.unix(data.daily[l].dt).format("MM/DD/YYYY"));
                        l++;
                    });
                    $(".futureIcon").each(function () {
                        $(this).attr("src", "https://openweathermap.org/img/wn/" + data.daily[m].weather[0].icon + ".png");
                        m++;
                    });
                });
        });
};

function storeCity() {
    cityArray.push($("#citySearch").val());
    localStorage.setItem("city", JSON.stringify(cityArray));
    makeButtons();

};

function makeButtons() {
    $("#searchHistory").empty();
    for (var i = 0; i < cityArray.length; i++) {
        var button = $("<button>").text(cityArray[i]);
        $("#searchHistory").append(button);
    };
};

function clearStorage() {
    localStorage.clear();
    location.reload();
};

$("#fetchBtn").click(searchHandler);
$("#clear").click(clearStorage);
$("#searchHistory").on("click", "button", searchHandler);
makeButtons();


