var browserify = require('browserify');
var plugin = require('./');
var test = require('tape');


test('specification test', function (t) {
    t.plan(2);
    
    t.equal(typeof plugin, "function", 'plugin should be a function');
    
    var bundle = browserify({entries: './index.js'}).plugin(plugin).bundle();
    t.equal(typeof bundle, "object", 'bundle should be an object');
});