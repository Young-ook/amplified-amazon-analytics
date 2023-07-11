import React from "react";
import { createRoot } from "react-dom";
import { Amplify } from "aws-amplify";
import App from "./App";

// amplify configuration
import  config  from "./aws-exports";
Amplify.configure(config);

const root = createRoot(document.getElementById('root'));
root.render(<App />);
