// apis
import { API, graphqlOperation } from 'aws-amplify'
import { getLastActivity } from '../graphql/queries'
import { createLastActivity, updateLastActivity } from '../graphql/mutations'

// apis
export function retrieveLastActivity(userId) {
  try {
    return API.graphql(graphqlOperation(getLastActivity, {
      userId: userId
    })).then(
      result => {
        return result.data.getLastActivity;
    });
  }
  catch (err) {
    console.error({err});
  }
}

export function logLastActivity(userId, log) {
  try {
    retrieveLastActivity(userId).then((activity) => {
      const lastActivity = {...JSON.parse(activity.log), ...log};

      if (activity && activity != null) {
        API.graphql(graphqlOperation(updateLastActivity, {
          input: { userId: userId, log: JSON.stringify(lastActivity), _version: activity._version }
        }));
      }
      else {
        API.graphql(graphqlOperation(createLastActivity, {
          input: { userId: userId, log: JSON.stringify(lastActivity) }
        }));
      }
    });
  }
  catch (err) {
    console.error({err});
  }
}
