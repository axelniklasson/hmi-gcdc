import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import createjs from 'createjs-collection'
import images from '../images'

class CanvasTest extends Component {
  constructor(props) {
    super(props)
  }

  // Prepare stage for drawing
  componentDidMount() {
    let canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas)
    this.stage.x = canvas.width / 2
    this.stage.y = canvas.height / 2;
    //this.draw(0,6397675.946148769,320194.38247808425)
  }

  // Create the drawing logic
  draw(ownVehicle, vehicle1, vehicle2) {
    this.stage.removeAllChildren()

    var vehicleHeight = 4635;
    var vehicleWidth = 2097;
    var roadWidth = 4000;
    var scale = 0.05;

    var vehicle = new createjs.Bitmap(images.transport);
    var otherVehicle = new createjs.Bitmap(images.otherTransport);
    var otherVehicle2 = new createjs.Bitmap(images.otherTransport);

    vehicle.x = 0 - ((vehicleWidth*scale)/2);
    vehicle.scaleX = (vehicleWidth/100)*scale;
    vehicle.scaleY = (vehicleHeight/178)*scale;

    console.log((ownVehicle.easting - vehicle1.easting) + " " + (ownVehicle.northing - vehicle1.northing))

    otherVehicle.x = (ownVehicle.easting - vehicle1.easting) - ((vehicleWidth*scale)/2);
    otherVehicle.y = (ownVehicle.northing - vehicle1.northing);
    otherVehicle.scaleX = (vehicleWidth/100)*scale;
    otherVehicle.scaleY = (vehicleHeight/178)*scale;
    otherVehicle2.x = (ownVehicle.easting - vehicle2.easting) - ((vehicleWidth*scale)/2);
    otherVehicle2.y = (ownVehicle.northing - vehicle2.northing);
    otherVehicle2.scaleX = (vehicleWidth/100)*scale;
    otherVehicle2.scaleY = (vehicleHeight/178)*scale;

    this.stage.addChild(vehicle)
    this.stage.addChild(otherVehicle);
    this.stage.addChild(otherVehicle2);

    var y = -50;
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
      rightLine.graphics.moveTo(((vehicleWidth*scale)/2)+25,y);
      leftLine.graphics.moveTo(-((vehicleWidth*scale)/2)-25, y);
      y = y+1;
      leftLine.graphics.lineTo(-((vehicleWidth*scale)/2)-25, y);
      rightLine.graphics.lineTo(((vehicleWidth*scale)/2)+25, y);
      this.stage.addChild(leftLine);
      this.stage.addChild(rightLine);
    }

    var lineLeft = new createjs.Shape();
    lineLeft.graphics.beginStroke("white")
    lineLeft.graphics.moveTo(-((vehicleWidth*scale)/2)-25,y);
    lineLeft.graphics.lineTo(-((vehicleWidth*scale)/2)-25,400);
    this.stage.addChild(lineLeft);

    var lineRight = new createjs.Shape();
    lineRight.graphics.beginStroke("white")
    lineRight.graphics.moveTo(((vehicleWidth*scale)/2)+25,y);
    lineRight.graphics.lineTo(((vehicleWidth*scale)/2)+25,400);
    this.stage.addChild(lineRight);



   // var circle = new createjs.Shape();
   // circle.graphics.beginFill("white");
   // circle.graphics.drawCircle(100,northing-startNorth,50);
   // this.stage.addChild(circle);

   vehicle.image.onload = (event) => this.stage.update()
  }

  render() {
    // Extract props
    const { ownVehicle, vehicle1, vehicle2 } = this.props

    // Draw on props update
    if (ownVehicle, vehicle1, vehicle2) {
      this.draw(ownVehicle, vehicle1, vehicle2)
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
