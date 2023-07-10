/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWorkspace = /* GraphQL */ `
  mutation CreateWorkspace(
    $input: CreateWorkspaceInput!
    $condition: ModelWorkspaceConditionInput
  ) {
    createWorkspace(input: $input, condition: $condition) {
      id
      text
      type
      href
      channels {
        items {
          id
          name
          description
          icon
          workspaceId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateWorkspace = /* GraphQL */ `
  mutation UpdateWorkspace(
    $input: UpdateWorkspaceInput!
    $condition: ModelWorkspaceConditionInput
  ) {
    updateWorkspace(input: $input, condition: $condition) {
      id
      text
      type
      href
      channels {
        items {
          id
          name
          description
          icon
          workspaceId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteWorkspace = /* GraphQL */ `
  mutation DeleteWorkspace(
    $input: DeleteWorkspaceInput!
    $condition: ModelWorkspaceConditionInput
  ) {
    deleteWorkspace(input: $input, condition: $condition) {
      id
      text
      type
      href
      channels {
        items {
          id
          name
          description
          icon
          workspaceId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createChannel = /* GraphQL */ `
  mutation CreateChannel(
    $input: CreateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    createChannel(input: $input, condition: $condition) {
      id
      name
      description
      icon
      workspaceId
      messges {
        items {
          id
          channelId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateChannel = /* GraphQL */ `
  mutation UpdateChannel(
    $input: UpdateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    updateChannel(input: $input, condition: $condition) {
      id
      name
      description
      icon
      workspaceId
      messges {
        items {
          id
          channelId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteChannel = /* GraphQL */ `
  mutation DeleteChannel(
    $input: DeleteChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    deleteChannel(input: $input, condition: $condition) {
      id
      name
      description
      icon
      workspaceId
      messges {
        items {
          id
          channelId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      channelId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      channelId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      channelId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createLastActivity = /* GraphQL */ `
  mutation CreateLastActivity(
    $input: CreateLastActivityInput!
    $condition: ModelLastActivityConditionInput
  ) {
    createLastActivity(input: $input, condition: $condition) {
      userId
      log
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateLastActivity = /* GraphQL */ `
  mutation UpdateLastActivity(
    $input: UpdateLastActivityInput!
    $condition: ModelLastActivityConditionInput
  ) {
    updateLastActivity(input: $input, condition: $condition) {
      userId
      log
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteLastActivity = /* GraphQL */ `
  mutation DeleteLastActivity(
    $input: DeleteLastActivityInput!
    $condition: ModelLastActivityConditionInput
  ) {
    deleteLastActivity(input: $input, condition: $condition) {
      userId
      log
      createdAt
      updatedAt
      owner
    }
  }
`;
