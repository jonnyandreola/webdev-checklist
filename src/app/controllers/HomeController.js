function HomeController() {
    var vm = this;

    vm.title = 'Home';

    vm.project = {};

    vm.project.myTodos = [];

    vm.project.todos = {
        'General': [
            {name: 'Favicon', done: true, note: 'Use the following tool to generate your favicon LINK'},
            {name: '404 Page', done: false, note: 'Include Apple icons following this guidelines LINK'},
            {name: 'Others error pages', done: false, note: 'Include Apple icons following this guidelines LINK'},
            {name: 'Apple Icon', done: true, note: 'Include Apple icons following this guidelines LINK'},
            {name: 'README.md', done: false, note: 'create a README.md file with instructions LINK'},
            {name: 'Wiki', done: false, note: 'Include important info regarding this project in a wiki'}
        ],
        'Performance' : [
            {name: 'Google Page Insights', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'Yslow', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'GtMetrix', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'Minification', done: true, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'Page Size', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
        ],
        'Validation' : [
            {name: 'HTML', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'CSS', done: false, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
            {name: 'Javascript', done: true, note: ' Lorem ipsum dolor sit amet, consectetur adipisicing. LINK'},
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
            {name: 'Forms', done: true, note: '<meta name="description" content="Here is a description of the applicable page">'},
            {name: 'Links', done: false, note: 'Use the following tool to generate your favicon LINK'},
            {name: 'Responsiveness', done: true, note: 'Use the following tool to generate your favicon LINK'},
        ]
    };

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

}

angular
    .module('app')
    .controller('HomeController', HomeController);