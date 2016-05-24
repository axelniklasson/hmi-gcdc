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
    this.counter2 = 0;
    this.drawRightBlinkers = false;
    this.drawLeftBlinkers = false;
    this.brakeLeft = new createjs.Bitmap(images.brake);
    this.brakeRight = new createjs.Bitmap(images.brake);
    this.blinkerTopRight = new createjs.Bitmap(images.blinker);
    this.blinkerBottomRight = new createjs.Bitmap(images.blinker);
    this.blinkerTopLeft = new createjs.Bitmap(images.blinker);
    this.blinkerBottomLeft = new createjs.Bitmap(images.blinker);
    this.drawEgo();
  }

  drawBrakeLights() {
    if (this.braking) {
      this.brakeLeft.x = 0 - this.brakeLeft.getBounds().width / 2;
      this.brakeLeft.y = this.vehicleHeight * this.scale - this.brakeLeft.getBounds().height / 2;
      this.stage.addChild(this.brakeLeft);

      this.brakeRight.x = this.vehicleWidth * this.scale - 30;
      this.brakeRight.y = this.vehicleHeight * this.scale - this.brakeRight.getBounds().height / 2;
      this.stage.addChild(this.brakeRight);
    } else {
      this.stage.removeChild(this.brakeLeft);
      this.stage.removeChild(this.brakeRight);
    }
    this.stage.update();
  }

  drawBlinkers() {
    if (this.drawRightBlinkers == true) {
      if (this.counter < 5) {
        this.blinkerTopRight.x = this.vehicleWidth * this.scale - 27;
        this.blinkerTopRight.y = 0 - this.blinkerTopLeft.getBounds().height / 2;
        this.stage.addChild(this.blinkerTopRight);

        this.blinkerBottomRight.x = this.vehicleWidth * this.scale - 30;
        this.blinkerBottomRight.y = this.vehicleHeight * this.scale - this.blinkerBottomRight.getBounds().height / 2;
        this.stage.addChild(this.blinkerBottomRight);
        this.counter++;
      } else if (this.counter > 10) {
        this.counter = 0; 
      } else if (this.counter >= 5) {
        this.stage.removeChild(this.blinkerTopRight);
        this.stage.removeChild(this.blinkerBottomRight);
        this.counter++;
      } 
    }

    if (this.drawLeftBlinkers == true) {
      if (this.counter2 < 5) {
        this.blinkerTopLeft.x = 0 - this.blinkerTopLeft.getBounds().width / 2;
        this.blinkerTopLeft.y = 0 - this.blinkerTopLeft.getBounds().height / 2;
        this.stage.addChild(this.blinkerTopLeft);

        this.blinkerBottomLeft.x = 0 - this.blinkerTopLeft.getBounds().width / 2;
        this.blinkerBottomLeft.y = this.vehicleHeight * this.scale - this.blinkerTopLeft.getBounds().height / 2;
        this.stage.addChild(this.blinkerBottomLeft);
        this.counter2++;
      } else if (this.counter2 > 10) {
        this.counter2 = 0; 
      } else if (this.counter2 >= 5) {
        this.stage.removeChild(this.blinkerTopLeft);
        this.stage.removeChild(this.blinkerBottomLeft);
        this.counter2++;
      } 
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
    this.road.x = -(this.roadWidth*this.scale)/2 + (this.vehicleWidth * this.scale)/  2;
    this.road.scaleX = (this.roadWidth/120) * this.scale;

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
      this.ego.rotation = ego.heading;
      this.road.rotation = ego.heading;

      var vehicle = vehicles[i];
      this.otherVehicles[i].x = vehicle.x * this.scale;
      this.otherVehicles[i].y = vehicle.y * this.scale;
      this.otherVehicles[i].rotation = vehicle.heading;
      this.otherVehicles[i].scaleX = (this.vehicleWidth / 100) * this.scale;
      this.otherVehicles[i].scaleY = (this.vehicleHeight / 178) * this.scale;
    }

    this.stage.rotation = -ego.heading;
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
      if (ego.flags[0] == 1) {
        this.braking = true;
        this.drawBrakeLights();
      } else if (ego.flags[0] == 0) {
        this.braking = false;
        this.drawBrakeLights();
      }

      if (ego.flags[1]) {
        this.drawLeftBlinkers = true;
        this.drawBlinkers();
      } else if (ego.flags[0]) {
        this.drawLeftBlinkers = false;
      }

      if (ego.flags[2]) {
        this.drawRightBlinkers = true;
        this.drawBlinkers();
      } else if (ego.flags[0]) {
        this.drawRightBlinkers = false;
      }
    }

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
          width={ 768 }
          height={ 1024 } />
      </div>
    )
  }
}

export default MainScreen
