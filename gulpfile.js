var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var gulp     = require('gulp');

// Check for --production flag
var isProduction = !!(argv.production);

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// File paths to various assets are defined here.
var PATHS = {
  sass: [
    'bower_components/foundation-sites/scss',
    //'bower_components/motion-ui/src/'
  ],
  javascript: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/what-input/what-input.js',
    'bower_components/foundation-sites/js/foundation.core.js',
    'bower_components/foundation-sites/js/foundation.util.*.js',
    // Paths to individual JS components defined below
    'bower_components/foundation-sites/js/foundation.abide.js',
    // 'bower_components/foundation-sites/js/foundation.accordion.js',
    // 'bower_components/foundation-sites/js/foundation.accordionMenu.js',
    // 'bower_components/foundation-sites/js/foundation.drilldown.js',
    // 'bower_components/foundation-sites/js/foundation.dropdown.js',
    // 'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
    'bower_components/foundation-sites/js/foundation.equalizer.js',
    // 'bower_components/foundation-sites/js/foundation.interchange.js',
    // 'bower_components/foundation-sites/js/foundation.magellan.js',
    // 'bower_components/foundation-sites/js/foundation.offcanvas.js',
    // 'bower_components/foundation-sites/js/foundation.orbit.js',
    // 'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
    // 'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
    'bower_components/foundation-sites/js/foundation.reveal.js',
    // 'bower_components/foundation-sites/js/foundation.slider.js',
    // 'bower_components/foundation-sites/js/foundation.sticky.js',
    // 'bower_components/foundation-sites/js/foundation.tabs.js',
    // 'bower_components/foundation-sites/js/foundation.toggler.js',
    // 'bower_components/foundation-sites/js/foundation.tooltip.js',
    'js/!(app.js)**/*.js',
    'js/app.js'
  ]
};

gulp.task('sass', function() {
  var uncss = $.if(isProduction, $.uncss({
    html: ['src/**/*.html'],
    ignore: [
      new RegExp('.foundation-mq'),
      new RegExp('^\.is-.*'),
      new RegExp('#typeform-overlay'),
      new RegExp('.typeform-open #typeform-overlay')
    ]
  }));

  var minifycss = $.if(isProduction, $.minifyCss());

  return gulp.src('scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(uncss)
    .pipe(minifycss)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('css'));
});

// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe(uglify)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('js'));
});

gulp.task('default', ['sass', 'javascript'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/**/*.js', '!js/**/app.min.js'], ['javascript']);
});
