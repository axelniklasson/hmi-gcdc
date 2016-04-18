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
    this.stage.y = canvas.height / 2
    this.draw(0,6397675.946148769,320194.38247808425)
  }

  // Create the drawing logic
  draw(speed, northing, easting) {
    this.stage.removeAllChildren()
    var startNorth = 6397675.946148769;
    var startEast = 320194.38247808425;
    var ownVehicleHeight = 4635;
    var ownVehicleWidth = 2097;
    var roadWidth = 4000;
    var scale = 1.5;

    var vehicle = new createjs.Bitmap(images.transport)
    vehicle.x = 0
    vehicle.y = 0
    this.stage.addChild(vehicle)

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
 //   if (speed, northing, easting) {
 //     this.draw(speed, northing, easting)
 //   }

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
