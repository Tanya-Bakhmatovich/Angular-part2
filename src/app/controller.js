import angular from 'angular';
import _ from 'underscore';

angular
    .module('todoApp')
    .controller('TodoController', ['$scope', '$state', '$resource', '$stateParams', 'storageService', 'pagerService', (
        $scope,
        $state,
        $resource,
        $stateParams,
        storageService,
        pagerService,
    ) => {
        const articles = $resource('/todo.json');
console.log(articles);
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

        $scope.addNewTask = () => {
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

        $scope.sortTodosName = () => {
            $scope.sortTodosByName = !$scope.sortTodosByName ? 'title' : undefined;
        };

        $scope.sortTodosDates = () => {
            $scope.sortTodosByDate = !$scope.sortTodosByDate ? 'time' : undefined;
        };

        $scope.editTask = (index) => {
            $state.go('edittask', {
                taskId: index
            });
            $scope.title = $scope.listOfArticles[index].title;
            $scope.text = $scope.listOfArticles[index].text;
        };

        $scope.filterTodos = (day) => {
            $scope.listOfArticles = storageService.articles.filter(({ time }) =>
                time > Number(Date.now()) - Number(day) * 86400000);
        }
    }])
