// ui
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  ContentLayout,
  Grid,
  Header,
  Link
} from "@cloudscape-design/components";

// components
import { Messages } from "./Message";

//apis
import { API, graphqlOperation } from 'aws-amplify'
import { listChannels } from '../graphql/queries'
import { createChannel, updateChannel, deleteChannel } from '../graphql/mutations'
import { onCreateChannel, onUpdateChannel, onDeleteChannel } from '../graphql/subscriptions';

export function Channels() {
  const [channels, channelsLoading] = useAsyncData(() => new DataProvider().fetchData());
  const [activeChannel, setActiveChannel] = useState(null);

  return (
    <ContentLayout
      header={<Header variant="h1" />}
    >
      <Container>
        <Grid gridDefinition={[{ colspan: 3 }, { colspan: 9 }]}>
          <Box>
          {
            channels.map(channel =>
              <Box key={channel.id}>
                <Link onFollow={() => setActiveChannel(channel.id)}>{channel.name}</Link>
              </Box>
            )
          }
          </Box>
          <Messages channelId={activeChannel} />
        </Grid>
      </Container>
    </ContentLayout>
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

class DataProvider {
  fetchData() {
    try {
      return API.graphql(graphqlOperation(listChannels)).then(
        result => {
          //if (result.ok) {}
          return result.data.listChannels.items;
      });
    }
    catch (e) {
      console.log(e);
    }
  }
}

// apis
function createChannelApi(name, icon='', description='') {
  try {
    API.graphql(graphqlOperation(createChannel, {
      input: { name: name, description: description, icon: icon }
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
