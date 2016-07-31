/**
 * Created by Ahmer on 11/26/2015.
 */
var app = angular.module('app',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('index',{
            url:'/',
            templateUrl:window.base_url+'ali/templates/listing.html',
            controller:'listing'
        }).state('product',{
            url:'/product/{:id}',
            templateUrl:window.base_url+'ali/templates/product.html',
            controller:'product-list'
        })


    $urlRouterProvider.otherwise('/');

});
//
//app.controller('listing',function($scope,$http){
//
//$scope.listings = [];
//
//
//    $http.get(window.base_url + 'index.php/hotels')
//        .success(function(data){
//            if(data.data.length>0) {
//                $scope.listings = data.data
//            }else{
//                $scope.error="Empty Records"
//            }
//        })
//        .error(function(err){
//            alert(err);
//        });
//
//
//})


/// Button
app.controller('listing',function($scope,$http){

    $scope.listings = [];
    $scope.page =0;
    $scope.limit =10;
    $scope.q = '';


    $scope.searchData =function(){
        var page = 0;
        console.log("SEARCHING")
        var url = window.base_url + 'index.php/hotels?page='+page+'&limit='+$scope.limit;
        $http.post(url,{q:$scope.q})
            .success(function (data) {
            if (data.data.length > 0) {
                $scope.listings = data.data
            } else {
                $scope.listings = []
                $scope.error = "Empty Records"
            }
        })
            .error(function (err) {
                alert(err);
            });


    }
    $scope.loadMyData =function(page) {

        $http.get(window.base_url + 'index.php/hotels?page='+page+'&limit='+$scope.limit)
            .success(function (data) {
                if (data.data.length > 0) {
                    $scope.listings = data.data
                } else {
                    $scope.error = "Empty Records"
                }
            })
            .error(function (err) {
                alert(err);
            });

    }
    $scope.loadMyData(0)


    $scope.nextPage = function(){

        ++$scope.page;
        var page = $scope.page*$scope.limit;
        $scope.loadMyData(page)

    }

    $scope.prevPage = function(){

        --$scope.page;
        var page =$scope.page*$scope.limit;
        $scope.loadMyData(page)

    }


})
//
///// Button
//app.controller('listing',function($scope,$http){
//
//    $scope.listings = [];
//    $scope.page =0;
//    $scope.limit =10;
//
//    $scope.loadMyData =function(page) {
//
//console.log(window.base_url + 'index.php/hotels?page='+page+'&limit='+$scope.limit);
//        $http.get(window.base_url + 'index.php/hotels?page='+page+'&limit='+$scope.limit)
//            .success(function (data) {
//                if (data.data.length > 0) {
//                    $scope.listings = data.data
//                } else {
//                    $scope.error = "Empty Records"
//                }
//            })
//            .error(function (err) {
//                alert(err);
//            });
//
//    }
//    $scope.loadMyData(0)
//
//
//    $scope.nextPage = function(){
//
//        ++$scope.page;
//        var page = $scope.page*$scope.limit;
//        $scope.loadMyData(page)
//
//    }
//
//    $scope.prevPage = function(){
//
//        --$scope.page;
//        var page =$scope.page*$scope.limit;
//        $scope.loadMyData(page)
//
//    }
//
//
//})