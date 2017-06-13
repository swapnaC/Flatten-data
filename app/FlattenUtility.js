
'use strict';

function flattenUtility(sourceJson) {

    var resultJson = {};

    function formatAndSplit(obj, prop, arrIdx) {
        
        if(Array.isArray(obj)) {
            var objCount = -1;
                        
            obj.forEach((val, index) => {
                if(typeof val !== 'object') {
                    resultJson[prop].push(val);
                } else {
                    objCount++;
                    formatAndSplit(val, prop, objCount);
                }
            });
        } else if(typeof obj === 'object') {

            var keys = Object.keys(obj), spObj = {};

            //if(keys.index)
            keys.forEach((key) => {
                var value = obj[key];
                if(typeof value !== 'object') {
                    spObj[key] = value;
                } else {
                    var baseKey = prop ? prop + '_' + key : key;
                    if(!resultJson.hasOwnProperty(baseKey) ) {
                        resultJson[baseKey] = [];
                    }
                    formatAndSplit(value, baseKey);
                }
            });
            if(Object.keys(spObj).length > 0) {
                if(arrIdx >= 0) {
                    spObj['_index'] = arrIdx;
                }
                resultJson[prop].push(spObj);
            }
        }
    };

    formatAndSplit(sourceJson);
    return resultJson;
};


module.exports = flattenUtility;
