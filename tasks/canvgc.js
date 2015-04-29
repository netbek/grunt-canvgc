/*
 * grunt-canvgc
 * https://github.com/netbek/grunt-canvgc
 *
 * Copyright (c) 2015 Hein Bekker
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var Applause = require('applause');

module.exports = function (grunt) {

	grunt.registerMultiTask('canvgc', 'Grunt plugin to convert SVG to CanvasRenderingContext2D commands.', function () {
		var options = this.options({
			prepend: '',
			append: '',
			chunk: 500
		});

		var done = this.async();
		var canvgcPath = path.resolve(__dirname, '..', 'node_modules/canvgc/bin/canvgc');
		var jobs = [];

		this.files.forEach(function (f) {
			var cwd = '';
			var opts = {};

			if (f.cwd) {
				cwd = opts.cwd = f.cwd;
			}

			var destPath = path.resolve(f.dest);
			var files = grunt.file.expand(opts, f.src);

			fs.mkdirSync(destPath);

			files.forEach(function (file) {
				var basename = path.basename(file);
				var extname = path.extname(file);
				var filename = path.basename(file, extname);
				var applause = Applause.create({
					patterns: [{
							json: {
								filename: filename
							}
						}]
				});

				jobs.push({
					src: path.resolve(cwd, file),
					dest: path.resolve(destPath, basename.replace(/\.svg$/i, '.js')),
					prepend: applause.replace(options.prepend) || options.prepend,
					append: applause.replace(options.append) || options.append,
					chunk: options.chunk
				});
			});
		});

		var total = jobs.length;

		function async(job, callback) {
			var args = [
				canvgcPath,
				job.src,
				job.dest
			];

			if (job.prepend) {
				args.push('--prepend');
				args.push(job.prepend);
			}
			if (job.append) {
				args.push('--append');
				args.push(job.append);
			}
			if (job.chunk) {
				args.push('--chunk');
				args.push(job.chunk);
			}

			grunt.util.spawn({
				cmd: 'node',
				args: args
			},
			function (err, result, code) {
				if (err) {
					callback(err);
				}
				else {
					callback(job.dest);
				}
			});
		}

		function final() {
			grunt.log.writeln('Conversion complete (' + total + ' ' + (total === 1 ? 'file' : 'files') + ').');
			done();
		}

		var results = [];

		function series(job) {
			if (job) {
				async(job, function (result) {
					results.push(result);
					return series(jobs.shift());
				});
			}
			else {
				return final();
			}
		}

		series(jobs.shift());
	});

};
