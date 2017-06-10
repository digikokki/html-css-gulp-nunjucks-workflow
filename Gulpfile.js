// For development => gulp
// For production  => gulp -p

// Call Plugins
var env                 = require('minimist')(process.argv.slice(2)),
    gulp                = require('gulp'),
    gutil               = require('gulp-util'),
    plumber             = require('gulp-plumber'),
    nunjucks            = require('gulp-nunjucks-html'),
    minifyHtml          = require('gulp-minify-html'),
    browserSync         = require('browser-sync'),
    uglify              = require('gulp-uglify'),
    concat              = require('gulp-concat'),
    gulpif              = require('gulp-if'),
    cache               = require('gulp-cache'),
    imagemin            = require('gulp-imagemin'),
    sass 		            = require('gulp-sass'),
    cssnano 	          = require('gulp-cssnano'),
    sourcemaps 	        = require('gulp-sourcemaps'),
    autoprefixer        = require('gulp-autoprefixer'),
    customizeBootstrap  = require('gulp-customize-bootstrap'),
    stylus              = require('gulp-stylus'),
    inject              = require('gulp-inject'),
    wiredep             = require('wiredep').stream;
// Var
var supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
];

// Call Nunjucks for compile Templates
gulp.task('nunjucks', function(){
    return gulp.src('src/templates/*.html')
    .pipe(plumber())
    .pipe(nunjucks({
        searchPaths: ['src/templates']
    }))
    .pipe(wiredep({
      ignorePath: 'build/'
    }))
    .pipe(gulpif(env.p, minifyHtml()))
    .pipe(gulp.dest('build/'));
});

// Call inject links to html
gulp.task('inject-links', ['nunjucks'], function(){
  var target = gulp.src('./build/**/*.html');
  target.pipe(inject(gulp.src(['./build/css/*.css','./build/js/*.js'],  {read: false}), {relative: true}))
  .pipe(gulp.dest('build/'));
});

// Call inject to sass
gulp.task('inject-sass', function(){
  var injectAppFiles    = gulp.src('src/sass/bem/**/*.scss', {read: false});

  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false
  };

  var injectVendorFiles = gulp.src('src/sass/vendor/**/*.scss', {read: false});

  var injectVendorOptions = {
    transform: transformFilepath,
    starttag: '// inject:vendor',
    endtag: '// endinject',
    addRootSlash: false
  };

  function transformFilepath(filepath) {
   return '@import "' + filepath + '";';
  }

  return gulp.src('src/sass/main.scss')
    .pipe(wiredep())
    .pipe(inject(injectVendorFiles,injectVendorOptions))
    .pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(gulp.dest('./src/sass'));
});

// Call Uglify and Concat JS
gulp.task('js', function(){
    return gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulpif(env.p, uglify()))
    .pipe(gulp.dest('build/js'));
});

// Call Sass
gulp.task('sass', function(){
    gulp.src(['src/sass/**/*.scss'])
    .pipe(plumber())
    .pipe(sass({
        outputStyle: 'compressed',
		    includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(cssnano({
        autoprefixer: {browsers: supported, add: true}
    }))
    .pipe(gulp.dest('build/css'));
});

// Get one .styl file and render
gulp.task('styl', function () {
  return gulp.src('src/styl/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('build/css'));
});

// Call Imagemin
gulp.task('imagemin', function() {
    return gulp.src('src/img/**/*')
    .pipe(plumber())
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/img'));
});

// Call Watch
gulp.task('watch', function(){
    gulp.watch('src/templates/**/*.html', ['nunjucks', 'inject-links']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
});


gulp.task('browser-sync', function () {
   var files = [
      'build/**/*.html',
      'build/css/**/*.css',
      'build/img/**/*',
      'build/js/**/*.js'
   ];

   browserSync.init(files,{
        server:{
            baseDir: './build',
            index: "index.html"
        }
    })
});

// Default task
gulp.task('default', ['nunjucks', 'inject-links', 'inject-sass', 'sass', 'js', 'inject-sass', 'imagemin', 'watch', 'browser-sync'], function(){
});
