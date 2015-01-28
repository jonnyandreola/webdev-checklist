angular.module('app', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'LocalStorageModule']);
function BaseController() {
    var vm = this;

    
}

angular
    .module('app')
    .controller('BaseController', BaseController);
function HomeController($scope, $location, localStorageService, TodoService) {
    var vm = this;

    // Initialize a blank project
    vm.project = {};
    vm.project.myTodos = [];


    // Check if there is any project stored
    vm.storedProjects = localStorageService.keys();

    // Switch which modal will pop up
    vm.modal = true;
    if(vm.storedProjects.length) {
        vm.existingModal = true;
    } else {
        vm.newModal = true;
    }

    // view model functions
    vm.updateModel = function(type){
        vm.project.todos = TodoService.getModel(type);
    };

    vm.updateProgress = function(){
        vm.progress = TodoService.progress(vm.project);
    };

    vm.addNewEntry = function(entry){
        vm.newEntry = '';
        vm.project.myTodos.push({name: entry, done: false});
        vm.updateProgress();
    };

    vm.save = function(){
        if(vm.project.name) {
            localStorageService.set(vm.project.name, vm.project);
        }
    };

    vm.clearAll = function(){
         localStorageService.remove(vm.project.name);
         $location.path('#!/');
    };

    vm.loadChecklist = function(checklist){
        vm.project = localStorageService.get(checklist);
        vm.updateProgress();
        vm.modal = false;
        vm.existingModal = false;
    };

    vm.newChecklist = function(){
        vm.modal = true;
        vm.existingModal = false;
        vm.newModal = true;
    };

    vm.createNew = function(newProject){
        for (var i = 0; i < vm.storedProjects.length; i++) {
            if (vm.storedProjects[i] === newProject.name) {
                alert('Project already exists');
                vm.modal = vm.newModal = true;
                return false;
            }
        }
        vm.project.name = newProject.name;
        vm.project.todos = TodoService.getModel(newProject.type);
        vm.modal = vm.existingModal = vm.newModal = false;
        vm.save();
    };

    // Watch for changes on project and save
    $scope.$watch(angular.bind(this, function (project) {
        return this.project;
    }), function(n, o){
        if(n !== 0) {
            vm.save();
        }
    }, true);
}
HomeController.$inject = ['$scope', '$location', 'localStorageService', 'TodoService'];

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

function TodoService(){

    var todoModels = {
        'webdev': {
            'General': [
                {name: 'Favicon', done: false, note: 'This <a href="http://realfavicongenerator.net/" target="_blank">website</a> generates your favicon</a>'},
                {name: 'Apple Icon', done: false, note: 'This <a href="http://realfavicongenerator.net/" target="_blank">website</a> generates apple icons</a>'},
                {name: '404 Page', done: false, note: 'Create a useful 404 page, more info cabe found <a href="https://support.google.com/webmasters/answer/93641?hl=en" target="_blank">here</a>'},
                {name: 'README.md', done: false, note: 'Create a README.md file with instructions, make sure to use <a href="http://en.wikipedia.org/wiki/Markdown" target="_blank">markdown</a> language'},
                {name: 'Wiki', done: false, note: 'Large projects only, include important project information in a wiki'}
            ],
            'Performance' : [
                {name: 'PageSpeed Insights by Google', done: false, note: '<a href="https://chrome.google.com/webstore/detail/pagespeed-insights-by-goo/gplegfbjlmmehdoakndmohflojccocli?hl=en" target="_blank">Chrome Extension</a>'},
                {name: 'YSlow', done: false, note: '<a href="https://chrome.google.com/webstore/detail/yslow/ninejjcohidippngpapiilnmkgllmakh/" target="_blank">Chrome Extension</a>'},
                {name: 'Minification', done: false, note: 'Files compiled for production must be minified'},
                {name: 'Total size / requests', done: false, note: 'Check file size of all requests on browser for anomalies (ex: a png with 2mb or several requests for small images that could be combined into one sprite)'},
            ],
            'Validation' : [
                {name: 'HTML', done: false, note: '<a href="https://chrome.google.com/webstore/detail/validity/bbicmjjbohdfglopkidebfccilipgeif?hl=en-GB" target="_blank">Chrome Extension</a>'},
                {name: 'Javascript', done: false, note: 'Validate Javascript code using JSLint or JSHint. Use a node task manager to handle that (Gulp or Grunt)'},
            ],
            'SEO' : [
                {name: 'Meta Tags', done: false, note: 'All pages must contain a meaningful meta tags, check this <a href="https://support.google.com/webmasters/answer/79812?hl=en" target="_blank">link</a> to find out more.'},
                {name: 'Google Analytics', done: false, note: 'Include google analytics code. <a href="https://support.google.com/analytics/answer/1008080?hl=en" target="_blank">More Info</a>', code: '<script type="text/javascript">\n    r _gaq = _gaq || [];\n    aq.push(["_setAccount", "UA-XXXXX-X"]);\n    aq.push(["_trackPageview"]);\n    unction() {\n    var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;\n    ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";\n    var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);\n    ();\n</script>'},
                {name: 'Sitemap', done: false, note: 'Create a sitemap.xml <a href="https://support.google.com/webmasters/answer/156184?hl=en" target="_blank">More info</a>'},
                {name: 'Robots', done: false, note: 'Create robots.txt to avoid unwanted page indexation by search engines. <a href="https://support.google.com/webmasters/answer/6062608?hl=en" target="_blank">More Info</a>'},
            ],
            'Test' : [
                {name: 'IE Check', done: false, note: 'Check your project in IE8, browse all pages'},
                {name: 'Others browsers', done: false, note: 'Quick check using Chrome, Firefox and Safari'},
                {name: 'Javascript Disabled', done: false, note: 'Disable javascript and test basic website\'s functionalities (ex: forms, hidden content, navigation)'},
                {name: 'Forms', done: false, note: 'Submit all forms to make sure they are working'},
                {name: 'Links', done: false, note: 'Click all links to make sure they are working. Watch out for hardcoded paths to dev environment.'},
                {name: 'Responsiveness', done: false, note: 'Test your project using <a href="https://developer.chrome.com/devtools/docs/device-mode" target="_blank">device mode</a> in Chrome developer tools'},
            ]
        },
        'backend': {
            'General': [],
            'Backend': []
        },
        'qa': {
            'General': [],
            'QA': []
        },
        'design': {
            'General': [],
            'Design': []
        }
    };
   
    var methods = {
        getModel: getTodoModel,
        progress: updateProgress
    };

    return methods;

    function getTodoModel(type){
        return todoModels[type];
    }

    function updateProgress(data){
        var total   = 0,
            checked = 0;
        // Main todo
        for (var key in data.todos) {
            for (var i = data.todos[key].length - 1; i >= 0; i--) {
                total++;
                if (data.todos[key][i].done) {
                    checked++;
                }
            }
        }

        // my todo
        if(data.myTodos.length){
            for (var idx = data.myTodos.length - 1; idx >= 0; idx--) {
                total++;
                if (data.myTodos[idx].done) {
                    checked++;
                }
            }
        }

        return (checked / total) * 100;
    }

}

angular
    .module('app')
    .factory('TodoService', TodoService);
