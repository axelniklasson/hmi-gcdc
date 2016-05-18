import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import createjs from 'createjs-collection'
import images from '../images'
import ZoomButtons from './ZoomButtons'

class MainScreen extends Component {
  constructor(props) {
    super(props)
    this.updateScale = this.updateScale.bind(this);
  }

  componentWillMount() {
    this.init();
  }

  componentDidMount() {
    let canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas);
    this.stage.x = canvas.width / 2 - (this.vehicleWidth * this.scale)/ 2;
    this.stage.y = canvas.height / 2 + 40;

    this.canvas = canvas;
    this.drawRightBlinkers = false;
    this.drawLeftBlinkers = false;
    this.braking = false;
    this.blinkingLeft = false;
    this.blinkingRight = false;
    this.brakeLeft = new createjs.Bitmap(images.brake);
    this.brakeLeft.alpha = 0;
    this.brakeRight = new createjs.Bitmap(images.brake);
    this.brakeRight.alpha = 0;
    this.blinkerTopRight = new createjs.Bitmap(images.blinker);
    this.blinkerTopRight.alpha = 0;
    this.blinkerBottomRight = new createjs.Bitmap(images.blinker);
    this.blinkerBottomRight.alpha = 0;
    this.blinkerTopLeft = new createjs.Bitmap(images.blinker);
    this.blinkerTopLeft.alpha = 0;
    this.blinkerBottomLeft = new createjs.Bitmap(images.blinker);
    this.blinkerBottomLeft.alpha = 0;
    this.drawEgo();
  }

  drawBrakeLights() {
    if (this.braking) {
      this.brakeLeft.x = (this.scale/0.0275) * -15;
      this.brakeLeft.y = this.vehicleHeight * this.scale - (this.scale/0.0275) * 25; // - this.brakeLeft.getBounds().height / 2;
      this.brakeLeft.alpha = 1;
      this.brakeLeft.scaleX = this.scale/0.0275;
      this.brakeLeft.scaleY = this.scale/0.0275;
      this.brakeRight.x = this.vehicleWidth * this.scale - (this.scale/0.0275) * 35 ;
      this.brakeRight.y = this.vehicleHeight * this.scale - (this.scale/0.0275) * 25; // - this.brakeRight.getBounds().height / 2;
      this.brakeRight.scaleX = (this.scale/0.0275);
      this.brakeRight.scaleY = (this.scale/0.0275);
      this.brakeRight.alpha = 1;
    } else {
        this.brakeLeft.alpha = 0;
        this.brakeRight.alpha = 0;
    }
    this.stage.update();
  }

