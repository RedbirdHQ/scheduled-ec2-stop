'use strict';
console.log('Loading function');
var AWS = require('aws-sdk');

// Check if environment supports native promises
if (typeof Promise === 'undefined') {
  AWS.config.setPromisesDependency(require('bluebird'));
}

var ec2 = new AWS.EC2({
  region: 'us-east-1'
});
var autoscaling = new AWS.AutoScaling({
  region: 'us-east-1'
});

/**
 * Return true if tag is in tags list and if value is contain in values array
 * 
 * @param {Object[]} tags Array of tag
 * @param {string} key Key which is looking for
 * @param {string[]} values Array of values
 * @return {boolean}
 * 
 * @author bails@getredbird.com
 * 
 **/
function checkTag(tags, key, values){
  var isOk = false;
  if(undefined !== tags){
    isOk = tags.some(function(tag){
      if(tag.Key===key && values.indexOf(tag.Value)!=-1){
        return(true);
      }
      return(false);
    });
  }
  return(isOk);
}

var stopEC2Instances = function(runningInstances) {
  var instancesToStop=[];
  
  //Select instances to stop
  for (var i in runningInstances.Reservations){
    var r = runningInstances.Reservations[i];
    for (var j in r.Instances){
      var instance = r.Instances[j];
      if(!checkTag(instance.Tags, "KeepRunning", ["1"])){
        instancesToStop.push(instance.InstanceId);
      }
    } 
  }

  var params = {
    InstanceIds: instancesToStop,
    DryRun: false,
    Force: true
  };

  return ec2.stopInstances(params).promise();
};

var processEC2Instances = function(){
  return new Promise(function(resolve, reject){
    // Describe instances to find wich one has to be stopped
    var params = {
      DryRun:false,
      Filters:[
        {
          Name:'instance-state-name',
          Values:['running', 'pending']
        }      ]
    };

    ec2.describeInstances(params).promise()
    .then(stopEC2Instances)
    .then(resolve)
    .catch(reject);
  });
};

exports.handler = (event, context, callback) => {
    Promise.all([processEC2Instances()]) // Genetate tmp GeoJSON file and output folder
    .then( function(data){
      console.log(data);
      callback(null, event.key1);
    })
    .catch(function(err){console.log(err)})
};