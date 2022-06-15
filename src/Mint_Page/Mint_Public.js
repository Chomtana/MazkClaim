import { ReactComponent as LeftStoryLine } from "../assets/left.svg";
import "../Check_Page/Check_Page.css";
import "../header/Header_2.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import Web3 from "web3";
import "../Mint_Page/Mint_Page.css"
import { getAirdropAmount, getProof } from "../merkle/merkleTree";
import { getAllByPlaceholderText } from "@testing-library/react";
import { id } from "ethers/lib/utils";
//import { id } from "ethers/lib/utils";

var ad_short;
var isConnected = false;
var isConnectedAndWhitelisted = false;
var isAmountAvailable = false;
var isRecentlyCompleted = false;
var availablemint = 5;
var interv2_Bar;
var contractAD = '0xfa3c785b3F9E6140a9D058976D85BBB9bdD704B0';

function Mint_Page() {
  document.getElementById("root").style.display = ''; 
  document.getElementById("preload").style.display = 'none';  
  
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  
  const claimNFTs = () => {
    clearInterval(interv2_Bar);
    let cost = data.cost;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = Web3.utils.toWei((cost * mintAmount).toString());
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    document.getElementById('mintpage_mint_waiting').style.display = 'none';
    document.getElementById("mintpage_processing").style.display = "block";
    document.getElementById("mintpage_mintbtn").style.display = 'none';
    document.getElementById("mintpage_mintbtn_disabled").style.display = 'flex';
    document.getElementById('mintpage_upbtn').style.pointerEvents = 'none';
    document.getElementById('mintpage_downbtn').style.pointerEvents = 'none';
    blockchain.smartContract.methods
      [data.publicSale ? 'publicSaleMint' : 'airdropMint'](...(data.publicSale ? [] : [getAirdropAmount(blockchain.account)]), mintAmount, ...(data.publicSale ? [] : [data.proof]))
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setMintFail();
        interv2_Bar = setInterval(readAllMinted , 10000);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setMintComplete();
        interv2_Bar = setInterval(readAllMinted , 10000);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getMaxNFTs = () => {
    clearInterval(interv2_Bar);
    blockchain.smartContract.methods.numberMinted(blockchain.account).call()
    .then((numberMinted) => {
      interv2_Bar = setInterval(readAllMinted , 10000);
      availablemint = data.publicSale ? 5 : getAirdropAmount(blockchain.account) - data.mintedCount;
      document.getElementById('mintpage_mint_waiting').style.display = 'flex';
      document.getElementById('mintpage_detail_text').style.display = 'none';
      document.getElementById('mintpage_detail_header').style.display = 'none';
      //document.getElementById('mintpage_text_whitelisted').style.display = 'none';
      document.getElementById('mintpage_ready').style.fontSize = document.getElementById('mintpage_sub1').offsetWidth/12 + 'px';
      document.getElementById('mintpage_ready').innerHTML = availablemint;
      isAmountAvailable = true;
      setMintAmount(availablemint);
    });
  };

  const decrementMintAmount = () => {
    if(isConnectedAndWhitelisted){
      if(isAmountAvailable){
        let newMintAmount = mintAmount - 1;
        if (newMintAmount < 1) {
          newMintAmount = 1;
        }
        document.getElementById('mintpage_ready').innerHTML = newMintAmount;
        setMintAmount(newMintAmount);
      }else{
        mintBTNCliked();
      }
    }
  };

  const incrementMintAmount = () => {
    if(isConnectedAndWhitelisted){
      if(isAmountAvailable){
        let newMintAmount = mintAmount + 1;
        if (newMintAmount > availablemint) {
          newMintAmount = availablemint;
        }
        document.getElementById('mintpage_ready').innerHTML = newMintAmount;
        setMintAmount(newMintAmount);
      }else{
        mintBTNCliked();
      }
    }
  };

  const getData = () => {
    if(CONFIG.CONTRACT_ADDRESS){
      readAllMinted();
    }
    resetUI();
    if (blockchain.account) {
      dispatch(fetchData(blockchain.account));
      connectedWallet();
    }
  };

  function connectedWallet() {
    ad_short = "0" +  blockchain.account.substring(1,8) + "..." + blockchain.account.substring(blockchain.account.length - 4) + "  ";
    document.getElementById('mintpage_address').style.display = 'flex';
    document.getElementById('mintpage_connectwallet_btn').style.display = 'none';
    //document.getElementById('mintpage_detail_text').style.display = 'none';
    //document.getElementById('mintpage_detail_header').style.display = 'none';
    //document.getElementById('mintpage_checking_whitelist').style.display = 'flex';
    isConnectedAndWhitelisted = true;
    showWLSuccess();
    isConnected = true;
  }

  const mintBTNCliked = () => {
    if(isConnectedAndWhitelisted && !isAmountAvailable && !isRecentlyCompleted) {
      getMaxNFTs();
    }else if(isConnectedAndWhitelisted && isAmountAvailable && !isRecentlyCompleted) {
      claimNFTs();
    }else if(isConnectedAndWhitelisted && isAmountAvailable && isRecentlyCompleted) {
      isRecentlyCompleted = false;
      resetAll();
    }
  }

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    interv2_Bar = setInterval(readAllMinted , 10000);
    document.getElementById('mintpage_time').style.display = 'none';
    getConfig();
    MintPage_ChangeFontSize();
    window.addEventListener('resize', MintPage_ChangeFontSize);
    return () => {
      window.removeEventListener('resize', MintPage_ChangeFontSize);
      clearInterval(interv2_Bar);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  useEffect(() => {
    console.log(data)
    if(data && data.loaded){   
      if (data.whitelisted) {
        setFeedback('You have been whitelisted');
      } else {
        setFeedback("You aren't whitelisted");        
      }

      getMaxNFTs();
    }
  }, [data]);

  useEffect(() => {
    if(CONFIG.CONTRACT_ADDRESS){
      readAllMinted();
    }
  },[CONFIG]);

  function setMintComplete() {
    readAllMinted();
    document.getElementById('mintpage_mintbtn').style.display = 'flex';
    document.getElementById('mintpage_mintbtn_disabled').style.display = 'none';
    document.getElementById('mintpage_success').style.display = 'block';
    document.getElementById('mintpage_mint_waiting').style.display = 'none';
    document.getElementById("mintpage_processing").style.display = "none";
    document.getElementById("mintpage_ready").style.display = "none";
    document.getElementById("mintpage_opensea").style.display = "flex";
    isRecentlyCompleted = true;
  }
  
  function setMintFail() {
    resetAll();
    document.getElementById('mintpage_fail').style.display = 'flex';
    document.getElementById('mintpage_detail_text').style.display = "none";
    document.getElementById('mintpage_detail_header').style.display = "none";
    document.getElementById('mintpage_connectwallet_btn').style.display = 'none';
    document.getElementById('mintpage_mintbtn').style.display = 'none';
    document.getElementById('mintpage_mint_waiting').style.display = 'none';
    setTimeout(()=>{
      resetAll();
    },3000);
  }
  
  function showWLSuccess() {
    document.getElementById('mintpage_checking_whitelist').style.display = 'none';
    document.getElementById("mintpage_mintbtn").style.display = 'flex';
    document.getElementById("mintpage_mintbtn_disabled").style.display = 'none';
    //document.getElementById('mintpage_text_whitelisted').style.display = 'flex';
    document.getElementById('mintpage_text_unwhitelisted').style.display = 'none';
    document.getElementById('mintpage_ready').style.display = 'flex';
    document.getElementById('mintpage_upbtn').style.pointerEvents = 'auto';
    document.getElementById('mintpage_downbtn').style.pointerEvents = 'auto';
  }

  function readAllMinted() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    var abi = JSON.parse('[{"inputs":[{"internalType":"uint256","name":"_preSaleStartTime","type":"uint256"},{"internalType":"uint256","name":"_maxBatchSize","type":"uint256"},{"internalType":"uint256","name":"_collectionSize","type":"uint256"},{"internalType":"uint256","name":"_amountForDevs","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"}],"name":"allowlistMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"allowlistPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amountForDevs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devMintAfterPublic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getOwnershipData","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"}],"internalType":"struct ERC721A.TokenOwnership","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPreSaleOn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPublicSaleOn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxPerTxDuringMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextOwnerToExplicitlySet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"numberMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"preSaleStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"publicSaleMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"publicSaleStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"setOwnersExplicit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"timestamp","type":"uint32"}],"name":"setPreSaleStartTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"timestamp","type":"uint32"}],"name":"setPublicSaleStartTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_root","type":"bytes32"}],"name":"setRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usedDevMint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawMoney","outputs":[],"stateMutability":"nonpayable","type":"function"}]');
    const contract = new web3.eth.Contract(abi , contractAD);   // options = {from: account, value: 100000 }
    contract.methods.totalSupply().call().then((totalMinted)=>{
      document.getElementById('minted_amount').innerHTML = parseInt(totalMinted) + '/10000';
      //var percentH = parseInt(95 - 95*totalMinted/10000);
      //document.getElementById('mintpage_greenbar_img').style.clipPath = 'inset('+ percentH + '% 0% 0% 0%)'; 
    });
  }

  function resetUI(){
    document.getElementById('mintpage_detail_text').style.display = 'flex';
    document.getElementById('mintpage_detail_header').style.display = 'flex';
    document.getElementById('mintpage_mintbtn').style.display = 'none';
    document.getElementById('mintpage_mintbtn_disabled').style.display = 'flex';
    document.getElementById('mintpage_connectwallet_btn').style.display = 'flex';
    isConnected = false;
    isConnectedAndWhitelisted = false;
    isAmountAvailable = false;
    availablemint = 2;
    
    //document.getElementById('mintpage_text_whitelisted').style.display = 'none';
    document.getElementById('mintpage_address').style.display = 'none';
    document.getElementById('mintpage_upbtn').style.pointerEvents = 'none';
    document.getElementById('mintpage_downbtn').style.pointerEvents = 'none';
    document.getElementById('mintpage_text_whitelisted').style.display = 'none';
    document.getElementById('mintpage_text_unwhitelisted').style.display = 'none';
    document.getElementById('mintpage_full').style.display = 'none';
    document.getElementById('mintpage_mint_waiting').style.display = 'none';
    document.getElementById('mintpage_time').style.display = 'none';
    document.getElementById("mintpage_opensea").style.display = "none";
    document.getElementById('mintpage_ready').style.display = 'none';
    document.getElementById('mintpage_ready').innerHTML = 'READY!';
    var msw = document.getElementById('mintpage_sub1').offsetWidth;
    document.getElementById('mintpage_ready').style.fontSize = msw/30 + 'px';
    document.getElementById('mintpage_processing').style.display = 'none';
    document.getElementById('mintpage_success').style.display = 'none';
    document.getElementById('mintpage_fail').style.display = 'none';
  }
  function resetAll() {
    readAllMinted();
    resetUI();
  }

  return (
    <div id='mintpage_maindiv'>
      <div id='checkpage_backhome'>
          <Link to="/" ><LeftStoryLine style={{display:'inline',marginBottom:'4%'}}  /></Link>&nbsp;&nbsp;
          <Link to="/" id="checkpage_backhome_text">BACK HOME</Link>
      </div>
      <div id='mintpage_container'>
        <div id='mintpage_sub1'>
          <div id='mintpage_detail_header'>
           CLAIM YOU MAZK
          </div>
          <div id='mintpage_ready'>
            READY!
          </div>
          <div id='mintpage_opensea'>
            <a target="_blank" href="https://testnets.opensea.io/collection/mazk-gang-aut6lffzph" ><img alt="" src="opensea.svg" /></a>
          </div>
          <div id='mintpage_checking_whitelist'>
            Whitelist Checking ...
          </div>
          <div id='mintpage_detail_text'>
            <center>
              <span className="mintpage_detail_text_big1">MAZKGANG HOLDERS</span><br/>
              You can claim 1 NFT / 1 Mazk<br/><br/>
              <span className="mintpage_detail_text_big1">MAZK-OG</span><br/> 
              For VeggiesGangster/ ZooFever/ DeepSouls Holders<br/> 
              You can claim 1 NFT / 1 Mazk<br/><br/>
              <span className="mintpage_detail_text_big1">MAZKOG SPECIAL GENESIS</span><br/>
              For MazkedVillains Holders<br/>
              You can claim 1 NFT / 1 Mazk<br/>
              get 3 more Mazkgang NFTs on top / 1 Wallet

            </center>
          </div>
          <div id='mintpage_text_whitelisted'>
            <center>
              <span id="mintpage_text_whitelisted_head">PUBLIC-SALE </span><br/><br/>
              MAXIMUM 5 MINTS PER TRANSACTION<br/>
              PRICE 0.15 ETH PER MINT <br/>
              MAKE SURE YOUR WALLET IS FUNDED
            </center>
          </div>
          <div id='mintpage_mint_waiting'>
            <center>
              <img id='mint_wait_gif' src='MINT_Waiting.gif' />
              AWESOME YOU GOT {mintAmount} MAZK
              {/* <br/><span style={{fontSize:'150%',lineHeight:'100%'}}>TOTAL {(mintAmount*0.15).toFixed(2)} ETH + GAS </span> */}
              <br/><span style={{fontSize:'150%',lineHeight:'100%'}}>FREE CLAIM + GAS </span>
            </center>
          </div>
          <div id='mintpage_text_unwhitelisted'>
            <center>
              <span id="mintpage_text_unwhitelisted_head">SORRY!</span><br/>
              YOU ARE NOT ON THE MAZK LIST<br/>
              PLEASE COME BACK<br/>
              PUBLIC SALE<br/>
              11 JUNE 2022
            </center>
          </div>
          <div id='mintpage_full'>
            <center>
              <span id="mintpage_full_header">OOPS!</span><br/><br/>
              <div id="mintpage_full_text">
                YOU WALLET IS ALREADY FULLY MINTED.<br/>
                MAXIMUM 2 MINTS PER WALLET
              </div>
            </center>
          </div>
          <div id='mintpage_fail'>
            <center>
              <span id="mintpage_fail_header">OOPS!</span><br/><br/>
              <div id="mintpage_fail_text">
                SOMETHING WENT WRONG.<br/>
                PLEASE TRY AGAIN.
              </div>
            </center>
          </div>
          <div id='mintpage_connectwallet_btn' onClick={(e) => {
            e.preventDefault();
            dispatch(connect());
            getData();
          }}>
              
          </div>
          <div id="mintpage_address">
            <center>&nbsp;{ad_short == "" ? null : ad_short }</center>
          </div>
          <div id='mintpage_upbtn' onClick={incrementMintAmount} />  
          <div id='mintpage_downbtn' onClick={decrementMintAmount} />
          <div id='mintpage_mintbtn' onClick={mintBTNCliked}/> 
          <div id='mintpage_mintbtn_disabled'/>
          <div id='mintpage_time' ><center>LIVE IN<br/>72:30<br/>hours</center></div> 
          <div id='minted_amount' >1/10000</div>
          <div id='mintpage_greenbar2'>
            <img src="greenmintbar2.gif" id='mintpage_greenbar2_img'></img>
          </div>
          <div id='mintpage_processing'>
            <center>
              <img src='MINT_Processing2.gif' id='mintpage_processing_img' alt=""></img>
              <br/>... MAZK IN PROGRESS ...
            </center>
          </div>
          <div id='mintpage_success'>
            <center>
              <img src='complete.gif' id='complete' style={{width:'37%',height:'auto'}} alt=""></img><br/><br/>
              <img src='urmazk.png' id='urmazk'  style={{width:'95%',height:'auto'}} alt=""></img>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}
export default  Mint_Page;

function MintPage_ChangeFontSize() {
  var msw = document.getElementById('mintpage_sub1').offsetWidth;
  document.getElementById('mintpage_detail_text').style.fontSize = msw/60 + 'px';
  var cols = document.getElementsByClassName('mintpage_detail_text_big1');
  for(var i = 0; i < cols.length; i++) { cols[i].style.fontSize = msw/40 + 'px'; }
  //document.getElementById('mintpage_text_whitelisted').style.fontSize = msw/50 + 'px';
  document.getElementById('mintpage_detail_header').style.fontSize = msw/24 + 'px';
  document.getElementById('mintpage_address').style.fontSize = msw/42 + 'px';
  //document.getElementById('mintpage_text_whitelisted').style.fontSize = msw/36 + 'px';
  //document.getElementById('mintpage_text_whitelisted_head').style.fontSize = msw/16 + 'px';
  document.getElementById('mintpage_text_unwhitelisted').style.fontSize = msw/36 + 'px';
  document.getElementById('mintpage_text_unwhitelisted_head').style.fontSize = msw/16 + 'px';
  document.getElementById('mintpage_full').style.fontSize = msw/36 + 'px';
  document.getElementById('mintpage_fail').style.fontSize = msw/36 + 'px';
  document.getElementById('mintpage_full_header').style.fontSize = msw/16 + 'px';
  document.getElementById('mintpage_fail_header').style.fontSize = msw/16 + 'px';
  document.getElementById('mintpage_mint_waiting').style.fontSize = msw/36 + 'px';
  document.getElementById('mintpage_time').style.fontSize = msw/36 + 'px';
  document.getElementById('mintpage_ready').style.fontSize = msw/30 + 'px';
  document.getElementById('minted_amount').style.fontSize = msw/40 + 'px';
  document.getElementById('mint_wait_gif').style.width = msw/2.1+'px'
  document.getElementById('mintpage_processing').style.fontSize = msw/40+'px'
}