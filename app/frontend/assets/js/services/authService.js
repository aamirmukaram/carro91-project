'use strict';
/**
 * Service for auth
 */
app.factory('authService', ['$rootScope', 'lock', 'authManager', '$state', 'userService','PermRoleStore','$timeout', function ($rootScope, lock, authManager, $state, userService,PermRoleStore,$timeout) {

    var user_role = {};

    function defineRoles() {
        user_role = userService.user.authorization.groups[0];
        PermRoleStore
            .defineRole('SUPER_USER', function () {
                if (user_role == 'SUPER_USER') {
                    return true;
                }
                else {
                    return true;
                }
            });

        PermRoleStore
            .defineRole('MANAGEMENT', function () {
                if(user_role == 'MANAGEMENT') {
                    return true;
                }
                else {
                    return true;
                }
            });
        PermRoleStore
            .defineRole('ADMIN', function () {
                if(user_role == 'ADMIN') {
                    return true;
                }
                else {
                    return true;
                }
            });
        PermRoleStore
            .defineRole('USER', function () {
                if(user_role == 'USER') {
                    return true;
                }
                else {
                    return true;
                }
            });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
            $state.previous = fromState;
        });
    }

    function login() {
        lock.show({autoclose: true});
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        authManager.unauthenticate();
        PermRoleStore.clearStore();
        userService.user = {};
        user_role = {};
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
        lock.on('authenticated', function(authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            authManager.authenticate();
            lock.getProfile(authResult.idToken, function(error, profile) {
                if (error) {
                    console.log(error);
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                angular.copy(profile,userService.user);
                angular.copy(profile,$rootScope.user);
                defineRoles();
                $timeout(function(){
                    $state.go('app.dashboard');
                },100);
            });
        });
    }


    if(userService.user.authorization) {
        defineRoles();
    }

    return {
        login: login,
        logout: logout,
        registerAuthenticationListener: registerAuthenticationListener
    }

}]);
