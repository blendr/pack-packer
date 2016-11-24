var path = require('path');
var execSync = require('child_process').execSync;

module.exports = function() {
	// children files does not need to be physically present
	this.virtualChildren = true;
};

module.exports.prototype.pack = function(packId, files, destPath) {
	var allFiles = '';

	for(var id in files) {
		var file = files[id];

		allFiles += ' -i "' + id + ':' + file + '"';
	}

	execSync('cd ' + path.join(__dirname, 'bin') + ' && ./packer.py ' + allFiles + ' -o ' + destPath + ' -f ' + packId, {stdio:[0,1,2]});

	return {
		pack: packId + '.pack',
		json: packId + '.json'
	};
};
