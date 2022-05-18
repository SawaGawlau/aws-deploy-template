# HEADINING


1. Create repository on GitHub.com
2. Create a project..
3. In main directory create .github/workflows folder
    * Inside workflows keep all yaml files with GitHub Actions
    * Create AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY on your aws account
    * Add all used secrets keys to your repo:
	    * AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY
        * AWS_REGION
4. Create app.spec file with info where deployed resources should be stored. It has to be in main folder of your project.

5. AWS configuration:
    * Set up IAM role
        * One for EC2 instance
        *  One for CodeDeploy
    * Launch EC2 instance
    * Choose AMI (Amazon Machine Image) - template of software config
    * Choose correct roles for your instance (EC2CodeDeploy)
    * Install CodeDeploy(either manually or through advanced details)
    * Set up Security Groups for your instance

6. CodeDeploy set up
    * Create app for EC2/On-premises platform
    * Create deployment group with proper role(CodeDeployRole)