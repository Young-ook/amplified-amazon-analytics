// ui
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Form,
  Grid,
  Input,
  Link,
  SpaceBetween
} from "@cloudscape-design/components";

// components
import { Messages } from "./Message";
import { logLastActivity, retrieveLastActivity } from './Activity'

// apis
import { useAsyncData } from './DataProvider'
import { API, graphqlOperation } from 'aws-amplify'
import { listChannels } from '../graphql/queries'
import { createChannel } from '../graphql/mutations'
import { onCreateChannel } from '../graphql/subscriptions';

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

    const createSub = API.graphql(graphqlOperation(onCreateChannel)).subscribe({
      next: ({value}) => {setChannels((channels) => [...channels, value.data.onCreateChannel])}
    });

    return () => {
      createSub.unsubscribe()
    }
  }, []);

  return (
    <Box>
      <Grid gridDefinition={[{ colspan: 3 }, { colspan: 9 }]}>
        <Container>
          <SpaceBetween size="s">
            <NewChannelForm />
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

const NewChannelForm = () => {
  const [channelName, setChannelName] = useState('');

  const createChannel = () => {
    if (channelName.replace(/\s/g,'').length > 0) {
      createChannelApi(channelName, "icon", "description");
      setChannelName("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createChannel();
  };

  const keyUpHandler = (e) => {
    if (e.detail.keyCode === 13 && !e.detail.shiftKey) {
      createChannel();
    }
  };

  return (
    <form onSubmit={submitHandler}>
    <Form>
      <Input
        onChange={({detail}) => setChannelName(detail.value)}
        onKeyUp={keyUpHandler}
        value={channelName}
      />
    </Form>
    </form>
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

function createChannelApi(name, icon='', description='') {
  try {
    API.graphql(graphqlOperation(createChannel, {
      input: { name: name, description: description, icon: icon }
    }));
  }
  catch (err) {
    console.log({err});
  }
}
