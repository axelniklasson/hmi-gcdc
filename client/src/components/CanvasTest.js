import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import createjs from 'createjs-collection'
import images from '../images'
import ZoomButtons from './ZoomButtons'

class CanvasTest extends Component {
  constructor(props) {
    super(props)
    this.updateScale = this.updateScale.bind(this);
  }

  componentWillMount() {
    this.init()
  }

  // Prepare stage for drawing
  componentDidMount() {
    let canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas);
    this.stage.x = canvas.width / 2 - (2097 * this.scale)/ 2;
    this.stage.y = canvas.height / 2;

    var y = -50;
    var plusX = (2097*this.scale)/2;
    for(var i = 0; i<256; i=i+3){
      var leftLine = new createjs.Shape();
      var rightLine = new createjs.Shape();
      var color = "rgb(";
      color = color + i;
      color = color + ",";
      color = color + i;
      color = color + ",";
      color = color + i;
      color = color + ")";
      leftLine.graphics.beginStroke(color);
      rightLine.graphics.beginStroke(color);
      rightLine.graphics.moveTo(((this.vehicleWidth*this.scale)/2)+25 + plusX,y);
      leftLine.graphics.moveTo(-((this.vehicleWidth*this.scale)/2)-25+ plusX, y);
      y = y+1;
      leftLine.graphics.lineTo(-((this.vehicleWidth*this.scale)/2)-25+ plusX, y);
      rightLine.graphics.lineTo(((this.vehicleWidth*this.scale)/2)+25+ plusX, y);
      this.stage.addChild(leftLine);
      this.stage.addChild(rightLine);
    }

    var lineLeft = new createjs.Shape();
    lineLeft.graphics.beginStroke("white")
    lineLeft.graphics.moveTo(-((this.vehicleWidth*this.scale)/2)-25+ plusX,y);
    lineLeft.graphics.lineTo(-((this.vehicleWidth*this.scale)/2)-25+ plusX,400);
    this.stage.addChild(lineLeft);

    var lineRight = new createjs.Shape();
    lineRight.graphics.beginStroke("white")
    lineRight.graphics.moveTo(((this.vehicleWidth*this.scale)/2)+25+ plusX,y);
    lineRight.graphics.lineTo(((this.vehicleWidth*this.scale)/2)+25+ plusX,400);
    this.stage.addChild(lineRight);

    this.ego = new createjs.Bitmap(images.transport);
    this.ego.x = 0;
    this.ego.y = 0;
    this.ego.scaleX = (this.vehicleWidth / 100) * this.scale;
    this.ego.scaleY = (this.vehicleHeight / 178) * this.scale;
    this.stage.addChild(this.ego);

    this.ego.image.onload = () => this.stage.update()
  }

  // Sets init data and creates ego vehicle
  init() {
    this.vehicleHeight = 4635;
    this.vehicleWidth = 2097;
    this.roadWidth = 4000;
    this.scale = 0.03;
    this.otherVehicles = [];
  }

  // Create the drawing logic
  draw(ego, vehicles) {
    for (var i = 0; i < vehicles.length; i++) {
      var vehicle = vehicles[i];
      this.otherVehicles[i].x = vehicle.x * this.scale;
      this.otherVehicles[i].y = vehicle.y * this.scale;
      this.otherVehicles[i].rotation = vehicle.heading;
      this.otherVehicles[i].scaleX = (this.vehicleWidth / 100) * this.scale;
      this.otherVehicles[i].scaleY = (this.vehicleHeight / 178) * this.scale;
    }
    
    this.stage.update()
  }

  updateScale(zoom) {
    if (zoom == 1) {
      this.scale += 0.005;
    } else {
      this.scale -= 0.005;
    }
    this.draw();
    this.stage.update();
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
        <ZoomButtons updateScale={ this.updateScale } />
        <canvas 
          className="container"
          ref="canvas"
          width={ 980 }
          height={ 1300 } />
      </div>
    )
  }
}

export default CanvasTest
