var app = angular.module("allApp",[]);
app.controller('allCtrl',['$scope','$http',function($scope,$http){
	$http.get('datas/all.json').then(function(data){
		$scope.data = data.data.RspData.data;
		// console.log($scope.data);
	})
	$scope.num = localStorage.length;
	$scope.showArr = [];
	$scope.toggle = function(index){
		if($scope.showArr[index]){
			$scope.showArr[index] = false;
		}else{
			$scope.showArr = [];
			$scope.showArr[index] = true;
		}
	}

	$scope.inp = {drugName:""};
	$scope.qkFn = function(){
		$scope.inp.drugName = "";
	}


}]);

