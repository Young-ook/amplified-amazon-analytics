/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
