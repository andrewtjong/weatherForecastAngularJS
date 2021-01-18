var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource'])

weatherApp.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {
    
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        // Allow loading from our assets domain. **.
        'http://api.openweathermap.org/**'
      ]);

    $locationProvider.hashPrefix('');

    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'  
    })
}])

weatherApp.service('cityService', function() {

    this.city = "New York, NY";

})

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {

    $scope.city = cityService.city;

    $scope.weatherAPI= $resource("http://api.openweathermap.org/data/2.5/forecast?appid=bf80bdbfe08da086a652c60e3d9b12b5", {get: { method: "JSONP"}})

        $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2 });

        console.log($scope.weatherResult)

}]);

