const blocklySpace = document.getElementById('blocklySpace');
const blocklyUI = document.getElementById('blocklyUI');
const editorElement = document.getElementById('editor');
const workspace = Blockly.inject(blocklyUI,{
  toolbox: document.getElementById('toolbox'),
  zoom: {
    controls: true,
    wheel: true
  }
});

function onresize(e) {
  // Compute the absolute coordinates and dimensions of blocklySpace.
  let element = blocklySpace;
  let x = 0;
  let y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyUI over blocklySpace.
  blocklyUI.style.left = x + 'px';
  blocklyUI.style.top = y + 'px';
  blocklyUI.style.width = blocklySpace.offsetWidth + 'px';
  blocklyUI.style.height = blocklySpace.offsetHeight + 'px';
  Blockly.svgResize(workspace);
  // Hack to keep the editor from spazzing out when the terminal output gets
  // really long
  editorElement.style.height = 0;
  editorElement.style.height = blocklySpace.clientHeight;
};

window.addEventListener('resize', onresize, false);
onresize();

function updateCode() {
  const preamble = [
    `const drone = require('ar-drone').createClient();`,
    `const { series } = require('async');`,
    '',
    '',
    'series(['
  ].join('\n');
  const postamble = [
    `], function cb(e) {`,
    `  if(e) throw e;`,
    `  process.exit(0);`,
    `})`
  ].join('\n')

  let content = preamble;
  content += '\n';
  content += Blockly.JavaScript.workspaceToCode(workspace)
    .split('\n')
    .map(v => `  ${v}`)
    .join('\n').slice(0,-2);
  content += postamble;
  window.editor.session.setValue(content);
}
workspace.addChangeListener(updateCode);
updateCode();
