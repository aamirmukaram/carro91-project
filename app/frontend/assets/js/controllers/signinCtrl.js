'use strict';
/**
 * controllers used for the signup
 */
app.controller('signinCtrl', ['$scope', 'userService','ngNotify','navCtrlService','$state','lock','authService',
    function ($scope, userService,ngNotify,navCtrlService,$state,lock,authService) {
        //$scope.params = {
        //    errors: {
        //        email: null,
        //        password: null
        //    }
        //};
        //
        //$scope.submitForm = function () {
        //    var formValidated = true;
        //
        //    //Check if there is no filed with null
        //    angular.forEach($scope.formData, function (value, name) {
        //        if ($scope.formData[name]) {
        //            $scope.params.errors[name] = null
        //        } else {
        //            formValidated = false;
        //            $scope.params.errors[name] = 'This field is required';
        //        }
        //    });
        //
        //    //Check if email is valid
        //    function validateEmail(email) {
        //        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //        return re.test(email);
        //    }
        //    if(!validateEmail($scope.formData.email)){
        //        formValidated = false;
        //        $scope.params.errors.email = 'Email is not correct';
        //    }
        //
        //    formValidated ?
        //        userService.signin($scope.formData).then(function(resp){
        //            $scope.formData = {
        //                email: null,
        //                password: null
        //            };
        //            resp.name = resp.first_name + ' ' + resp.last_name;
        //            angular.copy(resp,userService.user);
        //            if (userService.user.access_level == 4) {
        //                $state.go('app.restaurantView.restaurant',{id:1});
        //            } else {
        //                $state.go('app.dashboard');
        //            }
        //        },function(){
        //            ngNotify.set('Wrong email or password', {
        //                theme: 'pure',
        //                position: 'top',
        //                type: 'error',
        //                button: 'true',
        //                sticky: 'false'
        //            });
        //        }) :
        //        ngNotify.set('Form not submitted', {
        //            theme: 'pure',
        //            position: 'top',
        //            type: 'error',
        //            button: 'true',
        //            sticky: 'false'
        //        });
        //
        //    $scope.toTheTop();
        //};
        //$scope.formData = {
        //    email: null,
        //    password: null
        //};
        var init = function(){
            authService.logout();
            authService.login();
        };
        init();
    }]);
