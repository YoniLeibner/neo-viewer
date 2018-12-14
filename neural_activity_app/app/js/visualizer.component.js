// Register visualizer directive, along with its associated controller and template
Visualizer = angular.module('Visualizer', [
    'ui.router',
    'ng',
    'ngResource',
    'ApiCommunicationServices',
    'FileServices',

    'GraphicsServices',
    'ngCookies',
    'nvd3',
    'ngTextTruncate',
]);

// Visualizer.config(
//     function($cookiesProvider, $httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {
//         $resourceProvider.defaults.stripTrailingSlashes = false;
//         $stateProvider

//             .state('visualizer', {
//                 // parent: 'home',
//                 abstract: true
//             })
//             .state('visualizer.block', {
//                 // url: '/block',
//                 component: 'blockView'
//             })

//         .state('visualizer.segment', {

//                 // url: '/segment/{segment_id:[0-9]{1,8}}',
//                 component: 'segmentView'
//             })
//             .state('visualizer.analog_signal', {

//                 // url: '/analog_signal/{segment_id:[0-9]{1,8}}?{analog_signal_id:[0-9]{1,8}}',
//                 component: 'analogsignalView'
//             })
//             .state('visualizer.spiketrain', {

//                 // url: '/spiketrain/{segment_id:[0-9]{1,8}}?{spiketrain_id:[0-9]{1,8}}',
//                 component: 'spiketrainView'
//             })
//     });

Visualizer.controller('MenuCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', '$state', '$compile', '$element', 'FileService',

    function($scope, $rootScope, $http, $location, $stateParams, $state, $compile, $element, FileService) {
        var ctrl = this;

        $scope.menu_segments_to_show = [];
        $scope.menu_analogsignals_to_show = [];
        $scope.menu_spiketrains_to_show = [];

        $scope.showSegment = function(segment_id) {
            var id = segment_id;
            if (!$scope.isInArray(id, $scope.menu_segments_to_show)) {
                $scope.menu_segments_to_show.push(id);
                document.getElementById("arrow-segment-" + id).className = "glyphicon glyphicon-menu-up";
            } else {
                var i = $scope.menu_segments_to_show.indexOf(id);
                if (i == 0) {
                    $scope.menu_segments_to_show.splice(0, 1);
                } else { $scope.menu_segments_to_show.splice(i, i); }
                document.getElementById("arrow-segment-" + id).className = "glyphicon glyphicon-menu-down";
            };
            $scope.showSegmentPanel(segment_id)
        }

        $scope.showAnalogSignals = function(segment_id) {
            var id = segment_id;
            if (!$scope.isInArray(id, $scope.menu_analogsignals_to_show)) {
                $scope.menu_analogsignals_to_show.push(id);
                document.getElementById("arrow-analogsignal-" + id).className = "glyphicon glyphicon-menu-up";
            } else {
                var i = $scope.menu_analogsignals_to_show.indexOf(id);
                if (i == 0) {
                    $scope.menu_analogsignals_to_show.splice(0, 1);
                } else { $scope.menu_analogsignals_to_show.splice(i, i); }
                document.getElementById("arrow-analogsignal-" + id).className = "glyphicon glyphicon-menu-down";
            };
        }

        $scope.showSpiketrains = function(segment_id) {
            var id = segment_id;
            if (!$scope.isInArray(id, $scope.menu_spiketrains_to_show)) {
                $scope.menu_spiketrains_to_show.push(id);
                document.getElementById("arrow-spiketrain-" + id).className = "glyphicon glyphicon-menu-up";
            } else {
                var i = $scope.menu_spiketrains_to_show.indexOf(id);
                if (i == 0) {
                    $scope.menu_spiketrains_to_show.splice(0, 1);
                } else { $scope.menu_spiketrains_to_show.splice(i, i); }
                document.getElementById("arrow-spiketrain-" + id).className = "glyphicon glyphicon-menu-down";
            };
        }


        $scope.showBlockPanel = function() {
            html_panel = $compile('<div id=' + $scope.panel_id + ' align=rigth><block-view><block-view></div>')($scope);
            angular.element('#' + $scope.panel_id).replaceWith(html_panel);
        }

        $scope.showSegmentPanel = function(segment_id) {
            html_panel = $compile('<div id="detail-panel-' + $scope.panel_ID + '" align=rigth><segment-view segmentId="' + segment_id + '"><segment-view></div>')($scope);
            angular.element('#' + $scope.panel_ID).replaceWith(html_panel);
        }

        $scope.showAnalogSignalPanel = function(segment_id, analogsignal_id) {
            html_panel = $compile('<div id=' + $scope.panel_ID + ' align=rigth><analogsignal-view segmentId="' + segment_id + '" analogsignalId="' + analogsignal_id + '"><analogsignal-view></div>')($scope);
            angular.element('#' + $scope.panel_ID).replaceWith(html_panel);
        }

        $scope.showSpiketrainPanel = function(segment_id, spiketrain_id) {
            html_panel = $compile('<div id=' + $scope.panel_ID + ' align=rigth><spiketrain-view segmentId="' + segment_id + '" spiketrainId="' + spiketrain_id + '"><spiketrain-view></div>')($scope);
            angular.element('#' + $scope.panel_ID).replaceWith(html_panel);
        }

        $scope.isInArray = function(value, array) {
            return array.indexOf(value) > -1;
        }

        $scope.$on('data_updated', function() {
            $scope.data = FileService.getData();
            $scope.$apply();
        });



        //code

        FileService.setService($scope.source).then(function() {
            $scope.panel_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

            $scope.data = FileService.getData();
            $scope.showBlockPanel();
            $scope.$apply();
        });

    }
]);

Visualizer.directive("visualizerView", ['FileService', '$stateParams', function(FileService, $stateParams) {
    return {
        restrict: 'EA',
        replace: true,
        // transclude: true,
        templateUrl: '/static/templates/visualizer.tpl.html',
        scope: {
            source: '@'
        },
        controller: 'MenuCtrl'
    }

}]);