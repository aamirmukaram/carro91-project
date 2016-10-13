'use strict';
/**
 * controllers used for the dashboard
 */

app.filter('monthName', [function () {
    return function (monthNumber) { //1 = January
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return monthNames[monthNumber - 1];
    }
}]);
app.filter('abs', function () {
    return function (val) {
        val = val || 0
        return Math.abs(val);
    }
});

app.controller('restaurantNightlyFeedbackForm',['$scope', 'ngNotify',
    function ($scope, ngNotify) {
        $scope.currentStep = 1;

        // Initial Value
        $scope.form = {

            next: function (form) {

                $scope.toTheTop();

                if (form.$valid) {
                    form.$setPristine();
                    nextStep();
                } else {
                    var field = null, firstError = null;
                    for (field in form) {
                        if (field[0] != '$') {
                            if (firstError === null && !form[field].$valid) {
                                firstError = form[field].$name;
                            }

                            if (form[field].$pristine) {
                                form[field].$dirty = true;
                            }
                        }
                    }

                    angular.element('.ng-invalid[name=' + firstError + ']').focus();
                    errorMessage();
                }
            },
            prev: function (form) {
                $scope.toTheTop();
                prevStep();
            },
            goTo: function (form, i) {
                if (parseInt($scope.currentStep) > parseInt(i)) {
                    $scope.toTheTop();
                    goToStep(i);

                } else {
                    if (form.$valid) {
                        $scope.toTheTop();
                        goToStep(i);

                    } else
                        errorMessage();
                }
            },
            submit: function () {

            },
            reset: function () {

            }
        };


        var nextStep = function () {
            $scope.currentStep++;
        };
        var prevStep = function () {
            $scope.currentStep--;
        };
        var goToStep = function (i) {
            $scope.currentStep = i;
        };
        var errorMessage = function (i) {

            ngNotify.set('please complete the form in this step before proceeding', {
                theme: 'pure',
                position: 'top',
                type: 'error',
                button: 'true',
                sticky: 'false',
            });
        };
    }]);


app.controller('restaurantAbstract',['$scope','$rootScope',function($scope,$rootScope){
    var not_verified_action = function(){
        $scope.$state.go('login.signin');
    };

    var verifyUser = function(restaurant_id){
        var user_is_verified = false;
        if($rootScope.user.app_metadata.authorization.groups[0] == 'USER' || $rootScope.user.app_metadata.authorization.groups[0] == 'SUPER_USER') {
            var keepGoing = true;
            angular.forEach($rootScope.user.user_metadata.restaurants,function(restaurant){
                if(keepGoing && restaurant.id == restaurant_id) {
                    user_is_verified = true;
                    keepGoing = false;
                }

            });
            return user_is_verified;
        }else {
            return true;
        }
    };

    if(!verifyUser($scope.$stateParams.id)) {
        not_verified_action();
    }

    var checkForUserAuthListner = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if(toState.name.indexOf("restaurantView") > -1) {
            verifyUser(toParams.id) ? angular.noop():not_verified_action();
        }
    });


    $scope.$on('$destroy', function() {
        checkForUserAuthListner();
    });

}]);

