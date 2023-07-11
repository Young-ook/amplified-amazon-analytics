// ui
import React, { useEffect, useState, useRef } from "react";
import {
  AppLayout,
  Box,
  ContentLayout,
  Header,
} from "@cloudscape-design/components";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// components
import { Navigation, NavigationBar } from "./components/Navigation";
import { Channels } from "./components/Channel";
import { retrieveLastActivity } from './components/Activity'

// application
function App ({ signOut, user }) {
  const appLayout = useRef();
  const [context, setContext] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveLastActivity(user.attributes.sub).then((activity) => {
      if (loading) {
        setContext(JSON.parse(activity.log));
        setLoading(false);
      }
    });
  }, [context, loading, user]);

  return (
    <Box>
      <NavigationBar />
      <AppLayout
        ref={appLayout}
        headerSelector="#h"
        navigation={<Navigation activeHref="#/distributions" />}
        content={
          loading || context == null ? (
            <Box/>
          ) : (
            <ContentLayout header={<Header variant="h1" />}>
              <Channels userId={user.attributes.sub} context={context} setContext={setContext} />
            </ContentLayout>
          )
        }
      />
    </Box>
  );
}

export default withAuthenticator(App);
