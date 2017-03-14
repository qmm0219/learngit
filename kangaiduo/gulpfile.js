var gulp = require('gulp');

// 引入gulp-js压缩模块
var uglify = require('gulp-uglify');

// 引入gulp-js代码合并压缩
var concat = require('gulp-concat');

//引入gulp-cssnano压缩模块
var concat = require("gulp-concat");


//引入gulp-cssnano压缩模块 
var cssnano = require("gulp-cssnano");

//引入gulp-imagemin图片压缩模块(压缩图片，不需要网络) 
var imagemin = require("gulp-imagemin");

// 引入gulp-htmlmin模块
var htmlmin = require("gulp-htmlmin");

// 浏览器同步操作
var browserSync = require("browser-sync");

// 引入less预编译模块
var less = require("gulp-less");





gulp.task("scripts",function(){

	gulp.src("src/scripts/*.js")
	.pipe(uglify())
	.pipe(gulp.dest("dist/scripts"))
	.pipe(browserSync.reload({
		stream:true
	}));
});


// css压缩
gulp.task("styles",function(){
	gulp.src("src/styles/*.less")
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest("dist/styles"))
	.pipe(browserSync.reload({ 
    	stream:true
    }));
});

// 图片压缩
gulp.task("images",function(){
	gulp.src(["./src/images/*.jpg","./src/images/*.png","./src/images/*.gif","./src/images/*.svg"])
	.pipe(imagemin())
	.pipe(gulp.dest("dist/images"))
	.pipe(browserSync.reload({
		stream:true
	}));
});



// html文件压缩
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
        	stream:true
        }));
});



// 5、浏览器同步操作
gulp.task("servers",function(){
	browserSync({
		server:{
			baseDir:['dist']
		}
	},function(err,bs){
		console.log(bs.options.getIn(["urls","local"]));
	});

// 	// 如果index.html发生改变时，去执行html任务
	gulp.watch("./src/*.html",["html"]);
	gulp.watch("./src/styles/*.less",["styles"]);
	gulp.watch("./src/scripts/*.js",["scripts"]);
});


// 设置一个主任务来执行多个子任务
gulp.task("mainTask",["html","scripts","styles","servers"]);
