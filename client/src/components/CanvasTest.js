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
  }

  // Create the drawing logic
  draw(speed) { 
    this.stage.removeAllChildren()

    let circle = new createjs.Shape()
    circle.graphics.beginFill('DeepSkyBlue')
      .drawCircle(speed*30,speed*20,50)
    circle.x = 100
    circle.y = 200
    this.stage.addChild(circle)

    let circle2 = new createjs.Shape()
    circle2.graphics.beginFill('DarkRed')
      .drawCircle(speed*5,speed*15,50)
    circle2.x = 300
    circle2.y = 300
    this.stage.addChild(circle2)

    let circle3 = new createjs.Shape()
    circle3.graphics.beginFill('ForestGreen')
      .drawCircle(speed*25,speed*5,30)
    circle3.x = 150
    circle3.y = 250
    this.stage.addChild(circle3)

    this.stage.update()
  }

  render() {
    // Extract props
    const { speed } = this.props

    // Draw on props update
    if (speed) {
      this.draw(speed)
    }

    return (
      <div>
        <canvas 
          className="container"
          ref="canvas"
          width={768}
          height={1024}></canvas>
      </div>
    )
  }
}

export default CanvasTest
