
'use strict';

var fs = require('fs'),
    config = require('../config.json');

var ReadWriteData = function() {
  var self = this;
  
  this.getSourceFile = function(fileName, dataCallback) {

    var callback = function(err, data) {
      if (err) {
        dataCallback(err);
      }
      dataCallback(null, data);
    };

    fs.readFile(config.sourcepath + fileName, (err, data) => {
      return callback(err, data);
    });

  };

  this.saveTargetFile = function(data, fileName){
    data = JSON.stringify(data);
    fs.writeFile(config.destpath + fileName , data, (err) => {
      if (err) {
        return err;
      }
      console.log('The file has been saved!');
    });
  };

  this.buildJsonAndSendToFiles = function(jsonData) {
    var fileNames = Object.keys(jsonData);
     console.log(fileNames);
    fileNames.forEach( (fileName) => {
      self.saveTargetFile(jsonData[fileName], fileName + '.json');
    });
  };

  this.testFunc = function(str) {
    console.log(str);
  };

}; // ReadWriteData END


module.exports = ReadWriteData;
