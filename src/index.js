import React, { useState, useEffect, useRef } from 'react';
import { createRoot, createPortal } from 'react-dom';
import { AppLayout, ContentLayout, Header } from "@cloudscape-design/components";
import { Amplify } from 'aws-amplify'

// components
import { NavigationBar } from './components/Navigation';
import { Messages } from './components/Message';

// amplify configuration
import  config  from './aws-exports'
Amplify.configure(config)

function Channel() {
  return (
    <ContentLayout
      header={<Header variant="h1" />}
    >
      <Messages channelId='random' />
    </ContentLayout>
  );
}

function App() {
  const appLayout = useRef();
  return (
    <>
      <NavigationBar />
      <AppLayout
        ref={appLayout}
        headerSelector="#header"
        content={<Channel />}
      />
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
