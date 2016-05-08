import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import createjs from 'createjs-collection'
import images from '../images'

class CanvasTest extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    this.canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(this.canvas);
    this.stage.x = this.canvas.width / 2;
    this.stage.y = this.canvas.height / 2;
    this.number = 0;
    this.outerRadius = 10;
    this.innerRadius = 0;
    this.stepDegree = 5;
    this.numberOfLines = (Math.PI*2)/(this.stepDegree*Math.PI/180);
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
    this.stage.addChild(this.settingsGradient);
    var settingsText = new createjs.Text("Vehicle Settings", "30px sans-serif", "white");
    settingsText.x = (-this.canvas.width)/2 + 130;
    settingsText.y = -this.canvas.height/2 + 70;
    settingsText.textBaseline = "alphabetic";
    this.stage.addChild(settingsText);

    this.gps.scaleX = 0.2;
    this.gps.scaleY = 0.2;
    this.gps.x = -this.canvas.width/2 + 50;
    this.gps.y = -this.canvas.height/2 +  ySpace;
    this.gpsGradient.x = (-this.canvas.width)/2;
    this.gpsGradient.y = (-this.canvas.height)/2 + ySpace -20;
    this.gpsGradient.scaleY = 0.6;
    this.stage.addChild(this.gpsGradient);
    var gpsText = new createjs.Text("Navigation", "30px sans-serif", "white");
    gpsText.x = (-this.canvas.width)/2 + 130;
    gpsText.y = -this.canvas.height/2  + 30 + ySpace;
    gpsText.textBaseline = "alphabetic";
    this.stage.addChild(gpsText);
    var routeText = new createjs.Text("Current Route: ", "20px sans-serif", "white");
    routeText.x = (-this.canvas.width)/2 + 130;
    routeText.y = -this.canvas.height/2 + 60 + ySpace;
    routeText.textBaseline = "alphabetic";
    this.stage.addChild(routeText);


    this.ac.scaleX = 0.2;
    this.ac.scaleY = 0.2;
    this.ac.x = -this.canvas.width/2  + 50;
    this.ac.y = -this.canvas.height/2 +  2*ySpace - 20;
    this.acGradient.x = (-this.canvas.width)/2;
    this.acGradient.y = (-this.canvas.height)/2 + 2*ySpace -40;
    this.acGradient.scaleY = 0.6;
    var acText = new createjs.Text("Climate Control", "30px sans-serif", "white");
    acText.x = (-this.canvas.width)/2 + 130;
    acText.y = -this.canvas.height/2 + 10 + 2*ySpace;
    acText.textBaseline = "alphabetic";
    this.stage.addChild(acText);
    var climateText = new createjs.Text("Fan Level: 3", "20px sans-serif", "white");
    climateText.x = (-this.canvas.width)/2 + 130;
    climateText.y = -this.canvas.height/2 + 40 + 2*ySpace;
    climateText.textBaseline = "alphabetic";
    this.stage.addChild(climateText);


    this.stage.addChild(this.acGradient);
    this.phone.scaleX = 0.2;
    this.phone.scaleY = 0.2;
    this.phone.x = -this.canvas.width/2 + 50;
    this.phone.y = -this.canvas.height/2 +  3*ySpace - 40;
    this.phoneGradient.x = (-this.canvas.width)/2;
    this.phoneGradient.y = (-this.canvas.height)/2 + 3*ySpace -60;
    this.phoneGradient.scaleY = 0.6;
    this.stage.addChild(this.phoneGradient);
    var phoneText = new createjs.Text("Phone", "30px sans-serif", "white");
    phoneText.x = (-this.canvas.width)/2 + 130;
    phoneText.y = -this.canvas.height/2 -10 + 3*ySpace;
    phoneText.textBaseline = "alphabetic";
    this.stage.addChild(phoneText);
    var connectedText = new createjs.Text("Connected To Linnea's iPhone", "20px sans-serif", "white");
    connectedText.x = (-this.canvas.width)/2 + 130;
    connectedText.y = -this.canvas.height/2 + 20 + 3*ySpace;
    connectedText.textBaseline = "alphabetic";
    this.stage.addChild(connectedText);

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
    var phoneText = new createjs.Text("Music", "30px sans-serif", "white");
    phoneText.x = (-this.canvas.width)/2 + 130;
    phoneText.y = -this.canvas.height/2 -30 + 4*ySpace;
    phoneText.textBaseline = "alphabetic";
    this.stage.addChild(phoneText);
    var connectedText = new createjs.Text("Currently playing: a song", "20px sans-serif", "white");
    connectedText.x = (-this.canvas.width)/2 + 130;
    connectedText.y = -this.canvas.height/2 + 4*ySpace;
    connectedText.textBaseline = "alphabetic";
    this.stage.addChild(connectedText);

    this.steeringWheel.scaleX = 0.3;
    this.steeringWheel.scaleY = 0.3;
    this.steeringWheel.x = -this.canvas.width/2 + 30;
    this.steeringWheel.y = (-this.canvas.height)/2 + 5*ySpace -70;
    var autonomousText = new createjs.Text("Autonomous Driving Available", "30px sans-serif", "white");
    autonomousText.x = (-this.canvas.width)/2 + 130;
    autonomousText.y = -this.canvas.height/2 + 5*ySpace -40;
    autonomousText.textBaseline = "alphabetic";
    this.stage.addChild(autonomousText);
    var activateText = new createjs.Text("Slide up to activate", "20px sans-serif", "white");
    activateText.x = (-this.canvas.width)/2 + 130;
    activateText.y = -this.canvas.height/2 + 5*ySpace -10;
    activateText.textBaseline = "alphabetic";
    this.stage.addChild(activateText);

    var rect = new createjs.Shape();
    rect.graphics.beginFill("rgb(10,110,44").drawRect((-this.canvas.width)/2, 298, this.canvas.width, 200);
    this.stage.addChild(rect);
    this.stage.addChild(this.bottomGradient);
    this.stage.addChild(this.steeringWheel);
    this.stage.addChild(this.musicGradient);
    this.stage.addChild(this.music);
    this.stage.addChild(this.phone);
    this.stage.addChild(this.settings);
    this.stage.addChild(this.gps);
    this.stage.addChild(this.ac);
    this.stage.update();
  }
 

  // Create the drawing logic
  draw() {
    this.makeBig(this);
    }

  load(that){

    var loading = setInterval(function(){
      that.stage.removeAllChildren();
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
          if(that.outerRadius < 1){
            clearInterval(makeSmall);
           that.drawEgo(that);
          }else{
             that.outerRadius = that.outerRadius -5;
             that.innerRadius = that.innerRadius -5;
             that.stage.update();
          }
    }, 100);
  }

    makeBig(that){
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
    var yStep = 40/steps;

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


  render() {
    return (
      <div>
        <canvas 
          className="container"
          ref="canvas"
          width={ 768 }
          height={ 1024 } />
      </div>
    )
  }
}

export default CanvasTest
