var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	del = require('del'),
	es = require('event-stream'),
	sprity = require('sprity'),
	lib_source = ['./bower_components/fullpage.js/jquery.fullPage.min.js',
				'./bower_components/fullpage.js/jquery.fullPage.css',
				'./bower_components/jquery/jquery.min.js',
				'./bower_components/jquery/jquery.min.map',
				'./bower_components/fontello-9f96e693/fontello.css'],
	font_source = './bower_components/fontello-9f96e693/font/*';


gulp.task('sprite',function(){
	return sprity.src({
    			src: './src/assets/head/*.png',
    			style: './sprite.css',
    			order:false
  			})
			.pipe(gulp.dest('./'));
});
/*
init & dev
*/

gulp.task('default',['server','watch','init_html'],function(){
// gulp.task('default',['server','watch'],function(){
	console.log('initiate successfully');
});


	gulp.task('server',function(){
		plugins.connect.server({
			root:"./",
			livereload:true
		});
	});

	gulp.task('reload_except_less',function(){
		gulp.src(['./src/*','!./src/style.less'])
			.pipe(plugins.connect.reload());
	});
	gulp.task('reload_less', ['less'], function(){
		gulp.src('./src/style.less')
			.pipe(plugins.connect.reload());
	});

	gulp.task('watch',['init_html'],function(){
	// gulp.task('watch',function(){
		gulp.watch('./src/*.less',['less','reload_less']);
		gulp.watch(['./src/*','!./src/*.less'],['reload_except_less']);
	});

	gulp.task('clean:lib',function(){
		del.sync(['./lib/*']);
	});

	gulp.task('init_lib',['clean:lib'],function(){
		return	es.concat(
					gulp.src(lib_source)
						.pipe(gulp.dest('./lib')),
					gulp.src(font_source)
						.pipe(gulp.dest('./lib/font'))
				);
	});

	gulp.task('init_html',['init_lib','less'],function(){
		var jq = gulp.src('./lib/jquery.min.js',{read:false});
		var src = gulp.src(['./bin/*.css','./lib/**/*','./src/*.js','!./lib/jquery.min.js'],{read:false});
		// var no_fp_src = gulp.src(['./bin/*.css','./lib/*.css'],{read:false});
		return	es.concat(
					gulp.src(['./src/*.html','!./src/index.html'])
						.pipe(
							plugins.inject(jq,{'relative':true,name:'dev-jq'})
						)
						.pipe(
							// plugins.inject(no_fp_src,{'relative':true,name:'dev'})
							plugins.inject(src,{'relative':true,name:'dev'})
						).pipe(gulp.dest('./src')),

					gulp.src('./src/index.html')
						.pipe(
							plugins.inject(jq,{'relative':true,name:'dev-jq'})
						)
						.pipe(
							plugins.inject(src,{'relative':true,name:'dev'})
						)
						.pipe(gulp.dest('./src'))
				)
				.pipe(plugins.connect.reload());
	});

	gulp.task('less',function(){
		return	es.concat(
					gulp.src('./src/style.less')
						.pipe(plugins.less(
						//{ paths:['../lib/']}
						))
						.pipe(gulp.dest('./bin')),
					gulp.src('./src/style.less')
						.pipe(plugins.rename({suffix:'_2_release'}))
						.pipe(gulp.dest('./bin')),
					gulp.src('./src/responsive.less')
						.pipe(gulp.dest('./bin'))
				);
	});

/*
Release
*/
gulp.task('release',['clean:dist','rl_html'],function(){
	console.log('wrap success');
});

	gulp.task('clean:dist',function(){
		del.sync('./dist/**/*');
		// var a = del.sync('./dist/**/*');
		// console.log(a);
	});

	gulp.task('rl_css',['rl_pic'],function(){
		return	gulp.src('./bin/style_2_release.less')/*for change of url*/
					.pipe(plugins.less())
					.pipe(plugins.minifyCss())
					.pipe(plugins.hashFilename({format:"{hash}{ext}"}))
					// .pipe(plugins.rename({suffix:'-min'}))
					.pipe(gulp.dest('./dist/css'));

	});

	gulp.task('rl_js',function(){
		return	gulp.src('./src/*.js')
					.pipe(plugins.sourcemaps.init())
						.pipe(plugins.uglify())
						.pipe(plugins.hashFilename({format:"{hash}{ext}"}))
						// .pipe(plugins.rename({suffix:'-min'}))
					.pipe(plugins.sourcemaps.write('./'))
					.pipe(gulp.dest('./dist/js'));
	});
	gulp.task('rl_lib',function(){
		return	es.concat(
					gulp.src('./lib/font/*')
						.pipe(gulp.dest('./dist/lib/font')),
					gulp.src(['./lib/*','!./lib/font'])
						.pipe(gulp.dest('./dist/lib'))
				);
	});

	gulp.task('rl_pic',function(){
		return	gulp.src(['./src/assets/*/**','./src/assets/*'])
					.pipe(
						plugins.imagemin({progressive:true})
					)
					.pipe(gulp.dest('./dist/assets'));
	});

	gulp.task('copy:html',function(){
		return	gulp.src('./src/*.html')
						.pipe(gulp.dest('./dist'));
	});

	gulp.task('clean:html',['copy:html'],function(){
		return gulp.src('./dist/*.html')
				.pipe(plugins.deleteLines({
					'filters': [
						/<script(.*?)><\/script>/i,
						/<link(.*?)rel=['"]stylesheet['"](.*?)>/i
					]
				}))
				.pipe(gulp.dest('./dist'));
	});

	gulp.task('rl_html',['rl_css','rl_js','rl_lib','rl_pic','clean:dist','copy:html','clean:html'],function(){
		var lib =  gulp.src(
					['./dist/lib/jquery.min.js',
					'./dist/lib/jquery.fullPage.min.js',
					'./dist/lib/*.css'],
					{read:false}
					);
		var other_src = gulp.src(
								['./dist/**/*.css',
								'./dist/**/*.js',
								'!./dist/lib/jquery.min.js',
								'!./dist/lib/jquery.fullPage.min.js',
								'!./dist/lib/*.css'],
								{read:false}
							);
		// var other_html_src = gulp.src(
		// 						['!./dist/lib/jquery.min.js',
		// 						'./dist/**/*.css',
		// 						'./dist/**/*.js',
		// 						'!./dist/lib/jquery.fullPage.css'],
		// 						{read:false}
		// 					);
		// return	es.concat(
			return	gulp.src('./dist/*.html')
						.pipe(plugins.inject(lib,{relative:true,name:'release-lib'}))
						.pipe(plugins.inject(other_src,{relative:true,name:'release'}))
						.pipe(gulp.dest('./dist'));
					// gulp.src(['./dist/*.html','!./dist/index.html'])
					// 	.pipe(plugins.inject(other_html_src,{relative:true,name:'release'}))
					// 	.pipe(gulp.dest('./dist'))
				// );
	});
