Blockly.Blocks["takeoff"] = {
  init: function() {
    this.jsonInit({
      "message0": "takeoff",
      "colour": 160,
      "tooltip": "Cause the drone to leave the ground.",
      "previousStatement": null,
      "nextStatement": null
    })
  }
}

Blockly.JavaScript["takeoff"] = function(block) {
  return `(cb) => drone.takeoff(cb),\n`;
}

Blockly.Blocks["land"] = {
  init: function() {
    this.jsonInit({
      "message0": "land",
      "colour": 160,
      "tooltip": "Cause the drone to return to the ground.",
      "previousStatement": null,
      "nextStatement": null
    })
  }
}

Blockly.JavaScript["land"] = function(block) {
  return `(cb) => drone.land(cb),\n`;
}

Blockly.Blocks["wait"] = {
  init: function() {
    this.jsonInit({
      "message0": "wait %1 seconds",
      "colour": 160,
      "tooltip": "Wait N seconds before calling the next statement.",
      "args0": [
        {
          "type": "field_number",
          "name": "DURATION",
          "variable": "DURATION"
        }
      ],
      "previousStatement": null,
      "nextStatement": null
    })
  }
}

Blockly.JavaScript["wait"] = function(block) {
  const time = block.getFieldValue('DURATION');
  return `(cb) => setTimeout(${time} * 1000,cb),\n`;
}

Blockly.Blocks["print"] = {
  init: function() {
    this.jsonInit({
      "message0": "print %1",
      "colour": 160,
      "tooltip": "Write message out to terminal.",
      "args0": [
        {
          "type": "field_input",
          "name": "MESSAGE",
          "variable": "MESSAGE"
        }
      ],
      "previousStatement": null,
      "nextStatement": null
    })
  }
}

Blockly.JavaScript["print"] = function(block) {
  const message = block.getFieldValue('MESSAGE');
  return `(cb) => { console.log('${message}'); cb(); },\n`;
}
