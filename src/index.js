const formatVox = require('@sh-dave/format-vox');
const Reader = formatVox.VoxReader;
const Nodes = formatVox.VoxNodeTools;
const Tools = formatVox.VoxTools;

const fs = require('fs');

let indent = 0;

const ind = ( o = 0 ) => Array(indent + o).join(' ');

const dictData = ( dict ) => {
	let result = '';

	if (Tools.dictHasTranslation(dict)) {
		const t = Tools.getTranslationFromDict(dict);
		result += ` translation: ${t.x}/${t.y}/${t.z}; `;
	}

	if (Tools.dictHasRotation(dict)) {
		const r = Tools.getRotationFromDict(dict);
		result += ` rotation: ${r._00}/${r._10}/${r._20}/${r._01}/${r._11}/${r._21}/${r._02}/${r._12}/${r._22}; `;
	}
		
	return result.length > 0 ? `(${result}) ` : result;
}

const walker = {
	beginGraph: vox => {
	},
	
	endGraph: vox => {
	},

	// can have a Group or Shape as child
	onTransform: attributes => {
		console.log(`${ind()}transform ${dictData(attributes)}`);
		indent += 2;
	},

	beginGroup: attributes => {		
		console.log(`${ind()}group ${dictData(attributes)}`);
		indent += 2;
	},

	endGroup: () => {
		indent -= 2;
		console.log(`${ind()}/group`);
	},

	onShape: (attributes, models) => {
		console.log(`${ind()}shape ${dictData(attributes)} {`);
		console.log(`${ind(2)}models: [${models.map(m => m.modelId).join(',')}];`);
		console.log(`${ind()}}`);
		indent -= 2;
	}
}

fs.readFile('assets/hfv-logo.vox', (err, data) => {
	if (err) throw err;

	var vox = Reader.read(data, (vox, err) => {
		if (err) throw err;
	
		// console.log(vox.sizes);
		// console.log(vox.models);
		// console.log(vox.materials);
		// console.log(vox.nodeGraph);

		Nodes.walkNodeGraph(vox, walker);
	});	
});
