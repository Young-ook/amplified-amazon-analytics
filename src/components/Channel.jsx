// ui
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { API, graphqlOperation } from 'aws-amplify'
import { listChannels } from '../graphql/queries'
import { createChannel } from '../graphql/mutations'

export const Channels = props => {
  const [channels] = useAsyncData(() => fetchChannelApi());
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
  }, [context, loading]);

  return (
    <Box>
      <Grid gridDefinition={[{ colspan: 3 }, { colspan: 9 }]}>
        <Container>
          <NewChannelForm />
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

  return (
    <form onSubmit={submitHandler}>
    <Form>
      <Input
        onChange={({ detail }) => setChannelName(detail.value)}
        value={channelName}
      />
      <Box>
        <SpaceBetween direction="horizontal" size="xs">
          <Button formAction="submit" iconName="add-plus" variant="icon" />
        </SpaceBetween>
      </Box>
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

function useAsyncData(loadItems) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems().then(items => {
      setItems(items);
    });
    return () => {};
  }, [loadItems]);

  return [items];
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
