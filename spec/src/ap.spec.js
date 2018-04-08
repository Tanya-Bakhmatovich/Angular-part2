// describe('Renderer', () => {
//   let element;
//   let scope;
//
//   beforeEach(
//     inject(($rootScope, $compile) => {
//       scope = $rootScope.$new();
//       element = $compile(
//         '<div><label ng-show="label.show">1</label><label ng-hide="label.show">2</label></div>'
//       )(scope);
//       scope.$digest();
//     })
//   );
//
//   it('should render the element', () => {
//     expect(element).toBeDefined();
//     expect(element[0]).toMatchSnapshot();
//   });
// });
