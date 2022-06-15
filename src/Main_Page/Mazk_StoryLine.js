import "./Mazk_StoryLine.css";
import React, { Component } from "react";
import { ReactComponent as CloseStoryLine } from "../x2.svg";
import { ReactComponent as LeftStoryLine } from "../assets/left.svg";
import { ReactComponent as RightStoryLine } from "../assets/right.svg";

function closeStoryLine(){
    document.getElementById('storyline_main_container').style.top = '-100vh';
    document.getElementById('top_menu').style.filter = "none";
    document.getElementById('comp_char_containter').style.filter = "none";
    document.getElementById('banner_container').style.filter = "none";
    document.getElementById('APP_FAQ').style.filter = "none";
    document.getElementById('APP_MASTER').style.filter = "none";
}
var pn1;
function gotoSTL(previousSTLPage,STLPage) {
    pn1 = 'stl'+ previousSTLPage;
    document.getElementById(pn1).style.display = 'none';
    if((window.innerWidth < 1000) ) {
        document.getElementById(('stl'+ STLPage)).style.display = 'block';
    }else{
        document.getElementById(('stl'+ STLPage)).style.display = 'flex';
    }
}

function storyline_resize() {
    var w = document.getElementById('banner').offsetWidth;
    if(w !== previousWidth){
        document.getElementById('storyline_main_container').style.transition = 'none';
        closeStoryLine();
        previousWidth = w;
    }
}

