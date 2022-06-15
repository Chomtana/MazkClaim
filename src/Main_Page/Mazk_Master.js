import "./Mazk_Master.css";
import React, { Component } from "react";

class Master extends Component {
    componentDidMount() {
        window.addEventListener('resize',master_resize);
        master_resize();
        
        window.addEventListener('scroll',master_bubble_popup);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',master_bubble_popup);
        window.removeEventListener('resize',master_resize);
    }
    render(){
        return (
            <div id="master_essentialDiv" >
                <center>
                <div id="master_container" className = "master_container" >
                    <div className="mazter_left">
                        <img alt=""  src="mazter_poster_1.jpg" className="master_img" id="master_img1" />
                    </div>
                    <div className="mazter_right" id="mazter_right">
                        <div id="mazter_right_subdiv1">
                            <img alt="" src="mazter_poster_4_empty.gif" className="master_img" id="master_img2" /> 
                            <div className='mazter' id='mazter1'></div>
                            <div className='mazter' id='mazter2'></div>
                            <div className='mazter' id='mazter3'></div>   
                        </div> 
                        <center>
                            <div id="mazter_right_subdiv2">
                                <table id="mazter_right_subdiv2_table">
                                   
                                    <colgroup>
                                        <col width="6%" />
                                        <col width="22%" span={4}/>
                                        <col width="6%" />
                                    </colgroup>
                                    <tbody>
                                    <tr><td colSpan='6' ><center id='team_head_td'>
                                        <img  alt="" src="team_img/team_img_head.png" id='team_img_head' /> 
                                    </center></td></tr>
                                    <tr>
                                        <td />
                                        <td align="center"><img  alt="" src="team_img/team_img1.png" className="team_img" /></td>
                                        <td align="center"><img  alt="" src="team_img/team_img2.png" className="team_img" /></td>
                                        <td align="center"><img  alt="" src="team_img/team_img3.png" className="team_img" /></td>
                                        <td align="center"><img  alt="" src="team_img/team_img4.png" className="team_img" /></td>
                                        <td />
                                    </tr>
                                    <tr>
                                        <td />
                                        <td><big><big>NAGA DAO</big></big><br/>Developer</td>
                                        <td><big><big>KU</big></big><br/>Head Moderator</td>
                                        <td><big><big>DUCK</big></big><br/>Support</td>
                                        <td><big><big>AKE</big></big><br/>Website</td>
                                        <td />
                                    </tr>
                                    <tr><td><center id='team_foot_td' /><br/></td></tr>
                                    </tbody>
                                </table>
                                <img  alt="" src='mazter_aui.gif' id="mazter_aui" />
                                <img  alt="" src='mazter_purika.gif' id="mazter_purika" />
                                <img  alt="" src='mazter_ply.gif' id="mazter_ply" />
                            </div> 
                        </center>
                    </div>
                    <center className="mazter_bubble_container">
                        <img  alt=""  src="mazter_bubble.png" className="mazter_bubble_img" id="mazter_bubble_img"  />
                    </center>
                </div>
                </center>
            </div>
        )
    }
}
export default Master;

function master_bubble_popup() {
    var master_div_offsetTop = document.getElementById("master_essentialDiv").offsetTop - window.innerHeight/3;
    if(window.scrollY > (master_div_offsetTop )){
        if(window.scrollY > master_div_offsetTop + 150 ){
            document.getElementById("mazter_aui").style.transform = "scale(1)";
            document.getElementById("mazter_ply").style.transform = "scale(1)";
            document.getElementById("mazter_purika").style.transform = "scale(1)";
        }else{
            document.getElementById("mazter_bubble_img").style.transform = "scale(1)";
        }
    }else{
        document.getElementById("mazter_bubble_img").style.transform = "scale(0)";
        document.getElementById("mazter_aui").style.transform = "scale(0)";
        document.getElementById("mazter_ply").style.transform = "scale(0)";
        document.getElementById("mazter_purika").style.transform = "scale(0)";
    }
}

function master_resize(){
    if(window.innerWidth  > 1000){
        var ppop = document.getElementById('master_img2');
        ppop.style.height = ppop.offsetWidth*96/80 + "px" ;
        document.getElementById('mazter_right_subdiv2').style.width = ppop.offsetWidth + 'px';
    }
}