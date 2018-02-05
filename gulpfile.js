var gulp=require('gulp');
var sass=require('gulp-sass');
gulp.task('compileSass',function(){
    gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle:'expanded'}))  
    .pipe(gulp.dest('./src/css/'))
});
// 监听compileSass文件
// 创建文件监听任务：文件有修改，则自动编译
gulp.task('jtSass',function(){
    // 当文件有修改，则执行complieSass任务
    gulp.watch('./src/sass/*.scss',['compileSass'])
});


// 自动刷新页面
var browserSync = require('browser-sync');
gulp.task('server',function(){
    // 启动一个自动刷新的服务器
    browserSync({
        //创建一个静态服务器
        // server:'./src',

        // 指定端口
        port:2121,

        // 代理服务器
        // 用browserSync代理php服务器
        //  * 识别php
        //  * 自动刷新
        proxy:'http://localhost:2121',

        // 监听文件修改
        files:['./src/**/*.html','./src/css/*.css','./src/api/*.php','./src/js/*.js','src/*.html']
    });

    // 监听sass修改
    gulp.watch('./src/sass/*.scss',['compileSass']);
});