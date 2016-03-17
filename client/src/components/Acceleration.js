import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Acceleration'

class Acceleration extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="circle">

        </div>
      </div>
    )
  }
}

export default CSSModules(Acceleration, styles)
