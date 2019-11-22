function color() {
  return Math.floor(Math.random() * (360 + 1));
}

Blockly.Blocks["takeoff"] = {
  init: function() {
    this.jsonInit({
      "message0": "takeoff",
      "colour": color(),
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
      "colour": color(),
      "tooltip": "Cause the drone to return to the ground.",
      "previousStatement": null,
      "nextStatement": null
    })
  }
}

Blockly.JavaScript["land"] = function(block) {
  return `(cb) => drone.land(cb),\n`;
}

Blockly.Blocks["front"] = {
  init: function() {
    this.jsonInit({
      "message0": `forward at %1 percent speed`,
      "args0": [
        {
          "type": "field_number",
          "name": "SPEED",
          "variable": "SPEED"
        }
      ],
      "colour": color(),
      "tooltip": `Move the drone forward at 0-100% speed.`,
      "previousStatement": null,
      "nextStatement": null
    })
  }
}

Blockly.JavaScript["front"] = function(block) {
  const speed = block.getFieldValue('SPEED');
  return `(cb) => { drone.front(${speed} / 100); cb(); },\n`
}

Blockly.Blocks["back"] = {
  init: function() {
    this.jsonInit({
      "message0": `backward at %1 percent speed`,
      "args0": [
        {
          "type": "field_number",
          "name": "SPEED",
          "variable": "SPEED"
        }
      ],
      "colour": color(),
      "tooltip": `Move the drone backward at 0-100% speed.`,
      "previousStatement": null,
      "nextStatement": null
    })
  }
}

Blockly.JavaScript["back"] = function(block) {
  const speed = block.getFieldValue('SPEED');
  return `(cb) => { drone.back(${speed} / 100); cb(); },\n`
}

Blockly.Blocks["left"] = {
  init: function() {
    this.jsonInit({
      "message0": `left at %1 percent speed`,
      "args0": [
        {
          "type": "field_number",
          "name": "SPEED",
          "variable": "SPEED"
        }
      ],
      "colour": color(),
      "tooltip": `Move the drone left at 0-100% speed.`,
      "previousStatement": null,
      "nextStatement": null
    })
  }
}

Blockly.JavaScript["left"] = function(block) {
  const speed = block.getFieldValue('SPEED');
  return `(cb) => { drone.left(${speed} / 100); cb(); },\n`
}

Blockly.Blocks["right"] = {
  init: function() {
    this.jsonInit({
      "message0": `right at %1 percent speed`,
      "args0": [
        {
          "type": "field_number",
          "name": "SPEED",
          "variable": "SPEED"
        }
      ],
      "colour": color(),
      "tooltip": `Move the drone right at 0-100% speed.`,
      "previousStatement": null,
      "nextStatement": null
    })
  }
}

Blockly.JavaScript["right"] = function(block) {
  const speed = block.getFieldValue('SPEED');
  return `(cb) => { drone.right(${speed} / 100); cb(); },\n`
}

Blockly.Blocks["wait"] = {
  init: function() {
    this.jsonInit({
      "message0": "wait %1 seconds",
      "colour": color(),
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
  return `(cb) => setTimeout(cb, ${time} * 1000),\n`;
}

Blockly.Blocks["print"] = {
  init: function() {
    this.jsonInit({
      "message0": "print %1",
      "colour": color(),
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
