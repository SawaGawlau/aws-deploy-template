> ### Project configuration


1. **Create repository on GitHub.com**
    *  Create a project..
    * In main directory create .github/workflows folder
    * Inside workflows keep all yaml files with GitHub Actions
    * Create AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY on your aws account
    * Add all used secrets keys to your repo:
	    * AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY
        * AWS_REGION
    * Create appspec.yml file with info where deployed resources should be stored. It has to be in main folder of your project.

2. **AWS IDENTITY & ACCESS MANAGEMENT (IAM)**
    * The user created when you set up AWS account for the first time is root user.By default it is FULL administrative and has access to every part of the account.
    * Best practice is NOT to use your root account to daily work.
    * If you want full admin access for yourself, create IAM user and attach “AdminAccess” policy to it. use that account for day-to-day use.

3. **AWS Multi-Factor-Authentication (MFA)**
    * MFA = Multi-Factor-Authentication - it is additional layer of security on your root account that is provided by 3rd party.
    * you can activate MFA device either hardware or virtual. In case of virtual MFA - first you must install an AWS MFA-compatible app on the user’s smartphone - for example google authenticator.

4. **AWS account set up for deployment**
    * Set up IAM role - go to roles -> create role
        * One for EC2 instance - choose use case: EC2 and then add policy: AmazonEC2RoleforAWSCodeDeploy. Choose proper name for this role.
        for this set up we'll call it EC2CodeDeploy.
        * One for CodeDeploy  - choose a use case: CodeDeploy(should be at the bottom) and then add policy: AWSCodeDeployRole.
        Choose proper name(AWSCodeDeployRole)
    * Launch EC2 instance
    * Choose AMI (Amazon Machine Image) - template of proper software configuration
    * Choose correct roles for your instance (EC2CodeDeploy)
    * Install CodeDeploy:
         * during launching an instance - choose "advanced details" section and in "User Data" put below commands:
         ```
            #!/bin/bash
            sudo yum -y update
            sudo yum -y install ruby
            sudo yum -y install wget
            cd /home/ec2-user
            wget https://aws-codedeploy-eu-  central-1.s3.amazonaws.com/latest/codedeploy-agent.msi
            sudo chmod +x ./instal
            sudo ./install auto
         ```
         * You can now automate the installation and update schedule for the AWS CodeDeploy agent through integration with AWS Systems Manager Distributor. You can also install code deploy during creation deployment group(description in next steps) or manually through terminal with above commands.
    * Tags: these are necessary if we are running multiple instances. It is needed to choose correct one for CodeDeploy. If you are using one instance, this is optional.

5. **Set up security groups**
    * Security group is a firewall that includes inbound and outbound rules which are attached to a VPC(Virtual private cloyd) which is attached to an instance and controls in & out traffic.
    * Set up Security Groups for your instance, which ports should be accessible from the internet.

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
7. **Create deployment**

    After setting up deployment group you need to create first deployment manually so you can connect to your github account. From your deployment group click "create deployment" and choose: My application is stored in GitHub. Sign up to your github account and set a name for your account token. Choose repository name and last commit. In content options choose what should be done if your project destination name is already taken(fail/overwrite/retain). After first succesful deployment you can use github action to future CI/CD.

    **UPDATE**
    there is no need to connect to GitHub from aws. There is also no need to add token from your github account. You can simply create application and deployment group and start deploying using github actions from very beggining.
   
8. **CodeDeploy set up** 