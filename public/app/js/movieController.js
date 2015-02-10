angular.module('movieApp.movieController', [ 'ui.bootstrap' ])
.controller('movieController', function($scope, movie) {
    $scope.data = {};

    $scope.data.alerts = [];

    $scope.data.currentTemplate = "../../movies.html";
    $scope.data.searchTemplate = "../../search.html";
    $scope.data.itemsPerPage = 10;
    $scope.data.maxSize = 5;
    $scope.data.currentPage = 1;
    $scope.data.beginIndex = 0;
    $scope.data.endIndex = 1;

    $scope.data.tabs = [
        {title:'Movies', template:'../../movies.html', index: 0},
        {title:'Add Movie', template:'../../addMovie.html', index: 1},
    ];

    $scope.data.movies = [];

    $scope.initialize = function() {
        $scope.data.movies = movie.query();
    };

    $scope.addAlert = function(alert) {
        $scope.data.alerts.push(alert);
    };

    $scope.closeAlert = function(index) {
        $scope.data.alerts.splice(index, 1);
    };

    $scope.clearAlerts = function() {
        $scope.data.alerts = [];
    }

    $scope.changeView = function(index) {
        for(var i = 0; i < $scope.data.tabs.length; i++) {
            var tab = $scope.data.tabs[i];
            index === i ? tab.active = true : tab.active = false;
        }
        $scope.data.currentTemplate = $scope.data.tabs[index].template;
    };

    $scope.validateNotDuplicate = function(movie) {
        for(var i=0; i < $scope.data.movies.length; i++) {
            var curMovie = $scope.data.movies[i];
            if(curMovie.title == movie.title && curMovie.year == movie.year) {
                return false;
            }
        }
        return true;
    };

    $scope.resetPagination = function() {
        $scope.data.currentPage = 1;
    };

    $scope.$watch('data.currentPage', function() {
        $scope.data.beginIndex = (($scope.data.currentPage - 1) * $scope.data.itemsPerPage);
        $scope.data.endIndex = $scope.data.beginIndex + ($scope.data.itemsPerPage -1);
    });

    $scope.initialize();

});