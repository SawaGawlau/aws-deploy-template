> ### Project configuration


1. **Create repository on GitHub.com**
    *  Create a project..
    * In main directory create .github/workflows folder
    * Inside workflows keep all yaml files with GitHub Actions
    * Create AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY on your aws account
    * Add all used secrets keys to your repo:
	    * AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY
        * AWS_REGION
    * Create appspec.yml file with info where deployed resources should be stored. It has to be in main folder of your project. Template is stored in the project.

2. **AWS IDENTITY & ACCESS MANAGEMENT (IAM)**
    * The user created when you set up AWS account for the first time is root user.By default it is FULL administrative and has access to every part of the account.
    * Best practice is NOT to use your root account to daily work.
    * If you want full admin access for yourself, create IAM user and attach “AdminAccess” policy to it. use that account for day-to-day use.

3. **AWS Multi-Factor-Authentication (MFA)**
    * MFA = Multi-Factor-Authentication - it is additional layer of security on your root account that is provided by 3rd party.
    * you can activate MFA device either hardware or virtual. In case of virtual MFA - first you must install an AWS MFA-compatible app on the user’s smartphone - for example google authenticator.

4. **AWS account set up for deployment**
    * Set up IAM role - go to roles -> create role
        * One for EC2 instance - choose use case: **EC2** and then add policy: **AmazonEC2RoleforAWSCodeDeploy**. Remember the name you choose for this role. 
        * One for CodeDeploy  - choose a use case: **CodeDeploy**(should be at the bottom) and then add policy: **AWSCodeDeployRole**. Remember the name you choose for this role.
5. **Launch EC2 instance**
    * Choose AMI (Amazon Machine Image) - template of proper software configuration
    * Choose correct roles for your instance -> EC2CodeDeploy
    * **Network settings**
        * VPC - tbd
        * Subnets - tbd
        * Auto-assign public IP - enable (for public subnets). A private subnet means that any EC2 instances located in that subnet are not directly addressable from the public Internet. EC2 instances in a private subnets cannot have a public IP address
        * security groups - If you are using specific port for running your app you need to set a rule to enable accessing it from your instance

        
        | Type | Protocol | Port Range | Source |
        | --- | --- | --- | --- |
        | Custom TCP   | TCP     | 3000    | Anywhere 0.0.0.0/0 |
        

        In this case we allow all IP addresses to access your instance and we are able to access app running on port 3000.

        You can specify those during creation an instance or you can do this after, by choosing existing instance. Then follow steps: mark an instance -> go to actions -> Networking -> change security groups. Here you will find an interface with security groups assigned. It includes inbound and outbound rules which are attached to an instance and controls incoming and outgoing traffic. 
6. **Connect to EC2 using SSH:**
    * after creating ec2 you should be able to connect using ssh. During creation you could choose if you want to create new key pair or to use existing one. If you choose creating new one, your keys will be downloaded to ~/.ssh folder. After launching an instance you are no longer able to download those. 
    * choose an instance -> connect -> SSH client. 
    * open terminal and use command ``cd ~/.ssh``
    * enter example from aws console: ``ssh -i "key-name.pem" ec2-user@ec2-3-121-213-66.region.compute.amazonaws.com``
         
7. **Install CodeDeploy**
    * ``sudo yum update``
    * ``sudo yum install ruby``
    * ``sudo yum install wget``
    * ``cd /home/ec2-user``    
    * ``wget https://bucket-name.s3.region-identifier.amazonaws.com/latest/install`` -> you can choose proper bucker-name basing on region your instance is located on here: *https://docs.aws.amazon.com/codedeploy/latest/userguide/resource-kit.html#resource-kit-bucket-names*
    * ``chmod +x ./install``
    * ``sudo ./install auto``
    *  to list all available versions in your region: ``aws s3 ls s3://aws-codedeploy-region-identifier/releases/ | grep '\.rpm$'``
    * install one of the version: ``sudo ./install auto -v releases/codedeploy-agent-###.rpm``
    * check if service is running: ``sudo service codedeploy-agent status``
If the CodeDeploy agent is installed and running, you should see a message like The AWS CodeDeploy agent is running. Source: *https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install-linux.html*

8. **CodeDeploy set up**
    * After launching an instance you need to configure CodeDeploy. To do that follow below steps:
        * Services -> CodeDeploy -> Applications -> Create:
        -> choose a name
        -> Compute platform - EC2/On-premises
    * Create deployment group
        * choose a name
        * for service role choose created in previous steps role for CodeDeploy
        * deployment type: in place(if you are using one instance without replacement)
        * environment configuration: Amazon EC2 Instance
        * tags: choose one described for your instance
        * Install AWS CodeDeploy Agent: now and schedule updates
        * Deployment settings: **CodeDeployDefault.AllAtOnce**
        * disable rollbacks
     
9. **Create deployment**

    After setting up deployment group you need to create first deployment manually so you can connect to your github account. From your deployment group click "create deployment" and choose: My application is stored in GitHub. Sign up to your github account and set a name for your account token. Choose repository name and last commit. In content options choose what should be done if your project destination name is already taken(fail/overwrite/retain). After first succesful deployment you can use github action to future CI/CD.

    **UPDATE**
    there is no need to connect to GitHub from aws. There is also no need to add token from your github account. You can simply create application and deployment group and start deploying using github actions from very beggining.
   
10. **Github actions** 
    In your github repository create .github folder and workflows in your repo. Add yaml files with workflow description like this: ``.github/workflows/deploy.yml`` and paste below:

    ``
    name: Deploy-to-EC2
    on:
        push:
            branches:
                - deploy

    jobs:
    deploy:
    runs-on: ubuntu-latest
        steps:
        - name: Checkout the files
            uses: actions/checkout@v2
        - name: Configure AWS credentials
            uses: aws-actions/configure-aws-credentials@v1
            with:
            aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
            aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
            aws-region: ${{ secrets.AWS_REGION }}
        - name: Create CodeDeploy Deployment
            id: deploy
            run: |
            aws deploy create-deployment \
                --application-name app \
                --deployment-group-name app-group \
                --deployment-config-name CodeDeployDefault.OneAtATime \
                --github-location repository=${{ github.repository }},commitId=${{ github.sha }}

    ``
    * **AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY**
    Go to main page of aws account. From right top corner choose security credentials -> access keys -> create new access key. After creation you need to download key and keep secret as it will be no longer visible from aws console. Attach credentials to your github repository: settings -> secrets and variables -> actions -> new repository secret

    * **AWS_REGION** this is a region chosen at the beginning during launching an instance(eu-central-1).

    * **application-name deployment group, deployment-config-name** -> name chosen during creation Application on aws account(CodeDeploy set up)

11. **app.spec file**
In the main folder of the project you need to add app.spec which describes where deployed resources will be stored:

``
version: 0.0
os: linux
files:
  - source: .
    destination: /home/ec2-user/folder-name
``
