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
