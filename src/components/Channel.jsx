// ui
import React, { useEffect, useState } from "react";
import {
  Box, Container, Grid,
  Link, SpaceBetween
} from "@cloudscape-design/components";

// components
import { Messages } from "./Message";
import { logLastActivity, retrieveLastActivity } from './Activity'

// apis
import { useAsyncData } from './DataProvider'
import { API, graphqlOperation } from 'aws-amplify'
import { listChannels } from '../graphql/queries'

export const Channels = props => {
  const [channels, setChannels] = useAsyncData(() => fetchChannelApi());
  const [context, setContext] = useState({channel: null});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveLastActivity(props.userId).then((activity) => {
      if (loading) {
        if (activity != null) {
          setContext(JSON.parse(activity.log));
        }
        setLoading(false);
      }
    });
  }, []);

  return (
    <Box>
      <Grid gridDefinition={[{ colspan: 3 }, { colspan: 9 }]}>
        <Container>
          <SpaceBetween size="s">
            <Box>
            {
              channels.map(channel =>
                <Channel
                  key={channel.id}
                  userId={props.userId}
                  channel={channel}
                  context={context}
                  setContext={setContext}
                />
              )
            }
            </Box>
          </SpaceBetween>
        </Container>
        <Messages
          context={context}
          setContext={setContext}
          alerts={props.alerts}
          setAlerts={props.setAlerts}
        />
      </Grid>
    </Box>
  );
}

const Channel = ({
  userId,
  channel,
  context,
  setContext,
}) => {
  if (!context.channel || context.channel == null) {
    setContext({...context, ...{channel: channel.id}});
  }

  const switchChannelHandler = () => {
    const updateContext = {...context, ...{channel: channel.id}};
    setContext(updateContext);
    logLastActivity(userId, updateContext);
  }

  return (
    <Box>
      <Link onFollow={switchChannelHandler}>{channel.name}</Link>
    </Box>
  );
}

// graphql apis
function fetchChannelApi() {
  try {
    return API.graphql(graphqlOperation(listChannels)).then(
      result => {
        return result.data.listChannels.items;
    });
  }
  catch (err) {
    console.log({err});
  }
}
