import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './AuthContext';
import { MetaMaskProvider } from "@metamask/sdk-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <MetaMaskProvider
       debug={false}
       sdkOptions={{
         dappMetadata: {
           name: "Example React Dapp",
           url: window.location.href,
         },
         infuraAPIKey: INFURA_KEY,
         preferDesktop:true
       }}>
      <App />
      </MetaMaskProvider>
    </AuthProvider>
</React.StrictMode>
);

