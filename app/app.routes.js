angular.module('formApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('form', {url: '/form', templateUrl: 'app/components/form/form.html', controller: 'formController'})
            .state('form.nation', {url: '/nation', templateUrl: 'app/components/form/form-nation.html'})
            .state('form.spieler', {url: '/spieler', templateUrl: 'app/components/form/form-spieler.html'})
            .state('form.team', {url: '/team', templateUrl: 'app/components/form/form-team.html'})
            .state('form.submit', {url: '/submit', templateUrl: 'app/components/form/form-submit.html'});

        $urlRouterProvider.otherwise('/form/nation');
    })