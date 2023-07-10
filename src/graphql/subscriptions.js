/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWorkspace = /* GraphQL */ `
  subscription OnCreateWorkspace(
    $filter: ModelSubscriptionWorkspaceFilterInput
  ) {
    onCreateWorkspace(filter: $filter) {
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
export const onUpdateWorkspace = /* GraphQL */ `
  subscription OnUpdateWorkspace(
    $filter: ModelSubscriptionWorkspaceFilterInput
  ) {
    onUpdateWorkspace(filter: $filter) {
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
export const onDeleteWorkspace = /* GraphQL */ `
  subscription OnDeleteWorkspace(
    $filter: ModelSubscriptionWorkspaceFilterInput
  ) {
    onDeleteWorkspace(filter: $filter) {
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
export const onCreateChannel = /* GraphQL */ `
  subscription OnCreateChannel(
    $filter: ModelSubscriptionChannelFilterInput
    $owner: String
  ) {
    onCreateChannel(filter: $filter, owner: $owner) {
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
export const onUpdateChannel = /* GraphQL */ `
  subscription OnUpdateChannel(
    $filter: ModelSubscriptionChannelFilterInput
    $owner: String
  ) {
    onUpdateChannel(filter: $filter, owner: $owner) {
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
export const onDeleteChannel = /* GraphQL */ `
  subscription OnDeleteChannel(
    $filter: ModelSubscriptionChannelFilterInput
    $owner: String
  ) {
    onDeleteChannel(filter: $filter, owner: $owner) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onCreateMessage(filter: $filter, owner: $owner) {
      id
      channelId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onUpdateMessage(filter: $filter, owner: $owner) {
      id
      channelId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onDeleteMessage(filter: $filter, owner: $owner) {
      id
      channelId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateLastActivity = /* GraphQL */ `
  subscription OnCreateLastActivity(
    $filter: ModelSubscriptionLastActivityFilterInput
    $owner: String
  ) {
    onCreateLastActivity(filter: $filter, owner: $owner) {
      userId
      log
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateLastActivity = /* GraphQL */ `
  subscription OnUpdateLastActivity(
    $filter: ModelSubscriptionLastActivityFilterInput
    $owner: String
  ) {
    onUpdateLastActivity(filter: $filter, owner: $owner) {
      userId
      log
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteLastActivity = /* GraphQL */ `
  subscription OnDeleteLastActivity(
    $filter: ModelSubscriptionLastActivityFilterInput
    $owner: String
  ) {
    onDeleteLastActivity(filter: $filter, owner: $owner) {
      userId
      log
      createdAt
      updatedAt
      owner
    }
  }
`;
