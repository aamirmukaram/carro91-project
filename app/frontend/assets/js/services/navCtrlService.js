'use strict';
/**
 * Service for navbar data
 */
app.factory('navCtrlService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {
    var restaurants = {},
        brands = {},
        restaurants_fetched = false,
        brands_fetched = false;


    return {
        fetchRestaurants: function (doRefresh) {
            doRefresh = doRefresh || false;
            var deferred = $q.defer();

            function fetchRestaurantsComplete(res) {
                restaurants_fetched = true;
                angular.copy(res.data,restaurants);
                deferred.resolve(restaurants);
            }

            function fetchRestaurantsFailed(res) {
                deferred.reject();
            }

            if (doRefresh || !restaurants_fetched) {

                $http({
                    url: $rootScope.pathToBackend + "restaurants/get.php",
                    method: "GET"
                }).success(fetchRestaurantsComplete)
                    .catch(fetchRestaurantsFailed);
            }
            else {
                deferred.resolve(restaurants);
            }
            return deferred.promise;

        },
        fetchBrands: function (doRefresh) {
            doRefresh = doRefresh || false;
            var deferred = $q.defer();

            function fetchBrandsComplete(res) {
                brands_fetched = true;
                angular.copy(res.data,brands);
                deferred.resolve(brands);
            }

            function fetchBrandsFailed(res) {
                deferred.reject();
            }

            if (doRefresh || !brands_fetched) {

                $http({
                    url: $rootScope.pathToBackend + "brands/get.php",
                    method: "GET"
                }).success(fetchBrandsComplete)
                    .catch(fetchBrandsFailed);
            }
            else {
                deferred.resolve(restaurants);
            }
            return deferred.promise;

        }

    };

}]);
