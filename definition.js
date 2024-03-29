Blockly.Blocks["yolobit_ntp_connect_wifi"] = {
  init: function () {
    this.jsonInit({
      colour: "#fbc041",
      nextStatement: null,
      tooltip: "Kết nối vào mạng WiFi",
      message0: "kết nối WiFi %1 %2 mật khẩu %3 %4",
      previousStatement: null,
      args0: [
        { type: "input_dummy" },
        { type: "input_value", name: "WIFI", check: "String" },
        { type: "input_dummy" },
        { type: "input_value", name: "PASSWORD", check: "String" },
      ],
      helpUrl: "",
    });
  },
};

Blockly.Blocks['set_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("cập nhập thời gian với múi giờ")
        .appendField(new Blockly.FieldDropdown([["GMT+7","+7"], ["GMT+8","+8"], ["GMT+9","+9"], ["GMT+10","+10"], ["GMT+11","+11"], ["GMT+12","+12"], ["GMT-11","-11"], ["GMT-10","-10"], ["GMT-9","-9"], ["GMT-8","-8"], ["GMT-7","-7"], ["GMT-6","-6"], ["GMT-5","-5"], ["GMT-4","-4"], ["GMT-3","-3"], ["GMT-2","-2"], ["GMT-1","-1"], ["GMT+0","+0"], ["GMT+1","+1"], ["GMT+2","+2"], ["GMT+3","+3"], ["GMT+4","+4"], ["GMT+5","+5"], ["GMT+6","6"]]), "GMT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#fbc041");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['get_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("đọc giá trị")
        .appendField(new Blockly.FieldDropdown([["năm","0"], ["tháng","1"], ["ngày","2"], ["giờ","4"], ["phút","5"], ["giây","6"]]), "get_time");
    this.setOutput(true, null);
    this.setColour("#fbc041");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python.addReservedWords('ntptime');
Blockly.Python.addReservedWords('time');
Blockly.Python.addReservedWords('machine');

// Any imports need to be reserved words
Blockly.Python.addReservedWords('wifi');

Blockly.Python['yolobit_ntp_connect_wifi'] = function(block) {
  Blockly.Python.definitions_['import_wifi'] = 'from wifi import __wifi__';
  var value_wifi = Blockly.Python.valueToCode(block, 'WIFI', Blockly.Python.ORDER_ATOMIC);
  var value_password = Blockly.Python.valueToCode(block, 'PASSWORD', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '__wifi__.connect_wifi(' + value_wifi + ', ' + value_password + ')\n';
  return code;
};

Blockly.Python['set_time'] = function(block) {
  Blockly.Python.definitions_['import_RTC'] = 'from machine import RTC';
  Blockly.Python.definitions_['import_ntptime'] = 'import ntptime ';
  Blockly.Python.definitions_['import_time'] = 'import time ';
  var dropdown_gmt = block.getFieldValue('GMT');
  // TODO: Assemble Python into code variable.
  var code = 'ntptime.settime()\n'+
  '(year, month, mday, week_of_year, hour, minute, second, milisecond) = RTC().datetime()\n'+
  'RTC().init((year, month, mday, week_of_year, hour' + dropdown_gmt +', minute, second, milisecond))\n';
  return code;
};

Blockly.Python['get_time'] = function(block) {
  var dropdown_get_time = block.getFieldValue('get_time');
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_RTC'] = 'from machine import RTC';
  var code = "'%0*d'" + ' % (2, RTC().datetime()[' + dropdown_get_time + '])';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
