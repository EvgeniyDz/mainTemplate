'use strict';

// Если нужно установить плагины - пробуем установить их с помощью одной стороки которая написана ниже (надеюсь у вас сработает !!!!).
// npm install gulp gulp-sass gulp-rename gulp-minify-css browser-sync gulp-imagemin gulp-watch gulp-wait gulp-pug gulp-util gulp-autoprefixer del gulp-uglify --save-dev 

// test
//Init Plugins
const { src, dest, parallel, watch }  	= require('gulp'), //npm install --global gulp-cli   ,  npm install --save-dev gulp
                sass 			= require('gulp-sass'), // npm install gulp-sass --save-dev
                cssbeautify 	= require('gulp-cssbeautify'), // npm install --save-dev gulp-cssbeautify
                rename 			= require('gulp-rename'), // npm install --save-dev  gulp-rename
                minifyCSS 		= require('gulp-minify-css'), // npm install --save-dev  gulp-minify-css
                browserSync 	= require('browser-sync'), // npm install browser-sync --save-dev                
                wait 			= require('gulp-wait'), // npm install --save-dev gulp-wait
                pug 			= require('gulp-pug'), // npm install --save-dev gulp-pug
                prettify 		= require('gulp-prettify'), // npm install --save-dev gulp-prettify
                cached 			= require('gulp-cached'), // npm install gulp-cached --save-dev
                gutil 			= require('gulp-util'), // npm install --save-dev gulp-util
                autoprefixer 	= require('gulp-autoprefixer'), // npm install --save-dev gulp-autoprefixer
                del 			= require('del'), // npm install --save-dev del	
                plumber 		= require('gulp-plumber'), // npm install --save-dev gulp-plumber
                zip             = require('gulp-zip'), // npm install --save-dev gulp-zip
                imagemin        = require('gulp-imagemin'), // npm install --save-dev gulp-zip
                htmlreplace     = require('gulp-html-replace'),
                uglify 			= require('gulp-uglify'); // npm install --save-dev gulp-uglify
    

const path = {

	//Тут мы укажем куда складывать готовые после сборки файлы
	build: {
		buildPath: 'build/**/*',
		htmlPath: 'build/',
        jsPath: 'build/js/',
        jsMinPath: 'build/js/min/',
        pluginsPath: 'build/plugins/',
        cssPath: 'build/css/',
        minCssPath: 'build/css/min/',
        scssPath: 'build/scss/',
        imagesPath: 'build/images/',
        fontsPath: 'build/fonts/',
	},

	src: {
		srcPath: 'app',
		htmlPath: 'app/*.html', 
		allPug: 'app/pug/**/*.pug',
		pugPath: 'app/pug/*.pug', 
        allJsPath: 'app/js/**/*.js',
        pluginsPath: 'app/plugins/**/*.*',
        scssPath: 'app/scss/**/*.scss',
        cssPath: 'app/css/**/*.css',
        cssGlobalPath: 'app/css',
        imagesPath: 'app/images/**/*.*',
        fontsPath: 'app/fonts/**/*.*',
        // jsMinPath: 'app/js/min/',
        // minCssPath: 'app/css/min/',
        jsPath: [
        	'app/js/**/*.js',
        	'!app/js/**/*min.js'
        ]
	}

};


//<!--  Pug Task        ============================================ -->
    function html(){
        return src(path.src.pugPath)
        //.pipe(plumber({
        //  errorHandler: onError
        //}))
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(prettify({
            indent_size: 4
        }))
        .pipe(cached('pug'))
        .pipe(dest(path.src.srcPath))
        .pipe(browserSync.reload({stream: true}))
        .on('end', function(){ gutil.log(' - - - - - - - - - - - - - Pug converted to HTML Succesfully! - - - - - - - - - - - - - '); })
        .on('error', gutil.log);
    }
    exports.html = html;    

//<!--  SCss Task        ============================================ -->
	function scss() {
		return src(path.src.scssPath)
		.pipe(plumber(function(error) {
			gutil.log(gutil.colors.red(error.message));
			this.emit('end');
		}))
		.pipe(wait(500))
		.pipe(sass().on('error', sass.logError))
		.pipe(cached('scss'))
		.pipe(cssbeautify({
            indent: '  ',
            openbrace: 'end-of-line',
            autosemicolon: true
        }))
		.pipe(dest(path.src.cssGlobalPath))
		.pipe(browserSync.reload({stream: true}))
		.on('end', function(){ gutil.log(' - - - - - - - - - - - - - Styles Complete! - - - - - - - - - - - - - '); })
		.on('error', gutil.log);
	};
    exports.scss = scss; 

