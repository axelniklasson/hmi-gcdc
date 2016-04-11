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
  draw(speed, lat) { 
    this.stage.removeAllChildren()

    let circle = new createjs.Shape()
    circle.graphics.beginFill('DeepSkyBlue').drawCircle(0,0,70)
    this.stage.addChild(circle)

    let circle2 = new createjs.Shape()
    circle2.graphics.beginFill('DarkRed').drawCircle(speed*-10,speed*-15,50)
    this.stage.addChild(circle2)

    let circle3 = new createjs.Shape()
    circle3.graphics.beginFill('ForestGreen').drawCircle(speed*15,speed*5,30)
    this.stage.addChild(circle3)

    this.stage.update()
  }

  render() {
    // Extract props
    const { speed, lat } = this.props

    // Draw on props update
    if (speed, lat) {
      this.draw(speed, lat)
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
