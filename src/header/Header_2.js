//import { useState, useRef } from "react";
import { ReactComponent as CloseMenu } from "../assets/x2.svg";
import { ReactComponent as MenuIcon } from "../assets/menu2.svg";
import "./Header_2.css";
import Web3 from 'web3';
import { Link } from "react-router-dom";
import { useEffect } from "react";

var difftime , diffHour , diffMinute ,diffSecond;
var interv1;
export default function Header() {
  
  //const [account, setAccount] = useState(0); // state variable to set account.
  const getCountDown = () => {
    const today = new Date();
    //const presaleDate = new Date("June 11, 2022 03:00:00");
    const presaleDate = new Date((1654927200)*1000); 
    //const presaleDate = new Date("June 11, 2022 13:00:00");
    //alert(presaleDate.toUTCString());
    difftime = presaleDate.getTime() - today.getTime();
    diffHour = parseInt(difftime/3600/1000);
    diffMinute = Math.ceil(difftime/60/1000) - diffHour*60;
    diffSecond = parseInt(difftime/1000)%60;
  };

  const updateInterval = () => {
    getCountDown();
    document.getElementById('timeshow').innerHTML = (diffHour < 10 ? '0':'') + diffHour +"<span id='blink_me'>:</span>"+(diffMinute < 10 ? '0':'')+ diffMinute;
    clearInterval(interv1);
    document.getElementById('goto_mintpres').style.display = 'block';
    document.getElementById('waitfor_mintpres').style.display = 'none'; 
    document.getElementById('gomint_maintenance').style.display = 'none';
  }
    
  useEffect(() => {
    updateInterval();
    //interv1 = setInterval( updateInterval , 4000);
    return () => {
      clearInterval(interv1);
    }
  },[]);

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

  var scpos;
  var targetPos , deltaPos , startPos ;
  var slideAnimation;
  function mazkScroll(id) {
    closeMiniMenu();
    scpos = -200;
    startPos = window.scrollY;
    targetPos = document.getElementById(id).offsetTop;
    deltaPos = targetPos - window.scrollY;
    if(id === 'FAQ_main_container' ) {
      deltaPos -= 500;
    }
    var mazkScrollAnimate = function () {
      slideAnimation = requestAnimationFrame( mazkScrollAnimate );
      if(scpos <= 220) {
        window.scrollTo(0 , startPos + deltaPos * Math.pow(.5*(1 + Math.tanh(scpos * .017453)),1) );
        //window.scrollTo(0 , startPos + deltaPos*((scpos-180)/180));
      } else {
        window.scrollTo(0,startPos + deltaPos);
        cancelAnimationFrame(slideAnimation);
      }
      scpos += 4;
    }
    mazkScrollAnimate();
  }

  return (
      <div className="header" >
        <div id='upmost_left_menu'>
          <center>
            <span id='wallet_address'> </span>
            <a rel="noreferrer" href="https://twitter.com/Mazkgang?s=20&t=CD8EyvH5T4MNfb3YuQlZYQ" target={'_blank'} >
              <img  alt="" src="twitter.svg" className="upmost_svg" />
            </a>
            <a rel="noreferrer" href="https://discord.gg/xakkFhAzut" target={'_blank'} >
              <img  alt="" src="discord.svg" className="upmost_svg" />
            </a>
            <a id='openseaBTN1' rel="noreferrer" href="https://opensea.io/collection/mazkgangofficial" target={'_blank'} >
              <img id='openseaBTN1_SVG' alt="" src="opensea.svg" className="upmost_svg"  />
            </a>
          </center>
        </div>
        <div id='upmost_right_menu'>
          <button href="" className="upmost_btn">HOME</button>
          <button onClick={() => mazkScroll('story_img1')} className="upmost_btn">JOURNEY</button>
          <button className="upmost_btn" onClick={openStoryLine} >STORY</button>
          <button onClick={() => mazkScroll('dd')} className="upmost_btn">MAZKGANG</button>
          <button onClick={() => mazkScroll('master_essentialDiv')} className="upmost_btn">SQUAD</button>
          <button onClick={() => mazkScroll('FAQ_main_container')} className="upmost_btn">FAQ</button>
        </div>
        <div id='upmost_right_menu_mini'>
          <button href="" className="upmost_btn_mini">HOME</button><br/>
          <button onClick={() => mazkScroll('story_img1')} className="upmost_btn_mini">JOURNEY</button><br/>
          <button className="upmost_btn_mini" onClick={openStoryLine} >STORY</button><br/>
          <button onClick={() => mazkScroll('dd')} className="upmost_btn_mini">MAZKGANG</button><br/>
          <button onClick={() => mazkScroll('master_essentialDiv')} className="upmost_btn_mini">SQUAD</button><br/>
          <button onClick={() => mazkScroll('FAQ_main_container')} className="upmost_btn_mini">FAQ</button>
        </div>
        
        <div id='center_div_banner'>
          <center>
            <img  alt="" src="MAZK_LOGO.png" id="main_logo" />
            <div id='goto_mintpres' >
              <Link to="/mintpub"><div id='gomint_btn' />{/*<div id='gomint_wl' >PUBLIC SALE</div>*/}</Link> 
            </div>
            <br/><br/><br/>
            {/* <div id='gocheckdiv_contain'><Link to="/checkwl"><div id='gocheckdiv'></div></Link></div> */}
            <div id='gomint_maintenance'>PUBLIC SALE IS UNDER MAINTENANCE.<br/>WE'LL BE BACK LATER.<br/>SORRY FOR INCONVENIENCE.</div> 
            <div id='waitfor_mintpres' >
              <div id='waitfor_mintpres_inner' >
                <br/><br/><br/>
                <span style={{fontSize:'25px',lineHeight :'10px'}}>
                  <br/>PUBLIC SALE <br/> <span style={{fontSize:'21px',lineHeight :'10px'}}>countdown </span>
                </span>
                <br/><br/><br/><div id='timeshow'>{diffHour < 10 ? '0':''}{diffHour}:{diffMinute < 10 ? '0':''}{diffMinute} </div>
                <span style={{fontSize:'25px',lineHeight :'1px'}}>
                  <br/>Hours
                </span>
              </div>
            </div>
            <button><img alt="" id='mazk_story_btn' src='mazk_story_btn_2.png' onClick={openStoryLine}/></button>
          </center>
        </div>
       
        <div className="mobile-menu" >
          <MenuIcon id='mini-open-menu' fill="#ffac0c"  className="menu-icon" onClick={openMiniMenu} />
          <CloseMenu id='mini-close-menu' stroke="#ffac0c"  fill="#dc7107" className="menu-icon" onClick={closeMiniMenu} style={{display:'none'}} />
        </div>
      </div>
  );
}