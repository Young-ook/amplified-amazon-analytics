# Chatapp
Chat application with Amplify and AppSync


## Install Amplify CLI
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
