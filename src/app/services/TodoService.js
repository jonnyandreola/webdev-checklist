function TodoService(){

    var todoModels = {
        'webdev': {
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
        },
        'backend': {
            'General': [
                {name: 'Setup IIS', done:false, note: 'Lorem ipsum dolor.'},
                {name: 'Backend Stuff', done:false, note: 'Lorem ipsum dolor. Lorem ipsum dolor sit amet.'},
            ],
            'Backend': [
                {name: 'Setup IIS', done:false, note: 'Lorem ipsum dolor.'},
                {name: 'Backend Stuff', done:false, note: 'Lorem ipsum dolor. Lorem ipsum dolor sit amet.'},
                {name: 'Setup IIS', done:false, note: 'Lorem ipsum dolor.'},
                {name: 'Backend Stuff', done:false, note: 'Lorem ipsum dolor. Lorem ipsum dolor sit amet.'},
            ]
        },
        'qa': {
            'General': [
                {name: 'Test', done:false, note: 'Lorem ipsum dolor.'},
                {name: 'Break Stuff', done:false, note: 'Lorem ipsum dolor. Lorem ipsum dolor sit amet.'},
            ],
            'QA': [
                {name: 'Setup IIS', done:false, note: 'Lorem ipsum dolor.'},
                {name: 'Backend Stuff', done:false, note: 'Lorem ipsum dolor. Lorem ipsum dolor sit amet.'},
                {name: 'Setup IIS', done:false, note: 'Lorem ipsum dolor.'},
                {name: 'Backend Stuff', done:false, note: 'Lorem ipsum dolor. Lorem ipsum dolor sit amet.'},
            ]
        },
        'design': {
            'General': [
                {name: 'Design Cupcakes', done:false, note: 'Lorem ipsum dolor.'},
                {name: 'Iconize Stuff', done:false, note: 'Lorem ipsum dolor. Lorem ipsum dolor sit amet.'},
            ],
            'Design': [
                {name: 'Setup IIS', done:false, note: 'Lorem ipsum dolor.'},
                {name: 'Backend Stuff', done:false, note: 'Lorem ipsum dolor. Lorem ipsum dolor sit amet.'},
                {name: 'Setup IIS', done:false, note: 'Lorem ipsum dolor.'},
                {name: 'Backend Stuff', done:false, note: 'Lorem ipsum dolor. Lorem ipsum dolor sit amet.'},
            ]
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
