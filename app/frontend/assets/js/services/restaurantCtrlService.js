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
            iframe:'<iframe src="https://docs.google.com/forms/d/1v_ZN_3v2Gz-Cd7CJc_MWr5FcuQNCxidjHRK-TM5JVow/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>'
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
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQUzdaRnRORl9QT2M#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        2:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQUExRNnY5V0xBc2c#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        3:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQU2VrQXBJcFlmWlE#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        4:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQYTE0bjlDNlZsemc#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        5:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQNVF0cnIwVnNLTDA#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        6:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQcmhKMGpJV2R3NWM#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        7:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQTHNzanplRF9feWM#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        8:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQTFFhTmQxdEo2MVk#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        9:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQaGYyTTZ2WnB0b0E#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        10:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQbFVMUzRWZnp2R3c#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        11:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQWUNacG9ZQUdsMG8#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        12:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQdktBVUhvRzB6aW8#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        13:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQTEdKMFdmdVZDZEU#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        14:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQX1lCS013akNmU1E#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        15:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQYmE3WnpqdnBQVjg#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        16:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQVXRGWms2NG1kN2c#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        17:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQc1hRRENfZnJONFk#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        18:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQVk43TTZfZ1JPaTg#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        19:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQWXJWZE1zRjNybk0#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        20:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQR0FXZkJLcC1sTm8#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        21:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQcEpwZlVqakdjM2M#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        22:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQWEtOcHZVc0JuUEk#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        23:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQb1M4WWxTVXcycTA#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        24:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQenpNZFRqR2ZwRXc#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        25:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQYWM2SG1kc29WMTg#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        26:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQY3FrSDdsdWNGVUE#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        27:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQQ0RWTkFkajhBcXc#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        28:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQampGVHh2aTNlMXc#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        29:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQWFpXUHpjbHZHRHc#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        30:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQQ21Oa1M5VDBVS0E#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        31:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQNmdSM0cxbHh6RWM#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        32:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        33:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQYUtBakR4UlpwZFU#grid" width="100%" height="600" frameborder="0"></iframe>'
        },

        34:{
            iframe:'<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQSk5vbFBGVFVBYTg#grid" width="100%" height="600" frameborder="0"></iframe>'
        },
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