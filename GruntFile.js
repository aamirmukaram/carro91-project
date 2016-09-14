module.exports = function(grunt) {
	var gtx = require('gruntfile-gtx').wrap(grunt);

    gtx.loadAuto();

    var gruntConfig = require('./grunt');
    gruntConfig.package = require('./package.json');

    gtx.config(gruntConfig);

    // We need our bower components in order to develop
	gtx.alias('build:layout1', ['compass:layout1', 'clean:layout1', 'copy:layout1', 'string-replace:layout1', 'concat:layout1', 'cssmin:layout1', 'uglify:layout1']);


    gtx.finalise();
};
