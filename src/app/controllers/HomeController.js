function HomeController($scope, $location, localStorageService, TodoService) {
    var vm = this;

    // Initialize a blank project
    vm.project = {};
    vm.project.myTodos = [];


    // Check if there is any project stored
    vm.storedProjects = localStorageService.keys();

    // Overwrite blank project with stored data
    if(vm.storedProjects) {
        vm.modal = true;
        vm.existingModal = true;
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
        vm.project.name = newProject.name;
        vm.project.todos = TodoService.getModel(newProject.type);
        vm.modal = false;
        vm.existingModal = false;
        vm.newModal = false;
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

angular
    .module('app')
    .controller('HomeController', HomeController);