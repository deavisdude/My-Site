angular.module('clicker', []).controller('gameCtrl', ['$scope', '$interval', function ($scope, $interval) {
    $scope.units = 0;
    $scope.ups = 0;

    $scope.auto = true;

    $interval(function () { $scope.AutoPlay(); }, 1000/5);

    $scope.pricePercent = 1.15;

    $scope.clickers = {
        CLICK1: { count: 0, index: 0, value: (.1/15), increment: .1, price: 15, name: 'Unit 1' },
        CLICK2: { count: 0, index: 1, value: (.5 / 100), increment: .5, price: 100, name: 'Unit 2' },
        CLICK3: { count: 0, index: 2, value: (4 / 500), increment: 4, price: 500, name: 'Unit 3' },
        CLICK4: { count: 0, index: 3, value: (10 / 3000), increment: 10, price: 3000, name: 'Unit 4' },
        CLICK5: { count: 0, index: 4, value: (40 / 10000), increment: 40, price: 10000, name: 'Unit 5' },
        CLICK6: { count: 0, index: 5, value: (100 / 40000), increment: 100, price: 40000, name: 'Unit 6' },
        CLICK7: { count: 0, index: 6, value: (400 / 200000), increment: 400, price: 200000, name: 'Unit 7' },
        CLICK8: { count: 0, index: 7, value: (6666 / 1667000), increment: 6666, price: 1667000, name: 'Unit 8' }

    };
    $scope.numClickers = 1;

    $scope.increase = function (amount) {
        $scope.units += amount;
    }

    $scope.addUnit = function (clickerVal) {
        var clicker = $scope.getClicker(clickerVal);

        if (($scope.units - clicker.price) >= 0) {
            $scope.units -= clicker.price;
            clicker.price *= $scope.pricePercent;
            clicker.value = clicker.increment / clicker.price;
            clicker.count++;
            $interval(function () { $scope.increase(clicker.increment/30); }, 1000/30);
            $scope.ups += clicker.increment;
        }
    }

    $scope.getClicker = function (value) {
        switch (value) {
            case 0:
                return $scope.clickers.CLICK1;
                break;
            case 1:
                return $scope.clickers.CLICK2;
                break;
            case 2:
                return $scope.clickers.CLICK3;
                break;
            case 3:
                return $scope.clickers.CLICK4;
                break;
            case 4:
                return $scope.clickers.CLICK5;
                break;
            case 5:
                return $scope.clickers.CLICK6;
                break;
            case 6:
                return $scope.clickers.CLICK7;
                break;
            case 7:
                return $scope.clickers.CLICK8;
        }
    }

    var best = $scope.clickers.CLICK1;
    var equality = false;
    var min = $scope.clickers.CLICK1;
    var init = true;

    $scope.AutoPlay = function () {
        if ($scope.auto) {
            if (init) {
                for (var clicker in $scope.clickers) {
                    if ($scope.clickers[clicker].value < min.value) {
                        min = $scope.clickers[clicker];
                    }
                }
                init = false;
            }
            if (!equality) {
                if (best.value < min.value) {
                    if ($scope.getClicker(best.index + 1) != null) {
                        best = $scope.getClicker(best.index + 1);
                    } else {
                        equality = true;
                    }
                }
            } else {
                for (var clicker in $scope.clickers) {
                    if ($scope.clickers[clicker].value > best.value) {
                        best = $scope.clickers[clicker];
                    }
                }
            }


            $scope.addUnit(best.index);
        }
    }
}]);