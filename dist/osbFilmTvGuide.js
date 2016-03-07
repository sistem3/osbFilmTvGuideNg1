angular.module('osb-film-tv-guide-template', ['osbFilmTvGuide.tpl.html']);

angular.module("osbFilmTvGuide.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("osbFilmTvGuide.tpl.html",
    "<div class=\"filmTvGuide\">\n" +
    "    <header class=\"container\">\n" +
    "        <h1><i class=\"fa fa-video-camera\"></i> Film/TV Guide</h1>\n" +
    "        <p>Powered by TMDb</p>\n" +
    "        <nav>\n" +
    "            <ul class=\"list-unstyled list-inline\">\n" +
    "                <li ng-repeat=\"section in filmTvGuide.sections\">\n" +
    "                    <button class=\"btn btn-primary\" ng-click=\"filmTvGuide.getData(section.section, section.searchTerm)\"><span ng-bind=\"section.name\"></span> <i class=\"fa {{section.icon}}\"></i></button>\n" +
    "                </li>\n" +
    "                <!--<li>\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <div class=\"input-group-addon\">\n" +
    "                            <i class=\"fa fa-search\"></i>\n" +
    "                        </div>\n" +
    "                        <input type=\"text\" class=\"form-control\" placeholder=\"Search database\">\n" +
    "                    </div>\n" +
    "                </li>-->\n" +
    "            </ul>\n" +
    "        </nav>\n" +
    "    </header>\n" +
    "    <section class=\"filmTvGuide__listings\">\n" +
    "        <ul class=\"list-unstyled\">\n" +
    "            <li ng-repeat=\"items in filmTvGuide.listings\">\n" +
    "                <img ng-src=\"http://image.tmdb.org/t/p/w500{{items.poster_path}}\" class=\"img-responsive\" title=\"{{items.title}}\" />\n" +
    "                <div id=\"{{items.id}}\" class=\"filmTvGuide__listings--nav\">\n" +
    "                    <a title=\"More Info\" class=\"infoBtn\" ng-click=\"filmTvGuide.getDetails(filmTvGuide.section, items.id)\"><i class=\"fa fa-info-circle\"></i></a>\n" +
    "                    <a title=\"Add to Watched\" class=\"watchedBtn\" ng-click=\"filmTvGuide.addWatched(filmTvGuide.section, items.id)\"><i class=\"fa fa-eye\"></i></a>\n" +
    "                    <a title=\"Add to Favourite\" class=\"favouriteBtn\" ng-click=\"filmTvGuide.addFavourite(filmTvGuide.section, items.id)\"><i class=\"fa fa-heart\"></i></a>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <div id=\"filmLoader\">\n" +
    "                    <div>\n" +
    "                        <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "                        <p>Loading...</p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </section>\n" +
    "    <div class=\"clearfix\"></div>\n" +
    "    <section class=\"filmTvGuide__modal\" ng-if=\"filmTvGuide.modal.show\">\n" +
    "        <img ng-src=\"http://image.tmdb.org/t/p/w1000{{filmTvGuide.modal.details.backdrop_path}}\" title=\"{{filmTvGuide.modal.details.title}}\" />\n" +
    "        <div class=\"filmTvGuide__modal--content img-rounded\">\n" +
    "            <div class=\"filmTvGuide__modal--closeBtn\" ng-click=\"filmTvGuide.closeModal()\"><i class=\"fa fa-close\"></i></div>\n" +
    "            <div class=\"col-md-8\">\n" +
    "                <h1 ng-if=\"filmTvGuide.modal.details.title\" ng-bind=\"filmTvGuide.modal.details.title\"></h1>\n" +
    "                <h1 ng-if=\"filmTvGuide.modal.details.name\" ng-bind=\"filmTvGuide.modal.details.name\"></h1>\n" +
    "                <h4 ng-bind=\"filmTvGuide.modal.details.tagline\"></h4>\n" +
    "                <p ng-bind-html=\"filmTvGuide.modal.details.overview\"></p>\n" +
    "                <p ng-if=\"filmTvGuide.modal.details.status\"><strong>Status</strong>: <span ng-bind=\"filmTvGuide.modal.details.status\"></span></p>\n" +
    "                <p ng-if=\"filmTvGuide.modal.details.release_date\"><strong>Released</strong>: <span ng-bind=\"filmTvGuide.modal.details.release_date\"></span></p>\n" +
    "                <p ng-if=\"filmTvGuide.modal.details.number_of_seasons\"><strong>Number of Seasons</strong>: <span ng-bind=\"filmTvGuide.modal.details.number_of_seasons\"></span></p>\n" +
    "                <p ng-if=\"filmTvGuide.modal.details.number_of_episodes\"><strong>Number of Episodes</strong>: <span ng-bind=\"filmTvGuide.modal.details.number_of_episodes\"></span></p>\n" +
    "                <p ng-if=\"filmTvGuide.modal.details.genres\"><strong>Genres</strong>: <span ng-repeat=\"items in filmTvGuide.modal.details.genres\"><span ng-bind=\"items.name\"></span><span ng-hide=\"$last\">,</span> </span></p>\n" +
    "                <ul class=\"list-unstyled list-inline\">\n" +
    "                    <li><button class=\"btn btn-primary favouriteBtn\" ng-click=\"filmTvGuide.addFavourite(filmTvGuide.section, filmTvGuide.modal.details.id)\"> Add to Favourites <i class=\"fa fa-heart\"></i></button></li>\n" +
    "                    <li><button class=\"btn btn-primary\"> Add to Watched list <i class=\"fa fa-eye\"></i></button></li>\n" +
    "                    <li ng-if=\"filmTvGuide.modal.details.homepage\"><button class=\"btn btn-primary\" ng-click=\"filmTvGuide.externalLink(filmTvGuide.modal.details.homepage)\"> Homepage <i class=\"fa fa-home\"></i></button></li>\n" +
    "                    <li ng-if=\"filmTvGuide.modal.details.imdb_id\"><button class=\"btn btn-primary\" ng-click=\"filmTvGuide.externalLink('http://www.imdb.com/title/' + filmTvGuide.modal.details.imdb_id)\"> More Info <i class=\"fa fa-info-circle\"></i></button></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <img ng-src=\"http://image.tmdb.org/t/p/w500{{filmTvGuide.modal.details.poster_path}}\" class=\"img-responsive\" title=\"{{filmTvGuide.modal.details.title}}\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "</div>\n" +
    "");
}]);

