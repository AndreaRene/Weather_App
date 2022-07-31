var city = "Austin";
var state = "TX";
var country = "USA";
var key1 = "3d1d22fa9f3fdc267f07adb7bc963172";
var key2 = "e7356777dc9b38f7b5d0489b4bfa632b"
var latLon = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + country + "&limit=&appid=" + key2;
var latLonData;

fetch(latLon)
    .then((response) => {
        return response.json();
    }).then((data) => {
        return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=hourly,minutely&appid=" + key2)
            .then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
            });
    });


// function getWeather(data) {
//     fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=hourly&appid=" + key2)
//         .then((response) => {
//             return response.json();
//         }).then((data) => {
//             console.log(data);
//         });
// }

