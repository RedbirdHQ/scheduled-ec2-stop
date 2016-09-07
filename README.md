# Lambda Scheduled EC2 Stop

This lambda takes care about your AWS bills by shuting down all untagged EC2 instances and auto scaling groups at a specified time.
Moreover, to an easy deployement, a [CloudFormation](https://aws.amazon.com/cloudformation/) template is include !

Two options for deployement : an easy way with CloudFormation template, a slower way by creating all ressources by yourself.

## How to use

After deployement, just add the tag `KeepRunning` to your EC2 Instances or auto scaling groups.
If tag value is equal to `1`, the EC2 is not shutdown. 
Else, the script shudown the instance or decrease to 0 auto scaling group "Min Size" or "Desired capacity".

## How to deploy

### Common to both deployements

1. Clone or download sources from git
2. Go in `scheduled-ec2-stop` directory and run `npm install`
3. Make a zip file from `scheduled-ec2-stop` directory

### The Easy Way

1. **Upload your zip file** on your S3 bucket 
2. **Open CloudFormation panel** in your AWS console
3. On the top left, click on **Create Stack**
4. In "Choose a template" section, select **Upload a template to Amazon S3** and import `cloudformation/scheduledEc2.json`
5. **Fill parameters**

    ```
    Stack name: Name of your stack (like ScheduledEC2Stop)
    BucketKey: Path to your Lambda zip file inside bucket
    BucketName: Name of your bucket where you just upload your zip file
    CronExpression: Expression to scheduled script, UTC time (eg. cron(0 19 * * ? *) = all days at 7pm UTC)
    ```

6. Eventually add tags to your templates
7. **Review** and **Create**

### The Slower Way

#### Create Policy and Role

1. Open IAM service, click on **Policies** and **Create Policy**
2. Select "Create Your Own Policy"
3. Named your Policy and give right on your EC2 instances and auto scaling groups ressources with the following "Policy Document" :
 
    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "ec2:DescribeInstanceAttribute",
                    "ec2:DescribeInstanceStatus",
                    "ec2:DescribeInstances",
                    "ec2:DescribeTags",
                    "ec2:StopInstances",
                    "autoscaling:DescribeAutoScalingGroups",
                    "autoscaling:UpdateAutoScalingGroup"
                ],
                "Resource": "*"
            }
        ]
    }
    ```

4. Open **Roles** panel and click on **Create New Role**
5. Named it, select **AWS Lambda** in the "AWS Service Roles", then, select the policy you just created and **AWSLambdaBasicExecutionRole**

#### Create Lambda

1. Open Lambda service, click on **Create a Lambda function**
2. Skip "Select blueprint"
3. Configure a **CloudWatch Events - Schedule** trigger, and go to the next step 
4. Fill rule parameters

    ```
    Rule name: Name of your event rule
    Rule description: Describe your rule
    Schedule expression: Your cron expression, UTC time
    Enable triger: better to make it work
    ```

5. **Configure Lambda** parameters

    ```
    Name: ScheduledStopEc2
    Runtime: Node.js 4.3
    Code entry type:  "Upload a .ZIP file", then upload your zip file
    Handler: src/index.handler
    Role: "Choose an existing role"
    Existing role: select the role previous created
    Memory (MB): 128 should be ok
    Timeout: depends of your infrastrucutre
    VPC: depends of your infrastrucutre
    ```

6. **Create function**

