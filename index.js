var fs = require('fs');
var path = require('path');
var walk = require('walk');
var userArgs = process.argv.slice(2);
var src = userArgs[0]; // required
var output = userArgs[1] || ""; // optional
if (!src) {
  throw new Error("No source path provided.");
};
var walker = walk.walk(src);
  
var deps = "";

walker.on('file', function(root, fileStats, next) {
  process.stdout.write("reading... " + root + "\\" + fileStats.name + "\n");
  fs.readFile(path.join(root, fileStats.name), 'utf8', function(err, d) {
    if (err) next();
    var _s = d.replace(/(\r\n\s*|\n|\r\s*)/gm,"").replace(/'|"/gm, "").replace(/!/gm, "");
    var i = _s.indexOf("[")+1;
    var j = _s.indexOf("]");
    var s = _s.substring(i,j);
    deps += s + ",";
    next();
  });
});

walker.on('errors', function (root, nodeStatsArray, next) {
  next();
});

walker.on('end', function () {
  var sortedList = deps.split(",").filter(function(x) {
    return x.length > 1 && (
        x.indexOf("esri/") > -1 || 
        x.indexOf("dojo/") > -1 ||
        x.indexOf("dijit/") > -1 ||
        x.indexOf("dojox/") > -1 ||
        x.indexOf("put-selector/") > -1 ||
        x.indexOf("util/") > -1 ||
        x.indexOf("dgrid/") > -1
      );
  }).sort();
  
  var list = sortedList.filter(function(x, i) {
    return sortedList.indexOf(x) === i;
  }).join(",");
  
  if (output.length > 0) {
    fs.mkdir(output);
  }
  fs.writeFile(path.join(output, "modules"), list);
});
