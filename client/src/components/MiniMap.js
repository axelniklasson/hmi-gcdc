import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import createjs from 'createjs-collection'
import CSSModules from 'react-css-modules'
import styles from '../styles/MiniMap'
import images from '../images'

class MiniMap extends Component {

  componentWillMount(){
    this.init();
    console.log("componentwillmount");
  }

  componentDidMount() {
    console.log("componentdidmount");
    let canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas);
    this.stage.x = canvas.width / 2 - (this.vehicleWidth * this.scale)/2;
    this.stage.y = canvas.height - (this.vehicleHeight*this.scale) - 20 ;
    this.canvas = canvas;
    this.drawEgo();
  }

  drawEgo(){
    if(!this.ego){
      this.ego = new createjs.Bitmap(images.miniEgo);
      console.log("createEgo")
      this.ego.x = 0;
      this.ego.y = 0;
    }
    this.ego.scaleX = (this.vehicleWidth/100)*this.scale;
    this.ego.scaleY = (this.vehicleHeight/178)*this.scale;

    if(!this.road){
      this.road = new createjs.Bitmap(images.miniRoad);
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
    this.scale = 0.005;
    this.otherVehicles = [];
  }

  draw(ego, vehicles){
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

  render() {
    const { ego, vehicles } = this.props

    console.log("render");
    if (this.otherVehicles.length == 0 && ego && vehicles) {
      for (var i = 0; i < vehicles.length; i++) {
        var vehicle = new createjs.Bitmap(images.miniOther);
        this.otherVehicles.push(vehicle);
       this.stage.addChild(vehicle);
      }
    }

    // Draw on props update
    if (ego, vehicles) {
      this.draw(ego, vehicles);
    }

    return (
      <div styleName="container">
        <canvas 
          className="container"
          ref="canvas"
          width={ 250 }
          height={ 240 } />
      </div>
    )
  }
}

export default CSSModules(MiniMap, styles)
