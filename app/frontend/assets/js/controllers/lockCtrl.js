'use strict';
/**
 * controllers used for the signup
 */
app.controller('lockCtrl', ['$scope', 'userService', '$state','ngNotify',
    function ($scope, userService, $state, ngNotify) {
        $scope.params = {
            user: angular.copy(userService.user),
            password:null
        };
        var init = function () {
            userService.signout();
        };

        $scope.unlock = function(){
            userService.signin({email:$scope.params.user.email,password:$scope.params.password}).then(function(resp){
                resp.name = resp.first_name + ' ' + resp.last_name;
                angular.copy(resp,userService.user);
                $state.go($state.previous.name);
            },function(){
                ngNotify.set('Wrong password', {
                    theme: 'pure',
                    position: 'top',
                    type: 'error',
                    button: 'true',
                    sticky: 'false'
                });
            });

        };

        init();
    }]);
