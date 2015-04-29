# grunt-canvgc [![Build Status](https://secure.travis-ci.org/netbek/grunt-canvgc.png?branch=master)](http://travis-ci.org/netbek/grunt-canvgc)

Grunt plugin to convert SVG to CanvasRenderingContext2D commands.

## Getting Started
This plugin requires [Grunt](http://gruntjs.com/) `~0.4.5`

```javascript
// Gruntfile.js configuration
grunt.loadNpmTasks('grunt-canvgc');

grunt.initConfig({
	canvgc: {
		all: {
			options: {
				// String to prepend to JS output. Supports text pattern replacement (see below).
				prepend: "window.App.library.bitmap['@@filename'] = ",
				// String to append to JS output. Supports text pattern replacement (see below).
				append: ";",
				// Break into blocks of code to prevent event loop starvation when rendering large files.
				chunk: 500
			},
			// Specify files in array format with multiple src-dest mapping
			files: [{cwd: 'test/files/src/', src: ['*.svg'], dest: 'test/files/dest/'}]
		}
	}
});
```

### Text pattern replacements

* filename: basename without extension

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.1.0 First release

## Credits
* Test icons by [IcoMoon](https://icomoon.io) (CC BY 4.0 or GPL)

## License
Copyright (c) 2015 Hein Bekker. Licensed under the MIT license.
