// ui
import React, { useState, useRef } from "react";
import {
  AppLayout,
  Box,
  ContentLayout,
  Header,
} from "@cloudscape-design/components";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// components
import { NavigationBar } from "./components/Navigation";
import { Workspace } from "./components/Workspace";
import { Channels } from "./components/Channel";
import { retrieveLastActivity } from './components/Activity'

// application
function App ({ signOut, user }) {
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const appLayout = useRef();

  let context;
  retrieveLastActivity(user.attributes.sub).then((activity) => {
    context = JSON.parse(activity.log);
    console.log(context.workspace);
  });

  return (
    <Box>
      <NavigationBar />
      <AppLayout
        ref={appLayout}
        headerSelector="#h"
        navigation={<Workspace initWorkspace={context} setActiveWorkspace={setActiveWorkspace} />}
        content={
          <ContentLayout header={<Header variant="h1" />}>
            <Channels userId={user.attributes.sub} workspace={activeWorkspace} />
          </ContentLayout>
        }
      />
    </Box>
  );
}

export default withAuthenticator(App);
