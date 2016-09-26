'use strict';
app.controller('restaurantIframeCtrl', ['restaurantCtrlService', '$state', '$scope', '$sce', function (restaurantCtrlService, $state, $scope, $sce) {
    var restaurant_id = $state.params.id;
    var iframe_type = $state.params.type;
    var restaurant_iframes = restaurantCtrlService.restaurant_iframes;
    $scope.params = {
        view:null,
        period: (new Date().getFullYear()),
        current_year: (new Date().getFullYear()),
        changePeriod: function (value) {
            $scope.params.period = $scope.params.period + value;
            fetchData(restaurant_id, iframe_type, $scope.params.period);
        },
        title:restaurant_iframes[restaurant_id][iframe_type].title
    };





    var fetchData = function (restaurant_id, iframe_type, period) {
        $scope.params.fetching_data = true;

        if (restaurant_iframes[restaurant_id] && restaurant_iframes[restaurant_id][iframe_type] && restaurant_iframes[restaurant_id][iframe_type][period]) {

            $scope.params.view = $sce.trustAsHtml(restaurant_iframes[restaurant_id][iframe_type][period].iframe);
        }
        else {
            $scope.params.view = '<p>No template found</p>';
        }

        $scope.params.fetching_data = false;

    };


    fetchData(restaurant_id, iframe_type, $scope.params.period);



}]);
