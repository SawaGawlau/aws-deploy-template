> ### Conventional commits


1. **Why to use conventional commits?**
    * automatically generates chengelogs
    * determine semantic version based
    * structured commit history

2. **How to write conventional commits**
    <type>[optional scope]: <descrioption>
    [optional body]
    [optional footer(s)]
3. **AWS Multi-Factor-Authentication (MFA)**
    * MFA = Multi-Factor-Authentication - it is additional layer of security on your root account that is provided by 3rd party.
    * you can activate MFA device either hardware or virtual. In case of virtual MFA - first you must install an AWS MFA-compatible app on the user’s smartphone - for example google authenticator.

4. **AWS account set up for deployment**
    * Set up IAM role
        * One for EC2 instance with policy: AmazonEC2RoleforAWSCodeDeploy.
        * One for CodeDeploy with policy: AWSCodeDeployRole
    * Launch EC2 instance
    * Choose AMI (Amazon Machine Image) - template of software config
    * Choose correct roles for your instance (EC2CodeDeploy)
    * Install CodeDeploy(either manually or through advanced details)
5. **Set up security groups**
    * Security group is a firewall that includes inbound and outbound rules which are attached to a VPC(Virtual private cloyd) which is attached to an instance and controls traffic inbound and outbound
    * Set up Security Groups for your instance

6. **CodeDeploy set up**
    * Create app for EC2/On-premises platform
    * Create deployment group with proper role(CodeDeployRole)
        * choose a name
        * for service role choose created in previous steps role for CodeDeploy
        * deployment type: in place(if you are using one instance without replacement)
        * environment configuration: Amazon EC2 Instance
        * tags: choose one described for your instance
        * Install AWS CodeDeploy Agent: now and schedule updates
        * Deployment settings: CodeDeployDefault.OneAtATime
        * disable rollbacks

   