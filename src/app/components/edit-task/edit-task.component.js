import angular from 'angular';
import template from './edit-task.html';

angular
.module('todoApp')
.directive('edittask', () => ({ template }));
