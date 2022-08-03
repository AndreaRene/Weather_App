// TODO: Smile. You are enough.
var key1 = "3d1d22fa9f3fdc267f07adb7bc963172";
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
            if (!data.length) {
                return alert("Please enter a valid city.");
            }

            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=hourly,minutely&units=imperial&appid=" + key1)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    $("#currentCity").text(city + " " + "(" + moment.unix(data.current.dt).utcOffset(data.timezone_offset / 60).format("MM/DD/YYYY") + ")");
                    $("#currentIcon").attr("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");
                    $("#currentTemp").text(" " + Math.floor(data.current.temp) + "\u00B0 F");
                    $("#currentWind").text(" " + data.current.wind_speed + " MPH");
                    $("#currentHumidity").text(" " + data.current.humidity + "\%");
                    $("#currentUV").text(" " + data.current.uvi);

                    let uvi = data.current.uvi;
                    let currentUV = $("#currentUV");
                    if (uvi <= 2) {
                        currentUV.removeClass().addClass("green");
                    } else if (uvi > 2 && uvi <= 5) {
                        currentUV.removeClass().addClass("yellow");
                    } else if (uvi > 5 && uvi <= 7) {
                        currentUV.removeClass().addClass("orange");
                    } else if (uvi > 7 && uvi <= 10) {
                        currentUV.removeClass().addClass("red");
                    } else {
                        currentUV.removeClass().addClass("purple");
                    }

                    let i = 0;
                    let j = 0;
                    let k = 0;
                    let l = 1;
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
                        let date = data.daily[l].dt + data.timezone_offset;
                        $(this).text(moment.unix(date).utcOffset(data.timezone_offset / 60).format("MM/DD/YYYY"));
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
    if (cityArray.some(function (el) {
        return el === $("#citySearch").val();
    })) {
        return;
    }
    cityArray.push($("#citySearch").val());
    localStorage.setItem("city", JSON.stringify(cityArray));
    makeButtons();

};

function makeButtons() {
    $("#searchHistory").empty();
    for (var i = 0; i < cityArray.length; i++) {
        if (cityArray.length >= 9) {
            cityArray.shift();
            var button = $("<button>").addClass("myBtns cityBtns").text(cityArray[i]);
            $("#searchHistory").append(button);
        } else {
            var button = $("<button>").addClass("myBtns cityBtns").text(cityArray[i]);
            $("#searchHistory").append(button);
        }
    };
};

function clearStorage() {
    localStorage.clear();
    location.reload();
};

$("#fetchBtn").click(searchHandler);
$("#clearBtn").click(clearStorage);
$("#searchHistory").on("click", "button", searchHandler);
makeButtons();


