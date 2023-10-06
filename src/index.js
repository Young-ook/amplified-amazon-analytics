import React from "react";
import { createRoot } from "react-dom";
import { Amplify, Analytics } from "aws-amplify";
import App from "./App";

// amplify configuration
import  config  from "./aws-exports";
Amplify.configure(config);

const root = createRoot(document.getElementById('root'));
root.render(<App />);

Analytics.autoTrack('session', {
    enable: true,
    attributes: {
        attr: 'attr'
    },
});

Analytics.autoTrack('pageView', {
    // REQUIRED, turn on/off the auto tracking
    enable: true,
    eventName: 'pageView',
    // OPTIONAL, by default is 'multiPageApp'
    // you need to change it to 'SPA' if your app is a single-page app like React
    type: 'SPA',
    getUrl: () => {
        return window.location.origin + window.location.pathname;
    }
});
