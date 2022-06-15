import { ReactComponent as LeftStoryLine } from "../assets/left.svg";
import "./Check_Page.css";
import "../header/Header_2.css";
import { Link } from "react-router-dom";
import Web3 from 'web3';
import { useState , useEffect } from 'react';
import { getProof } from "../merkle/merkleTree";
//import FetchGoogleSheet from './Papaparse';

var checkpage_subdiv1;
var checkRQAF;

export default function Header() {
  const [account, setAccount] = useState(0);
  useEffect(() => {
    document.getElementById("root").style.display = ''; 
    document.getElementById("preload").style.display = 'none';  
    checkpage_subdiv1 = document.getElementById("checkpage_subdiv1");
    
    var animate = function () {
        checkRQAF = requestAnimationFrame(animate);
        if(parseInt(checkpage_subdiv1.offsetWidth) > 0 ){
            checkPageResize();
            cancelAnimationFrame(checkRQAF);
        }
    }
    animate();
    window.addEventListener('resize',checkPageResize);
    return() => {
      cancelAnimationFrame(checkRQAF);
      window.removeEventListener('resize',checkPageResize);
    }
  }, []);

  function connect_wallet() {
    
    if(!account){
      checkMetaMask();
    }else{
      alert("Your wallet address is " + account);
    }
  } 
  
  function checkMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
      connectMetaMask()
      window.ethereum.on('accountsChanged', connectMetaMask)
    }else{
      window.location.href = 'https://metamask.app.link/dapp/www.mazkgang.io?connect=2';
    }
  }

  function showWLSuccess(){
    document.getElementById("checkpage_subdiv1").style.backgroundPositionX = "50%";
    document.getElementById("checkpage_presale_date").style.display = "block";
  }
  function showWLFail(){
    document.getElementById("checkpage_subdiv1").style.backgroundPositionX = "100%";
    document.getElementById("checkpage_social").style.display = "flex";
  }

  async function clearAndcheckPassConnect(){
    var url =  new URL(window.location.href);
    var c = url.searchParams.get('connect');
    if(c === 2) connectMetaMask();
  }
  
  clearAndcheckPassConnect();
  
  async function connectMetaMask() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const accounts = await web3.eth.requestAccounts();
    
    setAccount(accounts[0]);
    var ad_short = "  0" +  accounts[0].substring(1,8) + "..." + accounts[0].substring(accounts[0].length - 4) + "  ";
    document.getElementById("checkpage_subdiv1_2").style.display = 'none';
    document.getElementById("checkpage_subdiv1_3").style.display = 'flex';
    document.getElementById("wallet_blank").innerHTML = "<center>"+ad_short+"</center>";

    const proof = getProof(accounts[0]);

    if (proof.length > 0) {
      showWLSuccess();
    } else {
      showWLFail();
    }
  }

  return (
      <div  id="checkpage_maindiv">
        <div>
          <div id='checkpage_backhome'>
            <Link to="/" ><LeftStoryLine style={{display:'inline',marginBottom:'4%'}}  /></Link>&nbsp;&nbsp;
            <Link to="/" id="checkpage_backhome_text">BACK HOME</Link>
          </div>
        </div>

        <div id="checkpage_container">
          <div id="checkpage_subdiv1">
              <div id="checkpage_subdiv1_1">
                  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;YOU WILL FIND HTE CONNECT WALLET PAGE.
                  <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1. TO CHECK YOUR ELIGIBILITY, CLICK THE CONNECT WALLET BUTTON.
                  <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;2. IF YOU ARE THE WL, IT WILL APPEAR "CONGRATULATIONS! YOU'RE ON THE MAZK LIST." ON THE SCREEN.   
                  <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;3. IF YOU DO NOT RECEIVE WL, THE MESSAGE "SORRY,YOU ARE NOT ON THE MAZK LIST" WILL APPEAR.
                  <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;4. IF YOU CANNOT FIND YOUR WALLET ADDRESS ON THE WEBSITE, PLEASE CONTACT US ON DISCORD BY 
                  <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;CLICKING TICKET SUPPORT.
                  <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;5. IF YOU ON THE LIST , PLEASE WAIT FOR PRE-SALE DATE.
              </div>
              <div id="checkpage_presale_date">
                <center>PRE-SALE
                <br/>10 JUNE 2022</center>
              </div>
              <div id="checkpage_social">
                <center>
                  CONTACT US<br/>
                  <a rel="noreferrer" href="https://twitter.com/Mazkgang?s=20&t=CD8EyvH5T4MNfb3YuQlZYQ" target={'_blank'} >
                    <img alt="" src="twitter.svg" className="checkWL_social_svg " />
                  </a>
                  <a rel="noreferrer" href="https://discord.gg/xakkFhAzut" target={'_blank'} >
                    <img alt="" src="discord.svg" className="checkWL_social_svg " />
                  </a>
                </center>
              </div>
              <div id="checkpage_subdiv1_2">
                  <div id="checkpage_connectwallet_btn" onClick={connect_wallet}>
                  </div>
              </div>
              <div id="checkpage_subdiv1_3">
                  <div id="wallet_blank" >
                  </div>
              </div>
            </div>
        </div>
      </div>
  );
}

function checkPageResize() {
  var pl = checkpage_subdiv1.offsetWidth/70;
  checkpage_subdiv1.style.fontSize = pl+"px";
  checkpage_subdiv1.style.lineHeight= 1.4*pl+"px";
  checkpage_subdiv1.style.height = (0.58 * checkpage_subdiv1.offsetWidth) + "px";
}