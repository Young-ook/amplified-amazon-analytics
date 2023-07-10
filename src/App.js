// ui
import React, { useState, useRef } from "react";
import {
  AppLayout,
  ContentLayout,
  Header,
} from "@cloudscape-design/components";
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
        content={
          <ContentLayout header={<Header variant="h1" />}>
            <Channels userId={user.attributes.sub} workspace={activeWorkspace} />
          </ContentLayout>
        }
      />
    </>
  );
}

export default withAuthenticator(App);
