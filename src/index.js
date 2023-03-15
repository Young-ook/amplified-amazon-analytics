import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { AppLayout } from "@cloudscape-design/components";
import { Amplify } from 'aws-amplify'

// components
import { Messages } from './components/Message';

// amplify configuration
import  config  from './aws-exports'
Amplify.configure(config)

function Channel() {
  return (
    <Messages channelId='random' />
  );
}

function App() {
  const appLayout = useRef();
  return (
    <AppLayout
      ref={appLayout}
      content={<Channel />}
    />
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
