import angular from 'angular';

angular
  .module('todoApp')
  .config([
    '$locationProvider',
    '$stateProvider',
    ($locationProvider, $stateProvider) => {
    const mainState = {
      name: 'main',
      url: '/',
      template: '<list></list>'
    }

    const listState = {
      name: 'list',
      url: '/list' ,
      template: '<list></list>'
    }

    const createTodoState = {
      name: 'create',
      url: '/create',
      template: '<create></create>'
    }

    const editState = {
      name: 'edittask',
      url: '/task/{taskId}/edit',
      template: '<create></create>'
    }

    $locationProvider.html5Mode(true);
    $stateProvider.state(mainState);
    $stateProvider.state(createTodoState);
    $stateProvider.state(listState);
    $stateProvider.state(editState);
    }
  ]);
