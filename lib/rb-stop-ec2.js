/**
 * Return true if tag is in tags list and if value is contain in values array
 * 
 * @param {Object[]}  tags    Array of tag
 * @param {string}    key     Key which is looking for
 * @param {string[]}  values  Array of values
 * @return {boolean}
 * 
 * @author bails@getredbird.com
 * 
 **/
exports.checkTag = function (tags, key, values){
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
};

/**
 * Get EC2 instances which don't have the KeepRunning tag, or where the tag is equal to 0
 *
 * @author bails@getredbird.com
 * @param  {Object} instances describeInstances output
 * @return {Array}            List of instances
 */
exports.getEC2InstancesToStop = function(instances){
  var instancesToStop=[];
  
  //Select instances to stop
  for (var i in instances.Reservations){
    var r = instances.Reservations[i];
    for (var j in r.Instances){
      var instance = r.Instances[j];
      if(!this.checkTag(instance.Tags, "KeepRunning", ["1"])){
        instancesToStop.push(instance.InstanceId);
      }
    } 
  }

  return(instancesToStop);
};

/**
 * Get EC2 autoscalingroups which don't have the KeepRunning tag, or where the tag is equal to 0, and where desired capacity or min size > 0
 *
 * @author bails@getredbird.com
 * @param  {Object} asgs  describeAutoScalingGroups output 
 * @return {Array}        List of autoscalinggroups
 */
exports.getEC2AutoScalingGroupToStop = function(asgs){
  var asgsToStop = [];

  for (var i in asgs.AutoScalingGroups){ // For each AutoScalingGroups
    var autoscalingGroup = asgs.AutoScalingGroups[i];
    if(!this.checkTag(autoscalingGroup.Tags, "KeepRunning", ["1"]) && (0 < autoscalingGroup.DesiredCapacity || 0 < autoscalingGroup.MinSize || 0 < autoscalingGroup.Instances)){ // If not with keeprunning tag
      asgsToStop.push(autoscalingGroup.AutoScalingGroupName);
    }
  }
  return(asgsToStop);
};