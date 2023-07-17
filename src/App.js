// ui
import React, { useState, useRef } from "react";
import {
  AppLayout,
  Box,
  ContentLayout,
  Flashbar,
  Header,
  SpaceBetween
} from "@cloudscape-design/components";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// components
import { Navigation, NavigationBar } from "./components/Navigation";
import { Channels } from "./components/Channel";

// application
function App ({ signOut, user }) {
  const appLayout = useRef();

  const [alerts, setAlerts] = useState([
    {
      type: "error",
      dismissible: true,
      dismissLabel: "Dismiss message",
      header: "Failed to update instance id-4890f893e",
      content: "This is a dismissible error message",
      id: "message_3",
      onDismiss: () => setAlerts(items => items.filter(item => item.id !== "message_3"))
    },
    {
      type: "warning",
      dismissible: true,
      dismissLabel: "Dismiss message",
      content: "This is a warning flash message",
      id: "message_4",
      onDismiss: () => setAlerts(items => items.filter(item => item.id !== "message_4"))
    },
  ]);

  return (
    <Box>
      <NavigationBar userInfo={user.attributes} />
      <AppLayout
        ref={appLayout}
        headerSelector="#h"
        navigation={<Navigation activeHref="#/distributions" />}
        content={
          <ContentLayout
            header={
              <SpaceBetween size="m">
                <Header variant="h1" />
                <Flashbar
                  items={alerts}
                  i18nStrings={{
                    ariaLabel: "Notifications",
                    notificationBarAriaLabel: "View all notifications",
                    notificationBarText: "Notifications",
                    errorIconAriaLabel: "Error",
                    warningIconAriaLabel: "Warning",
                    successIconAriaLabel: "Success",
                    infoIconAriaLabel: "Info",
                    inProgressIconAriaLabel: "In progress"
                  }}
                  stackItems
                />
              </SpaceBetween>
            }
          >
            <Channels
              userId={user.attributes.sub}
              alerts={alerts}
              setAlerts={setAlerts}
            />
          </ContentLayout>
        }
      />
    </Box>
  );
}

export default withAuthenticator(App);