app.controller('restaurantRevenueCoverYear', ["$scope", "restaurantCtrlService", '$q', '$state',
    function ($scope, restaurantCtrlService, $q, $state) {

        var responsePadding = restaurantCtrlService.restaurantRevenueCoverResponseYearPadding;

        var fetchChartData = function (filter) {
            filter = filter || $scope.params.current_year;
            $scope.params.current_period = filter;
            $scope.params.fetching_data = true;
            $q.all({
                fetchTotalRevenues: restaurantCtrlService.fetchTotalRevenues({
                    restaurant_id: $state.params.id,
                    filter: 'yearly',
                    period: filter
                }),
                fetchTotalCovers: restaurantCtrlService.fetchTotalCovers({
                    restaurant_id: $state.params.id,
                    filter: 'yearly',
                    period: filter
                })
            }).then(function (response) {
                response.fetchTotalRevenues = responsePadding(response.fetchTotalRevenues);
                response.fetchTotalCovers = responsePadding(response.fetchTotalCovers);


                $scope.params.total_covers = response.fetchTotalCovers.data.reduce(function(current_value,next_value,ind,arry){
                    return Number(current_value) + Number(next_value);
                },0);
                $scope.params.total_covers = Math.round($scope.params.total_covers);


                $scope.params.total_revenues = response.fetchTotalRevenues.data.reduce(function(current_value,next_value,ind,arry){
                    return Number(current_value) + Number(next_value);
                },0);
                $scope.params.total_revenues = Math.round($scope.params.total_revenues);

                $scope.params.average = ($scope.params.total_revenues / $scope.params.total_covers);
                $scope.params.average > -1 ?  $scope.params.average = $scope.params.average.toFixed(2) : $scope.params.average = 0.00;


                $scope.labels = response.fetchTotalRevenues.labels;
                $scope.data = [];
                $scope.data.push(response.fetchTotalRevenues.data);
                $scope.data.push(response.fetchTotalCovers.data);

                angular.copy(response.fetchTotalRevenues.labels,$scope.params.revenue_labels);
                angular.copy(response.fetchTotalRevenues.data,$scope.params.revenue_data);


                angular.copy(response.fetchTotalCovers.labels,$scope.params.covers_labels);
                angular.copy(response.fetchTotalCovers.data,$scope.params.covers_data);

                $scope.params.fetching_data = false;
            });
        };

        var init = function(){
            $scope.params = {
                chartsJs: {
                    datasetOverride: [
                        {
                            label: 'Total Revenues',
                            borderWidth: 1,
                            type: 'bar',
                            yAxisID:'A'
                        },
                        {
                            label: 'Total Counts',
                            borderWidth: 3,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            type: 'line',
                            yAxisID:'B'
                        }
                    ],
                    options:{
                        scales: {
                            yAxes: [{
                                id: 'A',
                                type: 'linear',
                                position: 'left'
                            }, {
                                id: 'B',
                                type: 'linear',
                                position: 'right'
                            }]
                        }
                    }
                },
                changePeriod: function (minus_year) {
                    var year = (new Date().getFullYear());
                    year = year - minus_year;
                    fetchChartData(year);
                },
                changePeriodRC: function (value) {
                    $scope.params.period = $scope.params.period + value;
                    fetchChartData($scope.params.period);
                },
                current_period: null,
                current_year: (new Date().getFullYear()),
                fetching_data: true,
                total_covers : null,
                total_revenues : null,
                average:null,
                refresh_signal : 'restaurant-revenue-cover-year-refresh',
                revenue_labels:[],
                revenue_data:[],
                covers_labels:[],
                covers_data:[],
                period: (new Date().getFullYear())
            };
            fetchChartData();
        };

        init();

        $(document).on($scope.params.refresh_signal, '.panel', function (e, panel) {
            init();
            setTimeout(function () {
                panel.removeSpinner();
            }, 1000);

        });

    }]);
app.controller('restaurantRevenueCoverMonth', ["$scope", "restaurantCtrlService", '$q', '$state',
    function ($scope, restaurantCtrlService, $q, $state) {
        $scope.params = {
            chartsJs: {
                datasetOverride: [
                    {
                        label: 'Total Revenues',
                        borderWidth: 1,
                        type: 'bar',
                        yAxisID:'A'
                    },
                    {
                        label: 'Total Counts',
                        borderWidth: 3,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        type: 'line',
                        yAxisID:'B'
                    }
                ],
                options:{
                    scales: {
                        yAxes: [{
                            id: 'A',
                            type: 'linear',
                            position: 'left'
                        }, {
                            id: 'B',
                            type: 'linear',
                            position: 'right'
                        }]
                    }
                }
            },
            changePeriod: function (minus_year) {
                var year = (new Date().getMonth()) + 1;
                year = year - minus_year;
                fetchChartData(year);
            },
            changePeriodRC: function (value) {
                $scope.params.period = $scope.params.period + value;
                fetchChartData($scope.params.period);
            },
            current_period: null,
            current_month: (new Date().getMonth()) + 1,
            fetching_data: true,
            total_covers : null,
            total_revenues : null,
            refresh_signal : 'restaurant-revenue-cover-month-refresh',
            average : null,
            revenue_labels:[],
            revenue_data:[],
            covers_labels:[],
            covers_data:[],
            period: (new Date().getMonth()) + 1
        };

        var responsePadding = restaurantCtrlService.restaurantRevenueCoverResponseMonthPadding;

        var fetchChartData = function (filter) {
            filter = filter || $scope.params.current_month;
            $scope.params.current_period = filter;
            $scope.params.fetching_data = true;
            $q.all({
                fetchTotalRevenues: restaurantCtrlService.fetchTotalRevenues({
                    restaurant_id: $state.params.id,
                    filter: 'monthly',
                    period: filter
                }),
                fetchTotalCovers: restaurantCtrlService.fetchTotalCovers({
                    restaurant_id: $state.params.id,
                    filter: 'monthly',
                    period: filter
                })
            }).then(function (response) {
                response.fetchTotalRevenues = responsePadding(response.fetchTotalRevenues);
                response.fetchTotalCovers = responsePadding(response.fetchTotalCovers);

                $scope.params.total_covers = response.fetchTotalCovers.data.reduce(function(current_value,next_value,ind,arry){
                    return Number(current_value) + Number(next_value);
                },0);
                $scope.params.total_covers = Math.round($scope.params.total_covers);

                $scope.params.total_revenues = response.fetchTotalRevenues.data.reduce(function(current_value,next_value,ind,arry){
                    return Number(current_value) + Number(next_value);
                },0);
                $scope.params.total_revenues = Math.round($scope.params.total_revenues);

                $scope.params.average = ($scope.params.total_revenues / $scope.params.total_covers);
                $scope.params.average > -1 ?  $scope.params.average = $scope.params.average.toFixed(2) : $scope.params.average = 0.00;

                $scope.labels = response.fetchTotalRevenues.labels;
                $scope.data = [];
                $scope.data.push(response.fetchTotalRevenues.data);
                $scope.data.push(response.fetchTotalCovers.data);

                angular.copy(response.fetchTotalRevenues.labels,$scope.params.revenue_labels);
                angular.copy(response.fetchTotalRevenues.data,$scope.params.revenue_data);


                angular.copy(response.fetchTotalCovers.labels,$scope.params.covers_labels);
                angular.copy(response.fetchTotalCovers.data,$scope.params.covers_data);

                $scope.params.fetching_data = false;

            });
        };

        var init = function(){
            fetchChartData();
        };

        init();

        $(document).on($scope.params.refresh_signal, '.panel', function (e, panel) {
            init();
            setTimeout(function () {
                panel.removeSpinner();
            }, 1000);

        });

    }]);
