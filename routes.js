weatherApp.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {
    
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
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