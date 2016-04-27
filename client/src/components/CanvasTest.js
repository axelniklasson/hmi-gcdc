import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import createjs from 'createjs-collection'
import images from '../images'

class CanvasTest extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.init()
  }

  // Prepare stage for drawing
  componentDidMount() {
    let canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas);
    this.stage.x = canvas.width / 2 - (this.vehicleWidth * this.scale)/ 2;
    this.stage.y = canvas.height / 2 + 40;

 //   var y = -50;
 //   var plusX = (2097*this.scale)/2;
 //   for(var i = 0; i<256; i=i+3){
 //     var leftLine = new createjs.Shape();
 //     var rightLine = new createjs.Shape();
 //     var color = "rgb(";
//    color = color + i;
 //     color = color + ",";
 //     color = color + i;
 //     color = color + ",";
 //     color = color + i;
 //     color = color + ")";
 //     leftLine.graphics.beginStroke(color);
 //     rightLine.graphics.beginStroke(color);
 //     rightLine.graphics.moveTo(((this.vehicleWidth*this.scale)/2)+25 + plusX,y);
 //     leftLine.graphics.moveTo(-((this.vehicleWidth*this.scale)/2)-25+ plusX, y);
 //     y = y+1;
 //     leftLine.graphics.lineTo(-((this.vehicleWidth*this.scale)/2)-25+ plusX, y);
 //     rightLine.graphics.lineTo(((this.vehicleWidth*this.scale)/2)+25+ plusX, y);
 //     this.stage.addChild(leftLine);
 //     this.stage.addChild(rightLine);
 //   }

 //   var lineLeft = new createjs.Shape();
 //   lineLeft.graphics.beginStroke("white")
 //   lineLeft.graphics.moveTo(-((this.vehicleWidth*this.scale)/2)-25+ plusX,y);
 //   lineLeft.graphics.lineTo(-((this.vehicleWidth*this.scale)/2)-25+ plusX,400);
 //   this.stage.addChild(lineLeft);

 //   var lineRight = new createjs.Shape();
 //   lineRight.graphics.beginStroke("white")
 //  lineRight.graphics.moveTo(((this.vehicleWidth*this.scale)/2)+25+ plusX,y);
 //   lineRight.graphics.lineTo(((this.vehicleWidth*this.scale)/2)+25+ plusX,400);
 //   this.stage.addChild(lineRight);


    this.stage.addChild(this.road);
    this.stage.addChild(this.ego);
   // this.stage.addChild(this.lineRight);
   // this.stage.addChild(this.ego);

    this.ego.image.onload = () => this.stage.update()
  }

  // Sets init data and creates ego vehicle
  init() {
    this.vehicleHeight = 4635;
    this.vehicleWidth = 2097;
    this.roadWidth = 4000;
    this.scale = 0.04;

    this.ego = new createjs.Bitmap(images.transport);
    this.ego.x = 0;
    this.ego.y = 0;
    this.ego.scaleX = (this.vehicleWidth / 100) * this.scale;
    this.ego.scaleY = (this.vehicleHeight / 178) * this.scale;
    this.road = new createjs.Bitmap(images.road);
    this.road.x = -(this.roadWidth*this.scale)/2 + (this.vehicleWidth * this.scale)/ 2;
    this.road.scaleX = (this.roadWidth/120) * this.scale;
//    this.lineLeft = new createjs.Bitmap(images.line);
//    this.lineLeft.x = -(this.roadWidth*this.scale)/2 + (this.vehicleWidth * this.scale)/ 2;
//    this.lineLeft.y = 0;
//    this.scaleX = 2;
//    this.lineRight = new createjs.Bitmap(images.line);
//    this.lineRight.x = (this.roadWidth*this.scale)/2 + (this.vehicleWidth * this.scale)/ 2;
//    this.lineRight.y = 0;

    this.otherVehicles = [];
  }

  // Create the drawing logic
  draw(ego, vehicles) {
    for (var i = 0; i < vehicles.length; i++) {
      this.ego.rotation = ego.heading;
      this.road.rotation = ego.heading;
      //this.lineLeft.rotation = ego.heading;
      //this.lineRight.rotation = ego.heading;
      var vehicle = vehicles[i];
      this.otherVehicles[i].x = (vehicle.easting - ego.easting) * 1000 * this.scale;
      this.otherVehicles[i].y = (-vehicle.northing + ego.northing) * 1000 * this.scale;
      this.otherVehicles[i].rotation = vehicle.heading;
      this.otherVehicles[i].scaleX = (this.vehicleWidth / 100) * this.scale;
      this.otherVehicles[i].scaleY = (this.vehicleHeight / 178) * this.scale;
    }

   this.stage.rotation = -ego.heading;
    this.stage.update()
  }

  render() {
    // Extract props
    const { ego, vehicles } = this.props;

    if (this.otherVehicles.length == 0 && ego && vehicles) {
      for (var i = 0; i < vehicles.length; i++) {
        var vehicle = new createjs.Bitmap(images.otherTransport);
        this.otherVehicles.push(vehicle);
        this.stage.addChild(vehicle);
      }
    }

    // Draw on props update
    if (ego, vehicles) {
      this.draw(ego, vehicles);
    }

    return (
      <div>
        <canvas 
          className="container"
          ref="canvas"
          width={980}
          height={1300} />
      </div>
    )
  }
}

export default CanvasTest