app.controller('restaurantDigitalPerformanceMonth', ["$scope", "restaurantCtrlService", '$q', '$state',
    function ($scope, restaurantCtrlService, $q, $state) {
        var init = function () {
            $scope.params = {
                digital_performance: null,
                fetching_data: true,
                refresh_signal: 'digital-performance-refresh'
            };
            $scope.params.fetching_data = true;
            restaurantCtrlService.fetchDigitalPerformance({
                restaurant_id: $state.params.id,
                filter: 'monthly',
                period: (new Date().getMonth())
            }).then(function (resp) {
                resp && resp[0] ? $scope.params.digital_performance = resp[0] : angular.noop();
                $scope.params.fetching_data = false;
            });
        };
        init();

        $(document).on($scope.params.refresh_signal, '.panel', function (e, panel) {
            init();
            setTimeout(function () {
                panel.removeSpinner();
            }, 1000);

        });
    }]);
app.controller('restaurantDigitalPerformanceYear', ["$scope", "restaurantCtrlService", '$q', '$state',
    function ($scope, restaurantCtrlService, $q, $state) {
        $scope.params = {
            digital_performance: null,
            period: (new Date().getFullYear()),
            changePeriod: function (value) {
                $scope.params.period = $scope.params.period + value;
                fetchData($state.params.id, 'yearly', $scope.params.period);
            },
            current_year: (new Date().getFullYear()),
            fetching_data: true
        };

        var fetchData = function (restaurant_id, filter, period) {
            $scope.params.fetching_data = true;
            restaurantCtrlService.fetchDigitalPerformance({
                restaurant_id: restaurant_id,
                filter: filter,
                period: period
            }).then(function (resp) {
                $scope.params.digital_performance = resp;
                $scope.params.fetching_data = false;
            });
        };

        fetchData($state.params.id, 'yearly', $scope.params.period);

    }]);
app.controller('restaurantTripAdvisorMonth', ["$scope", "restaurantCtrlService", '$q', '$state',
    function ($scope, restaurantCtrlService, $q, $state) {

        var init = function () {
            $scope.params = {
                trip_advisor: null,
                fetching_data: true,
                refresh_signal: 'trip-advisor-refresh'
            };
            $scope.params.fetching_data = true;
            restaurantCtrlService.fetchTripAdvisor({
                restaurant_id: $state.params.id,
                filter: 'monthly',
                period: (new Date().getMonth())
            }).then(function (resp) {
                resp && resp[0] ? $scope.params.trip_advisor = resp[0] : angular.noop();
                $scope.params.fetching_data = false;
            });
        };
        init();

        $(document).on($scope.params.refresh_signal, '.panel', function (e, panel) {
            init();
            setTimeout(function () {
                panel.removeSpinner();
            }, 1000);

        });


    }]);
