import React, { useRef } from "react";
import { createRoot, createPortal } from "react-dom";
import { Amplify } from "aws-amplify";
import App from "./App";

// amplify configuration
import  config  from "./aws-exports";
Amplify.configure(config);

const root = createRoot(document.getElementById('root'));
root.render(<App />);
