const tmp = require('tmp');
const fs = require('fs');
const { spawn } = require('child_process');
const outputElement = document.getElementById('output');
const terminalElement = document.getElementById('terminal');
const path = require('path')

function handleError(msg) {
  const content = outputElement.innerText.split('\n');
  content.push(msg.stack);
  outputElement.innerText = content.join('\n');
  terminal_end();
}

function terminal_start() {
  const content = outputElement.innerText.split('\n');
  content.pop(); // get rid of existing ~
  content.push("~ node index.js");
  content.push("");
  outputElement.innerText = content.join('\n');
  terminalElement.scrollTop = terminal.scrollHeight;
}

function terminal_append(data) {
  outputElement.innerText += data;
  terminalElement.scrollTop = terminal.scrollHeight;
}

function terminal_end() {
  const content = outputElement.innerText.split('\n');
  content.push('~');
  outputElement.innerText = content.join('\n');
  terminalElement.scrollTop = terminal.scrollHeight;
}


let running = false;
let child;
window.runNode = function runNode() {
  if(running) return undefined;
  running = true;
  const code = window.editor.session.getValue();
  terminal_start();
  tmp.file((err, file) => {
    if(err) return handleError(err);
    fs.writeFile(file, code, err => {
      if(err) return handleError(err);
      child = spawn('node', [ file ], { env: {
        ...process.env,
        NODE_PATH: path.join(__dirname, 'node_modules')
      }})
      let doneCalled = false;
      function done() {
        if(doneCalled) return undefined;
        doneCalled = true;
        running = false;
        child = undefined;
      }
      child.on('exit', () => {
        terminal_end();
        done();
      });
      child.on('error', (err) => {
        handleError(err);
        done();
      });
      child.stdout.on('data', terminal_append);
      child.stderr.on('data', terminal_append);
    });
  })
}

window.killNode = function killNode() {
  if(!child) return undefined;
  child.kill();
  handleError(new Error('Program terminated'));
  child.removeAllListeners('exit').removeAllListeners('error');
  child = undefined;
  running = false;
}
