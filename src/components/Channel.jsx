// ui
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  ContentLayout,
  Form,
  Grid,
  Header,
  Input,
  Link,
  SpaceBetween
} from "@cloudscape-design/components";

// components
import { Messages } from "./Message";

// apis
import { API, graphqlOperation } from 'aws-amplify'
import { listChannels } from '../graphql/queries'
import { createChannel } from '../graphql/mutations'

export function Channels(workspace) {
  const [activeChannel, setActiveChannel] = useState({channelId: null, workspaceId: workspace.workspaceId});
  const [channels] = useAsyncData(() => fetchChannelApi(workspace.workspaceId));

  return (
    <ContentLayout
      header={<Header variant="h1" />}
    >
      <Grid gridDefinition={[{ colspan: 3 }, { colspan: 9 }]}>
        <Container>
          <NewChannelForm
            workspaceId={workspace.workspaceId}
          />
          {
            channels.map(channel =>
              <Channel
                key={channel.id}
                channel={channel}
                activeChannel={activeChannel}
                setActiveChannel={setActiveChannel}
              />
            )
          }
        </Container>
        <Messages
          channelId={activeChannel.channelId}
          channelName={activeChannel.channelId}
        />
      </Grid>
    </ContentLayout>
  );
}

const NewChannelForm = ({
  workspaceId
}) => {
  const [channelName, setChannelName] = useState('');

  const createChannel = () => {
    if (channelName.replace(/\s/g,'').length > 0) {
      createChannelApi(channelName, "icon", "description", workspaceId);
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
  channel,
  activeChannel,
  setActiveChannel,
}) => {
  if (activeChannel.channelId == null) {
    setActiveChannel({channelId: channel.id, workspaceId: channel.workspaceId});
  }
  if (activeChannel.workspaceId !== channel.workspaceId) {
    setActiveChannel({channelId: channel.id, workspaceId: channel.workspaceId});
  }

  const switchChannelHandler = () => {
    setActiveChannel({channelId: channel.id, workspaceId: channel.workspaceId});
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
function fetchChannelApi(workspaceId='') {
  try {
    return API.graphql(graphqlOperation(listChannels, {filter: {workspaceId: {eq: workspaceId}}})).then(
      result => {
        return result.data.listChannels.items;
    });
  }
  catch (err) {
    console.log({err});
  }
}

function createChannelApi(name, icon='', description='', workspaceId='') {
  try {
    API.graphql(graphqlOperation(createChannel, {
      input: { name: name, description: description, icon: icon, workspaceId: workspaceId }
    }));
  }
  catch (err) {
    console.log({err});
  }
}
