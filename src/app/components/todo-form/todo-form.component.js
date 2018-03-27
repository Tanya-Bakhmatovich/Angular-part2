import angular from 'angular';
import template from './todo-form.html';

angular
  .module('todoApp')
  .directive('create', () => ({ template }));
