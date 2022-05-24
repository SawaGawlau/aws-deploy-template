> ### Project configuration


1. **Create repository on GitHub.com**
    *  Create a project..
    * In main directory create .github/workflows folder
    * Inside workflows keep all yaml files with GitHub Actions
    * Create AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY on your aws account
    * Add all used secrets keys to your repo:
	    * AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY
        * AWS_REGION
    * Create app.spec file with info where deployed resources should be stored. It has to be in main folder of your project.

2. **AWS IDENTITY & ACCESS MANAGEMENT (IAM)**
    * The user created when you set up AWS account for the first time is root user.By default it is FULL administrative and has access to every part of the account.
    * Best practice is NOT to use your root account to daily work.
    * If you want full admin access for yourself, create IAM user and attach “AdminAccess” policy to it. use that account for day-to-day use.

3. **AWS Multi-Factor-Authentication (MFA)**
    * MFA = Multi-Factor-Authentication - it is additional layer of security on your root account that is provided by 3rd party.
    * you activate MFA device either hardware or virtual. In case of virtual MFA - first you must install an AWS MFA-compatible app on the user’s smartphone - for example google authenticator.

4. **AWS account set up for deployment**
    * Set up IAM role
        * One for EC2 instance
        *  One for CodeDeploy
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