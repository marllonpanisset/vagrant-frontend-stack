// generated on 2017-03-29 using generator-webapp 2.4.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();
$.spritesmith = require('gulp.spritesmith');
const reload = browserSync.reload;

var dev = true;

gulp.task('sprite', () => {
  var data = gulp.src('app/images/icons/*.*')
    .pipe($.spritesmith({
      /* this whole image path is used in css background declarations */
      imgName: '../images/icons/sprite.png',
      cssName: '_sprite.scss'
    }));
  data.img.pipe(gulp.dest('.tmp/images'));
  data.css.pipe(gulp.dest('app/styles/components'));
});

gulp.task('sprite:build', () => {
  var data = gulp.src('.tmp/images/icons/sprite.png')
    .pipe(gulp.dest('dist/images/icons/'));
});

gulp.task('views', () => {
  gulp.src('app/views/*.pug')
    .pipe($.pug({
      pretty: true
    }))
    .pipe($.plumber())
    .pipe(gulp.dest('.tmp/'))
    .pipe($.size({title: 'jade'}))
    .pipe(reload({stream: true}));
});

gulp.task('styles', () => {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.concat('main.min.js'))
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(dev, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

function lint(files) {
  return gulp.src(files)
    .pipe($.eslint({fix: true}))
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js')
    .pipe(gulp.dest('app/scripts'));
});

gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts', 'views'], () => {
  return gulp.src('.tmp/*.html')
    .pipe($.useref({searchPath: ['.tmp', '.']}))
    .pipe($.if(/\.js$/, $.uglify({compress: {drop_console: true}})))
    .pipe($.if(/\.css$/, $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if(/\.html$/, $.htmlmin({
      collapseWhitespace: false,
      minifyCSS: true,
      minifyJS: {compress: {drop_console: true}},
      processConditionalComments: false,
      removeComments: false,
      removeEmptyAttributes: false,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false
    })))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', ['font-awesome'], () => {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('font-awesome', () => {
  return gulp.src('bower_components/Font-Awesome/fonts/**/*')
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/views',
    '!app/includes'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
  runSequence(['clean'], ['sprite','views', 'wiredep'], ['styles', 'scripts', 'fonts'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/bower_components': 'bower_components'
        }
      }
    });

    gulp.watch([
      '.tmp/images/**/*',
      '.tmp/fonts/**/*'
    ]).on('change', reload);


    gulp.watch(['app/images/icons/**/*'], ['sprite']);
    gulp.watch('app/views/**/*.pug', ['views']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
  });
});

gulp.task('serve:dist', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/**/*.scss')
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('.tmp/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('build', () => {
  runSequence(['sprite','views', 'wiredep'], ['lint', 'html', 'images', 'fonts', 'extras'],  () => {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: false}));
  });
});

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean'], 'build', resolve);
  });
});
