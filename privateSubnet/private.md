### How to connect to private subnet?

1.  **Amazon Machine Images**
We use AMI as a templates so we could reproduce them during ec2 creation. Steps:
    * create template ec2 - no matter on what VPC and subnet
    * connect through ssh
    * install below

    ```
    sudo yum install
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
	. ~/.nvm/nvm.sh
    nvm install 16
    sudo yum install -y git(if we clone repo)
    npm install pm2@latest -g
    ```
    * setting up node on ec2: *https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html*
    * clone GitHub repository or deploy project using GitHub actions and install dependencies - `` npm i``.

    * After instance is launched, click on it and choose option actions => image&template => create image. Choose name for your image and leave all other settings default. After AMI is available you can delete your template instance and start creating using AMI.

2. **Virtual private server and subnets**
    * Create VPC and choose CIDR blocks. For example 10.0.0.0/16.
    * Create public and private subnet in the same CIDR block - with minimum netmask 16 - 10.0 is constant so you can set public subnet on 10.0.1.0/24 and private on 10.0.2.0/24.
    * In AWS allowed block size is between a /16 netmask (65,536 IP addresses) and /28 netmask (16 IP addresses). 
    * Recommended CIDR blocks for VPC:
        | 10.0.0.0 - 10.255.255.255 (10/8 prefix) | 10.0.0.0/16 | 
        | 172.16.0.0 - 172.31.255.255 (172.16/12 prefix) | 172.31.0.0/16 | 
        | 192.168.0.0 - 192.168.255.255 (192.168/16 prefix) | 192.168.0.0/20 | 

3. **Ec2 in public subnet**
    * create ec2 choosing VPC with public subnet
    * create new security for your ec2:

    **Inbound rules**

    | Type | Protocol | Port Range | Source |
    | --- | --- | --- | --- |
    | SSH | 22  | TCP | 0.0.0.0/0 |
    | HTTP | 80  | TCP | ::/0 |
    | HTTP | 80  | TCP | 0.0.0.0/0 |

    **Outbound rules**

    | Type | Protocol | Port Range | Source |
    | --- | --- | --- | --- |
    | All traffic | All  | All | 0.0.0.0/0 |

    * create internet gateway
        * create internet gateway
	    * attach igw to your vpc
	    * create route table for your vpc
	    * add internet gateway to the route table(it should be two routes then: one local and one with igw)
	    * attach route table with your public subnet
    * connect to instance through ssh
        * go to folder with your keys ``cd ~/.ssh`` and ``chmod 400 your-keys.pem``. chmod 400 gives only the read access to the owner and no other permissions are given to groups and others.
    * install nginx:
    ```
        sudo yum install
        sudo amazon-linux-extras install nginx1 -y
        sudo systemctl enable nginx
        sudo systemctl start nginx
    ```
    * to check if nginx is set up go to your public ipv4 addres or ``curl localhost`` from the terminal
    * to change nginx configuration use command ``sudo nano /etc/nginx/nginx.conf``

4. **Ec2 in private subnet**
    * create instance in private subnet using created before AMI. Choose **same authentication keys** as for your nginx ec2.
    * create security group with **inbound rules**:

    | Type | Protocol | Port Range | Source |
    | --- | --- | --- | --- |
    | SSH  | TCP | 22 | 0.0.0.0/0 |
    | Custom TCP  | TCP | *app port** | *public subnet CIDR block*** |

    * app port -> port on which your application is running
    * pubic subnet CIDR block - you can use CIDR block for whole VPC or just for pubic subnet which will be used as proxy for your application

5. **Bastion Host** 

    A bastion host is a server whose purpose is to provide access to a private network from an external network, such as the Internet.
    <img src="https://cdn-cllme.nitrocdn.com/fsJtPHuAIrjqkSrOmOGUpPSluVVKYWgR/assets/desktop/optimized/rev-4f83055/eyJidWNrZXQiOiJrbm93bGVkZ2VodXQtcHJlcG8tbGl2ZSIsImtleSI6InR1dG9yaWFsc1wvdG9waWNzXC9pbWFnZXNcLzE1NzgwNTE2MjE0MjQtSW1hZ2UtMS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsiZml0IjoiY292ZXIifX19" width="450" height="150" />

    How to connect to private instance?
    * go to your terminal and choose destination of your auth keys. Commands for mac:
       ```
        cd ~/.ssh
        ssh-add --apple-use-keychain your-keys.pem
       ```
    Then you can connect to your public subnet:
    ``ssh –A ec2-user@<bastion-IP-address or DNS-entry>``
    * from public subnet you can connect to your private subnet (Do NOT change to root user with ``sudo su``):

    ``ssh ec2-user@<instance-IP-address or DNS-entry>``
    * if all dependecies are alreadt installed you can start your app using pm2.
    * go back to your public instance and update nginx configuration. Let's assume that your app(from private subnet) is running on port 8080:
        * open terminal and connect to public subnet 
        * ``sudo nano /etc/nginx/nginx.conf``
        * go to 'server' part and paste:
            ```
                server {
                location / {
                        proxy_pass http://private-IPv4-address:8080;
                }
                }
            ```
        where private IPv4 address is address of your private instance.
        * restart nginx: ``sudo systemctl restart nginx``
        * to check if your app is avaible from your public instance you can ``curl localhost`` or go to your public instance ipv4 address 







