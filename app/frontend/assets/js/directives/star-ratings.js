'use strict';

//Directive for half star ratings

app.directive('starRating', function () {
    return {
        restrict: "EA",
        template : "<span class='rating' ng-class='{readonly: readonly}'>" +
        "  <span ng-repeat='star in stars' class='text-yellow text-extra-large margin-right-5' ng-click='toggle($index)'>" +
        "    <i class='fa fa-star'></i>" + //&#9733
        "  </span>" +
        "  <span ng-repeat='half in halfStars' class='text-yellow text-extra-large margin-right-5' ng-click='toggle($index)'>" +
        "    <i class='fa fa-star-half'></i>" + //&#9733
        "  </span>" +
        "  <span ng-repeat='empty in emptyStars' class='margin-right-5 text-large' ng-click='toggle($index)'>" +
        "    <i class='fa fa-star-o'></i>" + //&#9733
        "  </span>" +
        "</span>",
        scope: {
            ratingValue: "=ngModel",
            max: "=?", //optional: default is 5
            onRatingSelected: "&?",
            readonly: "=?"
        },
        link: function (scope, elem, attrs) {
            if (scope.max === undefined) {
                scope.max = 5;
            }
            function updateStars() {
                scope.stars = [];
                scope.halfStars = [];
                scope.emptyStars = [];
                for (var x = 0; x < scope.max; x++) {
                    scope.emptyStars.push(x);
                }

                if (scope.ratingValue % 1 === 0) {
                    for (var i = 0; i < scope.ratingValue; i++) {
                        scope.stars.push({
                            filled: i
                        });
                        scope.emptyStars.pop();
                    }
                }
                if (scope.ratingValue % 1 !== 0) {
                    for (var j = 0; j < scope.ratingValue - 1; j++) {
                        scope.stars.push({
                            filled: j < scope.ratingValue - 1
                        });
                        scope.emptyStars.pop();
                    }
                    scope.halfStars.push({
                        filled: j < 1
                    });
                    scope.emptyStars.pop();
                }
            }

            scope.toggle = function (index) {
                if (scope.readonly === undefined || scope.readonly === false) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                }
            };
            scope.$watch("ratingValue", function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    };
});