app.controller('restaurantTripAdvisorYear', ["$scope", "restaurantCtrlService", '$q', '$state',
    function ($scope, restaurantCtrlService, $q, $state) {
        $scope.params = {
            trip_advisor: null,
            period: (new Date().getFullYear()),
            changePeriod: function (value) {
                $scope.params.period = $scope.params.period + value;
                fetchData($state.params.id, 'yearly', $scope.params.period);
            },
            current_year: (new Date().getFullYear()),
            fetching_data: true
        };

        var fetchData = function (restaurant_id, filter, period) {
            $scope.params.fetching_data = true;
            restaurantCtrlService.fetchTripAdvisor({
                restaurant_id: restaurant_id,
                filter: filter,
                period: period
            }).then(function (resp) {
                $scope.params.trip_advisor = resp.data;
                $scope.params.fetching_data = false;
            });
        };

        fetchData($state.params.id, 'yearly', $scope.params.period);

    }]);
app.controller('restaurantBookATableWeek', ["$scope", "restaurantCtrlService", '$q', '$state', '$compile', '$timeout', 'uiCalendarConfig',
    function ($scope, restaurantCtrlService, $q, $state, $compile, $timeout, uiCalendarConfig) {

        var init = function () {
            $scope.params = {
                this_week: null,
                next_week: null,
                this_year: null,
                bookings: {
                    color: '#86bc61',
                    textColor: 'white',
                    events: []
                },
                covers: {
                    color: '#f2c52b',
                    textColor: 'white',
                    events: []
                },
                cancelled: {
                    color: '#f48e3f',
                    textColor: 'white',
                    events: []
                },
                events: [],
                fetching_data: true,
                refresh_signal: 'booka-table-refresh',
                eventSources: null,
                uiConfig: {
                    calendar: {
                        height: 450,
                        editable: true,
                        header: {
                            left: 'title',
                            center: '',
                            right: 'today prev,next'
                        }
                    }
                }
            };


            $scope.params.fetching_data = true;
            $q.all({
                'this_week': restaurantCtrlService.fetchBookatable({
                    restaurant_id: $state.params.id,
                    filter: 'weekly',
                    period: 0
                }), 'next_week': restaurantCtrlService.fetchBookatable({
                    restaurant_id: $state.params.id,
                    filter: 'weekly',
                    period: 1
                }), 'this_year': restaurantCtrlService.fetchBookatable({
                    restaurant_id: $state.params.id,
                    filter: 'yearly',
                    period: (new Date().getFullYear())
                })
            }).then(function (resp) {
                $scope.params.this_week = resp.this_week;
                $scope.params.next_week = resp.next_week;
                $scope.params.this_year = resp.this_year;


                angular.forEach($scope.params.this_year, function (data) {

                    $scope.params.bookings.events.push({
                        title: data.new_bookings + " Booked",
                        start: new Date(data.date_full),
                        allDay: true
                    });

                    $scope.params.covers.events.push({
                        title: data.covers + " Covers",
                        start: new Date(data.date_full),
                        allDay: true
                    });

                    $scope.params.cancelled.events.push({
                        title: data.cancelled + " Cancelled",
                        start: new Date(data.date_full),
                        allDay: true
                    });


                });



                $scope.params.eventSources = [[], $scope.params.bookings, $scope.params.covers, $scope.params.cancelled];




                $scope.params.fetching_data = false;

            });
        };

        init();

        $(document).on($scope.params.refresh_signal, '.panel', function (e, panel) {
            init();
            setTimeout(function () {
                panel.removeSpinner();
            }, 1000);

        });


    }]);
