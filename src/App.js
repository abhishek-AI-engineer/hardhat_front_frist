import { useState, useEffect } from 'react';
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [greeting, doGreeting] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(()=>{
    const loadProvider = async ()=> {
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  //after deploy you found a contract
      const url = "http://localhost:8545";
      const provider = new ethers.providers.JsonRpcProvider(url);
      const contract = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        provider
      );      
      setContract(contract);
      setProvider(provider);
      // console.log(contract);
      // console.log("hello above");
    };
    loadProvider();
  },[]);
  useEffect(()=> {
    const getGreetings = async ()=> {
      const greeting = await contract.greet();
      // console.log('greeet->',greeting);
      doGreeting(greeting);
    };
    // contract && getGreetings();
    contract && getGreetings();
  },[contract]);


  const changeGreetings = async ()=>{
    const input = document.querySelector('#value');
    const signer = contract.connect(provider.getSigner());
    signer.setGreeting(input.value);
    setTimeout(function(){
      window.location.reload(1);
    }, 5000)
  };
  return (
    <div className="center">
      <h3>{greeting}</h3>
      <input className='input' type='text' id='value'></input>
      <button className='button' onClick={changeGreetings}>change</button>
    </div>
  );
}

export default App;