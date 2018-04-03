// const todoApp = require('../../src/app/app');
//
// describe('something', () => {
//
//     it('should initialize the app properly', () => {
//
//         expect(todoApp.todoApp.controller).toBeDefined();
//     })
// })

describe('TodoController', function() {
    var storageService, $rootScope, $httpBackend;
    beforeEach(module('todoApp'));
    beforeEach(inject(function(_$rootScope_){
      $rootScope = _$rootScope_;
    }));
// '$scope', '$state', '$resource', '$stateParams', 'storageService', 'pagerService',
    it("Should return the message", (inject(function ($rootScope, $state, $resource, $stateParams, $controller, storageService) {

       var scope = $rootScope.$new();
       var controller = $controller("TodoController", { $scope: scope });

   })));

    // describe('Request was done', function() {
    //
    //
    //     beforeEach(inject(function (_$rootScope_, _$httpBackend_) {
    //           $rootScope = _$rootScope_;
    //           $httpBackend = _$httpBackend_;
    //           $httpBackend.whenRoute('GET', '/todo.json')
    //               .respond(function (method, url, data, headers, params) {
    //                   return [200, { articles: ['article'] }];
    //               });
    //      }));
    //       afterEach(function () {
    //           //These two calls will make sure that at the end of the test, all expected http calls were made
    //           $httpBackend.verifyNoOutstandingExpectation();
    //           $httpBackend.verifyNoOutstandingRequest();
    //       });
    //     //   it('Service should be defined and get result', inject(function ($injector, _$q_) {
    //     //     expect(storageService.articles).toBeUndefined();
    //     //     $httpBackend.flush();
    //     //     expect(storageService.articles).toEqual(['article']);
    //     // }));
    // })
});
