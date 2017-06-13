var ReadWriteData = require('./app/ReadWriteData'),
    flattenUtility = require('./app/flattenUtility'),
    config = require('./config.json');

var readWriteData = new ReadWriteData();

var callback = function(err, data) {
  if(err) {
    console.log(err);
    return;
  }
  var allJsonData = flattenUtility(JSON.parse(data));
  readWriteData.buildJsonAndSendToFiles(allJsonData);

};

readWriteData.getSourceFile(config.basefile, callback);