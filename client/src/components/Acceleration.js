import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import createjs from 'createjs-collection'
import CSSModules from 'react-css-modules'
import styles from '../styles/Acceleration'

class Acceleration extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas)
  }

  draw(acceleration) {
    this.stage.removeAllChildren()

    // Scale the acceleration to present pixels
    let scaledAcc = acceleration * 25

    // Draw white background
    let base = new createjs.Shape()
    base.graphics.beginFill('White').drawRect(80,100,140,10)
    this.stage.addChild(base)

    // Draw Acc or Dec
    if (acceleration > 0) {
      let acc = new createjs.Shape()
      acc.graphics.beginFill('Green').drawRect(150,100,scaledAcc,10)
      this.stage.addChild(acc)
    } else if (acceleration < 0) {
      let scaledDec = scaledAcc * (-1)
      let dec = new createjs.Shape()
      base.graphics.beginFill('Red').drawRect(150-scaledDec,100,scaledDec,10)
      this.stage.addChild(dec)
    }

    this.stage.update()
  }

  render() {
    let acceleration = this.props.acceleration

    if(acceleration) {
      this.draw(acceleration)
    }

    return (
      <div styleName="container">
        <div styleName="circle">
          <canvas
            className="container"
            ref="canvas"
            width={244}
            height={131} />
        </div>
      </div>
    )
  }
}

export default CSSModules(Acceleration, styles)
