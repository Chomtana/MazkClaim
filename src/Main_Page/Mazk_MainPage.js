import './Mazk_MainPage.css';
import Header4 from "../header/Header_2";
import Banner4 from "../Main_Page/Mazk_Banner1";
import Character from "../Main_Page/Mazk_Character";
import Master from "../Main_Page/Mazk_Master";
import StoryLine from "../Main_Page/Mazk_StoryLine";
import React, { Component } from "react";
import FAQ from "../Main_Page/Mazk_FAQ";

class Mazk_MainPage extends Component {
    componentDidMount() {
    }
    render(){
        return (
            <div>
                <div  className="header_menu" id="top_menu" style={{transition:'all 1s'}}>
                    <center><Header4/></center>
                </div>
                <div className="bg" id='banner_container' style={{transition:'all 1s'}}>
                    <Banner4 />
                </div>
                <div  id='comp_char_containter' style={{transition:'all 1s'}}>
                    <Character /> 
                </div>
                <div id="APP_MASTER" style={{backgroundColor:"rgb(215,111,6)",transition:'all 1s'}}>
                    <center><Master /></center> 
                </div>
                <div id='APP_STORYLINE' style={{backgroundColor:"rgb(215,111,6)",transition:'all 1s'}}>
                    <center><StoryLine /></center> 
                </div> 
                <div id='APP_FAQ' style={{backgroundColor:"rgb(215,111,6)",transition:'all 1s'}}>
                    <center><FAQ /></center> 
                 </div>
            </div>
        )
    }
}

export default Mazk_MainPage;