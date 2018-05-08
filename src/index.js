const formatVox = require('@sh-dave/format-vox');
const Reader = formatVox.VoxReader;
const Nodes = formatVox.VoxNodeTools;
const Tools = formatVox.VoxTools;

const fs = require('fs');

let indent = 0;

const ind = ( o = 0 ) => Array(indent + o).join(' ');

const walker = {
	beginGraph: vox => {
	},
	
	endGraph: vox => {
	},

	beginGroup: attributes => {		
		const t = Tools.getTranslationFromDict(attributes, '_t');
		const r = Tools.getRotationFromDict(attributes, '_r');
		console.log(`${ind()}group (translation: ${t.x}/${t.y}/${t.z}; rotation: ${r._00}/${r._10}/${r._20}/${r._01}/${r._11}/${r._21}/${r._02}/${r._12}/${r._22};)`);
		indent += 2;
	},

	endGroup: () => {
		indent -= 2;
		console.log(`${ind()}/group`);
	},

	onTransform: attributes => {
		const t = Tools.getTranslationFromDict(attributes, '_t');
		const r = Tools.getRotationFromDict(attributes, '_r');
		console.log(`${ind()}transform (translation: ${t.x}/${t.y}/${t.z}; rotation: ${r._00}/${r._10}/${r._20}/${r._01}/${r._11}/${r._21}/${r._02}/${r._12}/${r._22};)`);
		indent += 2;
	},

	onShape: (attributes, models) => {
		const t = Tools.getTranslationFromDict(attributes, '_t');
		const r = Tools.getRotationFromDict(attributes, '_r');
		console.log(`${ind()}shape {\n${ind(2)}translation: ${t.x}/${t.y}/${t.z};\n${ind(2)}rotation: ${r._00}/${r._10}/${r._20}/${r._01}/${r._11}/${r._21}/${r._02}/${r._12}/${r._22};`);
		let modelIds = models.map(m => m.modelId);
		console.log(`${ind(2)}models: [${modelIds.join(',')}];`);
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
