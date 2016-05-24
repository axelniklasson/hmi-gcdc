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
    this.drawEgo();
  }

  // Prepare stage for drawing
  drawEgo() {
    this.stage.x = this.canvas.width / 2 - (this.vehicleWidth * this.scale)/ 2;
    this.stage.y = this.canvas.height / 2 + 40;

    if (!this.ego) {
      this.ego = new createjs.Bitmap(images.transport);
      this.ego.x = 0;
      this.ego.y = 0;
    }
    this.ego.scaleX = (this.vehicleWidth / 100) * this.scale;
    this.ego.scaleY = (this.vehicleHeight / 178) * this.scale;

    if (!this.road) {
      this.road = new createjs.Bitmap(images.road);
    }
    this.road.x = -(this.roadWidth*this.scale)/2 + (this.vehicleWidth * this.scale)/  2;
    this.road.scaleX = (this.roadWidth/120) * this.scale;

    //var angle = 90;
    //var x = 412;
    //var y = 300;
    //var xrot = Math.cos(-angle*Math.PI/180)*x - Math.sin(-angle*Math.PI/180)*y;
    //var yrot = Math.sin(-angle*Math.PI/180)*x + Math.cos(-angle*Math.PI/180)*y;
    //console.log(xrot + ", " + yrot);
    //var circle = new createjs.Shape();
    //circle.graphics.beginFill("white");
    //circle.graphics.drawCircle(xrot,yrot,5);
    //this.stage.addChild(circle);

    this.stage.addChild(this.road);
    this.stage.addChild(this.ego);

    this.road.image.onload = () => this.stage.update()

  }

  init() {
    this.vehicleHeight = 4635;
    this.vehicleWidth = 2097;
    this.roadWidth = 4000;
    this.scale = 0.0275;
    this.otherVehicles = [];
  }

  // Create the drawing logic
  draw(ego, vehicles) {
    for (var i = 0; i < vehicles.length; i++) {
     // this.ego.rotation = ego.heading;
     // this.road.rotation = ego.heading;

      var vehicle = vehicles[i];

      var x = vehicle.x * this.scale;
      var y = vehicle.y * this.scale;
      var angle = ego.heading;
      var xrot = Math.cos(-angle*Math.PI/180)*x - Math.sin(-angle*Math.PI/180)*y;
      var yrot = Math.sin(-angle*Math.PI/180)*x + Math.cos(-angle*Math.PI/180)*y;
      this.otherVehicles[i].vehicle.alpha = 0;
      this.otherVehicles[i].vehicle.x = xrot;
      this.otherVehicles[i].vehicle.y = yrot;
      this.otherVehicles[i].vehicle.rotation = vehicle.heading-ego.heading;
      this.otherVehicles[i].vehicle.scaleX = (this.vehicleWidth / 100) * this.scale;
      this.otherVehicles[i].vehicle.scaleY = (this.vehicleHeight / 178) * this.scale;
      var bounds = this.otherVehicles[i].vehicle.getTransformedBounds();
      
      if(yrot < -551 && xrot < 412 && xrot > -355){             
        this.otherVehicles[i].indicator.x = bounds.x - 250 + bounds.width/2;
        this.otherVehicles[i].indicator.y = -551 - 300;

        var diff = -(yrot + 551);
        if(diff < 100000*this.scale){
          this.otherVehicles[i].indicator.alpha = 1 - diff/(100000*this.scale);  
        }else{
          this.otherVehicles[i].indicator.alpha = 0;
        }

      }else if(yrot >=-551 && yrot < -451 && xrot <412 && xrot > -355){
        this.otherVehicles[i].indicator.x = bounds.x - 250 + bounds.width/2;
        this.otherVehicles[i].indicator.y = -551 -300;

        var diff = 551 + yrot;
        this.otherVehicles[i].vehicle.alpha = diff*0.01;
        this.otherVehicles[i].indicator.alpha = 1 - diff*0.01;
      }else if(yrot > 400 && xrot < 412 && xrot > -355){
        this.otherVehicles[i].indicator.x = bounds.x - 250 + bounds.width/2;
        this.otherVehicles[i].indicator.y = 100;

        var diff = yrot - 400;
        if(diff < 100000*this.scale){
          this.otherVehicles[i].indicator.alpha = 1 - diff/(100000*this.scale);  
        }else{
          this.otherVehicles[i].indicator.alpha = 100;
        }
      }else if(yrot < 400 && yrot > 300  && xrot <412 && xrot >-355){
        this.otherVehicles[i].indicator.x = bounds.x - 250 + bounds.width/2;
        this.otherVehicles[i].indicator.y = 100;

        var diff = 400 - yrot;
        this.otherVehicles[i].vehicle.alpha = diff*0.01;
        this.otherVehicles[i].indicator.alpha = 1 - diff*0.01;
        console.log(diff*0.01);

      }else if(xrot > 412){
        this.otherVehicles[i].indicator.x = 412 - 300;
        this.otherVehicles[i].indicator.y = bounds.y - 250 + bounds.height/2;

        var diff = xrot -412;
        if(diff < 100000*this.scale){
          this.otherVehicles[i].indicator.alpha = 1 - diff/(100000*this.scale);
        }else{
          this.otherVehicles[i].indicator.alpha = 0;
        }
      }else if(xrot < 412 && xrot > 312){
        this.otherVehicles[i].indicator.x = bounds.x - 250 + bounds.width/2;
        this.otherVehicles[i].indicator.y = 412 - 300;

        var diff = 412 - xrot;
        this.otherVehicles[i].vehicle.alpha = diff*0.01;
        this.otherVehicles[i].indicator.alpha = 1 - diff*0.01;

      }else if(x < -355){
        this.otherVehicles[i].indicator.x = -355- 300;
        this.otherVehicles[i].indicator.y = bounds.y - 250 + bounds.height/2;

        var diff = -(xrot + 355);
        if(diff < 100000*this.scale){
          this.otherVehicles[i].indicator.alpha = 1 - diff/(100000*this.scale);
          console.log(this.otherVehicles[i].indicator.alpha);  

        }else{
          this.otherVehicles[i].indicator.alpha = 0;
        }

      }else if(xrot > -355 && xrot <-255){
        this.otherVehicles[i].indicator.x = bounds.x - 250 + bounds.width/2;
        this.otherVehicles[i].indicator.y = -355- 300;

        var diff = 355 + xrot;
        this.otherVehicles[i].vehicle.alpha = diff*0.01;
        this.otherVehicles[i].indicator.alpha = 1 - diff*0.01;

      }else{

        this.otherVehicles[i].indicator.alpha = 0;
        this.otherVehicles[i].vehicle.alpha = 1;
      }
    }

   // this.stage.rotation = -ego.heading;
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

    if (this.otherVehicles.length == 0 && ego && vehicles) {
      for (var i = 0; i < vehicles.length; i++) {
        var obj = {};
        var vehicle = new createjs.Bitmap(images.otherTransport);
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
    if (ego, vehicles) {
      this.draw(ego, vehicles);
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
