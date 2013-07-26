var todo = angular.module('todo', ['ui.bootstrap', 'ngDragDrop']);

todo.directive('createcontent', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/createContent.html'
    }
});

todo.directive('asidemy', function(){
    return {
        restrict:'E',
        transclude: true,
        templateUrl:'partials/content.html'
    }
});

todo.value('uiSliderConfig',{}).directive('uiSlider', ['uiSliderConfig', '$timeout', function(uiSliderConfig, $timeout) {
    uiSliderConfig = uiSliderConfig || {};
    return {
        require: 'ngModel',
        compile: function (tElm, tAttrs) {
            return function ($scope, elm, $attrs, ngModel) {
                var options = angular.extend($scope.$eval($attrs.uiSlider) || {}, uiSliderConfig);
                // Object holding range values
                var prevRangeValues = {
                    min: null,
                    max: null
                };

                var init = function() {
                    elm.slider(options);
                    init = angular.noop;
                };

                // convenience properties
                var properties = ['min', 'max', 'step'];
                $.each(properties, function(i, property){
                    // support {{}} and watch for updates
                    $attrs.$observe(property, function(newVal){
                        if (!!newVal) {
                            init();
                            elm.slider('option', property, parseInt(newVal));
                        }
                    });
                });
                $attrs.$observe('disabled', function(newVal){
                    init();
                    elm.slider('option', 'disabled', !!newVal);
                });

                // Watch ui-slider (byVal) for changes and update
                $scope.$watch($attrs.uiSlider, function(newVal){
                    init();
                    elm.slider('option', newVal);
                }, true);

                // Late-bind to prevent compiler clobbering
                $timeout(init, 0, true);

                // Update model value from slider
                elm.bind('slide', function(event, ui){
                    ngModel.$setViewValue(ui.values || ui.value);
                    $scope.$apply();
                });

                // Update slider from model value
                ngModel.$render = function(){
                    init();
                    var method = options.range === true ? 'values' : 'value';

                    if (!ngModel.$viewValue)
                        ngModel.$viewValue = 0;

                    // Do some sanity check of range values
                    if (options.range === true) {

                        // Check outer bounds for min and max values
                        if (angular.isDefined(options.min) && options.min > ngModel.$viewValue[0]) {
                            ngModel.$viewValue[0] = options.min;
                        }
                        if (angular.isDefined(options.max) && options.max < ngModel.$viewValue[1]) {
                            ngModel.$viewValue[1] = options.max;
                        }

                        // Check min and max range values
                        if (ngModel.$viewValue[0] >= ngModel.$viewValue[1]) {
                            // Min value should be less to equal to max value
                            if (prevRangeValues.min >= ngModel.$viewValue[1])
                                ngModel.$viewValue[0] = prevRangeValues.min;
                            // Max value should be less to equal to min value
                            if (prevRangeValues.max <= ngModel.$viewValue[0])
                                ngModel.$viewValue[1] = prevRangeValues.max;
                        }

                        // Store values for later user
                        prevRangeValues.min = ngModel.$viewValue[0];
                        prevRangeValues.max = ngModel.$viewValue[1];

                    }
                    elm.slider(method, ngModel.$viewValue);
                };

                $scope.$watch($attrs.ngModel, function(){
                    if (options.range === true) {
                        ngModel.$render();
                    }
                }, true);

                function destroy(){
                    elm.slider('destroy');
                }
                elm.bind('$destroy', destroy);
            };
        }
    };
}]);

todo.directive('multiselect', function($compile){
    return {
        restrict:'A',
        link: function (scope, elm, attrs, ctrl){
            elm.multiselect({
                buttonClass: 'btn',
                                buttonWidth: 'auto',
                                buttonContainer: '<div class="btn-group" />',
                                maxHeight: false,
                                buttonText: function(options) {
                                    if (options.length == 0) {
                                        return 'None selected <b class="caret"></b>';
                                        }
                                    else if (options.length > 3) {
                                            return options.length + ' selected  <b class="caret"></b>';
                                        }
                                    else {
                                            var selected = '';
                                            options.each(function() {
                                                    selected += $(this).text() + ', ';
                                                });
                                            return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
                                        }
                                }
                        });

                    scope.$watch(attrs['model'], function(users) {
                            scope.$evalAsync(function() {
                                    elm.multiselect( 'rebuild' );
                                })
                        });
        }
    }
});

todo.directive('lengthValidate', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.validLength = (viewValue ? 'valid' : undefined);

                if(scope.validLength) {
                    ctrl.$setValidity('pwd', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwd', false);
                    return undefined;
                }

            });
        }
    };
});
