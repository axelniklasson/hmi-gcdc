import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import createjs from 'createjs-collection'

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
  }

  // Create the drawing logic
  draw(speed, northing, easting) {
    var startNorth = 6397675.946148769;
    var startEast = 320194.38247808425;
    this.stage.removeAllChildren()

    var circle = new createjs.Shape();
    circle.graphics.beginFill("white");
    circle.graphics.drawCircle(easting-startEast,northing-startNorth,50);
    this.stage.addChild(circle);

    this.stage.update()
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
