import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import createjs from 'createjs-collection'
import images from '../images'
import styles from '../styles/Loading'
import CSSModules from 'react-css-modules'

class Loading extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    this.canvas = findDOMNode(this.refs.canvas);
    this.speedCanvas = findDOMNode(this.refs.speed);
    this.accelerationCanvas = findDOMNode(this.refs.acceleration);
    this.speedStage = new createjs.Stage(this.speedCanvas);
    this.accelerationStage = new createjs.Stage(this.accelerationCanvas);
    this.stage = new createjs.Stage(this.canvas);
    this.stage.x = this.canvas.width / 2;
    this.stage.y = this.canvas.height / 2;
    this.speedStage.x = 140;
    this.speedStage.y = 140;

    this.settingsText = new createjs.Text("Vehicle Settings", "30px sans-serif", "white");
    this.gpsText = new createjs.Text("Navigation", "30px sans-serif", "white");
    this.routeText = new createjs.Text("Current Route: ", "20px sans-serif", "white");
    this.acText = new createjs.Text("Climate Control", "30px sans-serif", "white");
    this.climateText = new createjs.Text("Fan Level: 3", "20px sans-serif", "white");
    this.phoneText = new createjs.Text("Phone", "30px sans-serif", "white");
    this.connectedText = new createjs.Text("Connected To Linnea's iPhone", "20px sans-serif", "white");
    this.musicText = new createjs.Text("Music", "30px sans-serif", "white");
    this.playingText = new createjs.Text("Currently playing: a song", "20px sans-serif", "white");
    this.autonomousText = new createjs.Text("Autonomous Driving Available", "30px sans-serif", "white");
    this.activateText = new createjs.Text("Slide up to activate", "20px sans-serif", "white");
    this.loadingText = new createjs.Text("Activating Autonomous Driving", "40px sans-serif", "white");

    this.number = 0;
    this.outerRadius = 10;
    this.innerRadius = 0;
    this.stepDegree = 5;
    this.numberOfLines = (Math.PI*2)/(this.stepDegree*Math.PI/180);
  
    this.rect = new createjs.Shape();
    this.gradient = new createjs.Bitmap(images.gradient);
    this.road = new createjs.Bitmap(images.road);
    this.ego = new createjs.Bitmap(images.transport);
    this.ac = new createjs.Bitmap(images.ac);
    this.settings = new createjs.Bitmap(images.settings);
    this.gps = new createjs.Bitmap(images.gps);
    this.phone = new createjs.Bitmap(images.phone);
    this.music = new createjs.Bitmap(images.music);
    this.settingsGradient = new createjs.Bitmap(images.menuGradient);
    this.acGradient = new createjs.Bitmap(images.menuGradient);
    this.gpsGradient = new createjs.Bitmap(images.menuGradient);
    this.phoneGradient = new createjs.Bitmap(images.menuGradient);
    this.musicGradient = new createjs.Bitmap(images.menuGradient);
    this.bottomGradient = new createjs.Bitmap(images.blueGradient);
    this.steeringWheel = new createjs.Bitmap(images.steeringWheel);
    this.steeringWheel.image.onload = () => this.drawManual();
  }

  drawManual(){

    var ySpace = this.canvas.height / 8 + 10;


    this.settings.scaleX = 0.2;
    this.settings.scaleY = 0.2;
    this.settings.x = (-this.canvas.width)/2 + 50;
    this.settings.y = -this.canvas.height/2 + 30;
    this.settingsGradient.x = (-this.canvas.width)/2;
    this.settingsGradient.y = (-this.canvas.height)/2;
    this.settingsGradient.scaleY = 0.6;
    this.settingsText.x = (-this.canvas.width)/2 + 130;
    this.settingsText.y = -this.canvas.height/2 + 70;
    this.settingsText.textBaseline = "alphabetic";


    this.gps.scaleX = 0.2;
    this.gps.scaleY = 0.2;
    this.gps.x = -this.canvas.width/2 + 50;
    this.gps.y = -this.canvas.height/2 +  ySpace;
    this.gpsGradient.x = (-this.canvas.width)/2;
    this.gpsGradient.y = (-this.canvas.height)/2 + ySpace -20;
    this.gpsGradient.scaleY = 0.6;
    this.gpsText.x = (-this.canvas.width)/2 + 130;
    this.gpsText.y = -this.canvas.height/2  + 30 + ySpace;
    this.gpsText.textBaseline = "alphabetic";
    this.routeText.x = (-this.canvas.width)/2 + 130;
    this.routeText.y = -this.canvas.height/2 + 60 + ySpace;
    this.routeText.textBaseline = "alphabetic";


    this.ac.scaleX = 0.2;
    this.ac.scaleY = 0.2;
    this.ac.x = -this.canvas.width/2  + 50;
    this.ac.y = -this.canvas.height/2 +  2*ySpace - 20;
    this.acGradient.x = (-this.canvas.width)/2;
    this.acGradient.y = (-this.canvas.height)/2 + 2*ySpace -40;
    this.acGradient.scaleY = 0.6;
    this.acText.x = (-this.canvas.width)/2 + 130;
    this.acText.y = -this.canvas.height/2 + 10 + 2*ySpace;
    this.acText.textBaseline = "alphabetic";
    this.climateText.x = (-this.canvas.width)/2 + 130;
    this.climateText.y = -this.canvas.height/2 + 40 + 2*ySpace;
    this.climateText.textBaseline = "alphabetic";


    this.phone.scaleX = 0.2;
    this.phone.scaleY = 0.2;
    this.phone.x = -this.canvas.width/2 + 50;
    this.phone.y = -this.canvas.height/2 +  3*ySpace - 40;
    this.phoneGradient.x = (-this.canvas.width)/2;
    this.phoneGradient.y = (-this.canvas.height)/2 + 3*ySpace -60;
    this.phoneGradient.scaleY = 0.6;
    this.phoneText.x = (-this.canvas.width)/2 + 130;
    this.phoneText.y = -this.canvas.height/2 -10 + 3*ySpace;
    this.phoneText.textBaseline = "alphabetic";
    this.connectedText.x = (-this.canvas.width)/2 + 130;
    this.connectedText.y = -this.canvas.height/2 + 20 + 3*ySpace;
    this.connectedText.textBaseline = "alphabetic";

    this.music.scaleX = 0.2;
    this.music.scaleY = 0.2;
    this.music.x = -this.canvas.width/2 + 50;
    this.music.y = -this.canvas.height/2 +  4*ySpace - 60;
    this.musicGradient.x = (-this.canvas.width)/2;
    this.musicGradient.y = (-this.canvas.height)/2 + 4*ySpace -80;
    this.musicGradient.scaleY = 0.6;
    this.bottomGradient.x = (-this.canvas.width)/2;
    this.bottomGradient.y = (-this.canvas.height)/2 + 5*ySpace -100;
    this.bottomGradient.scaleY = 1.1;
    this.musicText.x = (-this.canvas.width)/2 + 130;
    this.musicText.y = -this.canvas.height/2 -30 + 4*ySpace;
    this.musicText.textBaseline = "alphabetic";
    this.playingText.x = (-this.canvas.width)/2 + 130;
    this.playingText.y = -this.canvas.height/2 + 4*ySpace;
    this.playingText.textBaseline = "alphabetic";

    this.steeringWheel.scaleX = 0.3;
    this.steeringWheel.scaleY = 0.3;
    this.steeringWheel.x = -this.canvas.width/2 + 30;
    this.steeringWheel.y = (-this.canvas.height)/2 + 5*ySpace -70;
    this.autonomousText.x = (-this.canvas.width)/2 + 130;
    this.autonomousText.y = -this.canvas.height/2 + 5*ySpace -40;
    this.autonomousText.textBaseline = "alphabetic";
    this.activateText.x = (-this.canvas.width)/2 + 130;
    this.activateText.y = -this.canvas.height/2 + 5*ySpace -10;
    this.activateText.textBaseline = "alphabetic";

    this.rect.graphics.beginFill("rgb(10,110,44").drawRect((-this.canvas.width)/2, 298, this.canvas.width, 200);
    this.stage.addChild(this.rect);

    this.stage.addChild(this.musicGradient);
    this.stage.addChild(this.music);
    this.stage.addChild(this.playingText);
    this.stage.addChild(this.phoneGradient);
    this.stage.addChild(this.phone);
    this.stage.addChild(this.phoneText);
    this.stage.addChild(this.connectedText);
    this.stage.addChild(this.acGradient);
    this.stage.addChild(this.ac);
    this.stage.addChild(this.acText);
    this.stage.addChild(this.climateText);
    this.stage.addChild(this.gpsGradient);
    this.stage.addChild(this.gps);
    this.stage.addChild(this.gpsText);
    this.stage.addChild(this.routeText);
    this.stage.addChild(this.settingsGradient);
    this.stage.addChild(this.settingsText);


    this.stage.addChild(this.bottomGradient);
    this.stage.addChild(this.activateText);
    this.stage.addChild(this.autonomousText);
    this.stage.addChild(this.steeringWheel);
    this.stage.addChild(this.settings);
    this.stage.update();

    var that = this;
    setTimeout(function () {
      that.hideMenu(that);
    }, 3000)

  }
 
  hideMenu(that){

   var counter = 0;
   var counter1 = 0;
   var interval = setInterval(function(){

    if(counter1 > -1){
      that.music.y = that.music.y - 5;
      that.musicGradient.y = that.musicGradient.y -5;
      that.musicText.y = that.musicText.y - 5;
      that.playingText.y = that.playingText.y - 5;
      that.autonomousText.y = that.autonomousText.y -5;
      that.activateText.y = that.activateText.y -5;
      that.steeringWheel.y = that.steeringWheel.y -5;
    }
    if(counter1 >0){
      that.phone.y = that.phone.y -5;
      that.phoneGradient.y = that.phoneGradient.y -5;
      that.phoneText.y = that.phoneText.y -5;
      that.connectedText.y = that.connectedText.y -5;
    }
    if(counter1 >1){
      that.ac.y = that.ac.y-5;
      that.acGradient.y = that.acGradient.y -5;
      that.acText.y = that.acText.y -5;
      that.climateText.y = that.climateText.y -5;
    }
    if(counter1 >2){
      that.gps.y = that.gps.y -5;
      that.gpsGradient.y = that.gpsGradient.y -5;
      that.gpsText.y = that.gpsText.y -5;
      that.routeText.y = that.routeText.y -5;
    }
    if(counter1 >3){
      that.settings.y = that.settings.y -5;
      that.settingsGradient.y = that.settingsGradient.y -5;
      that.settingsText.y = that.settingsText.y -5;
    }

    that.stage.update();
    if(counter == 22){
      if(counter1 == 4){
        clearInterval(interval);
        that.fadeText(that);
      }else{
        counter1++;
        counter=0;
      }
    }else{
      counter++;
    }

   }, 50);

  }

  fadeText(that){
    var counter = 0;
    that.loadingText.y = -(that.canvas.height/2) + 50;
    var interval = setInterval(function(){
      if(counter < 128){
        that.activateText.x = that.activateText.x + 5;
        that.autonomousText.x = that.autonomousText.x + 5;
        counter++;
        that.stage.update();
      }else if(counter == 128){
        that.loadingText.x = that.autonomousText.x;
        that.stage.addChild(that.loadingText);
        counter++;
      }else if( counter < 256){
        that.loadingText.x = that.loadingText.x -4.8;
        counter++;
        that.stage.update();
      }else{
        clearInterval(interval);
        that.makeBig(that);
      }
    }, 20)
  }

  // Create the drawing logic
  draw() {
    this.makeBig(this);
    }

  load(that){

    var loading = setInterval(function(){
      that.stage.removeAllChildren();
      that.stage.addChild(that.loadingText);
      that.stage.addChild(that.steeringWheel);
      that.stage.addChild(that.bottomGradient);
      that.stage.addChild(that.rect);
      var counter = 0;
      for(var i = -Math.PI/2; i<=Math.PI*2-Math.PI/2; i = i+(that.stepDegree*Math.PI/180)){
        let line = new createjs.Shape();
        var fromX = Math.cos(i)*that.outerRadius;
        var fromY = Math.sin(i)*that.outerRadius;
        var toX = Math.cos(i)*that.innerRadius;
        var toY = Math.sin(i)*that.innerRadius;
        if(counter > that.number){
          line.graphics.beginStroke("white");
        }else{
          line.graphics.beginStroke("green");
        }
        line.graphics.moveTo(fromX, fromY);
        line.graphics.lineTo(toX, toY);
        that.stage.addChild(line);
        counter++;
      }

      counter = 0;
      for(var i = Math.PI/2; i>=-Math.PI*2 + Math.PI/2; i = i-(that.stepDegree*Math.PI/180)){
        let line = new createjs.Shape();
        var fromX = Math.cos(i)*that.outerRadius;
        var fromY = Math.sin(i)*that.outerRadius +220;
        var toX = Math.cos(i)*that.innerRadius;
        var toY = Math.sin(i)*that.innerRadius +220;
        if(counter > that.number){
          line.graphics.beginStroke("white");
        }else{
          line.graphics.beginStroke("green");
        }
        line.graphics.moveTo(fromX, fromY);
        line.graphics.lineTo(toX, toY);
        that.stage.addChild(line);
        counter++;
      }

      that.gradient.x = -220;
      that.stage.addChild(that.gradient);
      that.stage.update();
      if(that.number < that.numberOfLines){
        that.number++;
      }else{
        clearInterval(loading);
        that.makeSmall(that);

      }
    }, 100);

  }

  makeSmall(that){
     var makeSmall = setInterval(function(){
          that.stage.removeAllChildren();
             that.stage.addChild(that.loadingText);
             that.stage.addChild(that.steeringWheel);
             that.stage.addChild(that.bottomGradient);
             that.stage.addChild(that.rect);
          for(var i = -Math.PI/2; i<=Math.PI*2-Math.PI/2; i = i+(that.stepDegree*Math.PI/180)){
            let line = new createjs.Shape();
            var fromX = Math.cos(i)*that.outerRadius;
            var fromY = Math.sin(i)*that.outerRadius;
            var toX = Math.cos(i)*that.innerRadius;
            var toY = Math.sin(i)*that.innerRadius;
            line.graphics.beginStroke("green");
            line.graphics.moveTo(fromX, fromY);
            line.graphics.lineTo(toX, toY);
            that.stage.addChild(line);
         }
          for(var i = Math.PI/2; i>=-Math.PI*2 + Math.PI/2; i = i-(that.stepDegree*Math.PI/180)){
            let line = new createjs.Shape();
            var fromX = Math.cos(i)*that.outerRadius;
            var fromY = Math.sin(i)*that.outerRadius +220;
            var toX = Math.cos(i)*that.innerRadius;
            var toY = Math.sin(i)*that.innerRadius +220;
            line.graphics.moveTo(fromX, fromY);
            line.graphics.lineTo(toX, toY);
            that.stage.addChild(line);
          }
          that.loadingText.y = that.loadingText.y -5;
          that.steeringWheel.y = that.steeringWheel.y -5;
          that.bottomGradient.y = that.bottomGradient.y +5;
          that.rect.y = that.rect.y +5;
          if(that.outerRadius < 1){
            clearInterval(makeSmall);
           that.drawEgo(that);
           that.drawSpeed(that, 0);
          }else{
             that.outerRadius = that.outerRadius -5;
             that.innerRadius = that.innerRadius -5;
             that.stage.update();
          }
    }, 100);
  }

    makeBig(that){

    that.stage.y = that.stage.y - 230;
    that.loadingText.y = that.loadingText.y + 230;
    that.steeringWheel.y = that.steeringWheel.y + 230;
    that.bottomGradient.y = that.bottomGradient.y + 230;
    that.rect.y = that.rect.y + 230;
     var makeBig = setInterval(function(){
          that.stage.removeAllChildren();
          for(var i = -Math.PI/2; i<=Math.PI*2-Math.PI/2; i = i+(that.stepDegree*Math.PI/180)){
            let line = new createjs.Shape();
            var fromX = Math.cos(i)*that.outerRadius;
            var fromY = Math.sin(i)*that.outerRadius;
            var toX = Math.cos(i)*that.innerRadius;
            var toY = Math.sin(i)*that.innerRadius;
            line.graphics.beginStroke("white");
            line.graphics.moveTo(fromX, fromY);
            line.graphics.lineTo(toX, toY);
            that.stage.addChild(line);
         }
          for(var i = Math.PI/2; i>=-Math.PI*2 + Math.PI/2; i = i-(that.stepDegree*Math.PI/180)){
            let line = new createjs.Shape();
            var fromX = Math.cos(i)*that.outerRadius;
            var fromY = Math.sin(i)*that.outerRadius +220;
            var toX = Math.cos(i)*that.innerRadius;
            var toY = Math.sin(i)*that.innerRadius +220;
            line.graphics.moveTo(fromX, fromY);
            line.graphics.lineTo(toX, toY);
            that.stage.addChild(line);
          }
          if(that.outerRadius > 110){
            clearInterval(makeBig);
            that.load(that);
          }else{
             that.outerRadius = that.outerRadius +5;
             that.innerRadius = that.innerRadius +5;
             that.stage.addChild(that.loadingText);
             that.stage.addChild(that.steeringWheel);
             that.stage.addChild(that.bottomGradient);
             that.stage.addChild(that.rect);
             that.stage.update();
          }
    }, 100);
  }

  drawEgo(that){
    var vehicleHeight = 4635;
    var vehicleWidth = 2097;
    var roadWidth = 4000;
    var scale = 0;
    var steps = 0.0275/0.0005;
    var egoX = 0;
    var egoY = 0;
    var xEgoStep = -((vehicleWidth*0.0275)/2)/steps;
    var roadX = 0;
    var roadY = 0;
    var xRoadStep = (-(roadWidth*0.0275)/2 + (vehicleWidth * 0.0275)/2)/55;
    var yStep = (40+230)/steps;

    console.log(steps);
    var step = 0;
    var drawEgo = setInterval(function() {
      that.stage.removeAllChildren();

      
      that.road.scaleX = (roadWidth/120)*scale;
      roadX = roadX +xRoadStep + xEgoStep;
      roadY = roadY + yStep;
      that.road.x = roadX;
      that.road.y = roadY;
      that.stage.addChild(that.road);
      that.ego.scaleX = (vehicleWidth / 100) * scale;
      that.ego.scaleY = (vehicleHeight / 178) * scale;
      egoX = egoX + xEgoStep;
      egoY = egoY + yStep;
      that.ego.x = egoX;
      that.ego.y = egoY;
      that.stage.addChild(that.ego);


      that.stage.update();


      if(scale > 0.0275){
        clearInterval(drawEgo);
      }else{
        scale = scale+0.0005;
      }



    },100);
  }

  drawSpeed(that, speed){
      var outerRadius = 60;
      var smallLineRadius = 50;
      var bigLineRadius = 40;
      var miniLineRadius = 50;
      var textRadius = 15;
      var innerRadius = 0;
      var increase = 1;

      var interval = setInterval(function() {
        if(outerRadius>130){
          clearInterval(interval);
        }else{
          outerRadius = outerRadius + 2;
          smallLineRadius = smallLineRadius + 2;
          bigLineRadius = bigLineRadius + 2;
          miniLineRadius = miniLineRadius + 2;
          textRadius = textRadius + 2;
          innerRadius = innerRadius + 2;
        }
        that.speedStage.removeAllChildren();
        var j = 180;
        for(var i = 0; i>=-Math.PI; i = i- (20*Math.PI/180)){
            let pil = new createjs.Shape();
            var fromX = Math.cos(i-0.8*Math.PI/180) * outerRadius;
            var fromY = Math.sin(i-0.8*Math.PI/180) * outerRadius;
            var fromX2 = Math.cos(i+0.8*Math.PI/180) * outerRadius;
            var fromY2 = Math.sin(i+0.8*Math.PI/180) * outerRadius;
            var toX  = Math.cos(i) * bigLineRadius;
            var toY = Math.sin(i) * bigLineRadius;
            pil.graphics.beginFill("white");
            pil.graphics.moveTo(fromX, fromY);
            pil.graphics.lineTo(fromX2, fromY2);
            pil.graphics.lineTo(toX,toY);
            pil.graphics.lineTo(fromX, fromY);
            that.speedStage.addChild(pil);

            if(j%40 == 0 && j<=120) {
                var text = new createjs.Text(j, "20px sans-serif", "white");
                text.x = (Math.cos(i) * textRadius)-15;
                text.y = Math.sin(i) * textRadius;
                text.textBaseline = "alphabetic";
                that.speedStage.addChild(text);
            }
            j= j-20;
        }

        for(var i = 0; i>=-Math.PI; i = i- (5*Math.PI/180)){
            let miniPil = new createjs.Shape();
            var fromX = Math.cos(i-0.2*Math.PI/180) * outerRadius;
            var fromY = Math.sin(i-0.2*Math.PI/180) * outerRadius;
            var fromX2 = Math.cos(i+0.2*Math.PI/180) * outerRadius;
            var fromY2 = Math.sin(i+0.2*Math.PI/180) * outerRadius;
            var toX  = Math.cos(i) * miniLineRadius;
            var toY = Math.sin(i) * miniLineRadius;
            miniPil.graphics.beginFill("white");
            miniPil.graphics.moveTo(fromX, fromY);
            miniPil.graphics.lineTo(fromX2, fromY2);
            miniPil.graphics.lineTo(toX,toY);
            miniPil.graphics.lineTo(fromX, fromY);
            that.speedStage.addChild(miniPil);
        }

          let innerLine = new createjs.Shape();
          innerLine.graphics.beginStroke("white");
          innerLine.graphics.arc(0,0,innerRadius,0,Math.PI, true);
          that.speedStage.addChild(innerLine);

          var FromX = (Math.cos((speed-180)*Math.PI/180)*outerRadius);
          var FromY = (Math.sin((speed-180)*Math.PI/180)*outerRadius);
          var ToX = (Math.cos((speed-178)*Math.PI/180)*innerRadius);
          var ToY = (Math.sin((speed-178)*Math.PI/180)*innerRadius);
          var ToX2 = (Math.cos((speed-182)*Math.PI/180)*innerRadius);
          var ToY2 = (Math.sin((speed-182)*Math.PI/180)*innerRadius);
          let nail = new createjs.Shape();
          nail.graphics.beginFill("red");
          nail.graphics.moveTo(ToX, ToY);
          nail.graphics.lineTo(ToX2, ToY2);
          nail.graphics.lineTo(FromX, FromY);
          nail.graphics.lineTo(ToX,ToY);
          that.speedStage.addChild(nail);

          var speedText = new createjs.Text(Math.round(speed), "40px sans-serif", "white");
          var speedX;
          if(speed > 99){
              speedX = -25;
          }else{
              speedX = -15;
          }
          speedText.x = speedX;
          speedText.y = 0;
          speedText.textBaseline = "alphabetic";
          that.speedStage.addChild(speedText);

        that.speedStage.update()
      }, 100);
  }


  render() {
    return (
      <div styleName="top">

        <div>
         <canvas 
          className="container"
          ref="canvas"
          width={ 768 }
          height={ 1024 } />
       </div>
       <div styleName = "bottom">
        <div styleName = "bottomContainer">
          <div styleName = "bottomDashboardContainer">
            <div styleName = "dashboardContainer">
              <div styleName = "speedContainer">
                <div styleName = "speedCircle">
                  <canvas 
                  className="container"
                  ref="speed"
                  width={275}
                  height={175} />
                </div>
              </div>
              <div styleName="infoactionsContainer">
                <div styleName="infoactionsCircle">
                  <div styleName="infoactionsInnerBox">
                    <div styleName="infoactionsText">
                      
                    </div>
                  </div>
                </div>
              </div>
              <div styleName="accelerationContainer">
                <div styleName="accelerationCircle">
                  <canvas
                  className="container"
                  ref="acceleration"
                  width={275}
                  height={131} />
                </div>
              </div>
            </div>
          </div>
          <div styleName = "bottomInfoContainer">
            <div styleName = "infoboxContainer">
              <div styleName = "infoboxText">
                
              </div>
            </div>
          </div>
        </div>
       </div>
      </div>
    )
  }
}

export default CSSModules(Loading, styles)