app.controller('restaurantBookATableMonth', ["$scope", "restaurantCtrlService", '$q', '$state',
    function ($scope, restaurantCtrlService, $q, $state) {
        $scope.params = {
            booka_table: null,
            period: new Date().toISOString().slice(0, 10),
            changePeriod: function (value) {
                var new_date = new Date($scope.params.period);
                if (value === 1) {
                    new_date.setMonth(new_date.getMonth() + 1);
                }
                else if (value === -1) {
                    new_date.setMonth(new_date.getMonth() - 1);
                }
                $scope.params.period = new_date.toISOString().slice(0, 10);
                $scope.params.period_month = new_date.getMonth() + 1;
                $scope.params.next_month = $scope.params.period_month + 1;
                $scope.params.previous_month = $scope.params.period_month - 1;
                fetchData($state.params.id, 'monthly', $scope.params.period);
            },
            current_month: (new Date().getMonth() + 1),
            fetching_data: true,
            period_month: (new Date().getMonth() + 1),
            next_month: null,
            previous_month: null
        };

        var fetchData = function (restaurant_id, filter, period) {
            $scope.params.fetching_data = true;
            restaurantCtrlService.fetchBookatable({
                restaurant_id: restaurant_id,
                filter: filter,
                period: period
            }).then(function (resp) {
                $scope.params.booka_table = resp;
                $scope.params.fetching_data = false;
            });
        };

        var init = function () {
            $scope.params.next_month = $scope.params.period_month + 1;
            $scope.params.previous_month = $scope.params.period_month - 1;
            fetchData($state.params.id, 'monthly', $scope.params.period);
        };
        init();


    }]);
app.controller('restaurantBookingMade', ["$scope", "restaurantCtrlService", '$q', '$state',
    function ($scope, restaurantCtrlService, $q, $state) {
        var init = function () {
            $scope.params = {
                today: null,
                yesterday: null,
                next_week: null,
                this_month: null,
                last_month_new_cust: null,
                last_month_return_cust: null,
                fetching_data: true,
                refresh_signal: 'booking-made-refresh'
            };
            $q.all({
                'today': restaurantCtrlService.fetchBookingMade({
                    restaurant_id: $state.params.id,
                    filter: 'daily',
                    period: 0
                }),
                'yesterday': restaurantCtrlService.fetchBookingMade({
                    restaurant_id: $state.params.id,
                    filter: 'daily',
                    period: -1
                }),
                'next_week': restaurantCtrlService.fetchBookingMade({
                    restaurant_id: $state.params.id,
                    filter: 'weekly',
                    period: 1
                }),
                'this_month': restaurantCtrlService.fetchBookingMade({
                    restaurant_id: $state.params.id,
                    filter: 'monthly',
                    period: (new Date().getMonth()) + 1
                }),
                'last_month_return_cust': restaurantCtrlService.fetchBookingMade({
                    restaurant_id: $state.params.id,
                    filter: 'returning-customers',
                    period: (new Date().getMonth()) + 1
                }),
                'last_month_new_cust': restaurantCtrlService.fetchBookingMade({
                    restaurant_id: $state.params.id,
                    filter: 'new-customers',
                    period: (new Date().getMonth()) + 1
                })
            }).then(function (resp) {
                resp.today ? $scope.params.today = resp.today[0] : angular.noop();
                resp.yesterday ? $scope.params.yesterday = resp.yesterday[0] : angular.noop();
                resp.next_week ? $scope.params.next_week = resp.next_week[0] : angular.noop();
                resp.this_month ? $scope.params.this_month = resp.this_month[0] : angular.noop();
                resp.last_month_new_cust ? $scope.params.last_month_new_cust = resp.last_month_new_cust.length : angular.noop();
                resp.last_month_return_cust ? $scope.params.last_month_return_cust = resp.last_month_return_cust.length : angular.noop();
                $scope.params.fetching_data = false;
            });
        };

        init();

        $(document).on($scope.params.refresh_signal, '.panel', function (e, panel) {
            init();
            setTimeout(function () {
                panel.removeSpinner();
            }, 1000);

        });


    }]);


