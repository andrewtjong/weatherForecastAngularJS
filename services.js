weatherApp.service('cityService', function() {

    this.city = "Amsterdam";

})

weatherApp.service('weatherService', ['$resource', function($resource) {
    this.GetWeather = function(city, days) {
        var weatherAPI= $resource("http://api.openweathermap.org/data/2.5/forecast?appid=bf80bdbfe08da086a652c60e3d9b12b5&units=metric", 
        {get: { method: "JSONP"}})
    
        return weatherAPI.get
        ({ q: city, cnt: days });
    }
}])