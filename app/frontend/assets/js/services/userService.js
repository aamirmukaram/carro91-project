'use strict';
/**
 * Service for restaurant revenues
 */
app.factory('userService', ['$rootScope', '$q', '$http', 'AUTH0_CLIENT_ID', function ($rootScope, $q, $http, AUTH0_CLIENT_ID) {
    var user = {};
    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};
    if(localStorage.getItem('profile') !== null) {
        angular.copy(userProfile,user);
        angular.copy(user,$rootScope.user);
        if($rootScope.user.user_metadata) {
            $rootScope.user.user_metadata.restaurants = JSON.parse($rootScope.user.user_metadata.restaurants);
        }
    }

    return {
        signup: function (params) {

            var deferred = $q.defer();

            function signupComplete(resp) {
                deferred.resolve(resp.data);
            }

            function signupFailed() {
                deferred.reject();
            }


            $http.post('https://grahame.eu.auth0.com/dbconnections/signup',{
                'client_id':AUTH0_CLIENT_ID,
                'email':params.email,
                'password':params.password,
                'user_metadata':{
                    'firstName':params.firstName,
                    'lastName':params.lastName,
                    'position':params.position,
                    'restaurants':JSON.stringify(params.restaurants)
                },
                'connection':'Username-Password-Authentication'
            }).then(signupComplete,signupFailed);


            $http({
                url: $rootScope.pathToBackend + "email/post.php",
                method: "POST",
                data: {
                    'firstName':params.firstName,
                    'lastName':params.lastName,
                    'email':params.email,
                    'password':params.password,
                    'position':params.position,
                    'restaurants':params.restaurants,
                    'emailType':'signup_notification_to_admin'
                }
            });


            return deferred.promise;

        },
        signin: function (params) {


            var deferred = $q.defer();

            function signinComplete(resp) {
                deferred.resolve(resp.data);
            }

            function signinFailed() {
                deferred.reject();
            }

            $http({
                url: $rootScope.pathToBackend + "user/signin/post.php",
                method: "POST",
                data: params
            }).success(signinComplete)
                .catch(signinFailed);

            return deferred.promise;

        },
        signout: function(){
            angular.copy({},user);
        },
        user:user
    }
}]);