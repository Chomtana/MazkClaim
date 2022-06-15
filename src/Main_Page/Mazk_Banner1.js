import "./Mazk_Banner1.css";
import * as THREE from 'three';
import React, { Component } from "react"; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader.js';
//import { DebugEnvironment } from 'three/examples/jsm/environments/DebugEnvironment.js';
//import { ColorSpaceNode, MeshStandardNodeMaterial } from 'three/examples/jsm/nodes/Nodes.js';

var w , h;
var renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
var camera;
var clock = new THREE.Clock();
var mixer1;
var obj1;
var previousWidth;

var acdx = 0 , acdy = 0;
var vnmu = true;
var bw , bl, tttt;
var divw1;
var btt;

var fng1 = "test1_6.glb"
var fr = 1;
var offY = 0;
var zw = 50;
var jios = 0;
var scene = new THREE.Scene();
var fov1 = 22;
var topStory1 = 0;
var myRFA;
var loader;
class Banner1 extends Component {
  adjustOnResize() {
      bw = document.getElementById("story_img1").offsetWidth;
      bl = document.getElementById("story_img1").offsetLeft;
      btt = document.getElementById("story_img1").offsetTop;
      divw1 = document.getElementById("story_img1").offsetWidth;
      document.getElementById("vision_img").style.left = (20 + bl) + "px";
      document.getElementById("mission_img").style.left = bl + bw/1.3 +"px";
      document.getElementById("mazkgang_img_div").style.top =  h+"px";
  }

  onBannerResize(e) {
    w = document.getElementById('banner').offsetWidth;
    if(w !== previousWidth){
      previousWidth = w;
      this.location.reload();
    }
  }

  componentDidMount() {
    w = document.getElementById('banner').offsetWidth;
    h = window.innerHeight*2;
    tttt = document.getElementById("story_img1").offsetWidth/3;
    previousWidth = w;
    renderer.setPixelRatio(1);
    if(w < 1000) {
      h = w*1.7*2;
      fng1 = "test2_4.glb";
      fov1 = 31;
      jios = 3.5;
      topStory1 = w/2;
      tttt = document.getElementById("story_img1").offsetWidth/4;
      if(w < 420) {
        renderer.setPixelRatio( window.devicePixelRatio*1.5);
      }
    }
    camera  = new THREE.PerspectiveCamera(fov1,w/h,1,1000);
    renderer.setSize(w, h); 
    renderer.setClearColor( 0x000000, 0 )
    renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMappingExposure = 4;
    this.mount.appendChild(renderer.domElement);

    //let container, stats;
    //let generatedCubeRenderTarget, ldrCubeRenderTarget, hdrCubeRenderTarget, rgbmCubeRenderTarget;
    //let ldrCubeMap, rgbmCubeMap;
    let hdrCubeMap;
    const hdrUrls = [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ];
    hdrCubeMap = new HDRCubeTextureLoader()
            .setPath( 'hdr1/' )
            .setDataType( THREE.UnsignedByteType )
            .load( hdrUrls, function () {
              //hdrCubeRenderTarget = pmremGenerator.fromCubemap( hdrCubeMap );
              hdrCubeMap.magFilter = THREE.LinearFilter;
              hdrCubeMap.needsUpdate = true;
            } );
    loader = new GLTFLoader();
    
    loader.load(fng1,(gltf) => {
      obj1 = gltf.scene;
      mixer1 = new THREE.AnimationMixer( gltf.scene );
    	var action1 = mixer1.clipAction( gltf.animations[ 0 ] );
    	action1.play();
      obj1.traverse((node)=>{
        if (node.isMesh) node.material.envMap = hdrCubeMap;
      });
      obj1.scale.set(1,1,1);
      scene.add( obj1 );
      obj1.name = 'obj1';
      
      setTimeout( () => {
        document.getElementById("root").style.display = ''; 
        document.getElementById("preload").style.display = 'none'; 
      },800); 
    }, 
    function ( xhr ) {
      //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
      //console.log( 'An error happened' );
    }
    );
    
    camera.rotation.set(-.1,0,0);
    var ccx = camera.position.x;
    var ccy = camera.position.y;
    var scY = 0;
    var orx = 0;
    this.adjustOnResize();
    
    var animate = function () {
      myRFA = requestAnimationFrame( animate );
      if(window.scrollY < h/2) {
        var nx = ccx + ((acdx - ccx)/50);
        var ny = ccy + ((acdy - ccy)/50);
        scY = scY + (window.scrollY - scY)/15;
        if(obj1) {
          orx = orx + ((acdy/20 - orx)/40) ;
          obj1.rotation.x = orx  - fr*scY/7000 ;
        }
        ccx = nx;
        ccy = ny;
        camera.position.set(nx , ny + fr - offY/3 - jios - fr*scY/250, zw); 
        var delta = clock.getDelta();
        if ( mixer1 ) mixer1.update( delta );
        renderer.render( scene, camera );
      }else{
       var mmc1 = document.getElementById("master_container");
        if(mmc1.offsetTop > 0){
        }
      }
      
      
      if((window.scrollY > 400) && !vnmu){
        document.getElementById("vision_img").style.width = tttt + "px";
        document.getElementById("mission_img").style.width = tttt  + "px";
        vnmu = true;
      }
      if(window.scrollY < h*.6 ){
        if((window.scrollY <= 400) ){  
          vnmu = false;
          document.getElementById("vision_img").style.width = "1px";
          document.getElementById("mission_img").style.width = "1px";
        }
        document.getElementById("vision_img").style.top = btt + topStory1 -20 + window.scrollY/20 + "px";     
        document.getElementById("mission_img").style.top = btt + topStory1 + divw1*.4 + window.scrollY/10 + "px";
      }
      if((window.scrollY < h*2) && (window.scrollY > .4*h)){
        var dd_top = document.getElementById("dd").offsetTop;
        if(w >= 1000){
          document.getElementById("mazkgang_img_div").style.top = (8*dd_top +  window.scrollY)/9 - 10 + "px";
          document.getElementById("mazkgang_img_div").style.left =  document.getElementById("dd2").offsetLeft + 190 + "px";
        } else {
          var tw1 = document.getElementById("mazkgang_img").offsetWidth;
          document.getElementById("mazkgang_img_div").style.top = (8*dd_top +  window.scrollY)/9 - 10 + (document.getElementById("dd").offsetHeight - tw1)/2 + "px";
          document.getElementById("mazkgang_img_div").style.left =  (w - tw1)/2 + "px";
        }
      } 
    };
    animate(); 
    window.addEventListener('resize', this.onBannerResize , false );
  }

  componentWillUnmount() {
    scene.remove(obj1);
    cancelAnimationFrame(myRFA);
    window.removeEventListener('resize', this.onBannerResize , false );
  }
  
  render() {
    return (
      <div >
        <div id='banner' ref={ref => (this.mount = ref)}></div>
        <div id="storyDiv" className = "storyDiv" >
          <div className="storyDiv_left">
            <center>
              <img src="b1.png" id="story_img1" alt="" />
              <img src="mission.png" id="mission_img" alt="" />
              <img src="vision.png" id="vision_img"  alt=""/>
            </center>
          </div>
          <div className="storyDiv_right">
            <center>
              <img src="b2.jpg" id="story_img2" alt="" />
            </center>
          </div>
        </div>
      </div>
    )
  }
}
export default Banner1;