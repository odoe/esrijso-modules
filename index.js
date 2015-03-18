#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var walk = require('walk');
var strip = require('strip-comments');
var program = require('commander');
var pkg = require( path.join(__dirname, 'package.json')  );

program
      .version(pkg.version)
      .option('-s, --src <directory>', 'Source directory with JavaScript files')
      .option('-o, --output <directory>', 'Output directory for module list. (Optional)')
      .parse(process.argv);

var src = program.src; // required
var output = program.output || ''; // optional
if (!src) {
  throw new Error('No source path provided.');
};

function parse(directory) {
  var walker = walk.walk(directory);
  var deps = '';

  walker.on('file', function(root, fileStats, next) {
    if (fileStats.name.indexOf('.js') > -1) {
      process.stdout.write('reading... ' + root + '\\' + fileStats.name + '\n');
      fs.readFile(path.join(root, fileStats.name), 'utf8', function(err, d) {
        if (err) next();
        var _s = strip(d).replace(/(\r\n\s*|'|"|!|\n|\r\s*)/gm,'');
        var i = _s.indexOf('[')+1;
        var j = _s.indexOf(']');
        var s = _s.substring(i,j);
        deps += s + ',';
        next();
      });
    }
    next();
  });

  walker.on('errors', function (root, nodeStatsArray, next) {
    next();
  });

  walker.on('end', function () {
    var sortedList = deps.split(',').filter(function(x) {
      return x.length > 1 && (
          x.indexOf('esri/') > -1 ||
          x.indexOf('dojo/') > -1 ||
          x.indexOf('dijit/') > -1 ||
          x.indexOf('dojox/') > -1 ||
          x.indexOf('put-selector/') > -1 ||
          x.indexOf('util/') > -1 ||
          x.indexOf('dgrid/') > -1
        );
    }).sort();

    var list = sortedList.filter(function(x, i) {
      return sortedList.indexOf(x) === i;
    }).join(',').replace(/\s/gm, '');

    if (output.length > 0) {
      fs.mkdir(output);
    }
    fs.writeFile(path.join(output, 'modules'), list);
  });
}

parse(src);
