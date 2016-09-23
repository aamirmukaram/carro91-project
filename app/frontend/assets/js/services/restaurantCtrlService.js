'use strict';
/**
 * Service for restaurant revenues
 */
app.factory('restaurantCtrlService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {
    var totalRevenues = {},
        totalCovers = {};
    $rootScope.totalRevenues = totalRevenues;
    $rootScope.totalCovers = totalCovers;

    var revenuesExists = function (filter, period, restaurant_id) {
        return totalRevenues[restaurant_id] && totalRevenues[restaurant_id][filter] && totalRevenues[restaurant_id][filter][period];

    };
    var coversExists = function (filter, period, restaurant_id) {
        return totalCovers[restaurant_id] && totalCovers[restaurant_id][filter] && totalCovers[restaurant_id][filter][period];
    };

    var restaurant_compliance = {
      1:{
          iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
      }
    };
    var restaurant_nightly_feedback = {
      1:{
          iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
      }
    };
    var restaurant_adjustments = {
      1:{
          iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
      }
    };
    var restaurant_sales_mix = {
      1:{
          iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
      }
    };
    var restaurant_invoices = {
      1:{
          iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
      }
    };
    var restaurant_audit = {
      1:{
          iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
      }
    };
    var restaurant_trip_advisor_extended = {
      1:{
          iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
      }
    };
    var restaurant_mystery_guest_extended = {
      1:{
          iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
      }
    };
    var restaurant_training = {
      1:{
          iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
      }
    };

    return {
        fetchTotalRevenues: function (params, doRefresh) {
            var deferred = $q.defer();
            doRefresh = doRefresh || false;
            params = params || null;
            if (doRefresh || !revenuesExists(params.filter, params.period, params.restaurant_id)) {

                $http({
                    url: $rootScope.pathToBackend + "restaurant/revenues/" + params.filter + "/get.php",
                    method: "GET",
                    params: {
                        restaurant_id: params.restaurant_id,
                        period: params.period
                    }
                }).success((function (params) {
                        return function (data) {
                            fetchRevenuesComplete(data, params);
                        }
                    })(params))
                    .catch(fetchRevenuesFailed);

            }
            else {
                deferred.resolve(totalRevenues[params.restaurant_id][params.filter][params.period]);
                return deferred.promise;
            }

            function fetchRevenuesComplete(response, params) {
                if (!totalRevenues[params.restaurant_id]) {
                    totalRevenues[params.restaurant_id] = {};
                }
                if (!totalRevenues[params.restaurant_id][params.filter]) {
                    totalRevenues[params.restaurant_id][params.filter] = {};
                }
                if (!totalRevenues[params.restaurant_id][params.filter][params.period]) {
                    totalRevenues[params.restaurant_id][params.filter][params.period] = {};
                }

                angular.copy(response.data, totalRevenues[params.restaurant_id][params.filter][params.period]);
                deferred.resolve(totalRevenues[params.restaurant_id][params.filter][params.period]);
            }

            function fetchRevenuesFailed() {
                deferred.reject();
            }

            return deferred.promise;
        },
        fetchTotalCovers: function (params, doRefresh) {
            var deferred = $q.defer();
            doRefresh = doRefresh || false;
            params = params || null;
            if (doRefresh || !coversExists(params.filter, params.period,params.restaurant_id)) {

                $http({
                    url: $rootScope.pathToBackend + "restaurant/covers/" + params.filter + "/get.php",
                    method: "GET",
                    params: {
                        restaurant_id: params.restaurant_id,
                        period: params.period
                    }
                }).success((function (params) {
                        return function (data) {
                            fetchCoversComplete(data, params);
                        }
                    })(params))
                    .catch(fetchCoversFailed);

            }
            else {
                deferred.resolve(totalCovers[params.restaurant_id][params.filter][params.period]);
                return deferred.promise;
            }

            function fetchCoversComplete(response, params) {

                if (!totalCovers[params.restaurant_id]) {
                    totalCovers[params.restaurant_id] = {};
                }
                if (!totalCovers[params.restaurant_id][params.filter]) {
                    totalCovers[params.restaurant_id][params.filter] = {};
                }
                if (!totalCovers[params.restaurant_id][params.filter][params.period]) {
                    totalCovers[params.restaurant_id][params.filter][params.period] = {};
                }

                angular.copy(response.data, totalCovers[params.restaurant_id][params.filter][params.period]);
                deferred.resolve(totalCovers[params.restaurant_id][params.filter][params.period]);


            }

            function fetchCoversFailed() {
                deferred.reject();
            }

            return deferred.promise;
        },
        fetchDigitalPerformance: function (params) {
            var deferred = $q.defer();

            function fetchDigitalPerformanceComplete(resp) {
                deferred.resolve(resp.data);
            }

            function fetchDigitalPerformanceFailed() {
                deferred.reject();
            }

            $http({
                url: $rootScope.pathToBackend + "restaurant/digital-performance/" + params.filter + "/get.php",
                method: "GET",
                params: {
                    restaurant_id: params.restaurant_id,
                    period: params.period
                }
            }).success(fetchDigitalPerformanceComplete)
                .catch(fetchDigitalPerformanceFailed);

            return deferred.promise;
        },
        fetchTripAdvisor: function (params) {
            var deferred = $q.defer();

            function fetchTripAdvisorComplete(resp) {
                deferred.resolve(resp.data);
            }

            function fetchTripAdvisorFailed() {
                deferred.reject();
            }

            $http({
                url: $rootScope.pathToBackend + "restaurant/trip-advisor/" + params.filter + "/get.php",
                method: "GET",
                params: {
                    restaurant_id: params.restaurant_id,
                    period: params.period
                }
            }).success(fetchTripAdvisorComplete)
                .catch(fetchTripAdvisorFailed);

            return deferred.promise;
        },
        fetchBookatable: function (params) {
            var deferred = $q.defer();

            function fetchBookatableComplete(resp) {
                deferred.resolve(resp.data);
            }

            function fetchBookatableFailed() {
                deferred.reject();
            }

            $http({
                url: $rootScope.pathToBackend + "restaurant/bookatable/" + params.filter + "/get.php",
                method: "GET",
                params: {
                    restaurant_id: params.restaurant_id,
                    period: params.period
                }
            }).success(fetchBookatableComplete)
                .catch(fetchBookatableFailed);

            return deferred.promise;
        },
        fetchBookingMade: function (params) {
            var deferred = $q.defer();

            function fetchBookingMadeComplete(resp) {
                deferred.resolve(resp.data);
            }

            function fetchBookingMadeFailed() {
                deferred.reject();
            }

            $http({
                url: $rootScope.pathToBackend + "restaurant/booking-made/" + params.filter + "/get.php",
                method: "GET",
                params: {
                    restaurant_id: params.restaurant_id,
                    period: params.period
                }
            }).success(fetchBookingMadeComplete)
                .catch(fetchBookingMadeFailed);

            return deferred.promise;
        },
        restaurantRevenueCoverResponseYearPadding:function(data){

            var new_labels = angular.copy(data.labels);
            var new_data = angular.copy(data.data);
            var months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];

            var counter = 0;
            for (var x = 0; x < 12; x++) {
                if (data.labels[counter] !== months[x]) {
                    new_labels.splice(x, 0, months[x]);
                    new_data.splice(x, 0, '0');
                }
                else {
                    counter = counter + 1;
                }
            }

            data.labels = new_labels;
            data.data = new_data;

            return data;
        },
        restaurantRevenueCoverResponseMonthPadding:function(data){

            var new_labels = angular.copy(data.labels);
            var new_data = angular.copy(data.data);
            var weeks = [
                'Week 1',
                'Week 2',
                'Week 3',
                'Week 4',
                'Week 5'
            ];

            var counter = 0;
            for (var x = 0; x < 12; x++) {
                if (data.labels[counter] !== weeks[x]) {
                    new_labels.splice(x, 0, weeks[x]);
                    new_data.splice(x, 0, '0');
                }
                else {
                    counter = counter + 1;
                }
            }

            data.labels = new_labels;
            data.data = new_data;

            return data;
        },
        restaurant_compliance:restaurant_compliance,
        restaurant_nightly_feedback:restaurant_nightly_feedback,
        restaurant_adjustments:restaurant_adjustments,
        restaurant_sales_mix:restaurant_sales_mix,
        restaurant_invoices:restaurant_invoices,
        restaurant_audit:restaurant_audit,
        restaurant_trip_advisor_extended:restaurant_trip_advisor_extended,
        restaurant_mystery_guest_extended:restaurant_mystery_guest_extended,
        restaurant_training:restaurant_training
    }
}]);