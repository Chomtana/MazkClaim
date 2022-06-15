import "./Mazk_Character.css";
import React, { Component } from "react"; 
var prevCharX , prevCharY , prevCharW;

class Character extends Component {
  componentDidMount() {
    
    for(let i=1;i<=5;i++){
      document.getElementById("cata"+i).onclick = () => showBigChar(i);
      //document.getElementById("char_gray_div").onclick = () => hideBigChar();
    }
  }

  render() {
    return (
      <div className="div_char_main" id='dd' >
        <div className="div_char_container" id='dd2'>
            <table id="table_char_1" >
              <tbody>
              <tr>
                <td rowSpan={'2'} width={'50%'}>
                    <img id="cata1" src="new3_m1.gif" className="pic_char" alt=""></img>
                </td>
              </tr>
              </tbody>
            </table>
            <table id="table_char_2" >
             <tbody>
              <tr>
                <td width={'25%'} >
                  <img id="cata2" src="new3_m2.jpg" className="pic_char" alt=""></img>  
                </td>
                <td  width={'25%'} >
                <img id="cata3" src="new3_m3.jpg" className="pic_char" alt=""></img>  
                </td>
              </tr>
              <tr>
                <td  width={'25%'} >
                  <img id="cata4" src="new3_m4.jpg" className="pic_char" alt=""></img>  
                </td>
                <td  width={'25%'} >
                  <img id="cata5" src="new3_m5.jpg" className="pic_char" alt=""></img>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div id="mazkgang_img_div">
            <img src="mazkgang.png" id="mazkgang_img" alt="" /> 
          </div>
          <div id="char_gray_div"  >
          </div> 
       </div>
    )
  }
}
export default Character;

function hideBigChar(i2) {
  var cop_click = document.getElementById("cata"+ i2);
  cop_click.style.transition = 'all 0s' ;
  document.getElementById("char_gray_div").style.backgroundColor = 'rgba(0,0,0,0)';
  cop_click.style.width = prevCharW;
  cop_click.style.height = 'auto';

  setTimeout(function() {
    cop_click.style.position = '';
    cop_click.style.left = prevCharX/2;
    cop_click.style.top = prevCharY;
    document.getElementById("char_gray_div").style.display = 'none';
    document.getElementById("cata"+i2).onclick = ()=> {showBigChar(i2)};
  }, 10);
}

function showBigChar(i) {
  var cop_click = document.getElementById("cata"+i);   
  cop_click.style.zIndex = '6000001';

  var drw = cop_click.style.width = (cop_click.getBoundingClientRect().right - cop_click.getBoundingClientRect().left ) + "px" ;
  //var drh = cop_click.style.height = (cop_click.getBoundingClientRect().bottom - cop_click.getBoundingClientRect().top ) + "px" ;
  var main_char_size ;
  prevCharW = drw;
  prevCharX = cop_click.style.left = cop_click.getBoundingClientRect().left + 'px';
  prevCharY = cop_click.style.top = cop_click.getBoundingClientRect().top + 'px';
  document.getElementById("char_gray_div").style.display = 'block';
  document.getElementById("char_gray_div").style.backgroundColor = 'rgba(0,0,0,0)';

  setTimeout( function() {
    main_char_size = (window.innerWidth > window.innerHeight) ? window.innerHeight*.9 : window.innerWidth*.9 ;
    cop_click.style.transition = 'cubic-bezier(0.215, 0.610, 0.355, 1) all 1s' ;
    cop_click.style.position = 'fixed';
    setTimeout(function(){
      var cop_click = document.getElementById("cata"+i);
      cop_click.style.left = (window.innerWidth - main_char_size)/2 + "px";
      cop_click.style.top = (window.innerHeight - main_char_size)/2 + "px";
      cop_click.style.width = cop_click.style.height =  main_char_size + "px";
      document.getElementById("char_gray_div").style.backgroundColor = 'rgba(0,0,0,.95)';
      document.getElementById("char_gray_div").onclick = () => {hideBigChar(i)};
    }, 10);
  }, 10);
}
