'use strict';

app.controller('navCtrl', ["$scope", '$q', 'navCtrlService',
    function ($scope, $q, navCtrlService) {
        $scope.params = {
            fetching_data: true
        };
        $scope.restaurants = null;
        $scope.brands = null;

        $q.all({
            fetchRestaurants: navCtrlService.fetchRestaurants(),
            fetchBrands: navCtrlService.fetchBrands()
        }).then(function (resp) {
            $scope.restaurants = resp.fetchRestaurants.restaurants;
            $scope.brands = resp.fetchBrands.brands;
            $scope.params.fetching_data = false;
            $scope.categorize_restaurants = categorizeRestaurants($scope.restaurants);
        });

        var categorizeRestaurants = function (restaurants) {
            var output = [];
            var isBrandIdExists = function (id) {     //Will return index number categorizeRestaurants
                var result = false;
                angular.forEach(output, function (rest, inx) {
                    if (rest.brand_id == id) {
                        result = inx;
                    }
                });
                return result;
            };

            var isUserAuthorizedRetaurant = function (rest) {
                if($scope.user.app_metadata.authorization.groups[0] == 'USER')
                {
                    var authorized = false;
                    angular.forEach($scope.user.user_metadata.restaurants, function (restaurant) {
                        if (restaurant.id == rest.id) {
                            authorized = true;
                        }
                    });
                    return authorized;
                }
                else {
                    return true;
                }
            };

            angular.forEach(restaurants, function (rest) {
                if(isUserAuthorizedRetaurant(rest)){
                    var result = isBrandIdExists(rest.brand_id);
                    if (result === false) {
                        output.push({
                            brand_id: rest.brand_id,
                            brand_name: rest.brand_name,
                            restaurants: [rest]
                        });
                    }
                    else {
                        output[result].restaurants.push(rest);
                    }
                }
            });
            return output;
        };
    }]);