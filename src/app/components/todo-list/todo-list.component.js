import angular from 'angular';
import template from './todo-list.html';

angular
  .module('todoApp')
  .directive('list', () => ({ template }));
