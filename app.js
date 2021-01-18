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

    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'  
    })
}])

weatherApp.service('cityService', function() {

    this.city = "Amsterdam";

})

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })

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

weatherApp.directive("weatherReport", function(){
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace:true,
        scope: {
            weatherDay: "=",
            convertToDate: "&",
            dateFormat: "@"

        }
    }
})