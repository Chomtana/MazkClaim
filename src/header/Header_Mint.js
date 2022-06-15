//import { useState, useRef } from "react";
import { ReactComponent as CloseMenu } from "../assets/x2.svg";
import { ReactComponent as MenuIcon } from "../assets/menu2.svg";
import "./Header_2.css";
//import Web3Modal from "web3modal";
import { Link } from "react-router-dom";

export default function Header() {
  
  const signOut = async (e) => {
    document.getElementById('bt1').style.display = "inline";
    document.getElementById('bt2').style.display = "none";
    document.getElementById('ad1').innerHTML = "";
  }
  
  function openMiniMenu(){
    document.getElementById('mini-open-menu').style.display = 'none';
    document.getElementById('mini-close-menu').style.display = 'inline';
    document.getElementById('upmost_right_menu_mini').style.display = 'block';
    document.getElementById('upmost_right_menu_mini').style.right = '0px';
    document.getElementById('upmost_right_menu_mini').style.filter = 'blur(0px)';
    document.getElementById('upmost_right_menu_mini').style.transition = 'cubic-bezier(0.075, 0.82, 0.165, 1) all .75s';
  }
  
  function closeMiniMenu(){
    document.getElementById('mini-open-menu').style.display = 'inline';
    document.getElementById('mini-close-menu').style.display = 'none';
    document.getElementById('upmost_right_menu_mini').style.right = '-300vw';
    document.getElementById('upmost_right_menu_mini').style.filter = 'blur(300px)';
    document.getElementById('upmost_right_menu_mini').style.transition = 'all 4s';
  }
  
  function openStoryLine(){
    closeMiniMenu();
    document.getElementById('storyline_main_container').style.transition = 'all 0.6s';
    document.getElementById('storyline_main_container').style.top = '0px';
    
    document.getElementById('top_menu').style.filter = "blur(20px)";
    document.getElementById('comp_char_containter').style.filter = "blur(20px)";
    document.getElementById('banner_container').style.filter = "blur(20px)";
    document.getElementById('APP_FAQ').style.filter = "blur(20px)";
    document.getElementById('APP_MASTER').style.filter = "blur(20px)";
  }
  return (
      <div className="header" >
        <div id='upmost_left_menu'>
          <center>
            <button id='wallet_address'> </button>
            <a rel="noreferrer" href="https://twitter.com/Mazkgang?s=20&t=CD8EyvH5T4MNfb3YuQlZYQ" target={'_blank'} >
              <img alt="" src="twitter.svg" className="upmost_svg" />
            </a>
            <a rel="noreferrer" href="https://discord.gg/xakkFhAzut" target={'_blank'} >
              <img alt="" src="discord.svg" className="upmost_svg" />
            </a>
            <img alt="" src="opensea.svg" className="upmost_svg" style={{filter:'opacity(.3)'}}/>
          </center>
        </div>
        <div id='upmost_right_menu'>
          <Link to="/" className="upmost_btn2">BACK HOME</Link>
        </div>
        <div id='upmost_right_menu_mini'>
          <button href="" className="upmost_btn_mini2">BACK HOME</button><br/>
        </div>
        
        <div id='center_div_banner'>
          <center>
            
            <br/>
            {/* <img id='bt1' src='Connect-Wallet.png' onClick={test111} /> */}
            <button><img alt="" id='mazk_story_btn' src='mazk_story_btn_2.png' onClick={openStoryLine}/></button>
          </center>
        </div>
       
        <button id='bt2' href="" className="connect_button1" style={{display:"none"}} onClick={signOut}>
            SIGN OUT
        </button>

        <div className="mobile-menu" >
          <MenuIcon id='mini-open-menu' fill="#ffac0c"  className="menu-icon"   onClick={openMiniMenu} />
          <CloseMenu id='mini-close-menu' stroke="#ffac0c"  fill="#dc7107"  className="menu-icon" onClick={closeMiniMenu} style={{display:'none'}} />
        </div>
      </div>
  );
}

