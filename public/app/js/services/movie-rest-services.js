angular.module('movieApp')
.factory('movie', function($resource) {
    return $resource('http://localhost:2403/movie/:id');
});