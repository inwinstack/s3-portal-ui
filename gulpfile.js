var gulp = require('gulp');
var rename = require('gulp-rename');
var template = require('gulp-template');
var args = require('yargs').argv;

gulp.task('make', () => {
  const name = args.name;
  const upCaseName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  const destPath = `${__dirname}/src/components/${args.path}`;
  const route = !! args.route;

  return gulp
    .src(`${__dirname}/scaffold/component/**/*.**`)
    .pipe(template({
      upCaseName,
      name,
      route,
    }))
    .pipe(rename(filePath => {
      filePath.basename = filePath.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});