//<!--  Js Task        ============================================ -->
	function js() {
		return src(path.src.jsPath) 
		.pipe(plumber(function(error) {
			gutil.log(gutil.colors.red(error.message));
			this.emit('end');
		}))
		//.pipe(dest(path.src.jsPath)) 
		.pipe(browserSync.reload({stream: true}))
		.on('end', function(){ gutil.log(' - - - - - - - - - - - - - Js Complete! - - - - - - - - - - - - - '); })
		.on('error', gutil.log);
    };
    exports.js = js; 

//<!--  Plugins Task        ============================================ -->
	function plugins() {
		return src(path.src.pluginsPath)
		.pipe(plumber(function(error) {
			gutil.log(gutil.colors.red(error.message));
			this.emit('end');
		}))
		//.pipe(dest(path.src.pluginsPath))
		.pipe(browserSync.reload({stream: true}))
		.on('end', function(){ gutil.log(' - - - - - - - - - - - - - Plugins Complete! - - - - - - - - - - - - - '); })
		.on('error', gutil.log);
	};
    exports.plugins = plugins; 

//<!--  BrowserSync server Task        ============================================ -->
	function reload() { // Создаем таск browser-sync
	    browserSync({ // Выполняем browser Sync
	        server: { // Определяем параметры сервера
	            baseDir: 'app' // Директория для сервера - app
	        },
	        notify: false // Отключаем уведомления
	    });
    };
    exports.reload = reload; 


//<!--  Delete build folder        ============================================ -->
	function clean(){
		return del.sync('build');
	};
    exports.clean = clean;

//<!--  Default Watch Task        ============================================ -->

    watch([path.src.scssPath], scss); 

    watch([path.src.allPug], html);		

    watch([path.src.allJsPath], js); 

    watch([path.src.pluginsPath], plugins);


    exports.default = parallel(html, scss, js, reload);

//<!--  Build Task        ============================================ -->
    // Когда проект полностью готов - вызываем таск ( gulp build ) - он создает папку build и заливает готовый проект внутрь папки. 

    // Html build
    function htmlBuild() {  
        return src(path.src.htmlPath)
        .pipe(htmlreplace({
            'cssStyle': {
                src: './css/min/style.min.css',
                tpl: '<link rel="stylesheet" media="screen" href="%s"></link>'
            },
            'cssRes': {
                src: './css/min/responsive.min.css',
                tpl: '<link rel="stylesheet" media="screen" href="%s"></link>'
            },
            jsInit: {
                src: './js/min/script.init.min.js',
                tpl: '<script src="%s"></script>'
            },
            jsCore: {
                src: './js/min/script.core.min.js',
                tpl: '<script src="%s"></script>'
            }
        }))  
        .pipe(dest(path.build.htmlPath));
    };
    exports.htmlBuild = htmlBuild;

    // Js build
    function jsBuild() {
        return src(path.src.allJsPath) 
        .pipe(dest(path.build.jsPath));
    };
    exports.jsBuild = jsBuild;

    // MinJs build
    function minjsBuild() {
        return src(path.src.jsPath)
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
        .pipe(dest(path.build.jsMinPath));
    };
    exports.minjsBuild = minjsBuild;

    // Plugins build
    function pluginsBuild() {
        return src(path.src.pluginsPath) 
        .pipe(dest(path.build.pluginsPath)); 
    };
    exports.pluginsBuild = pluginsBuild;

    // Fonts build
    function fontsBuild() {
        return src(path.src.fontsPath)
        .pipe(dest(path.build.fontsPath));
    };
    exports.fontsBuild = fontsBuild;

    // // Scss build
    // function scssBuild() {
    //     return src(path.src.scssPath) 
    //     .pipe(dest(path.build.scssPath)); 
    // };
    // exports.scssBuild = scssBuild;

    // Css build
    function cssBuild() {
        return src(path.src.cssPath) 
        .pipe(autoprefixer({
            //browsers: ['last 15 versions','> 1%', 'ie 8', 'ie 7'],
            //cascade: true
            browsers: ['last 16 versions'], // 'last 2 versions'
            cascade: true // false
        }))
        .pipe(dest(path.build.cssPath)) 
        .pipe(minifyCSS('style.css'))
        .pipe(rename({suffix: '.min'}))        
        .pipe(dest(path.build.minCssPath));
    };
    exports.cssBuild = cssBuild;

    // Image min
    function imgMin(){
        return src(path.src.imagesPath)
        .pipe(imagemin())
        .pipe(dest(path.build.imagesPath));
    };
    exports.imgMin = imgMin;
 
    exports.build = parallel(clean, htmlBuild, jsBuild, minjsBuild, pluginsBuild, fontsBuild, cssBuild, imgMin);


//<!--  ZIP Task        ============================================ -->
// Если проект нужно заархивировать - в консоли прописываем таск ( gulp zip ) - он берет нашу готовую папку production и архивирует ее.
function ziping() {
    return src('build/**')
    .pipe(zip('build.zip'))
    .pipe(dest('build zip file'))
};
exports.ziping = ziping;