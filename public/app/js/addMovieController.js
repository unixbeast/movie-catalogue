angular.module('movieApp.addMovieController', [ ])
.controller('addMovieController', function($scope, $http, $timeout, movie) {

    $scope.data.searchResults = [];
    $scope.data.showAddSpinerIndex = -1;
    $scope.data.showSearchSpinner = false;

    $scope.searchMovie = function() {
    $scope.data.showSearchSpinner = true;
        $http.get('http://www.omdbapi.com', {
            params: {s:$scope.data.movieTitle}
        }).success(function(data, status, headers, config) {
            $scope.data.searchResults = data.Search;
            $scope.data.showSearchSpinner = false;
        }).error(function(data, status, headers, config) {
            $scope.addAlert({type: 'danger', msg: data});
        });
    };

    $scope.createMovie = function(result, index) {
        $scope.data.showAddSpinerIndex = index;
        $scope.clearAlerts();
        var newMovie = new movie();
        console.log(result);
        $http.get('http://www.omdbapi.com', {
            params: {i:result.imdbID}
        }).success(function(data, status, headers, config) {
            newMovie.title = data.Title;
            newMovie.year = data.Year;

            // Now that we know the title and the year, lets validate
            // that we don't already have this movie in our database.
            if(!$scope.validateNotDuplicate(newMovie)) {
                $scope.addAlert({type: 'danger', msg: 'The movie already exists in your catalogue dummy!'});
                $scope.data.movieTitle = "";
                return false;
            }
            newMovie.director = data.Director;
            newMovie.plot = data.Plot;
            newMovie.poster = data.Poster;
            newMovie.rated = data.Rated;
            newMovie.released = data.Released;
            newMovie.runtime = data.Runtime;
            newMovie.writer = data.Writer;

            //genre and subgenre
            var genres = data.Genre.split(',');
            if(genres.length > 0) {
                if(genres.length == 1) {
                    newMovie.genre = genres[0];
                }
                if(genres.length > 1) {
                    newMovie.genre = genres[0];
                    newMovie.subgenre = genres[1];
                }
            }

            //actors
            var actors = data.Actors.split(',');
            newMovie.actors = actors;

            newMovie.$save(function() {
                $scope.data.movies.push(newMovie);
                $scope.data.searchResults = [];
                $scope.data.movieTitle = "";
                $scope.data.searchResults = [];
                $scope.data.showAddSpinerIndex = -1;
                $scope.changeView(0);
            });

        }).
        error(function(data, status, headers, config) {
            $scope.addAlert({type: 'danger', msg: 'The movie already exists in your catalogue dummy!'});
            $scope.data.movieTitle = "";
            $scope.data.showAddSpinerIndex = -1;
            return false;
        });

    };
});