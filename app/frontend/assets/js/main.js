var app = angular.module('app', ['packet']);
app.run(['$rootScope', '$state', '$stateParams',
function ($rootScope, $state, $stateParams) {

    // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
    FastClick.attach(document.body);

    // Set some reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // GLOBAL APP SCOPE
    // set below basic information
    $rootScope.app = {
        name: 'Black and White Hospitality Dashboard', // name of your project
        author: 'FlintX Systems', // author's name or company name
        description: 'Supporting your business to success', // brief description
        version: '3.1', // current version
        year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
        isMobile: (function () {// true if the browser is a mobile device
            var check = false;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                check = true;
            };
            return check;
        })(),
        defaultLayout: {
            isNavbarFixed: true, //true if you want to initialize the template with fixed header
            isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
            isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
            isFooterFixed: false, // true if you want to initialize the template with fixed footer
            isBoxedPage: false, // true if you want to initialize the template with boxed layout
            theme: 'lyt1-theme-1', // indicate the theme chosen for your project
            logo: 'assets/images/logo.png', // relative path of the project logo
            logoCollapsed: 'assets/images/logo-collapsed.png' // relative path of the collapsed logo
        },
        layout: ''
    };
    $rootScope.app.layout = angular.copy($rootScope.app.defaultLayout);
    $rootScope.user = {
        name: 'Peter',
        job: 'ng-Dev',
        picture: 'app/img/user/02.jpg'
    };
    //$rootScope.pathToBackend = 'http://localhost:8080/carro91/project/carro91/app/backend/';
	$rootScope.pathToBackend = 'http://dash.flintxsystems.com/app/backend/';
}]);
// translate config
app.config(['$translateProvider',
function ($translateProvider) {

    // prefix and suffix information  is required to specify a pattern
    // You can simply use the static-files loader with this pattern:
    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/i18n/',
        suffix: '.json'
    });

    // Since you've now registered more then one translation table, angular-translate has to know which one to use.
    // This is where preferredLanguage(langKey) comes in.
    $translateProvider.preferredLanguage('en');

    // Store the language in the local storage
    $translateProvider.useLocalStorage();

    // Enable sanitize
    $translateProvider.useSanitizeValueStrategy('sanitize');

}]);
// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;

}]);
// Angular-breadcrumb
// configuration
app.config(function ($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        template: '<ul class="breadcrumb"><li><a ui-sref="app.dashboard"><i class="fa fa-home margin-right-5 text-large text-dark"></i>Home</a></li><li ng-repeat="step in steps">{{step.ncyBreadcrumbLabel}}</li></ul>'
    });
});
// ng-storage
//set a prefix to avoid overwriting any local storage variables
app.config(['$localStorageProvider',
    function ($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('PacketLtr1');
    }]);

// auth0
//configuration
app.config(['$httpProvider', 'lockProvider', 'jwtOptionsProvider', 'jwtInterceptorProvider','AUTH0_CLIENT_ID',
    function ($httpProvider,lockProvider,jwtOptionsProvider,jwtInterceptorProvider,AUTH0_CLIENT_ID) {
        // Initialization for the Lock widget
        lockProvider.init({
            clientID: AUTH0_CLIENT_ID,
            domain: 'grahame.eu.auth0.com',
            options: {
                auth: {
                    redirect: false
                },
                autoclose: false,
                closable: false,
                avatar:null,
                theme: {
                    logo: 'assets/images/logo-auth.png',
                    primaryColor: '#8dc63f'
                },
                signUpLink: window.location.origin + window.location.pathname + '#/login/registration',
                languageDictionary: {
                    title: ''
                }
            }
        });

        // Configuration for angular-jwt
        jwtOptionsProvider.config({
            tokenGetter: function() {
                return localStorage.getItem('id_token');
            },
            whiteListedDomains: ['localhost','dash.flintxsystems.com'],
            authHeader: 'Auth-Token',
            unauthenticatedRedirector: ['$state', function($state) {
               $state.go('login.signin');
            }]
        });

        // Add the jwtInterceptor to the array of HTTP interceptors
        // so that JWTs are attached as Authorization headers
        $httpProvider.interceptors.push('jwtInterceptor');


    }]);

