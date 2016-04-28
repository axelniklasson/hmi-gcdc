import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import createjs from 'createjs-collection'
import CSSModules from 'react-css-modules'
import styles from '../styles/MiniMap'

class MiniMap extends Component {
  componentDidMount() {
    let canvas = findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas);
  }

  render() {
    const { ego, vehicles } = this.props

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
