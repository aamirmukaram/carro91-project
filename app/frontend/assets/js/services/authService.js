'use strict';
/**
 * Service for auth
 */
app.factory('authService', ['$rootScope', 'lock', 'authManager', '$state', function ($rootScope, lock, authManager, $state) {
    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login() {
        lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        authManager.unauthenticate();
        userProfile = {};
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
                $rootScope.$broadcast('userProfileSet', profile);
                $state.go('app.dashboard');
            });
        });
    }

    return {
        userProfile: userProfile,
        login: login,
        logout: logout,
        registerAuthenticationListener: registerAuthenticationListener
    }

}]);
