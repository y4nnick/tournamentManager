angular.module("formApp").directive('nationshower', function ($parse) {
// <span nationshower class="bfh-countries" data-country="US" data-flags="true"></span>
    // The directive has been rewritten to work properly
    return {
        restrict: 'A', // It is an attribute
        require: '?ngModel', // It uses ng-model binding
        scope: {
            ngModel: '='
        },
        link: function (scope, elem, attrs, ctrl) {
            // Add the required classes
            elem.addClass('bfh-countries');

            // First we initialize the selectbox with the desired options
            elem.bfhselectbox({
                filter: true
            }).on('change.bfhselectbox', function() {
                    // Listen for the change event and update the bound model
                    return scope.$apply(function () {
                        return scope.ngModel = elem.val();
                    });
                });

            // Initialize the countries with the desired options
            return elem.bfhcountries({
                flags: true,
                country: 'AT'
            });
        }
    };
});