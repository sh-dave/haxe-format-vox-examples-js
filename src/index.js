const VoxReader = require('@sh-dave/format-vox').VoxReader;
const fs = require('fs');

fs.readFile('assets/ephtracy.vox', (err, data) => {
	if (err) throw err;

	var vox = VoxReader.read(data, (vox, err) => {
		if (err) throw err;
	
		console.log(vox);

		// use vox.models to get the meshes
		// use vox.nodeGraph to access to world builder nodes
	});
	
});
