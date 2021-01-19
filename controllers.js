weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location , cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })

    $scope.submit = function() {
        $location.path("/forecast")
    }

}]);


weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', '$routeParams', function($scope, $resource, cityService, $routeParams) {

    $scope.city = cityService.city;

    $scope.days = $routeParams.days || 7;

    $scope.weatherAPI= $resource("http://api.openweathermap.org/data/2.5/forecast?appid=bf80bdbfe08da086a652c60e3d9b12b5&units=metric", {get: { method: "JSONP"}})

        $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });

        console.log($scope.weatherResult)

        $scope.convertToDate = function(dt) {
            return new Date(dt * 1000)
        }
}]);