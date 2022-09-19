
let project_folder = "dest";
let source_folder = "src";
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/"
    },
    src: {
        html: source_folder + "/*.html",
        css: source_folder + "/css/*.css",
        js: source_folder + "/js/",
        img: source_folder + "/img/**/*.{jpg,JPG,png,svg,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf"
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/css/**/*.css",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,JPG,png,svg,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf"
    },
    clean: "./" + project_folder + "/"

}
let { src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    imagemin = require("gulp-imagemin");





    function browserSync(params) {
        browsersync.init({
            server: {
                baseDir: "./" + project_folder + "/"
            }, 
            port: 3000,
            notify: false 
        })
    }
    function html() {
        return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
    }
    function css() {
        return src(path.src.css)
        // .pipe(fileinclude())
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
    }
    function image() {
        return src(path.src.img)
        pipe(
            imagemin({
                svgoPlugins:[{removeViewBox: false}],
                progressive: true,
                interlaced:true,
                optimizationLevel: 3
            }

            ))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
    }
    function watchFiles(params) {
        gulp.watch([path.watch.html], html);
        gulp.watch([path.watch.css], css);
        gulp.watch([path.watch.img], image );
    }

    let build = gulp.series( gulp.parallel(html, css, image));
    
    let watch = gulp.parallel(build, watchFiles, browserSync);

    exports.html = html;
    exports.css = css;
    exports.image = image;
    exports.watch = watch;
    exports.default = watch;
    exports.build = build;
   