'use strict';

angular.module('sistem3.osb-film-tv-guide', ['osb-film-tv-guide-template'])
  .directive('osbFilmTvGuide', ['$http', '$window', 'localStorageService', function ($http, $window, localStorageService) {
    return {
      templateUrl: 'osbFilmTvGuide.tpl.html',
      restrict: 'EA',
      link: function ($scope, element, attrs) {
        //console.log('Adding TV Film Guide');
        $scope.filmTvGuide = {};
        $scope.filmTvGuide.loading = false;
        $scope.filmTvGuide.listings = [];
        // Setting up defaults
        $scope.filmTvGuide.defaults = {};
        $scope.filmTvGuide.defaults.baseUrl = 'https://api.themoviedb.org/3/';
        $scope.filmTvGuide.defaults.apiKey = '892ae99b0451fed76a0ece0a8d0c1414';
        $scope.filmTvGuide.defaults.section = 'movie';
        $scope.filmTvGuide.defaults.searchTerm = 'popular';
        $scope.filmTvGuide.defaults.pageNumber = 1;
        // Setting up Nav array
        $scope.filmTvGuide.sections = [
          {name: 'Popular movies', section: 'movie', searchTerm: 'popular', icon: 'fa-film'},
          {name: 'Upcoming Movies', section: 'movie', searchTerm: 'upcoming', icon: 'fa-film'},
          {name: 'Top Rated Movies', section: 'movie', searchTerm: 'top_rated', icon: 'fa-film'},
          {name: 'Popular TV Shows', section: 'tv', searchTerm: 'popular', icon: 'fa-desktop'},
          {name: 'Top Rated TV Shows', section: 'tv', searchTerm: 'top_rated', icon: 'fa-desktop'}
        ];
        // Setting up Modal
        $scope.filmTvGuide.modal = {};
        $scope.filmTvGuide.modal.show = false;
        // Set default section
        $scope.filmTvGuide.section = 'movie';
        // Setting up User
        $scope.filmTvGuide.user = {};
        $scope.filmTvGuide.user.favourites = [];
        $scope.filmTvGuide.user.watched = [];
        // Main Get Data function
        $scope.filmTvGuide.getData = function(section, searchTerm) {
          //console.log(section + '/' + searchTerm);
          $scope.filmTvGuide.defaults.pageNumber = 1;
          $scope.filmTvGuide.section = section;
          $scope.filmTvGuide.defaults.section = section;
          $http.get($scope.filmTvGuide.defaults.baseUrl + section + '/' + searchTerm + '?api_key=' + $scope.filmTvGuide.defaults.apiKey)
            .success(function(data) {
              //console.log(data);
              $scope.filmTvGuide.listings = data.results;
              setTimeout(function() {
                angular.forEach($scope.filmTvGuide.user.favourites, function(value, key) {
                  $scope.filmTvGuide.updateFavWatched('favourite', value.id);
                });
                angular.forEach($scope.filmTvGuide.user.watched, function(value, key) {
                  $scope.filmTvGuide.updateFavWatched('watched', value.id);
                });
                var controller = new ScrollMagic.Controller();

                var scene = new ScrollMagic.Scene({triggerElement: '.filmTvGuide__listings #filmLoader', triggerHook: 'onEnter'})
                    .addTo(controller)
                    .on('enter', function (e) {
                      if (!element.find('#filmLoader').hasClass('active')) {
                         element.find('#filmLoader').addClass('active');
                         $scope.filmTvGuide.getMoreData();
                       }
                    });
                scene.update();

              }, 500);
            });
        };
        // Main Get Data function
        $scope.filmTvGuide.getMoreData = function() {
          element.find('#filmLoader').removeClass('active');
          $scope.filmTvGuide.defaults.pageNumber += 1;
          console.log($scope.filmTvGuide.defaults.pageNumber);
          $http.get($scope.filmTvGuide.defaults.baseUrl + $scope.filmTvGuide.defaults.section + '/' + $scope.filmTvGuide.defaults.searchTerm + '?page=' + $scope.filmTvGuide.defaults.pageNumber + '&api_key=' + $scope.filmTvGuide.defaults.apiKey)
              .success(function(data) {
                angular.forEach(data.results, function(key, value) {
                  $scope.filmTvGuide.listings.push(key);
                });
                element.find('#filmLoader').removeClass('active');
              });
        };
        // Get further details function
        $scope.filmTvGuide.getDetails = function(section, searchTerm) {
          //console.log(section + '/' + searchTerm);
          $http.get($scope.filmTvGuide.defaults.baseUrl + section + '/' + searchTerm + '?api_key=' + $scope.filmTvGuide.defaults.apiKey)
            .success(function(data) {
              //console.log(data);
              $scope.filmTvGuide.modal.show = true;
              $scope.filmTvGuide.modal.details = data;
            });
        };
        // External Link function
        $scope.filmTvGuide.externalLink = function(url) {
          //console.log(url);
          $window.open(url, '_blank');
        };
        // Close Modal funciton
        $scope.filmTvGuide.closeModal = function() {
          $scope.filmTvGuide.modal.show = false;
        };
        // Add to favourites
        $scope.filmTvGuide.addFavourite = function(section, id) {
          console.log(section + ' ' + id);
          var favExists = false;
          angular.forEach($scope.filmTvGuide.user.favourites, function(value, key) {
            if (value.id === id) {
              favExists = true;
            }
          });
          if (!favExists) {
            $scope.filmTvGuide.user.favourites.push({section: section, id: id});
            localStorageService.set('user', $scope.filmTvGuide.user);
            $scope.filmTvGuide.updateFavWatched('favourite', id);
          } else {
            alert('already added');
          }
        };
        // Add to watched list
        $scope.filmTvGuide.addWatched = function(section, id) {
          console.log(section + ' ' + id);
          var watchedExists = false;
          angular.forEach($scope.filmTvGuide.user.watched, function(value, key) {
            if (value.id === id) {
              watchedExists = true;
            }
          });
          if (!watchedExists) {
            $scope.filmTvGuide.user.watched.push({section: section, id: id});
            localStorageService.set('user', $scope.filmTvGuide.user);
            $scope.filmTvGuide.updateFavWatched('watched', id);
          } else {
            alert('already added');
          }
        };
        // Add Watched/Favourites classes
        $scope.filmTvGuide.updateFavWatched = function(type, id) {
          element.find('#' + id + ' .' + type + 'Btn').addClass(type + 'Active');
        };
        // Get user data from local storage
        $scope.filmTvGuide.user.getData = function() {
          var userData = localStorageService.get('user');
          if (userData) {
            $scope.filmTvGuide.user = userData;
          }
        };
        $scope.filmTvGuide.user.getData();
        // Get default content
        $scope.filmTvGuide.getData($scope.filmTvGuide.defaults.section, $scope.filmTvGuide.defaults.searchTerm);
      }
    };
  }]);
