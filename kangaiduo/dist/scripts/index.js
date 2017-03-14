var app=angular.module("kadApp",["ngRoute"]);app.config(["$routeProvider",function(a){a.when("/home",{controller:"homeCtrl",templateUrl:"home.html"}).when("/classify",{controller:"classifyCtrl",templateUrl:"classify.html"}).when("/doctor",{controller:"doctorCtrl",templateUrl:"doctor.html"}).when("/shopping",{controller:"shoppingCtrl",templateUrl:"shopping.html"}).when("/my",{controller:"myCtrl",templateUrl:"my.html"}).otherwise({redirectTo:"/home"})}]),app.controller("homeCtrl",["$scope","$http",function(a,t){window.onscroll=function(){var a=$(document).scrollTop();a>10?$("nav").css("background","rgba(21,180,243,0.7)"):a<=10&&$("nav").css("background","rgba(0,0,0,0.3)")};new Swiper(".swiper-container",{autoplay:3e3,speed:1e3,loop:!0,pagination:".swiper-pagination",paginationClickable:!0,autoplayDisableOnInteraction:!1});t.get("datas/seckill.json").then(function(t){a.skill=t.data.SeckillWares}),t.get("datas/like-2.json").then(function(t){a.like=t.data.Data}),a.clickFn=function(a){window.location.href="http://localhost:3000/detail.html?comId="+a},a.topFn=function(){document.body.scrollTop=0}}]),app.controller("classifyCtrl",["$scope","$http",function(a,t){t.get("datas/classify-class.json").then(function(t){a.class1=t.data.Data.Items[0].SecChannel}),t.get("datas/classify-doc.json").then(function(t){var n=t.data.Data.Items;a.class2=[];for(var r=0;r<n.length;r++)a.class2=a.class2.concat(n[r].SecChannel)}),t.get("datas/classify-sex.json").then(function(t){var n=t.data.Data.Items;a.class3=[],angular.forEach(n,function(t,r){a.class3=a.class3.concat(n[r].SecChannel)})}),$(".classes li").on("click",function(){for(var a=0;a<$(".classes li").length;a++)$(".classes li").eq(a).css("background","#f8f8f8"),$(".content-wrap .content").eq(a).css("display","none");$(this).css("background","#fff"),$(".content-wrap .content").eq($(this).index()).css("display","block")})}]),app.controller("doctorCtrl",["$scope","$http",function(a,t){}]),app.controller("shoppingCtrl",["$scope","$http",function(a,t){a.dataArr=[];for(var n in localStorage)a.dataArr.push(JSON.parse(localStorage[n]));a.addFn=function(t){if(a.dataArr[this.$index].num){a.dataArr[this.$index].num++;var n=JSON.parse(localStorage[t]);n.num++,localStorage[t]=JSON.stringify(n)}},a.lessenFn=function(t){if(a.dataArr[this.$index].num>1){a.dataArr[this.$index].num--;var n=JSON.parse(localStorage[t]);n.num--,localStorage[t]=JSON.stringify(n)}},a.removeFn=function(t){a.dataArr.splice(this.$index,1),localStorage.removeItem(t)},a.totalPrice=function(){var t=0;return angular.forEach(a.dataArr,function(a){t+=a.num*a.price}),t},a.totalNum=function(){var t=0;return angular.forEach(a.dataArr,function(a){t+=a.num}),t},a.arr=[],a.allNum=0,a.prices=0,a.status=function(t){a.arr[t]?a.arr[t]=!1:a.arr[t]=!0,a.allNum=0,a.zPrice=0,angular.forEach(a.arr,function(t,n){1==a.arr[n]&&(a.allNum+=a.dataArr[n].num,a.zPrice+=a.dataArr[n].num*a.dataArr[n].price)})},a.totalFn=function(){angular.forEach(a.dataArr,function(t,n){a.arr[n]=!0}),a.btn?(a.btn=!1,a.arr=[]):a.btn=!0,a.allNum=0,a.zPrice=0,angular.forEach(a.arr,function(t,n){1==a.arr[n]&&(a.allNum+=a.dataArr[n].num,a.zPrice+=a.dataArr[n].num*a.dataArr[n].price)}),console.log(a.zPrice)}}]),app.controller("myCtrl",["$scope","$window",function(a,t){window.onscroll=function(){var a=$(document).scrollTop();a>10?$(".ge").show():a<10&&$(".ge").hide()}}]),app.controller("class1Ctrl",["$scope","$routeParams",function(a,t){a.name=t.a}]);