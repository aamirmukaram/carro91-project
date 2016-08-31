'use strict';
/**
 * Service for restaurant revenues
 */
app.factory('userService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {
    var user = {};
    $rootScope.user = user;


    return {
        signup: function (params) {

            var deferred = $q.defer();

            function signupComplete(resp) {
                deferred.resolve(resp.data);
            }

            function signupFailed() {
                deferred.reject();
            }

            $http({
                url: $rootScope.pathToBackend + "user/signup/post.php",
                method: "POST",
                data: params
            }).success(signupComplete)
                .catch(signupFailed);

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