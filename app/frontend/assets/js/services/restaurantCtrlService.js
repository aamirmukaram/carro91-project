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
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1H0cKRBDI6MpIpKPeh36wZI8m8x-NjNYdEjXhDs49dWI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        2:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1conYqtGXivh3fmtn01UK0wtN2ZNz4nIkJ8QOwSTbeow/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        3:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1cchcU6QfnQX_5tZT4JhFDgGYE66jK07mM5D3bMTylSE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        4:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1iF7vpwkC6fhhMUErCEAJuzu3gSwuNFKJBpyh-eNyfuM/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        5:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/16rYV_Ecdw7ssifDI87F5y-LvPRLwZY2M5VDMBOA-ZGw/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        6:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1tVZP_JdCLZpJQGRCIH2uoqyPrzUj2zC19EmoNK-njGE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        7:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1GttcoEjGG76AATe0OWWRMHRUB_BbQZ-FUm1ctUCIdq0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        8:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1EeZbQxUGUzXZjvPI_7SIIq7bsCCqQ_Phx2wwMfhYxDw/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        9:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1E_FhvWVBA5RrQIgVDtofgB05TJFrUKqT-SV5wiwNVI8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        10:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1jy7DUWqRqWcS9QONBvraqmE_6tID3QsmNyGaYxPNe_s/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        11:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1MqUhXIa2qBPx-xL7RuhRQBpZsI9tjil2J5YwAheR1CQ/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        12:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1GBaAwh-SvpI3zMpEtdhNEX9-CWj9bbTckyZow0n_5Uk/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        13:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1lZ8kOLVbcGSuyaB8cedgrAV0-6AToxslIyhQ8En6phE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        14:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/16RHBKTGQbJX_JNJ_7RA9_g3yL2IUg9NuFzsCWD9YH6M/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        15:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1RrXVIhSCyYh-TQP-o0cJstkOg_UsUbkhC2mVgGDYPg4/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        16:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1w-Gfcd_WCiUfE8YFlWhA0Bx_gVO_C9cq7lcmL9kyYKY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        17:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1IVcEgGYxLByrikV4qxNZsuSGmXmMWXOcvEvRWwg4Owg/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        18:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1ymrAOsv06sBbL8x7aHzcpAB5s9eIpOPuHJwg_Jd52-8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        19:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1K0bgAEwTlVe4_VYxF-n0YQDeqY_6KtTLU5r8L_ekSEM/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        20:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1jMl6jaKN089_Uy7VcluriYsBW8RrrWJ_G2MB0uG0b0s/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        21:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1IxHFefQc0vJPxCfUWnGSuPUteocNyy8Q7xv58Qbjj-8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        22:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1ebtJFurHCl2DHrttcJHaG5cBnnCH_qox-Axtam_j3Jc/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        23:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1ebtJFurHCl2DHrttcJHaG5cBnnCH_qox-Axtam_j3Jc/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        24:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1khbCUIK6hrLWUcjYKwkDPOyz1kH_DjP6WuIVmwy47-s/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        25:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/12hGr5GTfS63nyxjwJYPrfu_eZFZ6R89Ff9VUyrcswBY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        26:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1i322exYNoY-KveEXy6VP8hH1DCRWld8BNftihdXZXHE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        27:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/15vBoSjH2YezmLnrpuTzB2_wSjkG1u36PLo6GVsZC-9E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        28:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1L14RVQWMMOY_eJC1hkxyPwLYr97SfHaiOgMDUILOp5A/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        29:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        30:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1zPfCt3Z4bM_pbE4LaNjQcTij8qIJq1dSQerB0zSQUqA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        31:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1JCmCmONSHaR-xr3TvOik_7SycXjPeS5qMaEJ9884wYE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        32:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1vbpUD2471G9uLftM5Wgp79_Byu46WTHjaeTi5bqo7ag/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        33:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1Ka02xA1VeT4lXfExMGcnIRcksKMU9s3vgZM2CV4rYwo/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
        }

        34:{
            iframe:'<iframe src="https://docs.google.com/spreadsheets/d/1ImXBK9aLIT0Vh6e2uj4f9cJJGV-S2YR7tL2D-mkU6L0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
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