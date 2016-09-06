"use strict";

var AWS = require("aws-sdk");
var rb  = require("../lib/rb-stop-ec2");

// Check if environment supports native promises
if (typeof Promise === "undefined") {
  AWS.config.setPromisesDependency(require("bluebird"));
}

var ec2 = new AWS.EC2({
  region: "us-east-1"
});
var autoscaling = new AWS.AutoScaling({
  region: "us-east-1"
});



var stopEC2Instances = function(runningInstances) {
  var toStop = rb.getEC2InstancesToStop(runningInstances);

  if(toStop.length > 0 ) {
    var params = {
      InstanceIds: toStop,
      DryRun: false,
      Force: true
    };

    return ec2.stopInstances(params).promise();
  }
  else {
      return("No instances to stop");
  }
};

var processEC2Instances = function(){
  return new Promise(function(resolve, reject){
    // Describe instances to find wich one has to be stopped
    var params = {
      DryRun:false,
      Filters:[
        {
          Name:"instance-state-name",
          Values:["running", "pending"]
        }      
      ]
    };

    ec2.describeInstances(params).promise()
    .then(stopEC2Instances)
    .then(resolve)
    .catch(reject);
  });
};

var stopEC2AutoScalingGroups = function(runningAsgs) {
  var toStop = rb.getEC2AutoScalingGroupToStop(runningAsgs);
  if(toStop.length > 0 ) {
    var toStopPromise = [];
    for (var i in toStop){
      var asg = toStop[i];
      var params = {
        AutoScalingGroupName: asg, // AutoScalingGroups name
        DesiredCapacity: 0,
        MinSize: 0
      };

      toStopPromise.push(autoscaling.updateAutoScalingGroup(params).promise());
    }
    return Promise.all(toStopPromise);
  }
  else {
    return("No auto scaling groups to stop");
  }
};

var processEC2AutoScalingGroups = function(){
  return new Promise(function(resolve, reject){
    autoscaling.describeAutoScalingGroups({}).promise()
    .then(stopEC2AutoScalingGroups)
    .then(resolve)
    .catch(reject);
  });
};

exports.handler = (event, context, callback) => {
    Promise.all([processEC2Instances(), processEC2AutoScalingGroups()]) // Genetate tmp GeoJSON file and output folder
    .then( function(data){
      callback(null, data);
    })
    .catch(callback);
};