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
  draw(speed, northing, easting) {
    this.stage.removeAllChildren()
    var startNorth = 6397675.946148769;
    var startEast = 320194.38247808425;
    var ownVehicleHeight = 4635;
    var ownVehicleWidth = 2097;
    var roadWidth = 4000;
    var scale = 0.05;

    var vehicle = new createjs.Bitmap(images.transport);
    var otherVehicle = new createjs.Bitmap(images.otherTransport);
    var otherVehicle2 = new createjs.Bitmap(images.otherTransport);

    vehicle.x = 0 - ((ownVehicleWidth*scale)/2);
    vehicle.scaleX = (ownVehicleWidth/100)*scale;
    vehicle.scaleY = (ownVehicleHeight/178)*scale;
    otherVehicle.x = 0 - ((ownVehicleWidth*scale)/2) - ownVehicleWidth*scale - 50;
    otherVehicle.y = (northing-startNorth);
    otherVehicle.scaleX = (ownVehicleWidth/100)*scale;
    otherVehicle.scaleY = (ownVehicleHeight/178)*scale;
    otherVehicle2.x = 0 - ((ownVehicleWidth*scale)/2) - ownVehicleWidth*scale - 50;
    otherVehicle2.y = 0 - ownVehicleHeight*scale -50 + (northing-startNorth)*2;
    otherVehicle2.scaleX = (ownVehicleWidth/100)*scale;
    otherVehicle2.scaleY = (ownVehicleHeight/178)*scale;

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
      rightLine.graphics.moveTo(((ownVehicleWidth*scale)/2)+25,y);
      leftLine.graphics.moveTo(-((ownVehicleWidth*scale)/2)-25, y);
      y = y+1;
      leftLine.graphics.lineTo(-((ownVehicleWidth*scale)/2)-25, y);
      rightLine.graphics.lineTo(((ownVehicleWidth*scale)/2)+25, y);
      this.stage.addChild(leftLine);
      this.stage.addChild(rightLine);
    }

    var lineLeft = new createjs.Shape();
    lineLeft.graphics.beginStroke("white")
    lineLeft.graphics.moveTo(-((ownVehicleWidth*scale)/2)-25,y);
    lineLeft.graphics.lineTo(-((ownVehicleWidth*scale)/2)-25,400);
    this.stage.addChild(lineLeft);

    var lineRight = new createjs.Shape();
    lineRight.graphics.beginStroke("white")
    lineRight.graphics.moveTo(((ownVehicleWidth*scale)/2)+25,y);
    lineRight.graphics.lineTo(((ownVehicleWidth*scale)/2)+25,400);
    this.stage.addChild(lineRight);



   // var circle = new createjs.Shape();
   // circle.graphics.beginFill("white");
   // circle.graphics.drawCircle(100,northing-startNorth,50);
   // this.stage.addChild(circle);

   vehicle.image.onload = (event) => this.stage.update()
  }

  render() {
    // Extract props
    const { speed, northing, easting } = this.props

    // Draw on props update
    if (speed, northing, easting) {
      this.draw(speed, northing, easting)
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
