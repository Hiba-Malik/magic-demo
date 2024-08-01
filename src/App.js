import { useAuth } from './AuthContext';
import ContractCall from './contractCall';
import { magic } from './lib/magic';
import { ethers } from 'ethers';
import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";
// import Escrow from "./GalileoEscrow.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const { login, logout } = useAuth();
  const { sdk } = useSDK();
  const [account, setAccount] = useState();

  const loginWithMagic = async () => {
    try {
      console.log(new ethers.providers.Web3Provider(magic.rpcProvider));
      let didToken = await magic.auth.loginWithEmailOTP({
        email: EMAIL,
        showUI: true,
      });
      console.log('Magic Login:', didToken);
      console.log(await magic.user.getMetadata());
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      login(provider);
      toast.success('Logged in with Magic!');
    } catch (error) {
      console.error('Magic login failed:', error);
    }
  };

  const loginWithMetaMask = async () => {
    try {
      if (window.ethereum) {
        const accounts = await sdk?.connect();
        setAccount(accounts?.[0]);
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        await ethersProvider.send('eth_requestAccounts', []);
        login(ethersProvider);
        toast.success('Logged in with MetaMask!');
      } else {
        alert('MetaMask is not installed');
      }
    } catch (err) {
      console.warn("MetaMask login failed:", err);
    }
  };

  const handleLogout = () => {
    logout();
    sdk?.terminate();
    magic.user.logout();
    toast.success("Logged out!");
  };

  return (
    <>
      <div className="App">
        <ToastContainer />
        <button className='button' onClick={loginWithMagic}>Login with Magic</button>
        <button className='button' onClick={loginWithMetaMask}>Login with MetaMask</button>
        <button className='button' onClick={handleLogout}>Logout</button>
      </div>
      <ContractCall></ContractCall>
    </>
  );
}

export default App;
