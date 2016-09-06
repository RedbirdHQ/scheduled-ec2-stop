var chai = require('chai');
var app = require('../lib/rb-stop-ec2');
var should = chai.should();
var expect = chai.expect;

var data = require('./data/data');

describe('Stop EC2 Instances', function() {
  it('should check tags', function(done){
    var tags = data.tagsData;

    app.checkTag(tags, "A", ["1", 2, 3]).should.be.equal(true);
    app.checkTag(tags, "A", ["0"]).should.be.equal(false);
    app.checkTag(tags, "A", [1, 2, 3]).should.be.equal(false);
    app.checkTag(tags, "B", ["true"]).should.be.equal(true);
    app.checkTag(tags, "B", [true]).should.be.equal(false);
    app.checkTag(tags, "B", []).should.be.equal(false);
    app.checkTag(tags, "Z", ["1"]).should.be.equal(false);

    expect(function(){app.checkTag(tags, "A", true);}).to.throw(TypeError);
    expect(function(){app.checkTag(tags, "A", {});}).to.throw(TypeError);
    
    done();
  });

  it('should find EC2 Instances to stop', function(done){
    expect(app.getEC2InstancesToStop(data.describeInstancesData), "should be an array").to.be.instanceof(Array);
    app.getEC2InstancesToStop(data.describeInstancesData).should.be.eql(data.toStopInstancesData);

    done();
  });

  it('should find EC2 Auto Scaling Group to stop', function(done){
    expect(app.getEC2AutoScalingGroupToStop(data.describeAutoScalingGroupsData), "should be an array").to.be.instanceof(Array);
    app.getEC2AutoScalingGroupToStop(data.describeAutoScalingGroupsData).should.be.eql(data.toStopAsgsData);

    done();
  });
});