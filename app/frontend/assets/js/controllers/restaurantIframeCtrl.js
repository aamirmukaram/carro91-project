'use strict';
app.controller('restaurantIframeWithYearCtrl', ['restaurantCtrlService', '$state', '$scope', '$sce', function (restaurantCtrlService, $state, $scope, $sce) {
    var restaurant_id = $state.params.id;
    var iframe_type = $state.params.type;
    var restaurant_iframes = restaurantCtrlService['restaurant_iframes']['iframe_with_year'];
    $scope.params = {
        view:null,
        period: (new Date().getFullYear()),
        current_year: (new Date().getFullYear()),
        changePeriod: function (value) {
            $scope.params.period = $scope.params.period + value;
            fetchData(restaurant_id, iframe_type, $scope.params.period);
        },
        title:null
    };





    var fetchData = function (restaurant_id, iframe_type, period) {
        $scope.params.fetching_data = true;

        if (restaurant_iframes[iframe_type] && restaurant_iframes[iframe_type][period] && restaurant_iframes[iframe_type][period][restaurant_id]) {

            $scope.params.view = $sce.trustAsHtml(restaurant_iframes[iframe_type][period][restaurant_id].iframe);
        }
        else {
            $scope.params.view = '<p>No template found</p>';
        }

        $scope.params.fetching_data = false;

    };


    fetchData(restaurant_id, iframe_type, $scope.params.period);




}]);

app.controller('restaurantIframeOnlyCtrl', ['restaurantCtrlService', '$state', '$scope', '$sce', function (restaurantCtrlService, $state, $scope, $sce) {
    var restaurant_id = $state.params.id;
    var iframe_type = $state.params.type;
    var restaurant_iframes = restaurantCtrlService['restaurant_iframes']['iframe_only'];
    $scope.params = {
        view:null,
        title:null
    };

    if (restaurant_iframes[iframe_type] && restaurant_iframes[iframe_type][restaurant_id]) {

        $scope.params.view = $sce.trustAsHtml(restaurant_iframes[iframe_type][restaurant_id].iframe);
    }
    else {
        $scope.params.view = '<p>No template found</p>';
    }

}]);




app.controller('restaurantIframeWithFormCtrl', ['restaurantCtrlService', '$state', '$scope', '$sce', function (restaurantCtrlService, $state, $scope, $sce) {
    var restaurant_id = $state.params.id;
    var iframe_type = $state.params.type;
    var restaurant_iframes = restaurantCtrlService['restaurant_iframes']['iframe_with_form'];
    $scope.params = {
        view:null,
        title:null
    };

    if (restaurant_iframes[iframe_type] && restaurant_iframes[iframe_type][restaurant_id]) {

        $scope.params.view = $sce.trustAsHtml(restaurant_iframes[iframe_type][restaurant_id].iframe);
    }
    else {
        $scope.params.view = '<p>No template found</p>';
    }

}]);




app.controller('restaurantIframeWithButtonCtrl', ['restaurantCtrlService', '$state', '$scope', '$sce', function (restaurantCtrlService, $state, $scope, $sce) {
    var restaurant_id = $state.params.id;
    var iframe_type = $state.params.type;
    var restaurant_iframes = restaurantCtrlService['restaurant_iframes']['iframe_with_button'];
    $scope.params = {
        title:null,
        res_id:null,
        action:null
    };

    if (restaurant_iframes[iframe_type] && restaurant_iframes[iframe_type][restaurant_id]) {
        $scope.params.res_id = restaurant_iframes[iframe_type][restaurant_id].value;
        $scope.params.action = $sce.trustAsResourceUrl('http://baw.flintxsystems.com/getCSV/getCVSInfoFromFile_'+restaurant_iframes[iframe_type][restaurant_id].action+'.php');

    }
    else {
        alert('Data not found');
    }

}]);