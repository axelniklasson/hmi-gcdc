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
    this.init();
  }

  componentDidMount() {
    this.drawEgo();
  }

  // Prepare stage for drawing
  drawEgo() {
    let canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas);
    this.stage.x = canvas.width / 2 - (this.vehicleWidth * this.scale)/ 2;
    this.stage.y = canvas.height / 2 + 40;

    this.ego = new createjs.Bitmap(images.transport);
    this.ego.x = 0;
    this.ego.y = 0;
    this.ego.scaleX = (this.vehicleWidth / 100) * this.scale;
    this.ego.scaleY = (this.vehicleHeight / 178) * this.scale;

    this.road = new createjs.Bitmap(images.road);
    this.road.x = -(this.roadWidth*this.scale)/2 + (this.vehicleWidth * this.scale)/  2;
    this.road.scaleX = (this.roadWidth/120) * this.scale;

    this.stage.addChild(this.road);
    this.stage.addChild(this.ego);

    this.ego.image.onload = () => this.stage.update()
  }

  init() {
    this.vehicleHeight = 4635;
    this.vehicleWidth = 2097;
    this.roadWidth = 4000;
    this.scale = 0.04;
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
    if (zoom == 1 && this.scale < 0.05) {
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
