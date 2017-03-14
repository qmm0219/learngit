	var app = angular.module('kadApp',['ngRoute']);
	app.config(['$routeProvider',function($routeProvider) {
		$routeProvider
		.when('/home',{
			controller:"homeCtrl",
			templateUrl:"home.html"
		})
		.when('/classify',{
			controller:'classifyCtrl',
			templateUrl:'classify.html'
		})
		.when('/doctor',{
			controller:'doctorCtrl',
			templateUrl:'doctor.html'
		})
		.when('/shopping',{
			controller:"shoppingCtrl",
			templateUrl:'shopping.html'
		})
		.when('/my',{
			controller:'myCtrl',
			templateUrl:'my.html'
		})

		.otherwise({
			redirectTo:'/home'
		});
	}]);

	app.controller('homeCtrl',['$scope','$http',function($scope,$http){
		window.onscroll = function(){
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 10){
				$("nav").css("background","rgba(21,180,243,0.7)");
			}else if(scrollTop <= 10){
				$("nav").css("background","rgba(0,0,0,0.3)");
			}
		}

		var mySwiper = new Swiper('.swiper-container', {
			autoplay: 3000,
			speed:1000,
			loop : true,

			// 分页器
			pagination : '.swiper-pagination',
			paginationClickable :true,
			autoplayDisableOnInteraction:false,
		})

		// 秒杀分类
		$http.get('datas/seckill.json').then(function(skill){
			$scope.skill = skill.data.SeckillWares;
			// console.log(data.datsa);
		})

		// 猜你喜欢
		$http.get('datas/like-2.json').then(function(like){
			$scope.like = like.data.Data;
			// console.log(like.data);
		})

		// 点击商品跳转至商品详情页面
		$scope.clickFn = function(code){
			window.location.href = 'http://localhost:3000/detail.html?comId='+ code;
		}

		// 返回顶部按钮
		$scope.topFn = function(){
			document.body.scrollTop  = 0;
		}

		
	}]);


	// 分类页面
	app.controller('classifyCtrl',['$scope','$http',function($scope,$http){
		// 热门分类数据
		$http.get('datas/classify-class.json').then(function(class1){
			$scope.class1 = class1.data.Data.Items[0].SecChannel;
			// console.log(class1.data.Data.Items[0].SecChannel);
		})

		//中西药品
		$http.get('datas/classify-doc.json').then(function(class2){
	
			var items = class2.data.Data.Items;
			$scope.class2 = [];
			for(var i = 0; i < items.length; i++){
				$scope.class2 = $scope.class2.concat(items[i].SecChannel);
			}
			// console.log($scope.class2);
			
		});

		// 成人药品
		$http.get('datas/classify-sex.json').then(function(class3){
			var items = class3.data.Data.Items;
			$scope.class3 = [];
			angular.forEach(items,function(class3,i){
				$scope.class3 = $scope.class3.concat(items[i].SecChannel);
			})
			// console.log($scope.class3);
		})

		// 分类页面点击切换
		$(".classes li").on('click',function(){
			for(var i = 0; i < $('.classes li').length; i++){
				$('.classes li').eq(i).css("background",'#f8f8f8');
				$('.content-wrap .content').eq(i).css('display','none');
			}
			$(this).css("background",'#fff');
			$('.content-wrap .content').eq($(this).index()).css('display','block');
		})

	}]);


	// 资讯页面
	app.controller('doctorCtrl',['$scope','$http',function($scope,$http){

	}]);

	// 购物车页面
	app.controller('shoppingCtrl',['$scope','$http',function($scope,$http){
		// console.log(localStorage);
		$scope.dataArr = [];
		for(var item in localStorage){
			$scope.dataArr.push(JSON.parse(localStorage[item]));
			// console.log(localStorage[item]);
		}
		// console.log($scope.dataArr);

		// 增加一个数量
		$scope.addFn = function(id){
			if($scope.dataArr[this.$index].num){
				$scope.dataArr[this.$index].num++;
				var data = JSON.parse(localStorage[id]);
				data.num++;
				localStorage[id] = JSON.stringify(data);
				
			}
			
		}

		// 减少一个数量
		$scope.lessenFn = function(id){
			if($scope.dataArr[this.$index].num > 1){
				$scope.dataArr[this.$index].num--;
				var data = JSON.parse(localStorage[id]);	
				data.num--;
				localStorage[id] = JSON.stringify(data);
			}
		}
		

 
		// 删除按钮
		$scope.removeFn = function(id){
			$scope.dataArr.splice(this.$index,1);
			localStorage.removeItem(id);

		}

		// 总价
		$scope.totalPrice = function(){
			var total = 0;
			angular.forEach($scope.dataArr,function(item){
				total += item.num * item.price;
			})
			return total;

		}

		// 购买总数
		$scope.totalNum = function(){
			var total = 0;
			angular.forEach($scope.dataArr, function(item){
				total += item.num;
			});
			return total;
		}

		

		
		// 选框按钮
		// arr数组是用来改变背景图
		$scope.arr = [];
		$scope.allNum = 0;
		$scope.prices = 0;
		$scope.status = function(index){
			if($scope.arr[index]){
				$scope.arr[index] = false;
			}else{
				$scope.arr[index] = true;
			}
			$scope.allNum = 0;
			$scope.zPrice = 0;
			// console.log($scope.arr[index]);
			angular.forEach($scope.arr, function(value, key){
				if($scope.arr[key] == true){
					$scope.allNum  += $scope.dataArr[key].num; 
					$scope.zPrice += $scope.dataArr[key].num * $scope.dataArr[key].price;		
				}
				
			});
			// console.log($scope.zPrice);
		}


		



		// 全选按钮
		$scope.totalFn = function(){
			angular.forEach($scope.dataArr, function(value, key){
				$scope.arr[key] = true;
				
			});
			if($scope.btn){
				$scope.btn = false;
				$scope.arr = [];
			}else{
				$scope.btn = true;
			}
			$scope.allNum = 0;
			$scope.zPrice = 0;
			angular.forEach($scope.arr, function(value, key){
				if($scope.arr[key] == true){
					$scope.allNum += $scope.dataArr[key].num;
					$scope.zPrice += $scope.dataArr[key].num * $scope.dataArr[key].price;
				}
			});
			console.log($scope.zPrice);

		}

		


	}]);

	app.controller("myCtrl",['$scope','$window',function($scope,$window){
		window.onscroll = function(){
			var scroll = $(document).scrollTop();
			if(scroll > 10){
				$('.ge').show();
			}else if(scroll < 10){
				$('.ge').hide();
			}
		}

	

	}]);

	app.controller('class1Ctrl',['$scope','$routeParams',function($scope,$routeParams){
		$scope.name = $routeParams.a;
	}]);




	