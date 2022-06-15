import "./Mazk_FAQ.css";
import React, { Component } from "react";

class FAQ extends Component {
    componentDidMount() {
        var FAQ_deveda = document.getElementById("FAQ_metaDevada");
        var FAQ_main_table =  document.getElementById("FAQ_main_table")
        function FAQ_resize() {
            if(window.innerWidth >= 1000){
                FAQ_deveda.style.top = FAQ_main_table.offsetTop + 20 + "px";
                FAQ_deveda.style.width = 'min(370px,23vw)';
                FAQ_deveda.style.left = FAQ_main_table.offsetLeft + FAQ_main_table.offsetWidth - FAQ_deveda.width + 40+ "px";
            }
        }
        FAQ_resize();
        window.addEventListener('resize',FAQ_resize);

        function FAQ_deveda_rotate(){
            if(window.innerWidth >= 1000){
                var ang = (window.scrollY - FAQ_main_table.scrollTop) /105 - 40 ;
                FAQ_deveda.style.top = FAQ_main_table.offsetTop - ang*20 - 220 + "px";
            }
        }
        window.addEventListener('scroll',FAQ_deveda_rotate);
        for(let iii=1;iii<=5;iii++){
            document.getElementById("faq_q_"+iii).onclick = function(){ showAns("aaa"+iii, iii ) } ;
        }
    }
    
    render() {
        return (
            <div >
                <div id='FAQ_main_container'>
                <table id='FAQ_main_table'>
                    <tbody>
                    <tr>
                        <td className='FAQ_main_table_header' id='FAQ_main_table_header'>
                            <img src="FAQ_questionMark.png" className="FAQ_questionMark2" alt="" />
                            FAQ
                            <img src="FAQ_questionMark.png" className="FAQ_questionMark1" alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td className='FAQ_main_table_td_question' id='faq_q_1' >
                            WHAT IS MAZK GANG? WHAT ARE ITS ORIGINS? <img id='faq_up_btn_1' src="down_arrow_1.png" style={{display:'inline',width:'22px'}} alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td className='FAQ_main_table_td_answer' id='aaa1'>
                            Mazk Gang is a 10K NFT project. <br className="FAQ_br" />built on top of the Mazked Villians collection.
                        </td>
                    </tr>
                    <tr>
                        <td className='FAQ_main_table_td_question'  id='faq_q_2' >
                            WHO ARE THE ARTISTS? <img id='faq_up_btn_2' src="down_arrow_1.png" style={{display:'inline',width:'22px'}} alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td className='FAQ_main_table_td_answer' id='aaa2'>
                            This project is the combined work of 3 artists. <br className="FAQ_br" />Purika is main artist, Aui and Supply is assistant.
                        </td>
                    </tr>
                    <tr>
                        <td className='FAQ_main_table_td_question'  id='faq_q_3' >
                            WHAT IS THE MINT INFO? <img id='faq_up_btn_3' src="down_arrow_1.png" style={{display:'inline',width:'22px'}} alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td className='FAQ_main_table_td_answer' id='aaa3'>
                            Date - expected Q2 / 2022 | Pre-sale date - TBA <br className="FAQ_br" />| Public-sale date - TBA
                        </td>
                    </tr>
                    <tr>
                        <td className='FAQ_main_table_td_question' id='faq_q_4' >
                            MINT PRICE <img id='faq_up_btn_4' src="down_arrow_1.png" style={{display:'inline',width:'22px'}} alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td className='FAQ_main_table_td_answer' id='aaa4'>
                            Pre-sale (WL) will be 0.08 ETH for WL <br className="FAQ_br" /> &nbsp;|&nbsp; Public Sale will be 0.15 ETH. 
                        </td>
                    </tr>
                    <tr>
                        <td className='FAQ_main_table_td_question' id='faq_q_5' >
                            HOW WILL THE 10K NFTS BE DISTRIBUTED? <img id='faq_up_btn_5' src="down_arrow_1.png" style={{display:'inline',width:'22px'}} alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td className='FAQ_main_table_td_answer' id='aaa5'>
                            We have reserved around 70% <br className="FAQ_br" />of our community mint for WL. <br className="FAQ_br" />The rest will be for public sale, <br className="FAQ_br" />reward the team/mods and future marketing.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src="FAQ_pop2.png" id="FAQ_metaDevada" alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td >
                            <div className='FAQ_main_table_td_social' >
                                <div id="footericon_div">
                                    <a href="https://twitter.com/Mazkgang?s=20&t=CD8EyvH5T4MNfb3YuQlZYQ" target={'_blank'} rel="noreferrer" >
                                        <img src="twitter.svg" className="FAQ_main_table_td_social_svg" alt="" />
                                    </a>
                                    <a href="https://discord.gg/xakkFhAzut" target={'_blank'} rel="noreferrer" >
                                        <img src="discord.svg" className="FAQ_main_table_td_social_svg" alt="" />
                                    </a>
                                    <img src="opensea.svg" className="FAQ_main_table_td_social_svg" style={{filter:'opacity(.3)'}} alt="" />
                                    <div id="footericon_div_forLandscape"> &nbsp;&nbsp;Copyright 2022 Mazkgang | All rights reserved. <br/></div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='FAQ_main_table_td_end'>
                            Copyright 2022 Mazkgang | All rights reserved. <br/><br/><br/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}
export default FAQ;

function showAns(name,iii){
    var olppo = document.getElementById(name);
    var thisBTN = document.getElementById("faq_up_btn_"+iii);
    thisBTN.style.transform = 'rotate(-180deg)';
    if(window.innerWidth >= 1000){
        olppo.style.padding = '20px' ;
        olppo.style.fontSize = 'min(2vw,16px)' ;
    }else{
        olppo.style.padding = '1.5vw' ;
        olppo.style.fontSize = '3.1vw' ;
    }
    document.getElementById("faq_q_"+iii).onclick = function() { hideAns(name,iii); }
}

function hideAns(name,iii){
    var olppo = document.getElementById(name);
    var thisBTN = document.getElementById("faq_up_btn_"+iii);
    olppo.style.padding = "0px";
    olppo.style.fontSize = '0px' ;
    thisBTN.style.transform = 'rotate(0deg)';
    document.getElementById("faq_q_"+iii).onclick = function() { showAns(name,iii); }
}