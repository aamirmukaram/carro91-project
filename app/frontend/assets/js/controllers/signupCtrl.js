'use strict';
/**
 * controllers used for the signup
 */
app.controller('signUpCtrl', ['$scope', 'userService','ngNotify','navCtrlService','$state',
    function ($scope, userService,ngNotify,navCtrlService,$state) {


        $scope.params = {
            errors: {
                firstName: null,
                lastName: null,
                address: null,
                country: '',
                gender: '',
                email: null,
                restaurant: null,
                position: null,
                password: null,
                password2: null
            },
            fetching_data:true,
            restaurants:null,
            getRestaurants:function(){return this.restaurants;}
        };
        navCtrlService.fetchRestaurants().then(function(resp){
            $scope.params.restaurants = resp.restaurants;
            $scope.params.fetching_data = false;
        });
        $scope.submitForm = function () {
            var formValidated = true;

            //Check if there is no filed with null
            angular.forEach($scope.formData, function (value, name) {
                if ($scope.formData[name] !== null) {
                    $scope.params.errors[name] = null
                } else {
                    formValidated = false;
                    $scope.params.errors[name] = 'This field is required';
                }
            });

            //Check if password matches
            if($scope.formData.password != $scope.formData.password2){
                formValidated = false;
                $scope.params.errors.password = 'Password not matched';
                $scope.params.errors.password2 = 'Password not matched';
            }

            //Check if email is valid
            function validateEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
            if(!validateEmail($scope.formData.email)){
                formValidated = false;
                $scope.params.errors.email = 'Email is not correct';
            }

            if(formValidated){
                userService.signup($scope.formData).then(function(){
                    ngNotify.set('Form submitted', {
                        theme: 'pure',
                        position: 'top',
                        type: 'success',
                        button: 'true',
                        sticky: 'false'
                    });
                    $scope.formData = {
                        firstName: null,
                        lastName: null,
                        country: '',
                        gender: '',
                        email: null,
                        restaurants: [],
                        position: null,
                        password: null,
                        password2: null
                    };
                    $state.go('login.signin');
                })
            }
            else {
                ngNotify.set('Form not submitted', {
                    theme: 'pure',
                    position: 'top',
                    type: 'error',
                    button: 'true',
                    sticky: 'false'
                });
            }

            $scope.toTheTop();
        };
        $scope.formData = {
            firstName: null,
            lastName: null,
            country: '',
            gender: '',
            email: null,
            restaurants: [],
            position: null,
            password: null,
            password2: null
        };
    }]);
