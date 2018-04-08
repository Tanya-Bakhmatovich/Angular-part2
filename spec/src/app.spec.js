describe('Get Request', function() {
    beforeEach(module("todoApp"));
    var storageService, $rootScope, $httpBackend, $resource;

    beforeEach(inject(function(_$rootScope_, $controller, _$httpBackend_, _storageService_, _$resource_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $resource = _$resource_;
        storageService = _storageService_;
        scope = $rootScope.$new();
        $controller('TodoController', {
            $scope: scope
        });
        $httpBackend.whenRoute('GET', '/todo.json')
            .respond(200, {
                articles: ['article']
            });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('storageService initial state equals empty array', inject(function($injector) {
        expect(storageService.articles).toEqual([]);
        $httpBackend.flush();
    }));

    it('storageService should be equal response', inject(function($injector) {
        $httpBackend.flush();
        expect(storageService.articles).toEqual(['article']);
    }));
});

describe('Initialisation of controller scope', function() {
    beforeEach(module("todoApp"));
    var scope;

    var storageServiceMock = {
        "articles": [{}, {}, {}]
    };

    var stateParamsExistMock = {
        taskId: '1',
    }

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('TodoController', {
            $scope: scope,
            storageService: storageServiceMock,
            $stateParams: stateParamsExistMock
        });
    }));

    it('amountOfArticles should be equal articles in storage', inject(function($injector, _$q_) {
        expect(scope.amountOfArticles.length).toEqual(storageServiceMock.articles.length);
    }));

    it('addNewTask function should fill fields if article', inject(function($injector, _$q_) {
        scope.text = 'testText';
        scope.title = 'testTitle';
        scope.addNewTask();
        expect(storageServiceMock.articles[1].text).toEqual('testText');
        expect(storageServiceMock.articles[1].title).toEqual('testTitle');
    }));

});

describe('Functionality', function() {
    beforeEach(module("todoApp"));
    var scope;

    var storageServiceMock = {
        "articles": [{
                "title": "Code furiously",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "date": "Sat Jan 20 2018 12:22:24 GMT+0300 (+03)",
                "done": true,
                "time": 121854288719
            },
            {
                "title": "Do user study",
                "text": "testText",
                "date": "Sat Feb 10 2018 12:22:24 GMT+0300 (+03)",
                "done": false,
                "time": 102184288719
            },
            {
                "title": "Write paper",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "date": "Sat Feb 24 2018 12:22:24 GMT+0300 (+03)",
                "done": true,
                "time": 1521784288719
            },
        ]
    };

    var stateParamsNotExistMock = {
        taskId: '4',
    }

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('TodoController', {
            $scope: scope,
            storageService: storageServiceMock,
            $stateParams: stateParamsNotExistMock
        });
    }));

    it('addNewTask function should add new article if it doesnt exist', inject(function($injector, _$q_) {
        scope.text = 'testText';
        scope.title = 'testTitle';
        scope.addNewTask();
        expect(storageServiceMock.articles.length).toEqual(4);
    }));

    it('sortTodosByName function should be equal title if in scope it does not exist', inject(function($injector, _$q_) {
        scope.sortTodosByName = false;
        scope.sortTodosName();
        expect(scope.sortTodosByName).toEqual('title');
    }));

    it('sortTodosByName function should be equal undefined if in scope it exist', inject(function($injector, _$q_) {
        scope.sortTodosByName = true;
        scope.sortTodosName();
        expect(scope.sortTodosByName).toEqual(undefined);
    }));

    it('sortTodosByDates function should be equal title if in scope it does not exist', inject(function($injector, _$q_) {
        scope.sortTodosByDate = false;
        scope.sortTodosDates();
        expect(scope.sortTodosByDate).toEqual('time');
    }));

    it('sortTodosByDates function should be equal undefined if in scope it exist', inject(function($injector, _$q_) {
        scope.sortTodosByDate = true;
        scope.sortTodosDates();
        expect(scope.sortTodosByDate).toEqual(undefined);
    }));

    it('editTask function should set current title and text in scope', inject(function($injector, _$q_) {
        scope.editTask(1);
        expect(scope.title).toEqual('Do user study');
        expect(scope.text).toEqual('testText');
    }));

    it('filterTodos function should filter articles by time', inject(function($injector, _$q_) {
        scope.filterTodos(5);
        expect(scope.listOfArticles.length).toEqual(1);
    }));

});


describe('PageService', function() {
    beforeEach(module("todoApp"));

    var pagerService, $rootScope;
    beforeEach(inject(function(_$rootScope_, $controller, _pagerService_) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        pagerService = _pagerService_;
        $controller('TodoController', {
            $scope: scope
        });
    }));

    it('GetPager should set startPage equals 1 end page equals totalPages in case when total <=10 ', inject(function($injector, _$q_) {
        expect(pagerService.GetPager(10, 1, 5).startPage).toEqual(1);
        expect(pagerService.GetPager(10, 1, 5).endPage).toEqual(2);
    }));

    it('GetPager should set startPage equals 1 end page equals 10 in case when total >10 and current page <=6 ', inject(function($injector, _$q_) {
        expect(pagerService.GetPager(20, 1, 1).startPage).toEqual(1);
        expect(pagerService.GetPager(20, 1, 1).endPage).toEqual(10);
    }));

    it('GetPager should set startPage equals total - 9 and end page equals totalPages in case when total >10, current > 6, current + 4 >=total ', inject(function($injector, _$q_) {
        expect(pagerService.GetPager(11, 7, 1).startPage).toEqual(2);
        expect(pagerService.GetPager(11, 7, 1).endPage).toEqual(11);
    }));

    it('GetPager should set startPage equals current - 5 and end page equals current +4, in case when total >10, current > 6, current + 4 >=total, current +4 < total ', inject(function($injector, _$q_) {
        expect(pagerService.GetPager(12, 7, 1).startPage).toEqual(2);
        expect(pagerService.GetPager(12, 7, 1).endPage).toEqual(11);
    }));
});
