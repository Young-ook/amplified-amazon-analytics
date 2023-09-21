# ChatApp
Chat application with [Cloudscape](https://cloudscape.design/), AWS Amplify, AWS AppSync, Amazon Cognito, and Amazon DynamoDB

## Getting Started
### Clone repo
Download exmaple:
```
git clone git@github.com:Young-ook/chatapp.git
```
And change directory to the project source
```
cd chatapp
```

### Install React packages
To run the application, you must install reactstrap and npm dependencies on your workspace.\
Run npm-install command to download and install packages:
```
npm install reactstrap
```
You can try to use 'force' options to install packages and dependencies, if you see error.
```
npm install reactstrap --force
```

### Install Amplify CLI
https://docs.amplify.aws/cli/start/install/

```
# install amplify-cli
brew install node
npm install -g @aws-amplify/cli

# create a new amplify react project
amplify init

# create amplify environment
amplify env list
amplify env add dev
amplify env checkout dev

# add authentication
amplify add auth
> Cognito User Pool
> Username

# create data stores and api server
amplify add api
> Blank schema

# restore amplify backend api
git restore amplify/backend/api/chatapp/graphql.schema

# update api schema
amplify update api

# apply changes to aws
amplify push
```

## Additional Resources
- [Amplify CLI enables creating Amazon Cognito User Pool Groups, configuring fine-grained permissions on groups, and adding user management capabilities to applications](https://aws.amazon.com/ko/blogs/mobile/amplify-cli-enables-creating-amazon-cognito-user-pool-groups-configuring-fine-grained-permissions-on-groups-and-adding-user-management-capabilities-to-applications/)
- [Amplify UI Troubleshooting](https://ui.docs.amplify.aws/react/getting-started/troubleshooting)
