angular.module('app', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'LocalStorageModule']);
function BaseController() {
    var vm = this;

    
}

angular
    .module('app')
    .controller('BaseController', BaseController);
function HomeController($scope, $location, localStorageService) {
    var vm = this;

    var hasProject = localStorageService.get('project');


    vm.project = {};

    vm.project.myTodos = [];

    vm.project.todos = {
        'General': [
            {name: 'Favicon', done: false, note: 'Use the following tool to generate your favicon LINK'},
            {name: '404 Page', done: false, note: 'Include Apple icons following this guidelines LINK'},
            {name: 'Others error pages', done: false, note: 'Include Apple icons following this guidelines LINK'},
            {name: 'Apple Icon', done: false, note: 'Include Apple icons following this guidelines LINK'},
            {name: 'README.md', done: false, note: 'create a README.md file with instructions LINK'},
            {name: 'Wiki', done: false, note: 'Include important info regarding this project in a wiki'}
        ],
        'Performance' : [
            {name: 'Google Page Insights', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'Yslow', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'GtMetrix', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'Minification', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'Page Size', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
        ],
        'Validation' : [
            {name: 'HTML', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'CSS', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'Javascript', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'IE Check', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'Others browsers', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
        ],
        'SEO' : [
            {name: 'Title', done: false, note: 'Lorem ipsum dolor sit amet.'},
            {name: 'Description', done: false, note: '<meta name="description" content="Here is a description of the applicable page">'},
            {name: 'Google Analytics', done: false, note: 'Use the following tool to generate your favicon LINK'},
            {name: 'Sitemap', done: false, note: 'Use the following tool to generate your favicon LINK'},
            {name: 'Robots.txt', done: false, note: 'Use the following tool to generate your favicon LINK'},
        ],
        'Test' : [
            {name: 'No Javascript', done: false, note: 'Lorem ipsum dolor sit amet.'},
            {name: 'Forms', done: false, note: '<meta name="description" content="Here is a description of the applicable page">'},
            {name: 'Links', done: false, note: 'Use the following tool to generate your favicon LINK'},
            {name: 'Responsiveness', done: false, note: 'Use the following tool to generate your favicon LINK'},
        ]
    };

    vm.modal = true;

    if(hasProject) {
        vm.project = hasProject;
        vm.modal = false;
    }

    vm.updateProgress = function(){
        var total   = 0,
            checked = 0;

        for (var key in vm.project.todos) {
            for (var i = vm.project.todos[key].length - 1; i >= 0; i--) {
                total++;
                if (vm.project.todos[key][i].done) {
                    checked++;
                }
            }
        }

        vm.progress = (checked / total) * 100;
    };


    vm.addNewEntry = function(entry){
        vm.newEntry = '';
        vm.project.myTodos.push({name: entry, done: false});
    };


    // Save in storage
    vm.save = function(){
        localStorageService.set('project', vm.project);
    };

    $scope.$watch(angular.bind(this, function (project) {
        return this.project;
    }), function(){
        console.log('here');
        vm.save();
    }, true);

    vm.clearAll = function(){
         localStorageService.remove('project');
         $location.path('#!/');
    };
}
HomeController.$inject = ['$scope', '$location', 'localStorageService'];

angular
    .module('app')
    .controller('HomeController', HomeController);
/*
 * Constants can be used in Controllers, Services, Directives, etc
 * it doesn't polute global scope 
 */
angular
    .module('app')
    .constant('API_URL', 'YOUR_API_URL_GOES_HERE')
    .constant('VIEWS', '/views/')
    .constant('CDN_URL', 'YOUR_CDN_URL_GOES_HERE');

function Domains($sceDelegateProvider, API_URL){

    /* 
     * List of authorized domains to allow Angular
     * to communicate through ajax
     */
    var whitelist = [
        'self',
        API_URL
    ];


    /*
     * List of blocked urls to avoid unwanted
     * ajax calls
     */    
    var blacklist = [];


    /*
     * Set arrays in SCE provider
     * https://docs.angularjs.org/api/ng/provider/$sceDelegateProvider
     */    
    $sceDelegateProvider.resourceUrlWhitelist(whitelist);
    $sceDelegateProvider.resourceUrlBlacklist(blacklist);
}
Domains.$inject = ['$sceDelegateProvider', 'API_URL'];

angular
    .module('app')
    .config(Domains);

function Http($httpProvider){
    /*
     * This provide some default adjudtments on all
     * http requests made through angular. Change setting as necessary
     * https://docs.angularjs.org/api/ng/provider/$httpProvider
     */
    
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = false;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common.Accept = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
}
Http.$inject = ['$httpProvider'];

angular
    .module('app')
    .config(Http);

function Interceptors($httpProvider){

    /*
     * Interceptors are functions that modifies
     * outcoming and incoming ajax calls
     */
    $httpProvider.interceptors.push('LoadingSpinnerService');
}
Interceptors.$inject = ['$httpProvider'];

angular
    .module('app')
    .config(Interceptors);

function LocalStorage(localStorageServiceProvider){

    localStorageServiceProvider
        .setPrefix('klick_checklist');
}
LocalStorage.$inject = ['localStorageServiceProvider'];

angular
    .module('app')
    .config(LocalStorage);

function Routes($routeProvider, $locationProvider, VIEWS) {

    /*
     * Set hashbang for web crawlers
     * https://developers.google.com/webmasters/ajax-crawling/docs/getting-started
     */
    $locationProvider.hashPrefix('!');


    $routeProvider
        .when('/', {
            templateUrl : VIEWS + 'home.html',
            controller  : 'HomeController',
            controllerAs: 'Home'
        })
        .otherwise({
            redirectTo: '/'
        });
}
Routes.$inject = ['$routeProvider', '$locationProvider', 'VIEWS'];

angular
    .module('app')
    .config(Routes);
/**
 * This directive must be used as an attribute
 *                                        |
 *                                        V
 * Ex: <img src="MY_SPINNING_ICON.gif" loader/>
 */
function Loader($rootScope) {
    return function ($scope, element, attrs) {
        $scope.$on("loader_show", function () {
            return $(element).fadeIn(600);
        });
        return $scope.$on("loader_hide", function () {
            return $(element).fadeOut(600);
        });
    };
}
Loader.$inject = ['$rootScope'];

angular
    .module('app')
    .directive('loader', Loader);

/**
 * Api service is responsible for communicating with
 * backend resources using json
 */
function ApiService($resource, $rootScope, API_URL){

    var api = $resource(
        /* Map our api url structure
         * Ex: /teams/2/players/3, where /team would be
         * the resource with all teams, /2 is the team id
         * to get more info, /players is a nested resource from
         * teams with all players in that team and /3 is the
         * player id to get or post info.
         */
        API_URL + '/:action/:id/:item/:item_id',
        { 
            /* default query attributes goes here ex: language: 'en' */
        },
        {
            /* available http methods to that resource */
            get: {method: 'JSONP', params: {callback: 'JSON_CALLBACK'}},
            post: {method: 'POST'},
            put: {method: 'PUT'}
            /* Delete method is also available, not need to declare it here */
        }
    );

    return api;

}
ApiService.$inject = ['$resource', '$rootScope', 'API_URL'];

angular
    .module('app')
    .factory('ApiService', ApiService);

/*
 * The following service dispatch events when an
 * ajax request is sent and when its response is received
 * This can be used to display a loading spinner on screen
 */
function LoadingSpinnerService($q, $rootScope){
    var numLoadings = 0;

    // Array to hold timeouts' id
    var timing = [];

    return {
        'request': request,
        'response': responseFn,
        'responseError': responseError
    };

    function request(config){
        numLoadings++;

        // Show loader
        if(numLoadings <= 1) {

            // Create a timeout and assign the id into
            // timing array
            timing[numLoadings] = setTimeout(function(){
                $rootScope.$broadcast("loader_show");
            }, 200);
        }

        return config || $q.when(config);
    }

    function responseFn(response) {

        /*
         * If the response comes before the specified
         * time in the timeout function this will
         * clear that timeout avoiding it to happen.
         * This is to avoid displaying a loader for
         * requests that take less than 200ms
         */
        clearTimeout(timing[numLoadings]);


        if ((--numLoadings) === 0) {
            // Hide loader
            $rootScope.$broadcast("loader_hide");
        }

        return response || $q.when(response);
    }

    function responseError(response){
        if (!(--numLoadings)) {

            // Hide loader
            $rootScope.$broadcast("loader_hide");
        }

        return $q.reject(response);
    }
}
LoadingSpinnerService.$inject = ['$q', '$rootScope'];

angular
    .module('app')
    .factory('LoadingSpinnerService', LoadingSpinnerService);
