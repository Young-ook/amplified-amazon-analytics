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
import { createChannel, updateChannel, deleteChannel } from '../graphql/mutations'
import { onCreateChannel, onUpdateChannel, onDeleteChannel } from '../graphql/subscriptions';

export function Channels(workspace) {
  const [channels] = useAsyncData(() => fetchChannelApi(workspace.workspaceId));
  const [activeChannel, setActiveChannel] = useState(null);

  return (
    <ContentLayout
      header={<Header variant="h1" />}
    >
      <Container>
        <Grid gridDefinition={[{ colspan: 3 }, { colspan: 9 }]}>
          <Box>
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
          </Box>
          <Messages channelId={activeChannel} channelName={activeChannel} />
        </Grid>
      </Container>
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
  const keyUpHandler = (e) => {
    if (e.detail.keyCode === 13 && !e.detail.shiftKey) {
      createChannel();
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    createChannel();
  };
  const cancelHandler = () => {
    setChannelName("")
  };

  return (
    <form onSubmit={submitHandler}>
    <Form>
      <Input
        onChange={({ detail }) => setChannelName(detail.value)}
        value={channelName}
        onKeyUp={keyUpHandler}
      />
      <Box>
        <SpaceBetween direction="horizontal" size="xs">
          <Button formAction="none" iconName="undo" variant="icon" onClick={cancelHandler} />
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
  if (!activeChannel) { setActiveChannel(channel.id) }
  const switchChannelHandler = () => {
    //setActiveChannel({ id: channel.id, name: channel.name})
    setActiveChannel(channel.id)
  }

  return (
    <Box>
      <Link onFollow={switchChannelHandler}>{channel.name}</Link>
    </Box>
  );
}

function useAsyncData(loadChannels) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let rendered = true;
    loadChannels().then(items => {
      if (rendered) {
        setItems(items);
        setLoading(false);
      }
    });
    return () => {
      rendered = false;
    };
  }, [loadChannels]);

  return [items, loading];
}

// graphql apis
function fetchChannelApi(workspaceId='') {
  try {
    return API.graphql(graphqlOperation(listChannels, {filter: {workspaceId: {eq: workspaceId}}})).then(
      result => {
        return result.data.listChannels.items;
    });
  }
  catch (e) {
    console.log(e);
  }
}

function createChannelApi(name, icon='', description='', workspaceId='') {
  try {
    API.graphql(graphqlOperation(createChannel, {
      input: { name: name, description: description, icon: icon, workspaceId: workspaceId }
    }));
  }
  catch (e) {
    console.log({e});
  }
}

function editChannelApi(id, version, name) {
  try {
    API.graphql(graphqlOperation(updateChannel, {
      input: { id: id, _version: version, name: name }
    }));
  }
  catch (e) {
    console.log({e});
  }
}

function deleteChannelApi(id, version) {
  try {
    API.graphql(graphqlOperation(deleteChannel, {
      input: { id: id, _version: version }
    }));
  }
  catch (e) {
    console.log({e});
  }
}
