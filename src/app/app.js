import angular from 'angular';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';

const todoApp = angular.module('todoApp', [uiRouter, ngResource]);

export { todoApp };