var previousWidth;
class StoryLine extends Component {
    componentDidMount() {
        
        window.addEventListener('resize', storyline_resize);
        if(window.innerWidth < 1000) {
            document.getElementById('stl1').style.display = 'block' ;
        }else{
            document.getElementById('stl1').style.display = 'flex' ;
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', storyline_resize);
    }

    render() {
        return (
            <div >
                <div id='storyline_main_container' >
                    <div style={{position:'absolute',top:'10px',right:'20px',width:'40px'}} onClick={closeStoryLine} ><CloseStoryLine /></div>
                    <div className='storyline_main' id='stl1'>
                        <div className='storyline_main_img_fp'  >
                        <center><img  alt="" src='mazk_story_btn_2.png' className="Mazk_Story_Header_img" id='mazk_story_header2' /></center>
                            <img  alt="" src="storyline_page0_1.jpg" className="stl_main_img_fp"/>
                        </div>
                        <div className='storyline_detail_fp'  align="left"  >
                            <img  alt="" src="storyline_page0_2.jpg" className="stl_main_img_fp2"  />
                            <span className="storyline_font3_fp" >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{verticalAlign:'top'}}>
                                                <br className="storyline_br2" />
                                                <img  alt="" src='mazk_story_btn_2.png' className="Mazk_Story_Header_img" id='mazk_story_header1' />
                                            </td>
                                            <td>                      
                                                <br className="storyline_br2" />Mazkland, a land without rules, filled with violence
                                                <br className="storyline_br2" />and intense struggles for power. This terrible era has
                                                <br className="storyline_br2" />spawned numerous masked gangs all aiming for
                                                <br className="storyline_br2" />dominance. Each gang represented by their mazks
                                                <br className="storyline_br2" />asserts the power over their members and territory.<br/><br/>
                                                <div className='lrbtn'><RightStoryLine style={{display:'inline'}} onClick={() => gotoSTL(1,2)} /></div>
                                                <br/><br/><br/><br/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </span>
                        </div>
                    </div>

                    <div className='storyline_main' id='stl2' >
                        <div className='storyline_main_img' >
                            <img  alt="" src="storyline_page1.jpg" className="stl_main_img"/>
                        </div>
                        <div className='storyline_detail' align="left">
                            <span className="storyline_font1"><img  alt="" src='icon_HANUMAZK.png' className="icon_clan" />HANUMAZK<br className="storyline_br1" /></span>
                            <span className="storyline_font2">| The demons of the wind alley<br className="storyline_br1" /></span>
                            <br className="storyline_br3" />
                            <span className="storyline_font3">
                                <br className="storyline_br2" />The Monkey Mazks are a group of filthy villains.
                                <br className="storyline_br2" />They are born to create chaos and
                                <br className="storyline_br2" />they won't stop causing fights with others.
                                <br className="storyline_br2" />It is their belief that insurgency is
                                <br className="storyline_br2" />the path to power.<br/><br/>
                                <div className='lrbtn'><LeftStoryLine style={{display:'inline'}} onClick={() => gotoSTL(2,1)} />&nbsp;<RightStoryLine  style={{display:'inline'}} onClick={() => gotoSTL(2,3)} /></div>
                                <img  alt="" src='storyline_page1_mazk.png' className="STLmazk" />
                            </span>
                        </div>
                    </div>

                    <div className='storyline_main' id='stl3'>
                        <div className='storyline_main_img' >
                            <img  alt="" src="storyline_page2.jpg" className="stl_main_img" />
                        </div>
                        <div className='storyline_detail' align="left">
                            <span className="storyline_font1"><img  alt="" src='icon_ZINGHAZARD.png' className="icon_clan" />ZINGHAZARD<br className="storyline_br1" /></span>
                            <span className="storyline_font2">| The lords of the jungle<br className="storyline_br1" /></span>
                            <br className="storyline_br3" />
                            <span className="storyline_font3">
                                <br className="storyline_br2" />Lion Mazks, a group of thugs who
                                <br className="storyline_br2" />believe that strength is an infinite
                                <br className="storyline_br2" />source of power.
                                <br className="storyline_br2" />They are obsessed with worshiping
                                <br className="storyline_br2" />the power of the Lion King, the
                                <br className="storyline_br2" />mythical forest lord that will bless
                                <br className="storyline_br2" />their comrades with strength and
                                <br className="storyline_br2" />savagery.
                                <br/><br/>
                                <div className='lrbtn'><LeftStoryLine style={{display:'inline'}} onClick={() => gotoSTL(3,2)} />&nbsp;<RightStoryLine  style={{display:'inline'}} onClick={() => gotoSTL(3,4)} /></div>
                                <img  alt="" src='storyline_page2_mazk.png' className="STLmazk" />
                            </span>
                        </div>
                    </div>

                    <div className='storyline_main' id='stl4'>
                        <div className='storyline_main_img' >
                            <img  alt="" src="storyline_page3.jpg" className="stl_main_img" />
                        </div>
                        <div className='storyline_detail' align="left">
                            <span className="storyline_font1"><img  alt="" src='icon_NAKAWA.png' className="icon_clan" />NAKAWA<br className="storyline_br1" /></span>
                            <span className="storyline_font2">| River monsters<br className="storyline_br1" /></span>
                            <br className="storyline_br3" />
                            <span className="storyline_font3">
                                <br className="storyline_br2" />Serpent Mazks, the cold-blooded
                                <br className="storyline_br2" />guerrillas of the river valley,
                                <br className="storyline_br2" />They stealthily eliminate their
                                <br className="storyline_br2" />targets, attacking their enemies
                                <br className="storyline_br2" />when they least expect.
                                <br/><br/>
                                <div className='lrbtn'><LeftStoryLine style={{display:'inline'}} onClick={() => gotoSTL(4,3)} />&nbsp;<RightStoryLine  style={{display:'inline'}} onClick={() => gotoSTL(4,5)} /></div>
                                <img  alt="" src='storyline_page3_mazk.png' className="STLmazk" />
                            </span>
                        </div>
                    </div>

                    <div className='storyline_main' id='stl5'>
                        <div className='storyline_main_img' >
                            <img  alt="" src="storyline_page4.jpg" className="stl_main_img" />
                        </div>
                        <div className='storyline_detail' align="left">
                            <span className="storyline_font1"><img  alt="" src='icon_GARUDANGER.png' className="icon_clan" />GARUDANGER<br className="storyline_br1" /></span>
                            <span className="storyline_font2">| Iron wings<br className="storyline_br1" /></span>
                            <br className="storyline_br3" />
                            <span className="storyline_font3">
                                <br className="storyline_br2" />Garuda Mazks, the pirates of the skies.
                                <br className="storyline_br2" />They use their advanced technology
                                <br className="storyline_br2" />and superior resources to create
                                <br className="storyline_br2" />endless amount of deadly weapons.
                                <br/><br/>
                                <div className='lrbtn'><LeftStoryLine style={{display:'inline'}} onClick={() => gotoSTL(5,4)} />&nbsp;<RightStoryLine  style={{display:'inline'}} onClick={() => gotoSTL(5,6)} /></div>
                                <img  alt="" src='storyline_page4_mazk.gif' className="STLmazk" />
                            </span>
                        </div>
                    </div>

                    <div className='storyline_main' id='stl6'>
                        <div className='storyline_main_img' >
                            <img  alt="" src="storyline_page5.jpg" className="stl_main_img" />
                        </div>
                        <div className='storyline_detail' align="left">
                            <span className="storyline_font1"><img  alt="" src='icon_TOZAGANG.png' className="icon_clan" />TOZAGANG<br className="storyline_br1" /></span>
                            <span className="storyline_font2">| The giants of darkness<br className="storyline_br1" /></span>
                            <br className="storyline_br3" />
                            <span className="storyline_font3">
                                <br className="storyline_br2" />Giant Mazks, an underground society
                                <br className="storyline_br2" />whose beliefs stand opposite of the
                                <br className="storyline_br2" />Divine Mazks.
                                <br className="storyline_br2" />They established themselves as a
                                <br className="storyline_br2" />cult of darkness whose main goal is
                                <br className="storyline_br2" />to destroy the light and the false
                                <br className="storyline_br2" />believers.
                                <br/><br/>
                                <div className='lrbtn'><LeftStoryLine style={{display:'inline'}} onClick={() => gotoSTL(6,5)} />&nbsp;<RightStoryLine  style={{display:'inline'}} onClick={() => gotoSTL(6,7)} /></div>
                                <img  alt="" src='storyline_page5_mazk.png' className="STLmazk" />
                            </span>
                        </div>
                    </div>

                    <div className='storyline_main' id='stl7'>
                        <div className='storyline_main_img' >
                            <img  alt="" src="storyline_page6.jpg" className="stl_main_img" />
                        </div>
                        <div className='storyline_detail' align="left">
                            <span className="storyline_font1"><img  alt="" src='icon_METADEVA.png' className="icon_clan" />META DEVA<br className="storyline_br1" /></span>
                            <span className="storyline_font2">| The wardens of the heavens<br className="storyline_br1" /></span>
                            <br className="storyline_br3" />
                            <span className="storyline_font3">
                                <br className="storyline_br2" />Divine Mazks, the quardians of light
                                <br className="storyline_br2" />and the successors of the heaven's will.
                                <br className="storyline_br2" />Their mission is to build faith and
                                <br className="storyline_br2" />spread the teachings of the noble utopia.
                                <br/><br/>
                                <div className='lrbtn'><LeftStoryLine style={{display:'inline'}} onClick={() => gotoSTL(7,6)} /></div>
                                <img  alt=""  src='storyline_page6_mazk.png' className="STLmazk" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default StoryLine;