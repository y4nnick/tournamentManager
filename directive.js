angular.module("formApp").directive('nationpicker', function ($parse) {

    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        link: function (scope, element, attrs) {

           //element.append('<div id="country" class="bfh-selectbox bfh-countries" data-country="AT" data-flags="true"></div>');
            //element.append('<select id="countries1" class="form-control"></select>');
            $('#country').bfhcountries({flags:true})
        }
    };
})

/*
 angular.module("formApp").directive('nationpicker', function ($parse) {
 return {
 restrict: 'A',
 replace: false,
 transclude: false,
 link: function (scope, element, attrs) {
 element.append('<div id="country" class="bfh-selectbox bfh-countries" data-country="AT" data-flags="true"></div>');
 $('#country').bfhcountries({flags:true})
 }
 };
 })*/