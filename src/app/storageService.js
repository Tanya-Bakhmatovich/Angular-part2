import angular from 'angular';

angular
  .module('todoApp')
  .service('storageService', [() => {
      const articles = [];
     return {
       articles
     };
 }]);
