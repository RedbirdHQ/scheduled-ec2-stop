module.exports = {
    "describeInstancesData" : {
        "Reservations": [
            {
                "ReservationId": "r-aaaaaaaaaaaaaaaaa0",
                "Instances": [
                    {
                        "InstanceId": "i-aaaaaaaaaaaaaaaaa0",
                        "State": {
                            "Code": 0,
                            "Name": "pending"
                        },
                        "KeyName": "stopec2",
                        "Placement": {
                            "AvailabilityZone": "us-east-1a",
                            "GroupName": "",
                            "Tenancy": "default"
                        },
                        "Tags": [
                            {
                                "Key": "KeepRunning",
                                "Value": "0"
                            },
                            {
                                "Key": "Name",
                                "Value": "StopEc2Test-0"
                            }
                        ]
                    }
                ]
            },
            {
                "ReservationId": "r-aaaaaaaaaaaaaaaaa1",
                "Instances": [
                    {
                        "InstanceId": "i-aaaaaaaaaaaaaaaaa1",
                        "State": {
                            "Code": 16,
                            "Name": "running"
                        },
                        "KeyName": "stopec2",
                        "Placement": {
                            "AvailabilityZone": "us-east-1b",
                            "GroupName": "",
                            "Tenancy": "default"
                        },
                        "Tags": [
                            {
                                "Key": "Name",
                                "Value": "StopEc2Test-1"
                            }
                        ]
                    }
                ]
            },
            {
                "ReservationId": "r-aaaaaaaaaaaaaaaaa2",
                "Instances": [
                    {
                        "InstanceId": "i-aaaaaaaaaaaaaaaaa2",
                        "State": {
                            "Code": 16,
                            "Name": "running"
                        },
                        "KeyName": "stopec2",
                        "Placement": {
                            "AvailabilityZone": "us-east-1a",
                            "GroupName": "",
                            "Tenancy": "default"
                        },

                        "Tags": [
                            {
                                "Key": "KeepRunning",
                                "Value": "1"
                            },
                            {
                                "Key": "Name",
                                "Value": "StopEc2Test-2"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "toStopInstancesData": [
        "i-aaaaaaaaaaaaaaaaa0",
        "i-aaaaaaaaaaaaaaaaa1"
    ],
    "describeAutoScalingGroupsData":{  
       "ResponseMetadata":{  
          "RequestId":"582a5ea7-7431-11e6-8c6f-0915707de13a"
       },
       "AutoScalingGroups":[  
          {  
             "AutoScalingGroupName":"ASG-0",
             "MinSize":1,
             "MaxSize":2,
             "DesiredCapacity":1,
             "AvailabilityZones":[  
                "us-east-1a",
                "us-east-1b",
                "us-east-1c"
             ],
             "Instances":[  
                {  
                   "InstanceId":"i-bbbbbbbbbbbbbbbbb0",
                   "AvailabilityZone":"us-east-1c",
                   "LifecycleState":"InService",
                   "HealthStatus":"Healthy",
                   "LaunchConfigurationName":"ASG-0",
                   "ProtectedFromScaleIn":false
                }
             ],
             "Tags":[  
                {  
                   "ResourceId":"ASG-0",
                   "ResourceType":"auto-scaling-group",
                   "Key":"KeepRunning",
                   "Value":"1",
                   "PropagateAtLaunch":true
                },       
             ],
          },
          {
             "AutoScalingGroupName":"ASG-1",
             "MinSize":1,
             "MaxSize":2,
             "DesiredCapacity":0,
             "AvailabilityZones":[  
                "us-east-1a",
                "us-east-1b",
                "us-east-1c"
             ],
             "Instances":[  
                {  
                   "InstanceId":"i-bbbbbbbbbbbbbbbbb1",
                   "AvailabilityZone":"us-east-1c",
                   "LifecycleState":"InService",
                   "HealthStatus":"Healthy",
                   "LaunchConfigurationName":"ASG-1",
                   "ProtectedFromScaleIn":false
                }
             ],
             "Tags":[  
                {  
                   "ResourceId":"ASG-1",
                   "ResourceType":"auto-scaling-group",
                   "Key":"KeepRunning",
                   "Value":"0",
                   "PropagateAtLaunch":true
                },
             ]
          },
          {  
             "AutoScalingGroupName":"ASG-2",
             "MinSize":0,
             "MaxSize":3,
             "DesiredCapacity":0,
             "AvailabilityZones":[  
                "us-east-1a"
             ],
             "Instances":[
             ],
             "Tags":[ 
             ]
          },
          {  
             "AutoScalingGroupName":"ASG-3",
             "MinSize":1,
             "MaxSize":2,
             "DesiredCapacity":2,
             "AvailabilityZones":[  
                "us-east-1a",
                "us-east-1b",
                "us-east-1c"
             ],
             "Instances":[  
                {  
                   "InstanceId":"i-bbbbbbbbbbbbbbbbb3",
                   "AvailabilityZone":"us-east-1c",
                   "LifecycleState":"InService",
                   "HealthStatus":"Healthy",
                   "LaunchConfigurationName":"ASG-0",
                   "ProtectedFromScaleIn":false
                },
                {  
                   "InstanceId":"i-bbbbbbbbbbbbbbbbb4",
                   "AvailabilityZone":"us-east-1c",
                   "LifecycleState":"InService",
                   "HealthStatus":"Healthy",
                   "LaunchConfigurationName":"ASG-0",
                   "ProtectedFromScaleIn":false
                }
             ],
             "Tags":[  
                {  
                   "ResourceId":"ASG-3",
                   "ResourceType":"auto-scaling-group",
                   "Key":"KeepRunning",
                   "Value":"0",
                   "PropagateAtLaunch":true
                },
             ]
          },
          {  
             "AutoScalingGroupName":"ASG-4",
             "MinSize":1,
             "MaxSize":3,
             "DesiredCapacity":0,
             "AvailabilityZones":[  
                "us-east-1a"
             ],
             "Instances":[  

             ],
             "Tags":[ 
             ]
          }
       ]
    },
    "toStopAsgsData": [
        "ASG-1", 
        "ASG-3",
        "ASG-4",
    ],
    "tagsData": [
        { "Key": "A", "Value": "1" },
        { "Key": "B", "Value": "true" },
    ]
};