//app.controller('SalesCtrl', ["$scope", function ($scope) {
//    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//    $scope.series = ['First', 'Second'];
//    $scope.data = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
//    $scope.colors = [{
//        fillColor: 'rgba(148,116,153,0.7)',
//        highlightFill: 'rgba(148,116,153,1)'
//    }, {
//        fillColor: 'rgba(127,140,141,0.7)',
//        highlightFill: 'rgba(127,140,141,1)'
//    }];
//    // Chart.js Options - complete list at http://www.chartjs.org/docs/
//    $scope.options = {
//        maintainAspectRatio: false,
//        responsive: true,
//        scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
//        scaleFontSize: 11,
//        scaleFontColor: "#aaa",
//        scaleBeginAtZero: true,
//        tooltipFontSize: 11,
//        tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
//        tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
//        tooltipTitleFontSize: 12,
//        scaleShowGridLines: true,
//        scaleLineColor: "transparent",
//        scaleShowVerticalLines: false,
//        scaleGridLineColor: "rgba(0,0,0,.05)",
//        scaleGridLineWidth: 1,
//        barShowStroke: false,
//        barStrokeWidth: 2,
//        barValueSpacing: 5,
//        barDatasetSpacing: 1
//    };
//
//}]);
//app.controller('AcquisitionCtrl', ["$scope", function ($scope) {
//    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//    $scope.series = ['dataset'];
//    $scope.data = [[65, 59, 80, 81, 56, 55, 40]];
//    $scope.colors = [{
//        fillColor: 'rgba(148,116,153,0.7)',
//        strokeColor: 'rgba(148,116,153,0)',
//        highlightFill: 'rgba(148,116,153,1)',
//        highlightStroke: 'rgba(148,116,153,1)'
//    }];
//    // Chart.js Options - complete list at http://www.chartjs.org/docs/
//    $scope.options = {
//        maintainAspectRatio: false,
//        showScale: false,
//        barDatasetSpacing: 0,
//        tooltipFontSize: 11,
//        tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
//        responsive: true,
//        scaleBeginAtZero: true,
//        scaleShowGridLines: false,
//        scaleLineColor: "transparent",
//        barShowStroke: false,
//        barValueSpacing: 5,
//        //barDatasetSpacing: 1
//    };
//
//}]);
//app.controller('ConversionsCtrl', ["$scope", function ($scope) {
//    $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//    $scope.series = ['Transactions', 'Unique Visitors'];
//    $scope.data = [[65, 59, 80, 81, 56, 55, 40, 84, 64, 120, 132, 87], [172, 175, 193, 194, 161, 175, 153, 190, 175, 231, 234, 250]];
//    $scope.colors = [{
//        fillColor: 'rgba(91,155,209,0.5)',
//        strokeColor: 'rgba(91,155,209,1)'
//    }, {
//        fillColor: 'rgba(91,155,209,0.5)',
//        strokeColor: 'rgba(91,155,209,0.5)'
//    }];
//
//    // Chart.js Options - complete list at http://www.chartjs.org/docs/
//    $scope.options = {
//        maintainAspectRatio: false,
//        showScale: false,
//        scaleLineWidth: 0,
//        responsive: true,
//        scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
//        scaleFontSize: 11,
//        scaleFontColor: "#aaa",
//        scaleShowGridLines: true,
//        tooltipFontSize: 11,
//        tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
//        tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
//        tooltipTitleFontSize: 12,
//        scaleGridLineColor: 'rgba(0,0,0,.05)',
//        scaleGridLineWidth: 1,
//        bezierCurve: true,
//        bezierCurveTension: 0.5,
//        scaleLineColor: 'transparent',
//        scaleShowVerticalLines: false,
//        pointDot: false,
//        pointDotRadius: 4,
//        pointDotStrokeWidth: 1,
//        pointHitDetectionRadius: 20,
//        datasetStroke: true,
//        datasetStrokeWidth: 2,
//        datasetFill: true,
//        animationEasing: "easeInOutExpo"
//    };
//
//}]);
//app.controller('BarCtrl', ["$scope", function ($scope) {
//    $scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'i', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//    $scope.series = ['dataset'];
//    $scope.data = [[65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 80, 81]];
//    $scope.colors = [{
//        fillColor: 'rgba(255,255,244,0.3)',
//        strokeColor: 'rgba(255,255,244,0.5)'
//    }];
//    // Chart.js Options - complete list at http://www.chartjs.org/docs/
//    $scope.options = {
//        maintainAspectRatio: false,
//        showScale: false,
//        barDatasetSpacing: 0,
//        tooltipFontSize: 11,
//        tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
//        responsive: true,
//        scaleBeginAtZero: true,
//        scaleShowGridLines: false,
//        scaleLineColor: 'transparent',
//        barShowStroke: false,
//        barValueSpacing: 5
//    };
//
//}]);
//app.controller('BarCtrl2', ["$scope",
//    function ($scope) {
//        $scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'i', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//        $scope.series = ['dataset'];
//        $scope.data = [[65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 80, 81]];
//        $scope.colors = [{
//            fillColor: 'rgba(154,137,181,0.6)',
//            highlightFill: 'rgba(154,137,181,0.9)'
//        }];
//        // Chart.js Options - complete list at http://www.chartjs.org/docs/
//        $scope.options = {
//            maintainAspectRatio: false,
//            showScale: false,
//            barDatasetSpacing: 0,
//            tooltipFontSize: 11,
//            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
//            responsive: true,
//            scaleBeginAtZero: true,
//            scaleShowGridLines: false,
//            scaleLineColor: 'transparent',
//            barShowStroke: false,
//            barValueSpacing: 5
//        };
//
//    }]);
//app.controller('LineCtrl', ["$scope",
//    function ($scope) {
//        $scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
//        $scope.series = ['dataset'];
//        $scope.data = [[65, 59, 80, 81, 56, 95, 100]];
//        $scope.colors = [{
//            fillColor: 'rgba(0,0,0,0)',
//            strokeColor: 'rgba(0,0,0,0.2)'
//        }];
//        // Chart.js Options - complete list at http://www.chartjs.org/docs/
//        $scope.options = {
//            maintainAspectRatio: false,
//            showScale: false,
//            scaleLineWidth: 0,
//            responsive: true,
//            scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
//            scaleFontSize: 11,
//            scaleFontColor: "#aaa",
//            scaleShowGridLines: true,
//            tooltipFontSize: 11,
//            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
//            tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
//            tooltipTitleFontSize: 12,
//            scaleGridLineColor: 'rgba(0,0,0,.05)',
//            scaleGridLineWidth: 1,
//            bezierCurve: false,
//            bezierCurveTension: 0.2,
//            scaleLineColor: 'transparent',
//            scaleShowVerticalLines: false,
//            pointDot: true,
//            pointDotRadius: 4,
//            pointDotStrokeWidth: 1,
//            pointHitDetectionRadius: 20,
//            datasetStroke: true,
//            datasetStrokeWidth: 2,
//            datasetFill: true,
//            animationEasing: "easeInOutExpo"
//        };
//
//    }]);
//app.controller('RandomCtrl', function ($scope, $interval) {
//    $scope.randomUsers = 0;
//    var interval = 1500;
//
//    $scope.realtime = function () {
//
//        var random = $interval(function () {
//            $scope.randomUsers = Math.floor((Math.random() * 6) + 100);
//            interval = Math.floor((Math.random() * 5000) + 1000);
//            $interval.cancel(random);
//            $scope.realtime();
//        }, interval);
//    };
//    $scope.realtime();
//});
//app.controller('KnobCtrl1', function ($scope) {
//    $scope.value = 65;
//    $scope.options = {
//        unit: "%",
//        readOnly: true,
//        size: 70,
//        fontSize: '11px',
//        textColor: '#fff',
//        trackWidth: 5,
//        barWidth: 10,
//        trackColor: 'rgba(255,255,255,0.4)',
//        barColor: '#8773A8'
//    };
//});
//app.controller('KnobCtrl2', function ($scope) {
//    $scope.value = 330;
//    $scope.options = {
//        unit: "MB",
//        readOnly: true,
//        size: 70,
//        fontSize: '11px',
//        textColor: '#fff',
//        trackWidth: 5,
//        barWidth: 10,
//        trackColor: 'rgba(255,255,255,0.4)',
//        barColor: '#8773A8',
//        max: 1024
//    };
//});
//app.controller('KnobCtrl3', function ($scope) {
//    $scope.value = 65;
//    $scope.options = {
//        unit: "%",
//        readOnly: true,
//        size: 70,
//        fontSize: '11px',
//        textColor: 'rgb(154,137,181)',
//        trackWidth: 5,
//        barWidth: 10,
//        trackColor: 'rgba(154,137,181,0.6)',
//        barColor: 'rgba(154,137,181,0.9)'
//    };
//});
//app.controller('KnobCtrl4', function ($scope) {
//    $scope.value = 330;
//    $scope.options = {
//        unit: "MB",
//        readOnly: true,
//        size: 70,
//        fontSize: '11px',
//        textColor: 'rgb(154,137,181)',
//        trackWidth: 5,
//        barWidth: 10,
//        trackColor: 'rgba(154,137,181,0.6)',
//        barColor: 'rgba(154,137,181,0.9)',
//        max: 1024
//    };
//});
//app.controller('SocialCtrl1', ["$scope",
//    function ($scope) {
//
//        $scope.labels = ['Fb', 'YT', 'Tw'];
//        $scope.data = [300, 50, 100];
//        $scope.colors = ['#6F83B6', '#79BEF1', '#ED5952'];
//
//        // Chart.js Options - complete list at http://www.chartjs.org/docs/
//        $scope.options = {
//            responsive: false,
//            tooltipFontSize: 11,
//            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
//            tooltipCornerRadius: 0,
//            tooltipCaretSize: 2,
//            segmentShowStroke: true,
//            segmentStrokeColor: '#fff',
//            segmentStrokeWidth: 2,
//            percentageInnerCutout: 50,
//            animationSteps: 100,
//            animationEasing: 'easeOutBounce',
//            animateRotate: true,
//            animateScale: false
//
//        };
//
//    }]);
//app.controller('SocialCtrl2', ["$scope",
//    function ($scope) {
//        $scope.labels = ['Sc', 'Ad'];
//        $scope.data = [200, 150];
//        $scope.colors = ['#8BC33E', '#7F8C8D'];
//        // Chart.js Options - complete list at http://www.chartjs.org/docs/
//        $scope.options = {
//            responsive: false,
//            tooltipFontSize: 11,
//            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
//            tooltipCornerRadius: 0,
//            tooltipCaretSize: 2,
//            segmentShowStroke: true,
//            segmentStrokeColor: '#fff',
//            segmentStrokeWidth: 2,
//            percentageInnerCutout: 50,
//            animationSteps: 100,
//            animationEasing: 'easeOutBounce',
//            animateRotate: true,
//            animateScale: false
//
//        };
//
//    }]);
//app.controller('SocialCtrl3', ["$scope",
//    function ($scope) {
//
//        $scope.labels = ['Facebook', 'Twitter', 'YouTube', 'Spotify'];
//        $scope.data = [300, 150, 100, 80];
//        $scope.colors = ['#6F83B6', '#79BEF1', '#ED5952', '#8BC33E'];
//
//        // Chart.js Options - complete list at http://www.chartjs.org/docs/
//        $scope.options = {
//            responsive: false,
//            scaleShowLabelBackdrop: true,
//            scaleBackdropColor: 'rgba(255,255,255,0.75)',
//            scaleBeginAtZero: true,
//            scaleBackdropPaddingY: 2,
//            scaleBackdropPaddingX: 2,
//            scaleShowLine: true,
//            segmentShowStroke: true,
//            segmentStrokeColor: '#fff',
//            segmentStrokeWidth: 2,
//            animationSteps: 100,
//            animationEasing: 'easeOutBounce',
//            animateRotate: true,
//            animateScale: false
//        };
//    }]);
//app.controller('SocialCtrl4', ["$scope",
//    function ($scope) {
//
//        $scope.labels = ['Facebook', 'Twitter', 'YouTube', 'Spotify'];
//        $scope.data = [180, 210, 97, 60];
//        $scope.colors = ['#6F83B6', '#79BEF1', '#ED5952', '#8BC33E'];
//        // Chart.js Options - complete list at http://www.chartjs.org/docs/
//        $scope.options = {
//            responsive: false,
//            scaleShowLabelBackdrop: true,
//            scaleBackdropColor: 'rgba(255,255,255,0.75)',
//            scaleBeginAtZero: true,
//            scaleBackdropPaddingY: 2,
//            scaleBackdropPaddingX: 2,
//            scaleShowLine: true,
//            segmentShowStroke: true,
//            segmentStrokeColor: '#fff',
//            segmentStrokeWidth: 2,
//            animationSteps: 100,
//            animationEasing: 'easeOutBounce',
//            animateRotate: true,
//            animateScale: false
//        };
//    }]);
//app.controller('PerformanceCtrl1', ["$scope",
//    function ($scope) {
//        $scope.value = 85;
//        $scope.options = {
//            size: 125,
//            unit: "%",
//            trackWidth: 10,
//            barWidth: 10,
//            step: 5,
//            trackColor: 'rgba(52,152,219,.1)',
//            barColor: 'rgba(69,204,206,.5)'
//        };
//    }]);
//app.controller('BudgetCtrl', ["$scope",
//    function ($scope) {
//        $scope.dailyValue = "25";
//        $scope.totalValue = "750";
//
//        $scope.dailyOptions = {
//            from: 1,
//            to: 100,
//            step: 1,
//            dimension: " $",
//            className: "clip-slider",
//            css: {
//                background: {
//                    "background-color": "silver"
//                },
//                before: {
//                    "background-color": "#5A8770"
//                }, // zone before default value
//                after: {
//                    "background-color": "#5A8770"
//                },  // zone after default value
//            }
//        };
//        $scope.totalOptions = {
//            from: 100,
//            to: 1000,
//            step: 1,
//            dimension: " $",
//            className: "clip-slider",
//            css: {
//                background: {
//                    "background-color": "silver"
//                },
//                before: {
//                    "background-color": "#8773A8"
//                }, // zone before default value
//                after: {
//                    "background-color": "#8773A8"
//                },  // zone after default value
//            }
//        };
//
//    }]);
//
