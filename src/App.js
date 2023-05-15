// ui
import React, { useRef } from "react";
import { AppLayout } from "@cloudscape-design/components";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// components
import { NavigationBar, Workspace } from "./components/Navigation";
import { Channels } from "./components/Channel";

// application
function App ({ signOut, user }) {
  const appLayout = useRef();
  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <NavigationBar />
      </div>
      <AppLayout
        ref={appLayout}
        headerSelector="#h"
        navigation={<Workspace />}
        content={<Channels />}
      />
    </>
  );
}

export default withAuthenticator(App);
