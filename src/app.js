angular.module('todoApp', ['ui.router', 'ngResource'])
.controller('TodoController', ['$scope', '$state', '$resource', '$stateParams', 'storageService', 'pagerService', function(
    $scope,
    $state,
    $resource,
    $stateParams,
    storageService,
    pagerService
) {
    const articles = $resource('/todo.json');

    storageService.articles.length === 0 && articles.get()
        .$promise.then(function(response) {
            storageService.articles = response.articles ? response.articles : storageService.articles;
            $state.go('list');
        })
        .catch(err => console.log(err));

    $scope.listOfArticles = storageService.articles;
    $scope.amountOfArticles = storageService.articles;

    $scope.dummyItems = _.range(1, $scope.listOfArticles.length);
    $scope.pager = {};
    $scope.setPage = setPage;

    initController();

    function initController() {
        $scope.setPage(1);
    }

    function setPage(page) {
        if (page < 1 || page > $scope.pager.totalPages) {
            return;
        }

        $scope.pager = pagerService.GetPager($scope.dummyItems.length, page);

        $scope.listOfArticles = storageService.articles.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }

    const taskForEditing = storageService.articles.find((item, idx) =>
        idx === Number($stateParams.taskId));

    $scope.text = taskForEditing ? taskForEditing.text : '';
    $scope.title = taskForEditing ? taskForEditing.title : '';

    $scope.addNewTask = function() {

        if (taskForEditing) {
            storageService.articles[$stateParams.taskId].text = $scope.text;
            storageService.articles[$stateParams.taskId].title = $scope.title;

        } else {
            storageService.articles.push({
                title: $scope.title,
                text: $scope.text,
                date: new Date(),
                done: false,
                time: new Date().getTime()
            });
        }
        $state.go('list');
    }

    $scope.sortTodosName = function(){
        $scope.sortTodosByName = !$scope.sortTodosByName ? 'title' : undefined;
    };

    $scope.sortTodosDates = function() {
        $scope.sortTodosByDate = !$scope.sortTodosByDate ? 'time' : undefined;
    };

    $scope.editTask = function(index) {
        $state.go('edittask', {
            taskId: index
        });
        $scope.title = $scope.listOfArticles[index].title;
        $scope.text = $scope.listOfArticles[index].text;
    };

    $scope.filterTodos = function(day) {
        $scope.listOfArticles = storageService.articles.filter(({ time }) =>
            time > Number(Date.now()) - Number(day) * 86400000);
    }
}])
.service('storageService', [function() {
    const articles = [];
   return {
     articles
   };
}])
.service('pagerService', [function() {
    const service = {};

      service.GetPager = GetPager;

      return service;

      function GetPager(totalItems, currentPage, pageSize) {
          currentPage = currentPage || 1;

          pageSize = pageSize || 10;

          const totalPages = Math.ceil(totalItems / pageSize);

          let startPage, endPage;

          if (totalPages <= 10) {
              startPage = 1;
              endPage = totalPages;
          } else {
              if (currentPage <= 6) {
                  startPage = 1;
                  endPage = 10;
              } else if (currentPage + 4 >= totalPages) {
                  startPage = totalPages - 9;
                  endPage = totalPages;
              } else {
                  startPage = currentPage - 5;
                  endPage = currentPage + 4;
              }
          }

          const startIndex = (currentPage - 1) * pageSize;
          const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

          const pages = _.range(startPage, endPage + 1);

          return {
              totalItems: totalItems,
              currentPage: currentPage,
              pageSize: pageSize,
              totalPages: totalPages,
              startPage: startPage,
              endPage: endPage,
              startIndex: startIndex,
              endIndex: endIndex,
              pages: pages
          };
      }
}])
.directive('edittask', function() {
    return {
        template: `
        <div ng-cloak ng-controller="TodoController">
          <div layout-padding>
            <div>
              <form name="editForm">
                <div>
                  <input placeholder="Title" name="title" ng-model="$ctrl.newTask.title">
                </div>
                <div>
                  <input placeholder="Text" ng-minlength="20" name="text" ng-model="$ctrl.newTask.text" required>
                    <div ng-show="addTodoForm.text.$touched && addTodoForm.text.$invalid">Text is mandatory and must be minimum 20 characters long.</div>
                </div>
                <div>
                  <button ng-click="$ctrl.addNewTask()">Add task</button>
                </div>
              </form>
            </div>
          </div>
        </div>`
    }
})
.directive('create', function() {
    return {
        template: `
        <div ng-cloak ng-controller="TodoController">
            <div class="container">
              <form name="addTodoForm">
                <div class="mb-3">
                  <input class="btn btn-default" placeholder="Title" name="title" ng-model="title" required>
                  <div class="text-danger" ng-show="addTodoForm.title.$touched && addTodoForm.title.$invalid">
                    Title is mandatory.
                  </div>
                </div>
                <div>
                  <input class="btn btn-default" placeholder="Text" ng-minlength="20" name="text" ng-model="text" required>
                  <div class="text-danger" ng-show="addTodoForm.text.$touched && addTodoForm.text.$invalid">
                    Text is mandatory and must be minimum 20 characters long.
                  </div>
                </div>
                  <div>
                    <br>
                    <button class="btn btn-default" ng-disabled="addTodoForm.text.$invalid" ng-click="addNewTask()">Add/Edit task</button>
                  </div>
              </form>
            </div>
        </div>`
    }
})
.directive('todoHeader', function() {
    return {
        template: `
        <div class="container mt-3 mb-3">
          <nav class="center-block">
            <a ui-sref="list" ui-sref-active="active">
              List articles
            </a> |
            <a ui-sref="create" ui-sref-active="active">
              Create article
            </a>
          </nav>
        </div>`
    }
})
.directive('list', function() {
    return {
        template: `
        <div ng-cloak ng-controller="TodoController">
          <div class="container">
            <div>Amount of articles: {{ amountOfArticles.length }}</div>
            <div ng-if="listOfArticles.length">
              <div class="container" ng-repeat="todo in listOfArticles | orderBy:sortTodosByDate | orderBy:sortTodosByName ">
                <div class="checkbox border p-2">
                    <span ng-click="editTask($index)">{{ todo.title }}</span>
                </div>
              </div>
            </div>
            <ul ng-if="pager.pages.length" class="pagination">
                <li ng-class="{disabled:pager.currentPage === 1}">
                    <a ng-click="setPage(1)">First</a>
                </li>
                <li ng-class="{disabled:pager.currentPage === 1}">
                    <a ng-click="setPage(pager.currentPage - 1)">Previous</a>
                </li>
                <li ng-repeat="page in pager.pages" ng-class="{active:pager.currentPage === page}">
                    <a ng-click="setPage(page)">{{page}}</a>
                </li>
                <li ng-class="{disabled:pager.currentPage === pager.totalPages}">
                    <a ng-click="setPage(pager.currentPage + 1)">Next</a>
                </li>
                <li ng-class="{disabled:pager.currentPage === pager.totalPages}">
                    <a ng-click="setPage(pager.totalPages)">Last</a>
                </li>
            </ul>
          </div>
        </div>`
    }
})
.config([
  '$locationProvider',
  '$stateProvider',
  function($locationProvider, $stateProvider) {
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
