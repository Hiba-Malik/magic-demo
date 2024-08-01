// SomeComponent.js
import React from 'react';
import { useAuth } from './AuthContext';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import './App.css';
import Erc20 from "./Erc20.json"


const ContractCall = () => {
  const { provider } = useAuth();
  console.log(provider);
  const interactWithSmartContract = async () => {
    if (provider) {
      const signer = provider.getSigner();
      console.log(signer)
      console.log("signer", await signer.getAddress());
      const token = new ethers.Contract("0xe09ceE0bDcf631Fcf5baa4f00E6e00A28462748a", Erc20.abi, signer)

      // Example function call
      try {
        await (await token.approve(someSmartContractAddress, "10000000000000000")).wait();
      } catch (error) {
        console.error('Error interacting with contract:', error);
      }
    } else{
      console.log('No provider found');
      toast.error('No provider found!');

    }
  };

  return (
    <div>
      <button className='button' onClick={interactWithSmartContract}>Interact with Smart Contract</button>
    </div>
  );
};

export default ContractCall;
