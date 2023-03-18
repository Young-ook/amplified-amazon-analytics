// ui
import React, { useRef } from "react";
import { createRoot, createPortal } from "react-dom";
import { Amplify } from "aws-amplify";
import { AppLayout } from "@cloudscape-design/components";

// components
import { NavigationBar, Workspace } from "./components/Navigation";
import { Channels } from "./components/Channel";

// amplify configuration
import  config  from "./aws-exports";
Amplify.configure(config);

function App() {
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

const root = createRoot(document.getElementById('root'));
root.render(<App />);