drawBlinkers() {
    if (this.drawRightBlinkers == true && this.blinkingRight == false) {
      var onRight = false;
      var that = this;
      this.blinkingRight = true;
      this.interval = setInterval(function() {
          if(!onRight){
           that.blinkerTopRight.x = that.vehicleWidth * that.scale - (that.scale/0.0275) * 35;
           that.blinkerTopRight.y = 0 - that.blinkerTopRight.getBounds().height / 2 + (that.scale/0.0275) * 10;
           that.blinkerTopRight.scaleX = (that.scale/0.0275);
           that.blinkerTopRight.scaleY = (that.scale/0.0275);
           that.blinkerBottomRight.x = that.vehicleWidth * that.scale - (that.scale/0.0275)*35;
           that.blinkerBottomRight.y = that.vehicleHeight * that.scale - (that.scale/0.0275) * 25;// - this.blinkerBottomRight.getBounds().height / 2;
           that.blinkerBottomRight.scaleX = (that.scale/0.0275);
           that.blinkerBottomRight.scaleY = (that.scale/0.0275);
           that.blinkerBottomRight.alpha = 1;
           that.blinkerTopRight.alpha = 1;
           onRight = true;
          }else{
            that.blinkerBottomRight.alpha = 0;
            that.blinkerTopRight.alpha = 0;
            onRight = false;
          }
      }, 500);
      
    }else if(this.blinkingRight == false){
       this.blinkerBottomRight.alpha = 0;
       this.blinkerTopRight.alpha = 0;
       clearInterval(this.interval);
    }

    if (this.drawLeftBlinkers == true && this.blinkingLeft == false) {
      var onLeft = false;
      var that = this;
      this.blinkingLeft = true;
      this.leftInterval = setInterval(function() {
          if(!onLeft){
           that.blinkerTopLeft.x = -(that.scale/0.0275)*15;
           that.blinkerTopLeft.y = 0 - that.blinkerTopLeft.getBounds().height / 2 + (that.scale/0.0275)*10;
           that.blinkerTopLeft.scaleX = (that.scale/0.0275);
           that.blinkerTopLeft.scaleY = (that.scale/0.0275);
           that.blinkerBottomLeft.x =  -(that.scale/0.0275)*15;
           that.blinkerBottomLeft.y = that.vehicleHeight * that.scale - (that.scale/0.0275)*25;// - this.blinkerBottomRight.getBounds().height / 2;
           that.blinkerBottomLeft.scaleY = (that.scale/0.0275);
           that.blinkerBottomLeft.scaleX = (that.scale/0.0275);
           that.blinkerTopLeft.alpha = 1;
           that.blinkerBottomLeft.alpha = 1;
           onLeft = true;
          }else{
            that.blinkerBottomLeft.alpha = 0;
            that.blinkerTopLeft.alpha = 0;
            onLeft = false;
          }
      }, 500);
      
    }else if(this.blinkingLeft == false){
       this.blinkerBottomLeft.alpha = 0;
       this.blinkerBottomLeft.alpha = 0;
       clearInterval(this.leftInterval);
    }
    this.stage.update();
  }

  // Prepare stage for drawing
  drawEgo() {
    this.stage.x = this.canvas.width / 2 - (this.vehicleWidth * this.scale)/ 2;
    this.stage.y = this.canvas.height / 2 + 40;

    if (!this.ego) {
      this.ego = new createjs.Bitmap(images.ego);
      this.ego.x = 0;
      this.ego.y = 0;
    }
    this.ego.scaleX = (this.vehicleWidth / 100) * this.scale;
    this.ego.scaleY = (this.vehicleHeight / 205) * this.scale;


    if (!this.road) {
      this.road = new createjs.Bitmap(images.road);
    }
    this.road.x = -(this.roadWidth*this.scale)/2 + (this.vehicleWidth * this.scale)/  2;
    this.road.scaleX = (this.roadWidth/120) * this.scale;

    if (!this.leftLane) {
      this.leftLane = new createjs.Bitmap(images.road);
    }
    this.leftLane.x = -(this.roadWidth*this.scale)/2 + (this.vehicleWidth * this.scale)/  2;

    if (!this.rightLane) {
      this.rightLane = new createjs.Bitmap(images.road);
    }
    this.rightLane.x = -(this.roadWidth*this.scale)/2 + (this.vehicleWidth * this.scale)/  2;
    

    this.leftLane.scaleX = (this.roadWidth/120) * this.scale;
    this.rightLane.scaleX = (this.roadWidth/120) * this.scale;
    if (this.road) {
      this.stage.removeChild(this.road);
    }
    if (this.leftLane) {
      this.stage.removeChild(this.leftLane);
    }
    if (this.rightLane) {
      this.stage.removeChild(this.rightLane);
    }

    this.stage.addChild(this.road);
    this.stage.addChild(this.leftLane);
    this.stage.addChild(this.rightLane);
    this.stage.addChild(this.ego);
    this.stage.addChild(this.blinkerBottomRight)
    this.stage.addChild(this.blinkerTopRight);
    this.stage.addChild(this.blinkerBottomLeft);
    this.stage.addChild(this.blinkerTopLeft);
    this.stage.addChild(this.brakeLeft);
    this.stage.addChild(this.brakeRight);
    this.road.image.onload = () => this.stage.update()

    this.road.image.onload = () => this.stage.update()
  }

  init() {
    this.vehicleHeight = 4628;
    this.vehicleWidth = 1865;
    this.roadWidth = 4000;
    this.scale = 0.0275;
    this.otherVehicles = [];
  }

  // Create the drawing logic
  draw(ego, vehicles) {
    ego.distanceToLaneC = -ego.distanceToLaneC;
    this.road.x = -(this.roadWidth*this.scale)/2 + (this.vehicleWidth * this.scale)/2 + (ego.distanceToLaneC * this.scale);

    // Fade in lane marking
    if (ego.distanceToLaneC < -500) {
      this.rightLane.x = this.road.x + this.roadWidth * this.scale;
      this.rightLane.alpha = (Math.abs(ego.distanceToLaneC) - 500) * 0.001;
      this.leftLane.alpha = 0;
    } else if (ego.distanceToLaneC > 500) {
      this.leftLane.x = this.road.x - this.roadWidth * this.scale;
      this.leftLane.alpha = (Math.abs(ego.distanceToLaneC) - 500) * 0.001;
      this.rightLane.alpha = 0;
    } else {
      this.rightLane.alpha = 0;
      this.leftLane.alpha = 0;
    }


    for (var i = 0; i < vehicles.length; i++) {
      var vehicle = vehicles[i];

      var x = -1 * (vehicle.x * this.scale);
      var y = vehicle.y * this.scale;
      var angle = ego.heading;
      var xrot = Math.cos(-angle*Math.PI/180)*x - Math.sin(-angle*Math.PI/180)*y;
      var yrot = Math.sin(-angle*Math.PI/180)*x + Math.cos(-angle*Math.PI/180)*y;
      this.otherVehicles[i].vehicle.alpha = 0;
      this.otherVehicles[i].vehicle.x = xrot;
      this.otherVehicles[i].vehicle.y = yrot;
      this.otherVehicles[i].vehicle.rotation = vehicle.heading-ego.heading;
      this.otherVehicles[i].vehicle.scaleX = (vehicle.width / 100) * this.scale;
      this.otherVehicles[i].vehicle.scaleY = (vehicle.length / 205) * this.scale;
      this.otherVehicles[i].indicator.scaleX = this.scale/0.0275;
      this.otherVehicles[i].indicator.scaleY = this.scale/0.0275;
      var bounds = this.otherVehicles[i].vehicle.getTransformedBounds();
      
      if(yrot < -551 && xrot < 412 && xrot > -355){  
        this.otherVehicles[i].indicator.x = bounds.x - 250*this.scale/0.0275 + bounds.width/2;
        this.otherVehicles[i].indicator.y = -551 - 300*this.scale/0.0275;

        var diff = -(yrot + 551);
        if(diff < 100000*this.scale){
          this.otherVehicles[i].indicator.alpha = 1 - diff/(100000*this.scale);  
        }else{
          this.otherVehicles[i].indicator.alpha = 0;
        }

      }else if(yrot >=-551 && yrot < -451 && xrot <412 && xrot > -355){
        this.otherVehicles[i].indicator.x = bounds.x - 250*this.scale/0.0275 + bounds.width/2;
        this.otherVehicles[i].indicator.y = -551 -300*this.scale/0.0275;

        var diff = 551 + yrot;
        this.otherVehicles[i].vehicle.alpha = diff*0.01;
        this.otherVehicles[i].indicator.alpha = 1 - diff*0.01;
      }else if(yrot > 400 && xrot < 412 && xrot > -355){
        this.otherVehicles[i].indicator.x = bounds.x - 250*this.scale/0.0275 + bounds.width/2;
        this.otherVehicles[i].indicator.y = 100;

        var diff = yrot - 400;
        if(diff < 100000*this.scale){
          this.otherVehicles[i].indicator.alpha = 1 - diff/(100000*this.scale);  
        }else{
          this.otherVehicles[i].indicator.alpha = 100;
        }
      }else if(yrot < 400 && yrot > 300  && xrot <412 && xrot >-355){    
        this.otherVehicles[i].indicator.x = bounds.x - 250*this.scale/0.0275 + bounds.width/2;
        this.otherVehicles[i].indicator.y = 100*this.scale/0.0275;

        var diff = 400 - yrot;
        this.otherVehicles[i].vehicle.alpha = diff*0.01;
        this.otherVehicles[i].indicator.alpha = 1 - diff*0.01;

      }else if(xrot > 412){
        this.otherVehicles[i].indicator.x = 412 - 200*this.scale/0.0275;
        this.otherVehicles[i].indicator.y = bounds.y - 250*this.scale/0.0275 + bounds.height/2;

        var diff = xrot -412;
        if(diff < 100000*this.scale){
          this.otherVehicles[i].indicator.alpha = 1 - diff/(100000*this.scale);
        }else{
          this.otherVehicles[i].indicator.alpha = 0;
        }
      }else if(xrot < 412 && xrot > 312){
       this.otherVehicles[i].indicator.x = 412 - 200*this.scale/0.0275;
       this.otherVehicles[i].indicator.y = bounds.y - 250*this.scale/0.0275 + bounds.height/2;

        var diff = 412 - xrot;
        this.otherVehicles[i].vehicle.alpha = diff*0.01;
        this.otherVehicles[i].indicator.alpha = 1 - diff*0.01;

      }else if(x < -355){
        this.otherVehicles[i].indicator.x = -355- 300*this.scale/0.0275;
        this.otherVehicles[i].indicator.y = bounds.y - 250*this.scale/0.0275 + bounds.height/2;

        var diff = -(xrot + 355);
        if(diff < 100000*this.scale){
        this.otherVehicles[i].indicator.alpha = 1 - diff/(100000*this.scale); 

        }else{
          this.otherVehicles[i].indicator.alpha = 0;
        }

      }else if(xrot > -355 && xrot <-255){
        this.otherVehicles[i].indicator.x = -355- 300*this.scale/0.0275;
        this.otherVehicles[i].indicator.y = bounds.y - 250*this.scale/0.0275 + bounds.height/2;

        var diff = 355 + xrot;
        this.otherVehicles[i].vehicle.alpha = diff*0.01;
        this.otherVehicles[i].indicator.alpha = 1 - diff*0.01;

      }else{

        this.otherVehicles[i].indicator.alpha = 0;
        this.otherVehicles[i].vehicle.alpha = 1;
      }
    }

    this.stage.update()
  }

  updateScale(zoom) {
    if (zoom == 1 && this.scale < 0.04) {
      this.scale += 0.0025;
    } else if (zoom == 0 && this.scale > 0.015) {
      this.scale -= 0.0025;
    }
    this.drawEgo();
    this.stage.update();
  }

  render() {
    // Extract props
    const { ego, vehicles } = this.props;
    if (ego.flags) {
     
       if (ego.flags[1]) {
         this.drawLeftBlinkers = true;
       } else if (ego.flags[1]) {
         this.drawLeftBlinkers = false;
         this.blinkingLeft = false;
       }

       if (ego.flags[2]) {
         this.drawRightBlinkers = true;
       } else if (ego.flags[2]) {
         this.drawRightBlinkers = false;
         this.blinkingRight = false;
       }
    }

    if(ego){
      if(ego.acceleration < -0.5){
        this.braking = true;
      }else{
        this.braking = false;
      }
    }

    if (this.otherVehicles.length == 0 && ego && vehicles) {
      for (var i = 0; i < vehicles.length; i++) {
        var obj = {};
        var vehicle = new createjs.Bitmap(images.vehicle);
        obj.vehicle = vehicle;
        var indicator = new createjs.Bitmap(images.indicator);
        indicator.alpha = 0;
        obj.indicator = indicator;
        this.otherVehicles.push(obj);
        this.stage.addChild(vehicle);
        this.stage.addChild(indicator);
      }
    }

    // Draw on props update
    if (ego, vehicles) {
       this.draw(ego, vehicles);
       this.drawBlinkers();
       this.drawBrakeLights();
    }

    return (
      <div>
        <ZoomButtons updateScale={ this.updateScale } />
        <canvas 
          className="container"
          ref="canvas"
          width={ 768 }
          height={ 1024 } />
      </div>
    )
  }
}

export default MainScreen
