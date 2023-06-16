// ui
import React, { useState, useRef } from "react";
import { AppLayout } from "@cloudscape-design/components";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// components
import { NavigationBar } from "./components/Navigation";
import { Workspace } from "./components/Workspace";
import { Channels } from "./components/Channel";

// application
function App ({ signOut, user }) {
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const appLayout = useRef();

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <NavigationBar />
      </div>
      <AppLayout
        ref={appLayout}
        headerSelector="#h"
        navigation={<Workspace setActiveWorkspace={setActiveWorkspace} />}
        content={<Channels workspaceId={activeWorkspace} />}
      />
    </>
  );
}

export default withAuthenticator(App);
