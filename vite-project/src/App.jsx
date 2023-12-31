import React, { useState } from 'react'
import './App.css'
import { web3Accounts, web3AccountsSubscribe, web3FromAddress, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { stringToHex, u8aToHex } from "@polkadot/util";
import { WsProvider, ApiPromise } from '@polkadot/api';
import Identicon from '@polkadot/react-identicon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {decodeAddress} from  '@polkadot/util-crypto';
import logo from './assets/logo-black.png'
import { Keyring } from '@polkadot/keyring';


//Dapp name
const NAME = 'Polkadot Punks';
//collection id
const u32 = "7";

//witnessdata of the mint
const witnessData = {
  ownedItem: 0
};


//Firebase fetch api get item id
//adding firebase api link into response
const response = await fetch("");
const movies = await response.json();
var u33 = movies.u33;
console.log(u33)






///nft metadata upload nft metadata json file to ipfs copy link like this///
//input json metadata ipfs link here
const cloudflare_url = "ipfs://bafybeicf7md3hsba3m2thhhnrfyct4dyu36bysw7ol7lw5agopf5vbxeqe/";
const json = ".json";
const metadata = cloudflare_url + u33 + json;
const Bytes = stringToHex(metadata);




 


//main app
function App() {
  
  const [api, setApi] = useState();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setselectedAccounts] = useState();



  const setup = async() => {
    //This wsProvider is for Polkadot based mint dapp for kusama change statemint to statemine only
    const wsProvider = new WsProvider("wss://statemint-rpc.polkadot.io");
    const api = await ApiPromise.create({ provider: wsProvider})
    setApi(api);
  }






  //connect function
  const connect = async() => {
    const extension = await web3Enable(NAME);
   


    




    
    /*const SubWalletExtension = window.injectedWeb3['subwallet-js'];
    const extension = await SubWalletExtension.enable();*/
    
        if (!extension) {
          throw Error ("NO_Extension Found");
    
        }
        const allAccounts = await web3Accounts();
        setAccounts(allAccounts);
    
        if(allAccounts.length == 1) {
          setselectedAccounts(allAccounts[0]);
        }

        
  }



  //select wallet
  const selectaccount = async() => {
       const selectaccounts = document.getElementById("select").value;
     const account = accounts.find(
      account => account.address == selectaccounts)
  
      if (!account){
        throw Error ("NO_Account_Found");
      }else{
      setselectedAccounts(account)
      
      }
      
  }







  





  ///bridge Dot to Asset Hub for Ksm to Asset hub change wsProvider to wss://kusama-rpc.polkadot.io

  async function teleport() {
    const publicKey = decodeAddress(selectedAccount.address);
  const hexPublicKey = u8aToHex(publicKey);
  console.log(hexPublicKey)
    const provider = new WsProvider('wss://rpc.polkadot.io');
     const api = await ApiPromise.create({ provider });
    setApi(api);
    const allInjected = await web3Enable('my cool dapp');
    // returns an array of { address, meta: { name, source } }
// meta.source contains the name of the extension that provides this account
const allAccounts = await web3Accounts();

// finds an injector for an address
const SENDER = selectedAccount.address;
const injector = await web3FromAddress(SENDER);

// the address we use to use for signing, as injected
  const dest = {
    V3 : {
      parents : 0,
      interior : {
        X1 : {
         parachain : 1000
        }
      }
    }
  }
  const beneficiary = {
    V3: {
      parents: 0,
      interior: {
        X1: {
          AccountId32: {
            network: null,
            id :  hexPublicKey ,
            
          }
        }
      }
    }
  }
  const assets = {
    V3: [
      {
        id: {
          Concrete: {
            parents: 0,
            interior: "Here"
          }
        },
        fun: {
          //Token amount dot or ksm
          Fungible : 50500000000
        }
      }
    ]
  }
  const feeAssetItem = 0;
  const weightLimit = "Unlimited";









api.tx.utility.batchAll([ await api.tx.xcmPallet.limitedTeleportAssets(dest, beneficiary, assets, feeAssetItem, weightLimit)]).signAndSend(SENDER, { signer: injector.signer }, async ({ status }) => {
    if (status.isInBlock) {
        toast.success(`Completed at block hash #${status.asInBlock.toString()}` , {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });


    } else {
        toast.info(`Current status: ${status.type}` , {
          position: "top-right",
          autoClose: 25009,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
    }
}).catch((error) => {
    toast.error(`Transaction failed' ${error}` , {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    });




  }
  //Mint Function 
async function mint(){
  //kusama wsProvider wss://kusama-rpc.polkadot.io
  const wsProvider = new WsProvider("wss://statemint-rpc.polkadot.io");
    const api = await ApiPromise.create({ provider: wsProvider})
    setApi(api);
  // (this needs to be called first, before other requests)
const allInjected = await web3Enable('my cool dapp');

// returns an array of { address, meta: { name, source } }
// meta.source contains the name of the extension that provides this account
const allAccounts = await web3Accounts();

// the address we use to use for signing, as injected
const SENDER = selectedAccount.address;




// finds an injector for an address
const injector = await web3FromAddress(SENDER);

// sign and send our transaction - notice here that the address of the account
// (as retrieved injected) is passed through as the param to the `signAndSend`,
// the API then calls the extension to present to the user and get it signed.
// Once complete, the api sends the tx + signature via the normal process

    const MultiAddress = SENDER;

await api.tx.nfts.mint(u32, u33, MultiAddress,  witnessData ).signAndSend(SENDER, { signer: injector.signer }, async ({ status }) => {
    if (status.isInBlock) {
      //Enter seed phrase do not share this line of code and make your github repository private seed phrase is required to set metadata of the nft because only collection owner is allowed to set metadata
       const MNEMONIC = ' ';

      // type: ed25519, ssFormat: 42 (all defaults
      const keyring = new Keyring({ type: 'sr25519'});
      const pair = keyring.addFromUri(MNEMONIC);
      
      await api.tx.nfts.setMetadata(u32, u33, Bytes )
          .signAndSend(pair);
        toast.success(`Completed at block hash #${status.asInBlock.toString()}` , {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });

//increasing item id to next once transaction is confirmed
        u33++



               //changing firebase stored item id to next
      //adding firebase api link again for change in response
  const res = await fetch("", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "u33": u33
    })
  });
  console.log(res)
  //redirecting user to the nft page on kodadot
  const kodadot = "https://canary.kodadot.xyz/ahp/gallery/7-";
      let u33 = u33 - 1 ;
      const link = kodadot + u33;
  window.location.href = (link);
      
    } else {
        toast.info(`Current status: ${status.type}` , {
          position: "top-right",
          autoClose: 25009,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
    }
}).catch((error) => {
    toast.error(`Transaction failed' ${error}` , {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  
      
});




}
  return (
    <>
    <div>
        <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored" />
      </div>
<div className='identicons'>
{accounts.length == 0 ? (
    <button onClick={connect} className='connect'>Connect Wallet</button>
    ) : null}
    <select onChange={selectaccount} className='select' id='select'>
      <option value="">Select Account</option>
      {accounts.map((account) => (
        <option value={account.address}>{account.meta.name || account.address}</option>
      ))}
      </select>
      <Identicon
  value={selectedAccount?.address}
  size={32}
  theme="polkadot" className='icon'
/>

</div>
      
      
      <h1 className='PolkadotPunks'>Polkadot Punks</h1>
<hr className='hr'></hr>
<h2 className='count'>{u33} / 3000 Minted</h2>
<h2 className='Price'> Mint Price : 5 DOT</h2>
      <div className='teleport-style'>
<button onClick={teleport} className='teleport'>Teleport</button>
</div>
<br></br>
<div className='mintitem'>
<button onClick={mint} className='mint' >Mint Item</button>
</div>

<hr className='hr2'></hr>
<small>©Polkadot Punks, 2023.</small>
<div>
  <footer>
  <a href="https://twitter.com/polkadot_punks"><img className='logo' src={logo} alt="Logo" /> </a>
  </footer>
</div>
    </>
  )
}
export default App
