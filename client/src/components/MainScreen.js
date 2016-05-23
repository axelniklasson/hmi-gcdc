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
    this.counter = 0;
    this.blinkerTopRight = new createjs.Bitmap(images.blinker);
    this.blinkerBottomRight = new createjs.Bitmap(images.blinker);
    this.drawEgo();
  }

  // Draw blinkers
  drawBlinkers() {
    if (this.counter < 5) {
      this.blinkerTopRight.x = this.vehicleWidth * this.scale;
      this.blinkerTopRight.y = 0;
      this.stage.addChild(this.blinkerTopRight);

      this.blinkerBottomRight.x = this.vehicleWidth * this.scale - 5;
      this.blinkerBottomRight.y = this.vehicleHeight * this.scale;
      this.stage.addChild(this.blinkerBottomRight);
      this.counter++;
    } else if (this.counter > 10) {
      this.counter = 0; 
    } else if (this.counter >= 5) {
      this.stage.removeChild(this.blinkerTopRight);
      this.stage.removeChild(this.blinkerBottomRight);
      this.counter++;
    } 
    this.stage.update();
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
    // this.road.x = -(this.roadWidth*this.scale)/2 + (this.vehicleWidth * this.scale)/  2;
    this.road.scaleX = (this.roadWidth/120) * this.scale;

    this.leftLane = new createjs.Bitmap(images.road);
    this.rightLane = new createjs.Bitmap(images.road);

    this.leftLane.scaleX = (this.roadWidth/120) * this.scale;
    this.rightLane.scaleX = (this.roadWidth/120) * this.scale;

    this.stage.addChild(this.road);
    this.stage.addChild(this.leftLane);
    this.stage.addChild(this.rightLane);
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
  draw(ego) {
    this.ego.rotation = ego.heading;
    this.road.rotation = ego.heading;
    this.leftLane.rotation = ego.heading;
    this.rightLane.rotation = ego.heading;
    this.stage.rotation = -ego.heading;
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
    const { ego } = this.props;

    // if (this.otherVehicles.length == 0 && ego && vehicles) {
    //   for (var i = 0; i < vehicles.length; i++) {
    //     var vehicle = new createjs.Bitmap(images.otherTransport);
    //     this.otherVehicles.push(vehicle);
    //     this.stage.addChild(vehicle);
    //   }
    // }

    // Draw on props update
    if (ego) {
      this.draw(ego);
      this.drawBlinkers();
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
