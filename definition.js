Blockly.Blocks['read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("cập nhập thời gian");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['day'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("đọc giá trị")
        .appendField(new Blockly.FieldDropdown([["năm","0"], ["tháng","1"], ["ngày","2"], ["giờ","3"], ["phút","4"]]), "get_time");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python.addReservedWords('ntptime');
Blockly.Python.addReservedWords('time');

Blockly.Python['read'] = function(block) {
  Blockly.Python.definitions_['import_ntptime'] = 'import ntptime ';
  Blockly.Python.definitions_['import_time'] = 'import time ';
  // TODO: Assemble Python into code variable.
  var code = 'ntptime.settime()\n' +
  'data = time.localtime()\n';
  return code;
};

Blockly.Python['day'] = function(block) {
  var dropdown_get_time = block.getFieldValue('get_time');
  // TODO: Assemble Python into code variable.
  var code = 'data[' + dropdown_get_time + ']';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
