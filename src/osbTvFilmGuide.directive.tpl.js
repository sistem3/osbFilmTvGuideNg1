angular.module('osb-film-tv-guide-template', ['osbTvFilmGuide.tpl.html']);

angular.module("osbTvFilmGuide.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("osbTvFilmGuide.tpl.html",
    "<div class=\"filmTvGuide\">\n" +
    "    <header class=\"container\">\n" +
    "        <h1>TV/Movie Guide</h1>\n" +
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
    "            <li ng-repeat=\"items in filmTvGuide.listings\" class=\"col-xs-12 col-sm-6 col-md-3\">\n" +
    "                <!--<h2 ng-bind=\"items.title\"></h2>-->\n" +
    "                <img ng-src=\"http://image.tmdb.org/t/p/w500{{items.poster_path}}\" class=\"img-responsive\" title=\"{{items.title}}\" />\n" +
    "                <div id=\"{{items.id}}\" class=\"filmTvGuide__listings--nav\">\n" +
    "                    <a title=\"More Info\" class=\"infoBtn\" ng-click=\"filmTvGuide.getDetails(filmTvGuide.section, items.id)\"><i class=\"fa fa-info-circle\"></i></a>\n" +
    "                    <a title=\"Add to Watched\" class=\"watchedBtn\" ng-click=\"filmTvGuide.addWatched(filmTvGuide.section, items.id)\"><i class=\"fa fa-eye\"></i></a>\n" +
    "                    <a title=\"Add to Favourite\" class=\"favouriteBtn\" ng-click=\"filmTvGuide.addFavourite(filmTvGuide.section, items.id)\"><i class=\"fa fa-heart\"></i></a>\n" +
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
