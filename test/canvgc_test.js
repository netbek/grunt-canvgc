/*
 * grunt-canvgc
 * https://github.com/netbek/grunt-canvgc
 *
 * Copyright (c) 2015 Hein Bekker
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt');
var fs = require('fs');

exports.canvgc = {
	test1: function (test) {
		fs.stat('test/files/dest/icon-0001-home.js', function (err, stats) {
			test.ok(err === null && stats.isFile(), 'JS "icon-0001-home.js" should exist');
			test.done();
		});
	}
};