//filter to convert html to plain text
app.filter('htmlToPlaintext', function () {
      return function (text) {
          return String(text).replace(/<[^>]+>/gm, '');
      };
  }
);
//Custom UI Bootstrap Calendar Popup Template
app.run(["$templateCache","$rootScope","PermRoleStore","$state", function ($templateCache,$rootScope,PermRoleStore,$state) {
    $templateCache.put("uib/template/datepicker/popup.html",
        "<div>\n" +
	    "  <ul class=\"uib-datepicker-popup clip-datepicker dropdown-menu\" dropdown-nested ng-if=\"isOpen\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\n" +
	    "    <li ng-transclude></li>\n" +
	    "    <li ng-if=\"showButtonBar\" class=\"uib-button-bar\">\n" +
	    "    <span class=\"btn-group pull-left\">\n" +
	    "      <button type=\"button\" class=\"btn btn-sm btn-primary btn-o uib-datepicker-current\" ng-click=\"select('today')\" ng-disabled=\"isDisabled('today')\">{{ getText('current') }}</button>\n" +
	    "      <button type=\"button\" class=\"btn btn-sm btn-primary btn-o uib-clear\" ng-click=\"select(null)\">{{ getText('clear') }}</button>\n" +
	    "    </span>\n" +
	    "      <button type=\"button\" class=\"btn btn-sm btn-primary pull-right uib-close\" ng-click=\"close()\">{{ getText('close') }}</button>\n" +
	    "    </li>\n" +
	    "  </ul>\n" +
	    "</div>\n" +
	    "");
	$templateCache.put("uib/template/datepicker/year.html",
	    "<table class=\"uib-yearpicker\" role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
	    "  <thead>\n" +
	    "    <tr>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
	    "      <th colspan=\"{{::columns - 2}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
	    "    </tr>\n" +
	    "  </thead>\n" +
	    "  <tbody>\n" +
	    "    <tr class=\"uib-years\" ng-repeat=\"row in rows track by $index\">\n" +
	    "      <td ng-repeat=\"dt in row\" class=\"uib-year text-center\" role=\"gridcell\"\n" +
	    "        id=\"{{::dt.uid}}\"\n" +
	    "        ng-class=\"::dt.customClass\">\n" +
	    "        <button type=\"button\" class=\"btn btn-default\"\n" +
	    "          uib-is-class=\"\n" +
	    "            'btn-current' for selectedDt,\n" +
	    "            'active' for activeDt\n" +
	    "            on dt\"\n" +
	    "          ng-click=\"select(dt.date)\"\n" +
	    "          ng-disabled=\"::dt.disabled\"\n" +
	    "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
	    "      </td>\n" +
	    "    </tr>\n" +
	    "  </tbody>\n" +
	    "</table>\n" +
	    "");
    $templateCache.put("uib/template/datepicker/month.html",
	    "<table class=\"uib-monthpicker\" role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
	    "  <thead>\n" +
	    "    <tr>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
	    "      <th><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
	    "    </tr>\n" +
	    "  </thead>\n" +
	    "  <tbody>\n" +
	    "    <tr class=\"uib-months\" ng-repeat=\"row in rows track by $index\">\n" +
	    "      <td ng-repeat=\"dt in row\" class=\"uib-month text-center\" role=\"gridcell\"\n" +
	    "        id=\"{{::dt.uid}}\"\n" +
	    "        ng-class=\"::dt.customClass\">\n" +
	    "        <button type=\"button\" class=\"btn btn-default\"\n" +
	    "          uib-is-class=\"\n" +
	    "            'btn-current' for selectedDt,\n" +
	    "            'active' for activeDt\n" +
	    "            on dt\"\n" +
	    "          ng-click=\"select(dt.date)\"\n" +
	    "          ng-disabled=\"::dt.disabled\"\n" +
	    "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
	    "      </td>\n" +
	    "    </tr>\n" +
	    "  </tbody>\n" +
	    "</table>\n" +
	    "");

}]);

app.run(function($rootScope, authService, authManager) {
    //console.log('app run');
    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    //$rootScope.authService = authService;

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    // Use the authManager from angular-jwt to check for
    // the user's authentication state when the page is
    // refreshed and maintain authentication
    authManager.checkAuthOnRefresh();

    // Listen for 401 unauthorized requests and redirect
    // the user to the login page
    authManager.redirectWhenUnauthenticated();
});


app.controller('mainController',[function(){
}]);