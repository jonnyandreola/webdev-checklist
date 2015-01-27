function LocalStorage(localStorageServiceProvider){

    localStorageServiceProvider
        .setPrefix('klick_checklist');
}

angular
    .module('app')
    .config(LocalStorage);
